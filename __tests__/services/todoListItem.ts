import { connect, disconnect, clear } from "../../db";
import TodoList, { TodoListDocument } from "../../src/models/TodoList";
import User, { UserDocument } from "../../src/models/User";
import { add } from "../../src/services/todoListItem";
import userMock from "../../__mocks__/user";

beforeAll(async () => connect());

afterEach(async () => clear());

afterAll(async () => disconnect());

describe("TodoListItem Service", () => {
  let user: UserDocument;
  let todoList: TodoListDocument;

  beforeEach(async () => {
    user = await User.create(userMock);
    todoList = await TodoList.create({ user });
  });

  it("should add a todoListItem", async () => {
    const todoListItem = await add({
      name: "do something",
      content: "do something",
      todoList: todoList._id,
    });

    expect(todoListItem.todoList).toStrictEqual(todoList._id);
  });
});
