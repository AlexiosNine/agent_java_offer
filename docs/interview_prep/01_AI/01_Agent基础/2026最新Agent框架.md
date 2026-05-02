# 2026 最新 Agent 框架：Hermes Agent 与 OpenClaw

**更新时间**：2026-04-30  
**来源**：Web 搜索结果汇总

---

## 一、Hermes Agent（Nous Research）

### 1.1 基本信息

**发布时间**：2026 年 2 月 25 日  
**开发者**：Nous Research  
**开源协议**：MIT License  
**GitHub Stars**：95.6K（7 周内，2026 年增长最快的 Agent 框架）  
**最新版本**：v0.10.0（2026 年 4 月 16 日）

### 1.2 核心特性

**1. 自我改进（Self-Improving）**
- **核心亮点**：第一个内置学习循环（Learning Loop）的开源 Agent 框架
- 从每次对话中学习，将经验转化为可复用的技能文档（Skill Documents）
- 随着使用次数增加，性能可量化提升

**2. 持久化记忆（Persistent Memory）**
- **三层记忆架构**：
  - 短期记忆：当前会话上下文
  - 长期记忆：跨会话的用户偏好和历史
  - 技能记忆：从经验中提炼的可复用技能（118+ 内置技能）
- 跨会话保持状态，不需要每次重新学习

**3. 技能系统（Skill System）**
- Agent 自动将成功的任务执行过程写成"技能文档"（Playbooks）
- 技能可以在未来任务中复用和改进
- v0.10.0 内置 118 个预训练技能

**4. 涌现能力（Emergent Skills）**
- Agent 可以组合已有技能，创造新的复合技能
- 不需要人工编写每个技能，Agent 自己"学会"新能力

### 1.3 架构设计

**核心组件**：
- **Runtime**：持久化的 Agent 运行时环境
- **Skill Store**：技能存储和检索系统
- **Memory System**：三层记忆管理
- **Learning Loop**：经验 → 技能提炼 → 技能复用 → 性能提升

**技术栈**：
- 支持多种 LLM（OpenAI、Anthropic、本地模型）
- 支持 6 种消息协议（Slack、Discord、Telegram 等）
- Python 实现，易于扩展

### 1.4 与其他框架的对比

| 维度 | Hermes Agent | LangGraph | AutoGen |
|------|-------------|-----------|---------|
| 学习能力 | ✅ 内置学习循环 | ❌ 无 | ❌ 无 |
| 持久化记忆 | ✅ 跨会话 | ⚠️ 需要自己实现 | ⚠️ 需要自己实现 |
| 技能复用 | ✅ 自动提炼技能 | ❌ 手动编写 | ❌ 手动编写 |
| 易用性 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 社区活跃度 | 🔥 95.6K stars | 🔥 高 | 🔥 高 |

### 1.5 适用场景

**最适合**：
- 需要长期交互的个人助手（学习用户习惯）
- 客服 Agent（从历史对话中学习最佳回复）
- 内部效率工具（积累企业特定的操作技能）

**不适合**：
- 一次性任务（学习循环的价值体现不出来）
- 对隐私要求极高的场景（需要存储历史数据）

### 1.6 面试要点

**核心卖点**：
- "第一个生产级的自我改进 Agent"
- 内置学习循环，不是简单的 prompt + tool calling
- 持久化记忆 + 技能系统 = 真正的"越用越聪明"

**技术亮点**：
- 技能文档自动生成（从成功的执行轨迹中提炼）
- 三层记忆架构（短期/长期/技能）
- 涌现能力（技能组合创造新能力）

**与 OpenClaw 的区别**：
- Hermes 强调"学习和改进"，OpenClaw 强调"自主执行复杂任务"
- Hermes 更适合长期交互场景，OpenClaw 更适合一次性复杂任务

---

## 二、OpenClaw（开源社区）

### 2.1 基本信息

**发布时间**：2025 年底 - 2026 年初  
**开发者**：开源社区（多个贡献者）  
**开源协议**：MIT License  
**核心定位**：自主 AI Agent 框架，专注于复杂任务的端到端执行

### 2.2 核心特性

