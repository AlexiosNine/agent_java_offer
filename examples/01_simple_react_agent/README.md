# 最简 ReAct Agent

这是一个约 100 行的 ReAct Agent 实现，演示 Thought-Action-Observation 循环。

## 核心概念

ReAct = Reasoning + Acting
- **Thought**: 模型思考下一步该做什么
- **Action**: 调用工具执行动作
- **Observation**: 观察工具返回结果
- 循环直到任务完成

## 文件说明

- `agent.py`: ReAct Agent 核心实现
- `tools.py`: 简单工具定义（搜索、计算器）
- `requirements.txt`: 依赖包
- `example.py`: 运行示例

## 快速开始

```bash
# 安装依赖
pip install -r requirements.txt

# 设置 API Key
export OPENAI_API_KEY="your-key-here"

# 运行示例
python example.py
```

## 示例输出

```
User: 2024年巴黎奥运会金牌榜第一名是哪个国家？他们一共获得了多少枚金牌？

Thought: 我需要搜索2024年巴黎奥运会金牌榜信息
Action: search("2024巴黎奥运会金牌榜")
Observation: 美国队以40枚金牌位居金牌榜第一...

Thought: 我已经找到答案了
Final Answer: 2024年巴黎奥运会金牌榜第一名是美国，共获得40枚金牌。
```

## 面试要点

这个示例可以帮你回答：
1. ReAct 的核心循环是什么？
2. 如何控制 Agent 的步数上限？
3. 如何解析模型输出并调用工具？
4. 如何处理工具调用失败？

## 扩展方向

- 添加更多工具（数据库查询、API 调用）
- 添加记忆模块（保存历史对话）
- 添加重试和降级策略
- 添加可观测性（日志、trace）
