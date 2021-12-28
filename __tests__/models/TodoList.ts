import TodoList, { TodoListDocument } from "../../src/models/TodoList";
import User from "../../src/models/User";
import userMock from "../../__mocks__/user";

describe("TodoList", () => {
  let todoList: TodoListDocument;

  const user = new User(userMock);

  beforeEach(() => {
    todoList = new TodoList({ user });
  });

  it("should be valid", async () => {
    const errors = user.validateSync();

    expect(errors).toBeUndefined();
  });
});