**1. 自主任务执行（Autonomous Execution）**
- 给定一个高层目标，Agent 自主分解、规划、执行
- 不需要人工干预中间步骤
- 适合"软件工厂"场景（AI Software Factory）

**2. 多工具集成（Multi-Tool Integration）**
- 内置多种搜索引擎集成：
  - Brave Search
  - Firecrawl
  - Tavily
  - Perplexity
  - 自定义搜索提供商
- 支持代码执行、文件操作、API 调用等

**3. 复杂任务编排（Complex Task Orchestration）**
- 支持多步骤任务的自动编排
- 动态调整执行计划
- 错误恢复和重试机制

**4. 简单聊天界面（Simple Chat Interface）**
- 从简单的聊天输入完成复杂任务
- 降低使用门槛

### 2.3 架构设计

**核心组件**：
- **Task Planner**：任务分解和规划
- **Tool Manager**：工具注册和调用
- **Execution Engine**：任务执行引擎
- **State Manager**：状态管理和持久化

**设计理念**：
- "从聊天到执行"（From Chat to Execution）
- 最小化人工干预
- 最大化自主性

### 2.4 与其他框架的对比

| 维度 | OpenClaw | Hermes Agent | LangGraph |
|------|----------|-------------|-----------|
| 自主性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 学习能力 | ❌ 无 | ✅ 内置 | ❌ 无 |
| 任务复杂度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 工具生态 | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

### 2.5 适用场景

**最适合**：
- 软件开发自动化（代码生成、测试、部署）
- 复杂的研究任务（多步骤信息收集和分析）
- 数据处理流水线（ETL、数据清洗、分析）

**不适合**：
- 需要精确控制每一步的场景（自主性太高）
- 对安全性要求极高的场景（需要人工审批）

### 2.6 OpenClaw 的竞品

**主要竞品**：
- **NanoClaw**：轻量级版本，适合资源受限环境
- **ZeroClaw**：零配置版本，开箱即用
- **Moltis**：企业级版本，增强安全和权限控制

### 2.7 面试要点

**核心卖点**：
- "AI 软件工厂"（AI Software Factory）
- 从简单聊天到复杂任务的端到端执行
- 高度自主，最小化人工干预

**技术亮点**：
- 多搜索引擎集成（Brave/Firecrawl/Tavily/Perplexity）
- 动态任务编排和错误恢复
- 简单易用的聊天界面

**与 Hermes Agent 的区别**：
- OpenClaw 强调"一次性复杂任务的自主执行"
- Hermes 强调"长期交互中的学习和改进"
- OpenClaw 更像"任务执行器"，Hermes 更像"个人助手"

---

## 三、Hermes Agent vs OpenClaw：如何选择？

| 维度 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **核心定位** | 自我改进的个人助手 | 自主任务执行引擎 |
| **学习能力** | ✅ 内置学习循环 | ❌ 无 |
| **记忆系统** | ✅ 三层记忆 + 技能库 | ⚠️ 基础状态管理 |
| **自主性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **任务复杂度** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **长期交互** | ✅ 越用越聪明 | ❌ 每次独立 |
| **一次性任务** | ⚠️ 可以但不是强项 | ✅ 核心场景 |
| **适用场景** | 客服、个人助手、内部工具 | 软件开发、研究、数据处理 |

**选择建议**：
- 需要长期交互、学习用户习惯 → **Hermes Agent**
- 需要一次性完成复杂任务、高度自主 → **OpenClaw**
- 需要精确控制流程、企业级安全 → **LangGraph**
- 需要多 Agent 协作、编程任务 → **AutoGen**

---

## 四、2026 年 Agent 框架趋势

从 Hermes Agent 和 OpenClaw 的火爆可以看出 2026 年的趋势：

1. **自我改进成为标配**：Hermes 的学习循环证明了"越用越聪明"的价值
2. **自主性持续提升**：OpenClaw 展示了高度自主的可行性
3. **开源生态爆发**：两个框架都是开源，社区驱动创新
4. **场景化分工**：不再追求"万能框架"，而是针对特定场景优化
5. **易用性优先**：从复杂配置到简单聊天界面

