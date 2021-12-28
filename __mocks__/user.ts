import dayjs from "dayjs";

const userMock = {
  email: "yami@ugi.com",
  firstname: "yami",
  lastname: "yugi",
  password: "password",
  birthdate: dayjs().subtract(13, "year").toDate(),
};

export default userMock;
