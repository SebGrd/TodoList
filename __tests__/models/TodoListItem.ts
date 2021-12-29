import { Error } from "mongoose";
import TodoList from "../../src/models/TodoList";
import TodoListItem, { TodoListItemDocument } from "../../src/models/TodoListItem";
import User from "../../src/models/User";
import userMock from "../../__mocks__/user";

describe("User", () => {
  const user = new User(userMock);
  const todoList = new TodoList({ user });

  let todoListItem: TodoListItemDocument;

  beforeEach(() => {
    todoListItem = new TodoListItem({
      name: "Do something",
      content: "Do something",
      createdAt: new Date(),
      todoList,
    });
  });

  it("should be valid", async () => {
    const errors = todoListItem.validateSync();

    expect(errors).toBeUndefined();
  });

  it("should be invalid if the name is empty", async () => {
    todoListItem.name = "";

    const { errors } = todoListItem.validateSync() as Error.ValidationError;

    expect(errors.name).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the content is empty", async () => {
    todoListItem.content = "";

    const { errors } = todoListItem.validateSync() as Error.ValidationError;

    expect(errors.content).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the content is longer than 1000 characters", async () => {
    todoListItem.content = "c".repeat(1001);

    const { errors } = todoListItem.validateSync() as Error.ValidationError;

    expect(errors.content).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });
});