---

## 五、面试中如何谈论这两个框架

**回答框架**：

1. **先说定位**：Hermes 是自我改进型，OpenClaw 是自主执行型
2. **再说核心特性**：Hermes 的学习循环 + 技能系统，OpenClaw 的高度自主 + 多工具集成
3. **对比其他框架**：与 LangGraph/AutoGen 的区别
4. **给出选型建议**：根据场景选择合适的框架
5. **提到趋势**：2026 年 Agent 框架的发展方向

**加分点**：
- 提到 Hermes 的 95.6K stars（7 周内，增长最快）
- 提到 OpenClaw 的"AI 软件工厂"定位
- 对比两者的适用场景（长期交互 vs 一次性任务）
- 提到开源生态的爆发

---

## 六、OpenClaw 架构深度解析

### 6.1 整体架构：Gateway-Centric 四层架构

OpenClaw 采用 **Gateway 中心化架构**，核心是一个长驻的 Node.js 进程。

```
┌─────────────────────────────────────────────────────┐
│  Channel Integrations（WhatsApp/Telegram/Slack/...） │
├─────────────────────────────────────────────────────┤
│  Gateway（控制平面）                                  │
│  - 消息路由、状态管理、Skill 编排、Session 管理        │
├─────────────────────────────────────────────────────┤
│  LLM Provider Abstraction（15+ 模型提供商）           │
│  - Anthropic/OpenAI/Gemini/Groq/Mistral/本地模型     │
├─────────────────────────────────────────────────────┤
│  Persistent Memory Store（本地存储）                  │
│  - 跨 Session 上下文保留和行为学习                     │
└─────────────────────────────────────────────────────┘
```

**核心设计决策**：Gateway 是 single source of truth，所有 session、credential、channel state 都由它管理。类似微服务中的 API Gateway，但同时承担编排职责。

### 6.2 消息处理：八步 Pipeline

```
Channel Adapter → Gateway Server → Session Router → Lane Queue
→ Agent Runner → LLM API → Agentic Loop → Response Path → Channel
```

**关键组件**：
- **Session Router**：识别消息属于哪个活跃会话
- **Lane Queue**：管理并发 session，防止请求碰撞
- **Agent Runner** 启动前三个并行准备：
  - Model Resolver：选择使用哪个 LLM
  - System Prompt Builder：组装 tools、skills、memory 到上下文
  - Session History Loader：加载历史对话
- **Context Window Guard**：检查上下文是否接近 token 上限，必要时压缩

### 6.3 Agentic Loop（核心差异化）

本质是一个 **ReAct Loop**，但加了 Gateway 层的策略控制：

```
LLM 返回响应
  ├→ 包含 tool call？→ 执行工具 → 结果喂回 LLM → 继续循环
  └→ 不包含 tool call？→ 响应进入交付路径 → 返回用户
```

实现了多步骤动作链，无需用户在步骤间手动提示。

### 6.4 九层 Tool Policy Engine（安全核心）

每个 tool call 经过九层顺序过滤，**每层只能收窄权限，不能扩展**：

| 层级 | 名称 | 作用 |
|------|------|------|
| 1 | Tool Profiles | 基础白名单（minimal/coding/messaging/full） |
| 2 | Provider Policy | 按模型限制 |
| 3 | Global Allow/Deny | 配置级覆盖 |
| 4 | Agent Override | 按 agent 策略 |
| 5 | Group Policy | 群聊限制 |
| 6 | Sandbox Policy | 沙箱 session 缩减工具 |
| 7 | Sub-agent Policy | 继承限制 |
| 8 | Skill Gating | 加载时资格检查 |
| 9 | Runtime Guards | Host vs Sandbox 路由决策 |

**设计原则**："只收窄不扩展"是关键 invariant，即使某一层配置错误，上层限制仍然生效。

### 6.5 Skills 系统

- 三级优先级加载：workspace 级 > 用户级（`~/.OpenClaw/skills/`）> 内置
- **Lazy-loaded descriptions**：system prompt 只注入技能名称和摘要，Agent 遇到匹配任务时才读取完整 skill 文件
- 一次只加载一个 skill，按需消耗上下文（精细的 token 预算管理）

