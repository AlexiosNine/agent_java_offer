"""
运行 RAG 示例
"""
from rag import SimpleRAG


def main():
    # 准备示例文档
    documents = [
        """RAG (Retrieval-Augmented Generation) 是一种结合检索和生成的AI技术。
        它的核心思想是：在大模型生成回答之前，先从外部知识库中检索相关信息，
        然后将检索到的信息作为上下文，和用户问题一起发送给大模型。
        这种方法可以有效减少大模型的幻觉问题，提高回答的准确性和可追溯性。
        RAG 相比微调的优势在于：知识更新成本低、可追溯、不需要重新训练模型。""",

        """向量数据库是 RAG 系统的核心基础设施。常见的向量数据库包括：
        1. ChromaDB：轻量级，适合快速原型和小规模应用
        2. FAISS：Meta 开源，单机高性能，适合算法实验
        3. Milvus：分布式架构，适合大规模生产环境
        4. pgvector：PostgreSQL 扩展，适合已有 PG 生态的团队
        选型时需要考虑：数据规模、QPS 要求、运维成本、是否需要和关系数据联查。""",

        """文本切块（Chunking）是 RAG 流程中最关键的步骤之一。
        常见的切块策略包括：
        1. 固定大小切块：按字符数或 token 数切分，简单但可能破坏语义
        2. 语义切块：按段落、标题、句子边界切分，保留语义完整性
        3. 递归切块：先按大边界切，再递归细分，兼顾粒度和语义
        切块大小通常在 256-1024 token 之间，重叠长度为切块大小的 10%-20%。
        切块策略没有最优解，需要根据文档类型和查询场景迭代优化。""",

        """Embedding 模型将文本转换为高维向量，是 RAG 检索的基础。
        选择 Embedding 模型时需要考虑：
        1. 语言支持：中文场景推荐 BGE、M3E；英文推荐 OpenAI Ada
        2. 领域适配：通用模型 vs 领域微调模型
        3. 性能与成本：模型大小、推理速度、API 费用
        评估指标主要看 MTEB/C-MTEB 排行榜上的 Retrieval 任务得分，
        重点关注 Recall@K、MRR、nDCG 等检索相关指标。""",

        """重排序（Rerank）是提升 RAG 检索质量的关键技术。
        典型的两阶段检索流程：
        1. 召回阶段：用向量检索或混合检索，从海量文档中召回 Top-50 候选
        2. 重排阶段：用 Cross-Encoder 对候选集精细打分，选出 Top-5
        Cross-Encoder 直接比较 query 和 document 的文本，精度远高于向量相似度。
        常用的重排模型包括 Cohere Rerank、BGE-Reranker 等。
        重排的价值是降低噪声上下文，提升答案稳定性。"""
    ]

    # 创建 RAG 系统
    print("初始化 RAG 系统...")
    rag = SimpleRAG()

    # 加载文档
    print("加载文档...")
    docs = rag.load_documents(documents)

    # 构建索引
    print("构建索引...")
    rag.build_index(docs)

    # 示例查询
    queries = [
        "RAG 是什么？它有什么优势？",
        "如何选择向量数据库？",
        "文本切块有哪些策略？",
        "什么是重排序？为什么需要它？"
    ]

    for query in queries:
        print(f"\n{'=' * 50}")
        result = rag.query(query, top_k=2)
        print(f"问题: {result['question']}")
        print(f"答案: {result['answer']}")
        print(f"引用来源:")
        for i, source in enumerate(result['sources']):
            print(f"  {i+1}. [{source['metadata'].get('source', 'unknown')}] "
                  f"{source['content'][:80]}...")


if __name__ == "__main__":
    main()
