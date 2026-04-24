"""
运行示例
"""
from agent import ReActAgent
from tools import search, calculator, get_current_time


def main():
    # 注册工具
    tools = {
        "search": search,
        "calculator": calculator,
        "get_time": get_current_time
    }

    # 创建 Agent
    agent = ReActAgent(tools, max_steps=5)

    # 示例 1: 搜索问题
    print("=" * 50)
    print("示例 1: 搜索问题")
    print("=" * 50)
    question1 = "2024年巴黎奥运会金牌榜第一名是哪个国家？"
    answer1 = agent.run(question1)
    print(f"\n问题: {question1}")
    print(f"答案: {answer1}\n")

    # 示例 2: 计算问题
    print("=" * 50)
    print("示例 2: 计算问题")
    print("=" * 50)
    agent2 = ReActAgent(tools, max_steps=5)
    question2 = "计算 (123 + 456) * 2 的结果"
    answer2 = agent2.run(question2)
    print(f"\n问题: {question2}")
    print(f"答案: {answer2}\n")

    # 示例 3: 组合问题
    print("=" * 50)
    print("示例 3: 组合问题（搜索 + 计算）")
    print("=" * 50)
    agent3 = ReActAgent(tools, max_steps=5)
    question3 = "美国和中国在2024巴黎奥运会的金牌总数是多少？"
    answer3 = agent3.run(question3)
    print(f"\n问题: {question3}")
    print(f"答案: {answer3}\n")


if __name__ == "__main__":
    main()