### 6.6 四层 Memory 架构

| 层级 | 内容 | 持久性 |
|------|------|--------|
| Bootstrap Files | SOUL.md, AGENTS.md, USER.md, MEMORY.md | 每次 session 启动从磁盘重载，不受压缩影响 |
| Session Transcript | JSONL 格式存储 | 上下文满时被有损压缩 |
| LLM Context Window | 200K token 容器 | 临时，固定大小 |
| Retrieval Index | 向量 + 关键词混合搜索 | 通过 memory_search 查询历史 |

**核心原则**："if it's not written to a file, it doesn't exist"。对话中的指令在上下文压缩时会丢失，持久规则必须写入文件。

### 6.7 ClawVM：虚拟内存层

将 agent 状态视为 typed pages：

**六种页面类型**：Bootstrap/Policy、Constraint、Plan、Preference、Evidence、Conversation Segment

**四级分辨率降级**：
```
full（原文）→ compressed（token 缩减）→ structured（类型化字段）→ pointer（可解析句柄）
```

分辨率在 ingestion 时预计算，运行时通过查表决策而非实时压缩。

**Token 预算管理**：预留 output/system prompt/tool schema/safety margin 后，剩余容量分配给 paged state。两阶段选择：先安装 hard-pinned pages，再按 utility-per-token 比率贪心升级。

### 6.8 Docker Sandboxing

零信任默认：只读根文件系统、无网络访问、所有 capabilities 被 drop、非 root 用户执行。

### 6.9 关键设计决策和 Trade-offs

| 决策 | 优势 | 代价 |
|------|------|------|
| Gateway 中心化 | 统一控制、策略一致 | 单点故障、水平扩展受限 |
| 本地部署 | 数据隐私、无订阅费 | 用户需自行维护 |
| 九层 Policy Engine | 安全纵深防御 | 调试复杂、性能开销 |
| Lazy-loaded Skills | 节省 token 预算 | 首次加载延迟 |
| 文件即记忆 | 简单可靠、用户可审计 | 不如向量数据库灵活 |
| ReAct Loop 无限循环 | 高度自主 | 失控风险、token 消耗不可预测 |

---

## 七、Hermes Agent 架构深度解析

### 7.1 整体架构：单 Agent 持久运行时

所有入口（CLI、Telegram、Discord、Slack 等 16 个平台）最终收敛到同一个 `AIAgent` 类。

```
消息到达 → prompt_builder.build_system_prompt()
         → runtime_provider.resolve_runtime_provider()
         → API 调用（三种模式之一）
         → model_tools.handle_function_call()
         → 工具执行循环
         → SessionDB 持久化（SQLite + FTS5）
         → 响应路由回平台
```

**核心设计**：平台无关的核心。CLI 和 Telegram 用户共享完全相同的推理和记忆能力。

### 7.2 学习循环（Learning Loop）四大机制

**机制一：Agent-Curated Memory（周期性 Nudge）**
- 会话过程中，Agent 收到内部系统级 prompt，要求回顾并评估是否有值得持久化的信息
- 按设定间隔触发，不是每轮都触发

**机制二：自主技能创建**
- 触发条件：5 次以上工具调用的复杂任务、错误恢复、用户纠正、非显而易见的工作流发现

**机制三：技能自我改进**
- 通过 `skill_manage` 工具执行：create、patch、edit、delete、write_file、remove_file
- 偏好 patch 而非 edit（更 token-efficient 且更不容易出错）

**机制四：压缩前记忆冲刷（Memory Flush）**
- 上下文接近限制需要压缩时，先执行 memory flush
- 用合成指令让模型把重要事实写入 MEMORY.md，然后才压缩中间轮次
- 防止压缩导致的信息丢失

**性能数据**：积累 20+ 自创技能后，同领域任务完成速度提升约 40%

### 7.3 四层记忆架构

**Layer 1 — Prompt Memory（热记忆）**
- `MEMORY.md`：2,200 字符限制
- `USER.md`：1,375 字符限制
- 会话开始时冻结快照注入 system prompt，会话中不变（保证 LLM prefix cache 稳定性）

