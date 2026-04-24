"""
简单的工具定义
"""


def search(query: str) -> str:
    """搜索工具：根据查询返回相关信息"""
    # 实际使用时替换为真实的搜索 API
    # 例如: Google Search API, Bing API, 或自建搜索

    # 模拟搜索结果
    mock_results = {
        "2024巴黎奥运会金牌榜": "2024年巴黎奥运会金牌榜：美国队以40枚金牌位居第一，中国队以40枚金牌并列第一（按银牌数排第二），日本队以20枚金牌位居第三。",
        "Python": "Python是一种高级编程语言，由Guido van Rossum于1991年创建。",
    }

    for key in mock_results:
        if key in query:
            return mock_results[key]

    return f"未找到关于 '{query}' 的相关信息"


def calculator(expression: str) -> str:
    """计算器工具：计算数学表达式"""
    try:
        # 安全的数学表达式求值
        # 实际使用时应该用更安全的方式，避免 eval 的安全风险
        result = eval(expression, {"__builtins__": {}}, {})
        return str(result)
    except Exception as e:
        return f"计算错误: {str(e)}"


# 可以继续添加更多工具
def get_current_time() -> str:
    """获取当前时间"""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def read_file(file_path: str) -> str:
    """读取文件内容"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"读取文件失败: {str(e)}"
