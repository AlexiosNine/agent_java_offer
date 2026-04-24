"""
运行 Multi-Agent 示例
"""
from multi_agent import PlannerAgent, ExecutorAgent, CoordinatorAgent


def main():
    # 模拟工具
    def load_data():
        return "数据加载完成: 1000 条记录"

    def clean_data():
        return "数据清洗完成: 移除 50 条异常数据"

    def analyze():
        return "分析完成: 平均值 85.5, 中位数 82.0"

    def generate_report():
        return "报告生成完成: report.pdf"

    def search_info():
        return "搜索完成: 找到 20 篇相关文献"

    def write_content():
        return "内容撰写完成: 3000 字"

    tools = {
        "load_data": load_data,
        "clean_data": clean_data,
        "analyze": analyze,
        "generate_report": generate_report,
        "search_info": search_info,
        "write_content": write_content
    }

    # 创建 Agents
    planner = PlannerAgent()
    executor = ExecutorAgent(tools)
    coordinator = CoordinatorAgent(planner, executor)

    # 示例 1: 数据分析任务
    print("=" * 60)
    print("示例 1: 数据分析任务")
    print("=" * 60)
    result1 = coordinator.run("帮我做一个数据分析")
    print(f"\n✓ 完成 {result1['completed']}/{result1['total_tasks']} 个任务\n")

    # 示例 2: 写报告任务
    print("=" * 60)
    print("示例 2: 写报告任务")
    print("=" * 60)
    result2 = coordinator.run("帮我写一份技术报告")
    print(f"\n✓ 完成 {result2['completed']}/{result2['total_tasks']} 个任务\n")


if __name__ == "__main__":
    main()
