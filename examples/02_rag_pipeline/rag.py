"""
简单的 RAG Pipeline 实现
约 200 行，演示完整的检索增强生成流程
"""
import chromadb
from typing import List, Dict
import hashlib


class SimpleRAG:
    """简单的 RAG 系统"""

    def __init__(self, collection_name: str = "documents"):
        # 初始化 ChromaDB 客户端
        self.client = chromadb.Client()
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}  # 使用余弦相似度
        )

    def load_documents(self, documents: List[str]) -> List[Dict]:
        """加载文档"""
        doc_list = []
        for i, doc in enumerate(documents):
            doc_list.append({
                "id": f"doc_{i}",
                "content": doc,
                "metadata": {"source": f"document_{i}"}
            })
        return doc_list

    def chunk_text(self, text: str, chunk_size: int = 500,
                   overlap: int = 50) -> List[str]:
        """
        切块策略：固定大小 + 重叠窗口

        Args:
            text: 原始文本
            chunk_size: 每块大小（字符数）
            overlap: 重叠长度（字符数）
        """
        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]

            # 避免在单词中间切断（简单实现）
            if end < len(text) and not text[end].isspace():
                # 找到最近的空格
                last_space = chunk.rfind(' ')
                if last_space > 0:
                    chunk = chunk[:last_space]
                    end = start + last_space

            chunks.append(chunk.strip())
            start = end - overlap  # 重叠窗口

        return chunks

    def build_index(self, documents: List[Dict]):
        """
        构建索引：切块 + Embedding + 存储
        """
        all_chunks = []
        all_ids = []
        all_metadatas = []

        for doc in documents:
            # 切块
            chunks = self.chunk_text(doc["content"])

            for i, chunk in enumerate(chunks):
                # 生成唯一 ID
                chunk_id = f"{doc['id']}_chunk_{i}"
                all_ids.append(chunk_id)
                all_chunks.append(chunk)

                # 保存元数据
                metadata = doc.get("metadata", {}).copy()
                metadata["chunk_index"] = i
                metadata["parent_doc_id"] = doc["id"]
                all_metadatas.append(metadata)

        # 批量添加到向量数据库
        # ChromaDB 会自动调用 Embedding 模型
        self.collection.add(
            documents=all_chunks,
            ids=all_ids,
            metadatas=all_metadatas
        )

        print(f"索引构建完成: {len(all_chunks)} 个 chunks")

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict]:
        """
        检索相关文档片段

        Args:
            query: 查询文本
            top_k: 返回前 K 个结果
        """
        results = self.collection.query(
            query_texts=[query],
            n_results=top_k
        )

        # 格式化结果
        retrieved_docs = []
        for i in range(len(results['ids'][0])):
            retrieved_docs.append({
                "id": results['ids'][0][i],
                "content": results['documents'][0][i],
                "metadata": results['metadatas'][0][i],
                "distance": results['distances'][0][i] if 'distances' in results else None
            })

        return retrieved_docs

    def generate_answer(self, query: str, context: List[Dict]) -> str:
        """
        基于检索结果生成答案

        实际使用时替换为真实的 LLM API 调用
        """
        # 构建上下文
        context_text = "\n\n".join([
            f"[文档 {i+1}]\n{doc['content']}"
            for i, doc in enumerate(context)
        ])

        # 构建 prompt
        prompt = f"""基于以下上下文回答问题。如果上下文中没有相关信息，请说"我不知道"。

上下文：
{context_text}

问题：{query}

答案："""

        # 实际使用时调用 LLM API
        # 这里返回模拟答案
        return f"基于检索到的 {len(context)} 个文档片段生成的答案（模拟）"

    def query(self, question: str, top_k: int = 3) -> Dict:
        """
        完整的 RAG 查询流程
        """
        # 1. 检索
        retrieved_docs = self.retrieve(question, top_k)

        # 2. 生成
        answer = self.generate_answer(question, retrieved_docs)

        return {
            "question": question,
            "answer": answer,
            "sources": retrieved_docs
        }


# 使用示例
if __name__ == "__main__":
    # 示例文档
    documents = [
        """RAG (Retrieval-Augmented Generation) 是一种结合检索和生成的技术。
        它先从知识库中检索相关信息，再基于检索结果生成答案。
        这种方法可以有效减少大模型的幻觉问题。""",

        """向量数据库用于存储和检索高维向量。
        常见的向量数据库包括 Milvus、Pinecone、ChromaDB 等。
        它们使用 ANN (Approximate Nearest Neighbor) 算法进行快速检索。""",

        """Embedding 模型将文本转换为向量表示。
        常用的 Embedding 模型包括 OpenAI Ada、BGE、M3E 等。
        选择 Embedding 模型时需要考虑语言支持、领域适配和检索精度。"""
    ]

    # 创建 RAG 系统
    rag = SimpleRAG()

    # 加载文档
    docs = rag.load_documents(documents)

    # 构建索引
    rag.build_index(docs)

    # 查询
    result = rag.query("RAG 是什么？")
    print(f"\n问题: {result['question']}")
    print(f"答案: {result['answer']}")
    print(f"\n引用来源:")
    for i, source in enumerate(result['sources']):
        print(f"{i+1}. {source['content'][:100]}...")
