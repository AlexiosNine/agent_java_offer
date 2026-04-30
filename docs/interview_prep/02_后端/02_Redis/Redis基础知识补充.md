# Redis 基础知识补充

**补充时间**：2026-04-29  
**目的**：补充 Redis 原理、命令、数据结构等基础知识，不只是项目实战

---

## 一、Redis 基础概念

### 1.1 Redis 是什么

Redis（Remote Dictionary Server）是一个开源的、基于内存的键值存储系统，可以用作：
- 数据库
- 缓存
- 消息队列

**核心特点**：
- 基于内存，读写速度极快（10万+ QPS）
- 支持多种数据结构
- 支持持久化（RDB/AOF）
- 支持主从复制、哨兵、集群
- 单线程模型（6.0 后引入多线程 I/O）

---

### 1.2 Redis 单线程模型

**为什么是单线程？**
- Redis 的瓶颈不在 CPU，而在内存和网络 I/O
- 单线程避免了线程切换和锁竞争的开销
- 简化了实现，避免了并发问题

**单线程如何处理高并发？**
- I/O 多路复用（epoll/select/kqueue）
- 一个线程监听所有客户端连接
- 哪个连接有数据就处理哪个
- 事件驱动模型（Reactor 模式）

**Redis 6.0 的多线程**：
- 只是多线程处理网络 I/O（读写 socket）
- 命令执行仍然是单线程
- 目的是提升网络 I/O 性能

---

## 二、Redis 五大基础数据类型

### 2.1 String（字符串）

**底层实现**：SDS（Simple Dynamic String）

**常用命令**：
```bash
SET key value [EX seconds] [NX|XX]  # 设置值
GET key                              # 获取值
INCR key                             # 自增
DECR key                             # 自减
APPEND key value                     # 追加
STRLEN key                           # 获取长度
SETEX key seconds value              # 设置值并指定过期时间
SETNX key value                      # 只在 key 不存在时设置
```

**应用场景**：
- 缓存对象（JSON 序列化后存储）
- 计数器（INCR/DECR）
- 分布式锁（SETNX）
- Session 共享

**SDS 相比 C 字符串的优势**：
- O(1) 获取长度（记录了 len 字段）
- 杜绝缓冲区溢出（自动扩容）
- 减少内存重分配次数（空间预分配和惰性释放）
- 二进制安全（可以存储任意二进制数据）

---

### 2.2 List（列表）

**底层实现**：
- Redis 3.2 之前：ziplist（压缩列表）或 linkedlist（双向链表）
- Redis 3.2 之后：quicklist（ziplist 和 linkedlist 的混合）

**常用命令**：
```bash
LPUSH key value [value ...]   # 左侧插入
RPUSH key value [value ...]   # 右侧插入
LPOP key                       # 左侧弹出
RPOP key                       # 右侧弹出
LRANGE key start stop          # 获取范围内元素
LLEN key                       # 获取长度
LINDEX key index               # 获取指定索引元素
LSET key index value           # 设置指定索引元素
LTRIM key start stop           # 保留范围内元素，删除其他
BLPOP key [key ...] timeout    # 阻塞式左侧弹出
BRPOP key [key ...] timeout    # 阻塞式右侧弹出
```

**应用场景**：
- 消息队列（LPUSH + BRPOP）
- 最新列表（如微博最新动态）
- 栈（LPUSH + LPOP）
- 队列（LPUSH + RPOP）

---

### 2.3 Set（集合）

**底层实现**：
- intset（整数集合）：元素都是整数且数量不多时
- hashtable（哈希表）：其他情况

**常用命令**：
```bash
SADD key member [member ...]    # 添加元素
SREM key member [member ...]    # 删除元素
SMEMBERS key                     # 获取所有元素
SISMEMBER key member             # 判断元素是否存在
SCARD key                        # 获取元素数量
SRANDMEMBER key [count]          # 随机获取元素
SPOP key [count]                 # 随机弹出元素
SINTER key [key ...]             # 交集
SUNION key [key ...]             # 并集
SDIFF key [key ...]              # 差集
```

