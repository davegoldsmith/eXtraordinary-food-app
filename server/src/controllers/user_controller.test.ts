
import * as userService from "../services/user_service";
import request from "supertest";
import { app } from "../app";
import { User } from "../models/user";
import bcrypt from "bcrypt";

jest.mock("../services/users");

const getHashPassword = (password: string) => {
  const saltRounds = 8;
  return bcrypt.hashSync(password, saltRounds);
}

const dummyUserData = [
  {
    user_id: 1,
    password: getHashPassword("easy-peasy-password4"),
    email: "bob.monkhouse@yourmail.com",
    user_name: "bob_monkhouse",
    api_hash: "jhhkljjlk",
    first_name: "bob",
    last_name: "monkhouse",
  },
];

afterEach(() => {
	jest.clearAllMocks();
});


describe("POST /api/v1/user endpoint", () => {
	test("status code successfully 201 for registering a new user", async () => {
		// Act
		const res = await request(app)
			.post("/api/v1/user")
			.send({ email: "john.smith@email.com", password: "myPassword", first_name: "John", second_name: "Smith" });

		// Assert
		expect(res.statusCode).toEqual(201);
	});

	test("status code 400 when creating user with existing email", async () => {
		// Arrange - we can enforce throwing an exception by mocking the implementation
		jest.spyOn(userService, "createUser").mockImplementation(() => {
			throw new Error("Error creating user");
		});

		// Act
		const res = await request(app)
			.post("/api/v1/user")
			.send({ email: "john.smith@email.com", password:"newone", first_name: "John", second_name: "Smith" }); 

		// Assert
		expect(res.statusCode).toEqual(400);
		expect(res.body.message).toEqual("Error creating user");
	});
});

describe("GET /api/v1/user endpoint", () => {
	test("status code successfully 200 when user exists and given password is valid", async () => {
		// Arrange
		jest
			.spyOn(userService, "getUser")
			.mockResolvedValue(dummyUserData[0] as User);

		// Act
		const res = await request(app)
      .get("/api/v1/user")
      .query({email: "bob.monkhouse@yourmail.com", password: "easy-peasy-password4"});

		// Assert
		expect(res.statusCode).toEqual(200);
	});


  test("status code 401 when user exists and given password is invalid", async () => {
    // Arrange
    jest
      .spyOn(userService, "getUser")
      .mockResolvedValue(dummyUserData[0] as User);

    // Act
    const res = await request(app)
      .get("/api/v1/user")
      .query({email: "bob.monkhouse@yourmail.com", password: "incorrect password"});

    // Assert
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Unauthorised user");
  });

  test("status code 400 when user is not found", async () => {
    // Arrange
    jest
      .spyOn(userService, "getUser")
      .mockResolvedValue(null as unknown as User);

    // Act
    const res = await request(app)
      .get("/api/v1/user")
      .query({email: "fred.flintstone@yourmail.com", password: "password"});

    // Assert
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual("User not found");
  });  
});  
