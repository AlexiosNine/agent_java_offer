"""
Multi-Agent 协作示例
约 300 行，演示 Planner + Executor 分工协作
"""
from typing import List, Dict, Any
from dataclasses import dataclass


@dataclass
class Task:
    """任务定义"""
    id: str
    description: str
    status: str = "pending"  # pending, in_progress, completed, failed
    result: Any = None
    error: str = None


class PlannerAgent:
    """规划 Agent：负责任务分解"""

    def __init__(self):
        self.name = "Planner"

    def plan(self, user_request: str) -> List[Task]:
        """
        将用户请求分解为多个子任务

        实际使用时调用 LLM 进行任务分解
        """
        # 模拟任务分解
        if "数据分析" in user_request:
            return [
                Task(id="task_1", description="从数据库加载数据"),
                Task(id="task_2", description="数据清洗和预处理"),
                Task(id="task_3", description="统计分析"),
                Task(id="task_4", description="生成可视化图表"),
                Task(id="task_5", description="撰写分析报告")
            ]
        elif "写报告" in user_request:
            return [
                Task(id="task_1", description="收集相关资料"),
                Task(id="task_2", description="整理大纲"),
                Task(id="task_3", description="撰写正文"),
                Task(id="task_4", description="校对和润色")
            ]
        else:
            return [
                Task(id="task_1", description="理解用户需求"),
                Task(id="task_2", description="执行任务"),
                Task(id="task_3", description="返回结果")
            ]

    def replan(self, failed_task: Task, error: str) -> List[Task]:
        """
        当任务失败时重新规划

        实际使用时调用 LLM 分析失败原因并调整计划
        """
        print(f"[{self.name}] 任务 {failed_task.id} 失败: {error}")
        print(f"[{self.name}] 重新规划...")

        # 模拟重新规划
        return [
            Task(id=f"{failed_task.id}_retry",
                 description=f"重试: {failed_task.description}")
        ]


class ExecutorAgent:
    """执行 Agent：负责执行具体任务"""

    def __init__(self, tools: Dict[str, Any]):
        self.name = "Executor"
        self.tools = tools

    def execute(self, task: Task) -> Task:
        """
        执行单个任务

        实际使用时调用 LLM 决定使用哪个工具，并执行
        """
        print(f"[{self.name}] 开始执行: {task.description}")

        try:
            # 模拟任务执行
            if "加载数据" in task.description:
                result = self.tools["load_data"]()
            elif "清洗" in task.description:
                result = self.tools["clean_data"]()
            elif "分析" in task.description:
                result = self.tools["analyze"]()
            elif "报告" in task.description:
                result = self.tools["generate_report"]()
            else:
                result = f"完成任务: {task.description}"

            task.status = "completed"
            task.result = result
            print(f"[{self.name}] 任务完成: {result}")

        except Exception as e:
            task.status = "failed"
            task.error = str(e)
            print(f"[{self.name}] 任务失败: {str(e)}")

        return task


class CoordinatorAgent:
    """协调 Agent：负责整体流程控制"""

    def __init__(self, planner: PlannerAgent, executor: ExecutorAgent):
        self.name = "Coordinator"
        self.planner = planner
        self.executor = executor
        self.max_retries = 3

    def run(self, user_request: str) -> Dict:
        """
        运行完整的 Multi-Agent 流程
        """
        print(f"[{self.name}] 收到用户请求: {user_request}")

        # 1. 规划阶段
        print(f"\n{'='*50}")
        print(f"[{self.name}] 阶段 1: 任务规划")
        print(f"{'='*50}")
        tasks = self.planner.plan(user_request)
        print(f"[{self.name}] 生成 {len(tasks)} 个子任务:")
        for task in tasks:
            print(f"  - {task.id}: {task.description}")

        # 2. 执行阶段
        print(f"\n{'='*50}")
        print(f"[{self.name}] 阶段 2: 任务执行")
        print(f"{'='*50}")

        completed_tasks = []
        failed_tasks = []

        for task in tasks:
            retry_count = 0

            while retry_count < self.max_retries:
                # 执行任务
                executed_task = self.executor.execute(task)

                if executed_task.status == "completed":
                    completed_tasks.append(executed_task)
                    break
                else:
                    # 任务失败，重新规划
                    retry_count += 1
                    if retry_count < self.max_retries:
                        retry_tasks = self.planner.replan(
                            executed_task,
                            executed_task.error
                        )
                        if retry_tasks:
                            task = retry_tasks[0]
                    else:
                        failed_tasks.append(executed_task)

        # 3. 汇总阶段
        print(f"\n{'='*50}")
        print(f"[{self.name}] 阶段 3: 结果汇总")
        print(f"{'='*50}")

        return {
            "request": user_request,
            "total_tasks": len(tasks),
            "completed": len(completed_tasks),
            "failed": len(failed_tasks),
            "completed_tasks": completed_tasks,
            "failed_tasks": failed_tasks
        }


# 模拟工具
def load_data():
    return "数据加载完成: 1000 条记录"


def clean_data():
    return "数据清洗完成: 移除 50 条异常数据"


def analyze():
    return "分析完成: 平均值 85.5, 中位数 82.0"


def generate_report():
    return "报告生成完成: report.pdf"


# 使用示例
if __name__ == "__main__":
    # 准备工具
    tools = {
        "load_data": load_data,
        "clean_data": clean_data,
        "analyze": analyze,
        "generate_report": generate_report
    }

    # 创建 Agents
    planner = PlannerAgent()
    executor = ExecutorAgent(tools)
    coordinator = CoordinatorAgent(planner, executor)

    # 运行任务
    result = coordinator.run("帮我做一个数据分析")

    # 打印结果
    print(f"\n{'='*50}")
    print("最终结果:")
    print(f"{'='*50}")
    print(f"总任务数: {result['total_tasks']}")
    print(f"完成: {result['completed']}")
    print(f"失败: {result['failed']}")
    print(f"\n完成的任务:")
    for task in result['completed_tasks']:
        print(f"  - {task.id}: {task.result}")