**Layer 2 — Session Search（冷回忆）**
- SQLite + FTS5 全文索引，10ms 级延迟
- 检索流程：FTS5 搜索 → 按会话分组 → 辅助模型摘要 → 返回聚焦回顾
- 支持 10K+ 文档，约 100K 文档后需切换到向量数据库

**Layer 3 — Skills（程序性记忆）**
- Markdown 文件存储在 `~/.hermes/skills/`
- 渐进式披露：system prompt 只注入技能名称和摘要（约 3K tokens），全文按需加载
- 无论有多少技能，token 消耗保持平坦

**Layer 4 — Honcho User Modeling（可选）**
- 跨 12 个身份维度被动建模
- 首轮预取注入缓存 prompt

### 7.4 技能系统（SKILL.md 格式）

遵循 agentskills.io 标准：

```yaml
---
name: my-skill
description: What this does
version: 1.0.0
platforms: [macos, linux]
metadata:
  hermes:
    tags: [python, automation]
    category: devops
    fallback_for_toolsets: [web]      # 有 web 工具时隐藏
    requires_toolsets: [terminal]     # 没有 terminal 时隐藏
---
# Skill Title
## When to Use
## Procedure
## Pitfalls
## Verification
```

**渐进式披露**：
- Level 0：`skills_list()` — 只返回元数据（约 3K tokens）
- Level 1：`skill_view(name)` — 完整内容
- Level 2：`skill_view(name, path)` — 特定参考文件

**安全扫描**：检查数据外泄、prompt 注入、破坏性命令。信任级别：`builtin` > `official` > `trusted` > `community`

### 7.5 关键设计决策和 Trade-offs

| 决策 | 理由 | Trade-off |
|------|------|-----------|
| 字符限制而非 token 限制 | Model-agnostic | 不同模型下实际 token 消耗不同 |
| 冻结 prompt 快照 | 保证 prefix cache 命中 | 会话中记忆更新要下次才生效 |
| SQLite 而非向量数据库 | 零依赖、简单部署 | 10 万文档后需要升级 |
| 渐进式技能披露 | Token 消耗与技能数量解耦 | 需要额外一次工具调用加载全文 |
| 单 Agent 而非多 Agent | 简单、可预测 | 不适合需要并行推理的场景 |

---

## 八、OpenClaw 面试题目与参考答案

### 题目 1：请介绍 OpenClaw 的整体架构

**参考答案**：

OpenClaw 采用 Gateway-Centric 四层架构。最上层是 Channel Integrations，通过模块化 adapter 对接 WhatsApp、Telegram、Slack 等平台，将消息标准化为统一格式。中间是 Gateway 控制平面，是整个系统的 single source of truth，负责消息路由、状态管理、Skill 编排和 Session 管理。下面是 LLM Provider Abstraction 层，支持 15+ 模型提供商，用户自带 API Key，模型引用统一为 provider/model 格式。最底层是 Persistent Memory Store，支持跨 Session 的上下文保留。

消息处理经过八步 Pipeline：Channel Adapter → Gateway → Session Router → Lane Queue → Agent Runner → LLM API → Agentic Loop → Response Path。其中 Agentic Loop 是核心差异化：LLM 返回响应后检查是否包含 tool call，如果是则执行工具并将结果喂回 LLM 继续循环，实现多步骤动作链。

---

### 题目 2：OpenClaw 的安全机制是怎么设计的？

**参考答案**：

OpenClaw 的安全核心是九层 Tool Policy Engine，每个 tool call 经过九层顺序过滤。关键设计原则是"只收窄不扩展"——每层只能限制权限，不能放大权限。即使某一层配置错误，上层的限制仍然生效，这是 defense-in-depth 的典型实现。

九层从上到下依次是：Tool Profiles（基础白名单）、Provider Policy（按模型限制）、Global Allow/Deny（配置级覆盖）、Agent Override、Group Policy（群聊限制）、Sandbox Policy、Sub-agent Policy（继承限制）、Skill Gating（加载时资格检查）、Runtime Guards（Host vs Sandbox 路由）。