**应用场景**：
- 标签系统（用户标签、文章标签）
- 共同好友（SINTER）
- 抽奖系统（SRANDMEMBER/SPOP）
- 去重（天然去重）

---

### 2.4 ZSet（有序集合）

**底层实现**：
- ziplist（压缩列表）：元素数量少且元素值小时
- skiplist（跳表）+ hashtable：其他情况

**常用命令**：
```bash
ZADD key score member [score member ...]  # 添加元素
ZREM key member [member ...]              # 删除元素
ZSCORE key member                          # 获取分数
ZINCRBY key increment member               # 增加分数
ZRANK key member                           # 获取排名（升序）
ZREVRANK key member                        # 获取排名（降序）
ZRANGE key start stop [WITHSCORES]         # 获取范围（升序）
ZREVRANGE key start stop [WITHSCORES]      # 获取范围（降序）
ZRANGEBYSCORE key min max [WITHSCORES]     # 按分数范围获取
ZCARD key                                  # 获取元素数量
ZCOUNT key min max                         # 统计分数范围内元素数量
```

**应用场景**：
- 排行榜（游戏排行、热搜榜）
- 延迟队列（score 为时间戳）
- 优先级队列
- 范围查询（如查询某个分数段的用户）

**跳表原理**：
- 多层链表结构
- 最底层包含所有元素
- 上层是下层的"快速通道"
- 查询时间复杂度 O(logN)
- 相比平衡树实现更简单

---

### 2.5 Hash（哈希）

**底层实现**：
- ziplist（压缩列表）：字段数量少且值小时
- hashtable（哈希表）：其他情况

**常用命令**：
```bash
HSET key field value [field value ...]  # 设置字段
HGET key field                           # 获取字段
HMSET key field value [field value ...]  # 批量设置
HMGET key field [field ...]              # 批量获取
HGETALL key                              # 获取所有字段和值
HDEL key field [field ...]               # 删除字段
HEXISTS key field                        # 判断字段是否存在
HLEN key                                 # 获取字段数量
HINCRBY key field increment              # 字段值增加
HKEYS key                                # 获取所有字段名
HVALS key                                # 获取所有值
```

**应用场景**：
- 存储对象（用户信息、商品信息）
- 购物车（用户 ID 为 key，商品 ID 为 field，数量为 value）

**Hash vs String（JSON）**：
| 维度 | Hash | String（JSON） |
|------|------|---------------|
| 修改单个字段 | HSET，只修改一个字段 | 需要取出整个 JSON，修改后再存回 |
| 内存占用 | 字段少时用 ziplist，省内存 | 整个 JSON 字符串 |
| 查询单个字段 | HGET，直接获取 | 需要反序列化整个 JSON |
| 适用场景 | 字段经常单独修改 | 字段总是一起读写 |

---

## 三、Redis 三大特殊数据类型

### 3.1 HyperLogLog（基数统计）

**用途**：海量数据去重计数（如 UV 统计）

**原理**：
- 基于概率算法（LogLog 算法）
- 用极小内存（12KB）估算基数
- 标准误差约 0.81%

**常用命令**：
```bash
PFADD key element [element ...]  # 添加元素
PFCOUNT key [key ...]            # 获取基数估算值
PFMERGE destkey sourcekey [sourcekey ...]  # 合并多个 HyperLogLog
```

**应用场景**：
- 网站 UV 统计
- 独立 IP 统计
- 搜索关键词去重统计

**为什么不用 Set？**
- Set 需要存储所有元素，内存占用大
- 1 亿个用户 ID，Set 需要几个 GB，HyperLogLog 只需 12KB

---

### 3.2 Geo（地理位置）

**用途**：存储地理位置信息，支持附近查询

**底层实现**：基于 ZSet + GeoHash 编码

**常用命令**：
```bash
GEOADD key longitude latitude member [longitude latitude member ...]  # 添加位置
GEOPOS key member [member ...]           # 获取位置
GEODIST key member1 member2 [unit]       # 计算距离
GEORADIUS key longitude latitude radius unit [WITHCOORD] [WITHDIST]  # 范围查询（已废弃）
GEOSEARCH key FROMMEMBER member | FROMLONLAT longitude latitude 
          BYRADIUS radius unit | BYBOX width height unit [WITHCOORD] [WITHDIST]  # 范围查询（新版）
```

