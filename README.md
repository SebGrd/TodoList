# Description

This project is a simple todo list

## Getting started

```bash
git clone git@github.com:SebGrd/TodoList.git
```

Build the image

```bash
docker build -t todo-list .
```

Run the container

```bash
docker run --name todo-list -it todo-list
```

## Run tests

```bash
docker exec todo-list npm run test
```
