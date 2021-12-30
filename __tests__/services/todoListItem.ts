import { connect, disconnect, clear } from "../../db";
import TodoList, { TodoListDocument } from "../../src/models/TodoList";
import User, { UserDocument } from "../../src/models/User";
import { add, TodoListItem } from "../../src/services/todoListItem";
import userMock from "../../__mocks__/user";
import Mockdate from "mockdate";
import EmailSender from "../../src/libs/EmailSender";
import { mocked } from "jest-mock";

jest.mock("../../src/libs/EmailSender");

beforeAll(async () => connect());

afterEach(async () => {
  await clear();
  Mockdate.reset();
});

afterAll(async () => disconnect());

describe("TodoListItem Service", () => {
  let user: UserDocument;
  let todoList: TodoListDocument;

  let todoListItemMock: TodoListItem;

  beforeEach(async () => {
    user = await User.create(userMock);
    todoList = await TodoList.create({ user });
    todoListItemMock = { name: "do something", content: "some content", todoList: todoList._id };
  });

  it("should add a todoListItem", async () => {
    const todoListItem = await add(todoListItemMock);

    expect(todoListItem.todoList).toStrictEqual(todoList._id);
  });

  it("should throw if the todoListId is not valid", async () => {
    await expect(add({ ...todoListItemMock, todoList: "" })).rejects.toThrowError(
      "Wrong syntax for provided id"
    );
  });

  it("should throw if the todoList don't exists", async () => {
    await expect(
      add({ ...todoListItemMock, todoList: "61ccfcc31ef4610242051a0c" })
    ).rejects.toThrowError("No existing TodoList with provided id");
  });

  it("should throw because the name is not unique in the TodoList", async () => {
    await add(todoListItemMock);

    await expect(add(todoListItemMock)).rejects.toThrowError(
      "Already existing item with the same title in this TodoList"
    );
  });

  it("should add a todoListItem if the last addition is at least 30 minutes old", async () => {
    Mockdate.set(new Date("1998-12-10T08:00:00.000Z"));

    await add(todoListItemMock);

    Mockdate.set(new Date("1998-12-10T08:30:00.000Z"));

    const todoListItem = await add({ ...todoListItemMock, name: "do something else" });

    expect(todoListItem.todoList).toStrictEqual(todoList._id);
  });

  it("should throw if the last addition is less than 30 minutes old", async () => {
    Mockdate.set(new Date("1998-12-10T08:00:00.000Z"));

    await add(todoListItemMock);

    Mockdate.set(new Date("1998-12-10T08:29:59.000Z"));

    await expect(add({ ...todoListItemMock, name: "do something else" })).rejects.toThrowError(
      "You must wait 30 minutes before"
    );
  });

  it("should send an email to the 8th addition", async () => {
    const [mockEmailSenderInstance] = mocked(EmailSender).mock.instances;
    const mockSendEmail = mockEmailSenderInstance.sendMail;

    Mockdate.set(new Date("1998-12-10T08:00:00.000Z"));

    await add({ ...todoListItemMock, name: "1" });

    Mockdate.set(new Date("1998-12-10T08:30:00.000Z"));

    await add({ ...todoListItemMock, name: "2" });

    Mockdate.set(new Date("1998-12-10T09:00:00.000Z"));

    await add({ ...todoListItemMock, name: "3" });

    Mockdate.set(new Date("1998-12-10T09:30:00.000Z"));

    await add({ ...todoListItemMock, name: "4" });

    Mockdate.set(new Date("1998-12-10T10:00:00.000Z"));

    await add({ ...todoListItemMock, name: "5" });

    Mockdate.set(new Date("1998-12-10T10:30:00.000Z"));

    await add({ ...todoListItemMock, name: "6" });

    Mockdate.set(new Date("1998-12-10T11:00:00.000Z"));

    await add({ ...todoListItemMock, name: "7" });

    Mockdate.set(new Date("1998-12-10T11:30:00.000Z"));

    await add({ ...todoListItemMock, name: "8" });

    expect(mockSendEmail).toHaveBeenNthCalledWith(
      1,
      "todo-list",
      user.email,
      "Todo list limit",
      "You almost reach the limit of 10 items, you can only add 2 more !"
    );
  });
});