此外，OpenClaw 默认使用 Docker Sandboxing，零信任配置：只读根文件系统、无网络访问、所有 capabilities 被 drop、非 root 用户执行。

已知风险是第三方 skills 存在数据泄露和 prompt injection 风险，Skill 仓库缺乏足够审查。这是开放生态的经典 trade-off：生态丰富性 vs 安全可控性。

---

### 题目 3：OpenClaw 的记忆系统是怎么设计的？

**参考答案**：

OpenClaw 的记忆分四层。第一层是 Bootstrap Files（SOUL.md、AGENTS.md、USER.md、MEMORY.md），每次 session 启动从磁盘重载，完全不受压缩影响，是最稳定的记忆层。第二层是 Session Transcript，用 JSONL 格式存储，上下文满时被有损压缩。第三层是 LLM Context Window，200K token 的临时容器。第四层是 Retrieval Index，通过向量 + 关键词混合搜索查询历史。

核心原则是"if it's not written to a file, it doesn't exist"。对话中的指令在上下文压缩时会丢失，持久规则必须写入文件。

更高级的是 ClawVM 虚拟内存层，将 agent 状态视为 typed pages，有六种页面类型和四级分辨率降级（full → compressed → structured → pointer）。Token 预算管理采用两阶段选择：先安装 hard-pinned pages，再按 utility-per-token 比率贪心升级。

---

### 题目 4：OpenClaw 的 Skills 系统是怎么工作的？

**参考答案**：

Skills 从三个目录按优先级加载：workspace 级 > 用户级（~/.OpenClaw/skills/）> 内置安装。加载时检查二进制可用性、环境变量、配置需求、OS 兼容性。

关键设计是 lazy-loaded descriptions：system prompt 只注入技能名称和摘要，Agent 遇到匹配任务时才读取完整 skill 文件，一次只加载一个 skill。这是对 token 预算的精细管理——无论安装了多少 skill，system prompt 的 token 消耗保持平坦。

工具按语义分组（runtime、filesystem、sessions、memory、web、UI、automation、messaging、nodes），支持声明式策略如 `deny: ["group:runtime"]` 一键禁止所有 shell 访问。

---

### 题目 5：OpenClaw 和 Hermes Agent 的架构有什么本质区别？

**参考答案**：

两者的架构差异反映了不同的设计哲学。

OpenClaw 是 Gateway-Centric 架构，Gateway 是中央控制节点，所有消息、状态、策略都由它管理。记忆以文件为核心（"if it's not written to a file, it doesn't exist"），安全靠九层 Policy Engine 纵深防御。适合一次性复杂任务的自主执行。

Hermes Agent 是单 Agent 持久运行时架构，核心是 AIAgent 类。记忆以 SQLite + FTS5 为核心，支持 10ms 级检索。最大差异是内置学习循环：通过周期性 Nudge、自主技能创建、技能自我改进、压缩前记忆冲刷四个机制，实现"越用越聪明"。适合长期交互场景。

关键 trade-off 对比：
- OpenClaw 选择 Gateway 中心化（统一控制但有单点故障），Hermes 选择单 Agent 运行时（简单但不支持并行推理）
- OpenClaw 选择文件即记忆（简单可审计但搜索能力有限），Hermes 选择 SQLite + FTS5（检索快但 10 万文档后需升级）
- OpenClaw 没有学习能力，Hermes 有学习循环但技能不跨领域迁移

---

### 题目 6：如果让你选型，什么场景用 OpenClaw，什么场景用 Hermes？

**参考答案**：

选型的核心判断维度是"任务是一次性的还是长期重复的"。

选 OpenClaw 的场景：
- 软件开发自动化（代码生成、测试、部署）：任务复杂但每次独立
- 研究任务（多步骤信息收集和分析）：需要高度自主
- 数据处理流水线：需要多工具编排

选 Hermes Agent 的场景：
- 企业客服：从历史对话中学习最佳回复，越用越准
- 个人助手：学习用户习惯和偏好
- 内部效率工具：积累企业特定的操作技能