**应用场景**：
- 附近的人/店/骑手
- 打车（查找最近的司机）
- 外卖（查找附近的商家）

**GeoHash 原理**：
- 将二维经纬度编码为一维字符串
- 字符串前缀相同的位置相近
- 可以用 ZSet 的范围查询实现附近查询

---

### 3.3 Bitmap（位图）

**用途**：用 bit 位存储 0/1 状态

**底层实现**：String 类型，每个 bit 可以单独操作

**常用命令**：
```bash
SETBIT key offset value      # 设置某个 bit
GETBIT key offset            # 获取某个 bit
BITCOUNT key [start end]     # 统计 1 的数量
BITOP operation destkey key [key ...]  # 位运算（AND/OR/XOR/NOT）
```

**应用场景**：
- 用户签到（每天一个 bit，1 表示签到）
- 在线状态（1 表示在线，0 表示离线）
- 布隆过滤器的底层实现
- 统计活跃用户（BITCOUNT）

**优势**：
- 极省内存（1 亿用户的签到状态只需 12MB）
- 操作速度快

---

## 四、Redis 过期策略与内存淘汰

### 4.1 过期键删除策略

Redis 使用**惰性删除 + 定期删除**的组合策略：

**1. 惰性删除（Lazy Expiration）**
- 访问 key 时检查是否过期
- 过期则删除并返回 nil
- 优点：对 CPU 友好
- 缺点：过期 key 不被访问会一直占用内存

**2. 定期删除（Periodic Expiration）**
- 每隔一段时间（默认 100ms）随机抽取一批 key 检查
- 删除过期的 key
- 如果过期 key 比例 > 25%，继续抽取检查
- 优点：减少内存占用
- 缺点：占用 CPU

---

### 4.2 内存淘汰策略

当内存达到 maxmemory 时，Redis 会根据配置的策略淘汰数据：

**8 种淘汰策略**：

| 策略 | 说明 |
|------|------|
| noeviction | 不淘汰，写入返回错误（默认） |
| allkeys-lru | 从所有 key 中，淘汰最近最少使用的 |
| allkeys-lfu | 从所有 key 中，淘汰最不经常使用的 |
| allkeys-random | 从所有 key 中，随机淘汰 |
| volatile-lru | 从设置了过期时间的 key 中，淘汰最近最少使用的 |
| volatile-lfu | 从设置了过期时间的 key 中，淘汰最不经常使用的 |
| volatile-random | 从设置了过期时间的 key 中，随机淘汰 |
| volatile-ttl | 从设置了过期时间的 key 中，淘汰即将过期的 |

**LRU vs LFU**：
- LRU（Least Recently Used）：最近最少使用，淘汰最久没被访问的
- LFU（Least Frequently Used）：最不经常使用，淘汰访问频率最低的

**推荐配置**：
- 缓存场景：`allkeys-lru`（淘汰最久未访问的）
- 有明确过期时间的场景：`volatile-lru`

---

## 五、Redis 事务

### 5.1 事务基本命令

```bash
MULTI      # 开启事务
EXEC       # 执行事务
DISCARD    # 取消事务
WATCH key  # 监视 key，如果 key 被修改则事务失败
UNWATCH    # 取消监视
```

### 5.2 Redis 事务特性

**Redis 事务不是传统的 ACID 事务**：

| 特性 | Redis 事务 | 传统数据库事务 |
|------|-----------|--------------|
| 原子性 | 部分支持 | 完全支持 |
| 一致性 | 不保证 | 保证 |
| 隔离性 | 保证（单线程） | 保证 |
| 持久性 | 取决于持久化配置 | 保证 |

**Redis 事务的原子性**：
- 命令入队阶段出错（语法错误）：整个事务不执行 ✅
- 命令执行阶段出错（类型错误）：错误命令不执行，其他命令继续 ❌

**Redis 不支持回滚**：
- 设计哲学：Redis 命令只会因为语法错误失败，这种错误应该在开发阶段发现
- 不支持回滚可以保持简单和快速

### 5.3 WATCH 实现乐观锁

