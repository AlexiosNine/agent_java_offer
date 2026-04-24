# Agent Offer Web - Docker 部署

## 快速启动

```bash
# 启动所有服务（LightRAG + Web）
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

## 访问地址

- Web 应用：http://localhost:3000
- LightRAG API：http://localhost:9621

## 服务说明

### LightRAG 服务
- 端口：9621
- 挂载文档目录：`./docs/interview_prep` → `/app/docs`

### Web 服务
- 端口：3000
- 依赖：LightRAG 服务
- 环境变量：`NEXT_PUBLIC_LIGHTRAG_URL=http://lightrag:9621`

## 单独构建 Web 镜像

```bash
cd web
docker build -t agent-offer-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_LIGHTRAG_URL=http://host.docker.internal:9621 agent-offer-web
```

## 注意事项

1. 确保 LightRAG 镜像已构建或可用
2. 文档目录 `docs/interview_prep` 必须存在
3. 容器间通过 Docker 网络通信（`lightrag:9621`）
4. 宿主机访问使用 `localhost:3000` 和 `localhost:9621`