不选 OpenClaw 的场景：
- 需要精确控制每一步（自主性太高，失控风险）
- 对安全性要求极高（九层 Policy 虽然强，但第三方 skill 有注入风险）

不选 Hermes 的场景：
- 一次性任务（学习循环的价值体现不出来）
- 需要并行推理（单 Agent 架构不支持）
- 数据量超过 10 万文档（SQLite 需要升级）

---

## 九、深度追问：自问自答

### Q1：OpenClaw 的 Agentic Loop 和普通的 ReAct 有什么区别？

**A**：本质都是 Thought → Action → Observation 的循环，但 OpenClaw 在 ReAct 外面套了一层 Gateway 策略控制。

区别在三点：

第一，**并发控制**。普通 ReAct 是单线程循环，OpenClaw 通过 Lane Queue 管理多个并发 session，防止请求碰撞，保持上下文一致性。

第二，**安全过滤**。普通 ReAct 的 Action 直接执行工具，OpenClaw 的每个 tool call 要经过九层 Policy Engine 过滤，只收窄不扩展。

第三，**上下文管理**。普通 ReAct 不管 token 预算，OpenClaw 有 Context Window Guard，接近上限时自动压缩，并且 Agent Runner 启动前会并行做三件事：选模型、组装 prompt、加载历史。

---

### Q2：OpenClaw 的九层 Policy Engine，为什么设计成"只收窄不扩展"？

**A**：这是 defense-in-depth 的核心 invariant。

假设第 4 层 Agent Override 配置错误，给了 Agent 过多权限。如果允许"扩展"，这个错误会覆盖上面三层的限制，导致安全漏洞。但"只收窄不扩展"意味着第 1-3 层的限制永远生效，第 4 层最多只能在第 3 层的基础上进一步收窄。

这和网络安全中的防火墙规则类似：外层规则优先级最高，内层只能在外层允许的范围内进一步限制。

实际效果是：即使某一层配置出错，系统的安全底线不会被突破。代价是调试复杂——你需要逐层排查才能知道某个工具为什么被拒绝。

---

### Q3：OpenClaw 的 ClawVM 虚拟内存层解决了什么问题？

**A**：解决的是 **token 预算有限但 agent 状态无限增长** 的矛盾。

传统做法是上下文满了就压缩或丢弃，但这是"一刀切"——重要信息和不重要信息被同等对待。

ClawVM 的做法是把 agent 状态视为 typed pages，每种页面有不同的重要性。然后用四级分辨率降级：full → compressed → structured → pointer。关键是分辨率在写入时就预计算好了，运行时通过查表决策，不需要实时调用 LLM 压缩。

Token 预算分配采用两阶段贪心算法：先安装 hard-pinned pages（如 Bootstrap/Policy，必须保留原文），再按 utility-per-token 比率升级其他页面。这样高价值信息优先获得更高分辨率，低价值信息降级为 pointer。

本质上是把操作系统的虚拟内存管理思想搬到了 LLM 上下文管理中。

---

### Q4：Hermes Agent 的学习循环具体是怎么工作的？

**A**：学习循环不是一个独立的后台进程，而是嵌入在运行时中的四个机制。

第一个是**周期性 Nudge**。会话过程中，系统按设定间隔给 Agent 发一个内部 prompt："回顾一下刚才发生了什么，有没有值得持久化的信息？"Agent 评估后决定是否写入 MEMORY.md。

第二个是**自主技能创建**。触发条件很具体：5 次以上工具调用的复杂任务、经历错误恢复后找到可行路径、用户纠正、发现非显而易见的工作流。满足条件时，Agent 自动将执行过程提炼成 SKILL.md 文件。

第三个是**技能自我改进**。Agent 通过 skill_manage 工具对已有技能做 patch（偏好 patch 而非 edit，因为更 token-efficient 且不容易出错）。

第四个是**压缩前记忆冲刷**。上下文接近限制需要压缩时，先用合成指令让模型把重要事实写入 MEMORY.md，然后才压缩中间轮次。这防止了压缩导致的信息丢失。

