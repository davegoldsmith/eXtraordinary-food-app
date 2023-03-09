import request from "supertest";
import { app } from "../app";

describe("Test home API endpoint request", () => {
  test("GET should return correct message", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("The eXtraordinary meal planner is alive and well!");
  });
});
