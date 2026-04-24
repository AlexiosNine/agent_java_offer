"""
最简 ReAct Agent 实现
约 100 行，演示 Thought-Action-Observation 循环
"""
import re
from typing import Dict, List, Callable
from tools import search, calculator


class ReActAgent:
    """ReAct Agent: Reasoning + Acting"""

    def __init__(self, tools: Dict[str, Callable], max_steps: int = 5):
        self.tools = tools
        self.max_steps = max_steps
        self.history = []

    def run(self, question: str) -> str:
        """运行 Agent 直到得到最终答案"""
        self.history = [f"Question: {question}"]

        for step in range(self.max_steps):
            # 构建 prompt
            prompt = self._build_prompt(question)

            # 调用 LLM 获取下一步动作
            response = self._call_llm(prompt)
            self.history.append(response)

            # 解析响应
            if "Final Answer:" in response:
                # 任务完成
                answer = response.split("Final Answer:")[-1].strip()
                return answer

            # 解析 Action
            action, action_input = self._parse_action(response)

            if action is None:
                return "Error: 无法解析 Action"

            # 执行工具
            try:
                observation = self.tools[action](action_input)
                self.history.append(f"Observation: {observation}")
            except KeyError:
                self.history.append(f"Observation: Error - 工具 '{action}' 不存在")
            except Exception as e:
                self.history.append(f"Observation: Error - {str(e)}")

        return "Error: 达到最大步数限制"

    def _build_prompt(self, question: str) -> str:
        """构建发送给 LLM 的 prompt"""
        tools_desc = "\n".join([f"- {name}: {func.__doc__}"
                                for name, func in self.tools.items()])

        prompt = f"""你是一个 ReAct Agent。回答问题时，按以下格式思考和行动：

Thought: 思考下一步该做什么
Action: 工具名称
Action Input: 工具输入
Observation: 工具返回结果
... (重复 Thought/Action/Observation)
Thought: 我现在知道最终答案了
Final Answer: 最终答案

可用工具：
{tools_desc}

历史记录：
{chr(10).join(self.history)}

现在继续：
"""
        return prompt

    def _call_llm(self, prompt: str) -> str:
        """调用 LLM（这里用模拟实现）"""
        # 实际使用时替换为真实的 LLM API 调用
        # 例如: openai.ChatCompletion.create(...)

        # 这里返回模拟响应用于演示
        if "巴黎奥运会" in prompt:
            return """Thought: 我需要搜索2024年巴黎奥运会金牌榜信息
Action: search
Action Input: 2024巴黎奥运会金牌榜"""

        return "Thought: 我已经找到答案了\nFinal Answer: 模拟答案"

    def _parse_action(self, response: str) -> tuple:
        """解析 LLM 响应中的 Action"""
        action_pattern = r"Action:\s*(\w+)"
        input_pattern = r"Action Input:\s*(.+?)(?:\n|$)"

        action_match = re.search(action_pattern, response)
        input_match = re.search(input_pattern, response)

        if action_match and input_match:
            return action_match.group(1), input_match.group(1).strip()

        return None, None


# 使用示例
if __name__ == "__main__":
    # 注册工具
    tools = {
        "search": search,
        "calculator": calculator
    }

    # 创建 Agent
    agent = ReActAgent(tools, max_steps=5)

    # 运行任务
    question = "2024年巴黎奥运会金牌榜第一名是哪个国家？"
    answer = agent.run(question)

    print(f"\n最终答案: {answer}")
    print(f"\n完整历史:")
    for item in agent.history:
        print(item)