实际效果：积累 20+ 自创技能后，同领域任务完成速度提升约 40%。但技能不跨领域迁移，这是当前的局限。

---

### Q5：Hermes 为什么选择 SQLite 而不是向量数据库做记忆存储？

**A**：核心原因是**零依赖部署**。

Hermes 的定位是个人助手，用户可能在本地笔记本上运行。如果依赖 Milvus 或 Qdrant，用户还需要额外部署向量数据库服务，这大大提高了使用门槛。

SQLite 是嵌入式数据库，不需要额外进程，一个文件就是一个数据库。配合 FTS5 全文索引，可以做到 10ms 级检索延迟，支持 10K+ 文档，对个人助手场景完全够用。

Trade-off 是：SQLite + FTS5 只支持关键词检索，不支持语义检索。"如何部署 K8s"和"Kubernetes 部署教程"在关键词层面匹配不上，但在向量空间中是相近的。所以当文档量超过约 10 万时，需要升级到向量数据库。

Hermes 的策略是"先简单后复杂"：默认用 SQLite 满足 90% 的场景，高级用户可以自行切换到向量数据库。

---

### Q6：如果你来设计一个 Agent 框架，你会借鉴 OpenClaw 和 Hermes 的哪些设计？

**A**：我会从两者各取最有价值的设计。

从 OpenClaw 借鉴三点：
1. **九层 Policy Engine 的"只收窄不扩展"原则**。安全是 Agent 落地的最大阻力，纵深防御比单点防御可靠得多。
2. **ClawVM 的分辨率降级思想**。token 预算管理是所有 Agent 框架的共同痛点，按页面类型和重要性分级管理比一刀切压缩更精细。
3. **Lazy-loaded Skills**。无论安装多少技能，system prompt 的 token 消耗保持平坦，这个设计非常优雅。

从 Hermes 借鉴三点：
1. **学习循环**。"越用越聪明"是 Agent 产品的核心竞争力，Hermes 的四个机制（Nudge、自主技能创建、技能改进、压缩前冲刷）是目前最完整的实现。
2. **冻结 prompt 快照**。会话开始时冻结 system prompt，保证 LLM prefix cache 命中率，这对性能和成本都有显著影响。
3. **渐进式技能披露**。Level 0 只返回元数据，Level 1 返回全文，Level 2 返回参考文件，按需加载而非全量注入。

如果要做一个生产级框架，我会用 OpenClaw 的安全架构 + Hermes 的学习循环，再加上 Workflow + Agent 混合编排（外层 Workflow 保稳定，内层 Agent 做探索）。

---

**参考来源**：
- [Hermes Agent: the self-improving agent](https://arunbaby.com/ai-agents/0083-hermes-agent-self-improving-ai-agents/)
- [What is Hermes Agent? Definition, features, and how it works](https://www.hostinger.com/tutorials/what-is-hermes-agent)
- [Hermes Agent Review: 95.6K Stars](https://tokenmix.ai/blog/hermes-agent-review-self-improving-open-source-2026)
- [OpenClaw in 2026: AI Software Factory](https://popularaitools.ai/blog/openclaw-ai-agent-software-factory-2026)
- [What Is OpenClaw? Open-Source AI Agent Framework](https://www.gate.com/learn/articles/what-is-openclaw-exploring-the-explosive-open-source-ai-agent-framework-and-autonomous-agent-ecosystem-in-2026/16995)
- [What Is Hermes Agent? The OpenClaw Alternative](https://www.mindstudio.ai/blog/what-is-hermes-agent-openclaw-alternative)
- [OpenClaw Architecture Deep Dive - Collabnix](https://collabnix.com/openclaw-architecture-deep-dive-how-it-works-under-the-hood/)
- [Inside OpenClaw: Agent System Deep Dive](https://avasdream.com/blog/openclaw-agent-system-deep-dive)
- [How a Self-Improving AI Agent Actually Works](https://mranand.substack.com/p/inside-hermes-agent-how-a-self-improving)
- [Hermes Agent Developer Guide](https://lushbinary.com/blog/hermes-agent-developer-guide-setup-skills-self-improving-ai/)

---

**最后更新**：2026-05-02
