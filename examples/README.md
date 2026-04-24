# 代码示例

这个目录包含 3 个可运行的 mini demo，帮助你理解 Agent 和 RAG 的实际实现。

## 示例列表

### 01_simple_react_agent
最简单的 ReAct Agent 实现（约 100 行 Python）
- 演示 Thought-Action-Observation 循环
- 包含简单的工具调用（搜索、计算器）
- 适合理解 Agent 基本原理

### 02_rag_pipeline
简单的 RAG 系统（约 200 行 Python）
- 文档加载 → 切块 → Embedding → 检索 → 生成
- 使用 ChromaDB 作为向量数据库
- 演示完整的 RAG 流程

### 03_multi_agent
Multi-Agent 协作示例（约 300 行 Python）
- Planner + Executor 分工协作
- 演示上下文隔离和职责专业化
- 包含简单的任务分解和结果汇总

## 运行要求

所有示例都需要：
- Python 3.9+
- OpenAI API Key（或兼容的 API）

每个示例目录下都有独立的 README 和 requirements.txt。

## 使用建议

1. 先看 01_simple_react_agent，理解 Agent 基本循环
2. 再看 02_rag_pipeline，理解 RAG 完整链路
3. 最后看 03_multi_agent，理解多 Agent 协作模式

这些示例都是"能跑的最小实现"，面试时可以说"我 repo 里有代码"。