```bash
WATCH balance  # 监视 balance
MULTI
DECRBY balance 100
EXEC  # 如果 balance 在 WATCH 后被修改，EXEC 返回 nil
```

---

## 六、Redis 发布订阅

### 6.1 基本命令

```bash
SUBSCRIBE channel [channel ...]    # 订阅频道
UNSUBSCRIBE [channel ...]          # 取消订阅
PUBLISH channel message            # 发布消息
PSUBSCRIBE pattern [pattern ...]   # 订阅模式（支持通配符）
PUNSUBSCRIBE [pattern ...]         # 取消订阅模式
```

### 6.2 特点

**优点**：
- 实现简单
- 支持多个订阅者
- 支持模式匹配

**缺点**：
- 消息不持久化（订阅者离线时消息丢失）
- 没有 ACK 机制
- 不支持消息回溯

**适用场景**：
- 实时消息推送（聊天室、弹幕）
- 配置更新通知
- 不要求可靠性的场景

**不适用场景**：
- 需要消息持久化
- 需要消息确认
- 需要消息回溯

---

## 七、Redis 管道（Pipeline）

### 7.1 什么是 Pipeline

**问题**：
- 每个 Redis 命令都需要一次网络往返（RTT）
- 100 个命令需要 100 次 RTT

**Pipeline 解决方案**：
- 将多个命令打包一次发送
- Redis 依次执行后，一次性返回所有结果
- 100 个命令只需要 1 次 RTT

### 7.2 Pipeline vs 事务

| 维度 | Pipeline | 事务（MULTI/EXEC） |
|------|----------|-------------------|
| 目的 | 减少 RTT，提升性能 | 保证原子性 |
| 原子性 | 不保证 | 部分保证 |
| 是否打包发送 | 是 | 是 |
| 是否原子执行 | 否（可能被其他命令插入） | 是（单线程顺序执行） |

### 7.3 使用场景

- 批量操作（如批量设置缓存）
- 对原子性无要求
- 追求性能

---

## 八、Redis 常用配置

```bash
# 内存配置
maxmemory 2gb                    # 最大内存
maxmemory-policy allkeys-lru     # 内存淘汰策略

# 持久化配置
save 900 1                       # 900 秒内至少 1 次写操作则触发 RDB
save 300 10
save 60 10000
appendonly yes                   # 开启 AOF
appendfsync everysec             # AOF 同步策略

# 网络配置
bind 127.0.0.1                   # 绑定 IP
port 6379                        # 端口
timeout 0                        # 客户端空闲超时时间（0 表示不超时）
tcp-keepalive 300                # TCP keepalive

# 安全配置
requirepass yourpassword         # 设置密码

# 慢查询配置
slowlog-log-slower-than 10000    # 慢查询阈值（微秒）
slowlog-max-len 128              # 慢查询日志最大长度
```

---

## 九、Redis 常用命令

### 9.1 通用命令

```bash
KEYS pattern           # 查找 key（生产禁用，用 SCAN 替代）
SCAN cursor [MATCH pattern] [COUNT count]  # 渐进式遍历
EXISTS key [key ...]   # 判断 key 是否存在
DEL key [key ...]      # 删除 key
UNLINK key [key ...]   # 异步删除 key（推荐）
TYPE key               # 查看 key 的类型
EXPIRE key seconds     # 设置过期时间
TTL key                # 查看剩余过期时间（-1 表示永不过期，-2 表示已过期）
PERSIST key            # 移除过期时间
RENAME key newkey      # 重命名 key
```

### 9.2 数据库命令

```bash
SELECT index           # 切换数据库（0-15）
DBSIZE                 # 查看当前数据库 key 数量
FLUSHDB                # 清空当前数据库
FLUSHALL               # 清空所有数据库
```

### 9.3 服务器命令

```bash
INFO [section]         # 查看服务器信息
CONFIG GET parameter   # 获取配置
CONFIG SET parameter value  # 设置配置
SLOWLOG GET [count]    # 查看慢查询日志
MONITOR                # 实时监控所有命令（调试用，生产禁用）
CLIENT LIST            # 查看客户端连接
```

---

**最后更新**：2026-04-29
