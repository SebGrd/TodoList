import dayjs from "dayjs";
import { Error } from "mongoose";
import User, { UserDocument } from "../../src/models/User";
import userMock from "../../__mocks__/user";

describe("User", () => {
  let user: UserDocument;

  beforeEach(() => {
    user = new User(userMock);
  });

  it("should be valid", async () => {
    const errors = user.validateSync();

    expect(errors).toBeUndefined();
  });

  it("should be invalid if the email is empty", async () => {
    user.email = "";

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.email).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the firstname is empty", async () => {
    user.firstname = "";

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.firstname).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the lastname is empty", async () => {
    user.lastname = "";

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.lastname).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the password has less than 8 characters.", async () => {
    user.password = "p";

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.password).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the password is longer than 40 characters", async () => {
    user.password = "p".repeat(41);

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.password).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });

  it("should be invalid if the user is less than 13", async () => {
    user.birthdate = dayjs().subtract(12, "year").toDate();

    const { errors } = user.validateSync() as Error.ValidationError;

    expect(errors.birthdate).toBeInstanceOf(Error.ValidationError.ValidatorError);
  });
});
