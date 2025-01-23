import { Express } from "express";
import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import userModel from "../models/userModel";
let app: Express;

beforeAll(async () => {
    app = await initApp();
    await userModel.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

type UserInfo = {
    _id?: string;
    email: string;
    password: string;
    token?: string;
};

const userInfo: UserInfo = {
    email: "itay.f@gmail.com",
    password: "top_secret"
}

describe("Auth Tests", () => {
    test("Auth Registration", async () => {
        const response = await request(app).post("/auth/register").send(userInfo);
        expect(response.statusCode).toBe(200);
    });

    test("Auth Registration Fail missing password", async () => {
        const response = await request(app).post("/auth/register").send({ email: "itay.f@gmail.com" });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("missing email or password");
    });

    test("Auth Registration Fail missing email", async () => {
        const response = await request(app).post("/auth/register").send({ password: "11111" });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("missing email or password");
    });


    test("Auth Login", async () => {
        const response = await request(app).post("/auth/login").send(userInfo);
        expect(response.statusCode).toBe(200);

        const token = response.body.token;
        expect(token).toBeDefined();

        const userId = response.body._id;
        expect(userId).toBeDefined();

        userInfo.token = token;
        userInfo._id = userId;
    });

    test("Get protected API", async () => {
        const response = await request(app).post("/comments").send({
            owner: userInfo._id,
            message: "comment 1",
            postId: "123"
        });
        expect(response.statusCode).not.toBe(201);

        const secondResponse = await request(app).post("/comments").set({
            authorization: 'jwt ' + userInfo.token
        }).send({
            owner: userInfo._id,
            message: "comment 2",
            postId: "123"
        });
        console.log(secondResponse.text);

        expect(secondResponse.statusCode).toBe(201);
    });
});