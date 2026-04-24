# Multi-Agent 协作示例

这是一个约 300 行的 Multi-Agent 系统实现，演示 Planner + Executor 分工协作。

## 核心概念

Multi-Agent = 多个专业化 Agent 协作完成复杂任务
- **Planner Agent**: 负责任务分解和规划
- **Executor Agent**: 负责执行具体任务
- **Coordinator Agent**: 负责整体流程控制

## 架构优势

1. **上下文隔离**: 每个 Agent 只看自己需要的信息
2. **职责专业化**: 规划和执行分离，各司其职
3. **故障隔离**: 某个 Agent 失败不会拖垮整条链路
4. **并发执行**: 多个 Executor 可以并行工作

## 文件说明

- `multi_agent.py`: Multi-Agent 核心实现
- `example.py`: 运行示例
- `requirements.txt`: 依赖包

## 快速开始

```bash
# 安装依赖
pip install -r requirements.txt

# 运行示例
python example.py
```

## 示例输出

```
[Coordinator] 收到用户请求: 帮我做一个数据分析

阶段 1: 任务规划
生成 5 个子任务:
  - task_1: 从数据库加载数据
  - task_2: 数据清洗和预处理
  - task_3: 统计分析
  - task_4: 生成可视化图表
  - task_5: 撰写分析报告

阶段 2: 任务执行
[Executor] 开始执行: 从数据库加载数据
[Executor] 任务完成: 数据加载完成: 1000 条记录
...

阶段 3: 结果汇总
总任务数: 5
完成: 5
失败: 0
```

## 面试要点

这个示例可以帮你回答：
1. 为什么要用 Multi-Agent 而不是 Single Agent？
2. Sub-agent 的收益是什么？
3. 如何做上下文隔离？
4. 如何处理 Agent 之间的协作？
5. 如何处理任务失败和重试？

## 扩展方向

- 添加并行执行（多个 Executor 同时工作）
- 添加 Agent 间通信机制
- 添加任务依赖管理（DAG）
- 添加动态 Agent 创建和销毁
- 添加可观测性（trace、metrics）
