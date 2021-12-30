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

Run the container in detached mode

```bash
docker run --name todo-list -itd todo-list
```

## Run tests

```bash
docker exec -it todo-list npm run test
```
