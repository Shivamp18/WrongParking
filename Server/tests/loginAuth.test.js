
import request from "supertest";
import app from "../app";

describe("POST /api/login", () => {
  it("logs in user with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        mobile: "+911234567890",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
