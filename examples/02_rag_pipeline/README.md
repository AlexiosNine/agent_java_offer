# 简单 RAG Pipeline

这是一个约 200 行的 RAG 系统实现，演示完整的检索增强生成流程。

## 核心概念

RAG = Retrieval-Augmented Generation
- **数据加载**: 从文档中提取文本
- **切块**: 将长文档切分成小块
- **Embedding**: 将文本块转换为向量
- **索引**: 存储向量到向量数据库
- **检索**: 根据查询找到相关文本块
- **生成**: 基于检索结果生成答案

## 文件说明

- `rag.py`: RAG Pipeline 核心实现
- `documents/`: 示例文档目录
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
加载文档...
切块: 10 个 chunks
构建索引...
索引构建完成

Query: RAG 是什么？
检索到 3 个相关片段
生成答案: RAG (Retrieval-Augmented Generation) 是一种...
```

## 面试要点

这个示例可以帮你回答：
1. RAG 的完整流程是什么？
2. 如何选择切块大小和重叠长度？
3. 如何选择 Embedding 模型？
4. 如何评估检索质量？
5. 向量数据库如何选型？

## 扩展方向

- 添加重排序（Rerank）
- 添加混合检索（向量 + 关键词）
- 添加元数据过滤
- 添加多查询改写
- 添加评测指标（Recall@K, nDCG）
