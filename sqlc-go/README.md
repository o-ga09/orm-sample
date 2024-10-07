# How to use sqlc

## Install

```bash:MacOS
brew install sqlc
```

```bash:Linux
sudo snap install sqlc
```

```bash:Go Install
brew install sqlc
```

## Getting started with MySQL

### For Golang

1. Goプロジェクトの設定

```bash
go mod init github.com/o-ga09/orm-sample
touch main.go
touch sqlc.yaml
touch query.sql
touch schema.sql
```

2. コード生成

```bash
sqlc generate
```

3. 生成されたORMのメソッドを使用する

### For TypeScript