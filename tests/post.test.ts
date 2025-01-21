import request from 'supertest';
import mongoose from 'mongoose';
import postsArray from './posts.json';
import { Express } from 'express';
import initApp from '../server';
import postModel, { IPost } from '../models/postModel';

let app: Express;

const testPosts: IPost[] = postsArray;
const baseUrl = '/posts';

beforeAll(async () => {
    app = await initApp();
    await postModel.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Posts Test', () => {
    test('Test get all posts - no results', async () => {
        const response = await request(app).get(baseUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test('Test create new post', async () => {
        for (let post of testPosts) {
            const response = await request(app).post(baseUrl).send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe(post.message);
            expect(response.body.owner).toBe(post.owner);
            post._id = response.body._id;
        }

        const response = await request(app).get(baseUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
        test('Test create new post', async () => {
            for (let post of testPosts) {
                const response = await request(app).post(baseUrl).send(post);
                expect(response.statusCode).toBe(201);
                expect(response.body.message).toBe(post.message);
                expect(response.body.owner).toBe(post.owner);
                post._id = response.body._id;
            }
        
            const response = await request(app).get(baseUrl);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(testPosts.length);
        });
        
        test('Test get all posts after creation', async () => {
            const response = await request(app).get(baseUrl);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(testPosts.length);
        });
        
        test('Test get post by id', async () => {
            const response = await request(app).get(baseUrl + '/' + testPosts[0]._id);
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toBe(testPosts[0]._id);
        });
        
        test('Test filter posts by owner', async () => {
            const response = await request(app).get(baseUrl + '?owner=' + testPosts[0].owner);
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
        });
        
        test('Test update post', async () => {
            const updatedPost = { ...testPosts[0], message: 'Updated message' };
            const response = await request(app).put(baseUrl + '/' + testPosts[0]._id).send(updatedPost);
            expect(response.statusCode).toBe(200);
        
            const responseGet = await request(app).get(baseUrl + '/' + testPosts[0]._id);
            expect(responseGet.statusCode).toBe(200);
            expect(responseGet.body.message).toBe('Updated message');
        });
        
        test('Test delete post', async () => {
            const response = await request(app).delete(baseUrl + '/' + testPosts[0]._id);
            expect(response.statusCode).toBe(200);
        
            const responseGet = await request(app).get(baseUrl + '/' + testPosts[0]._id);
            expect(responseGet.statusCode).toBe(404);
        });
        
        test('Test update post when item not found', async () => {
            const updatedPost = { ...testPosts[0], message: 'Updated message' };
            const nonExistentId = new mongoose.Types.ObjectId().toHexString();
            const response = await request(app).put(baseUrl + '/' + nonExistentId).send(updatedPost);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBe('Item not found');
        });
        
        test('Test delete post with invalid id', async () => {
            const response = await request(app).delete(baseUrl + '/invalidId');
            expect(response.statusCode).toBe(400);
        });
        
        test('Test delete post when item not found', async () => {
            const nonExistentId = new mongoose.Types.ObjectId().toHexString();
            const response = await request(app).delete(baseUrl + '/' + nonExistentId);
            expect(response.statusCode).toBe(404);
            expect(response.text).toBe('Item not found');
        });
    });

    test('Test get all posts after creation', async () => {
        const response = await request(app).get(baseUrl);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    });

    test('Test get post by id', async () => {
        const response = await request(app).get(baseUrl + '/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
    });

    test('Test filter posts by owner', async () => {
        const response = await request(app).get(baseUrl + '?owner=' + testPosts[0].owner);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });

    test('Test update post', async () => {
        const updatedPost = { ...testPosts[0], message: 'Updated message' };
        const response = await request(app).put(baseUrl + '/' + testPosts[0]._id).send(updatedPost);
        expect(response.statusCode).toBe(200);

        const responseGet = await request(app).get(baseUrl + '/' + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(200);
        expect(responseGet.body.message).toBe('Updated message');
    });

    test('Test delete post', async () => {
        const response = await request(app).delete(baseUrl + '/' + testPosts[0]._id);
        expect(response.statusCode).toBe(200);

        const responseGet = await request(app).get(baseUrl + '/' + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    });

    test('Test get post by invalid id', async () => {
        const response = await request(app).get(baseUrl + '/invalidId');
        expect(response.statusCode).toBe(400);
    });

    test('Test update post with invalid id', async () => {
        const response = await request(app).put(baseUrl + '/invalidId').send({
            message: 'Updated message',
            owner: 'Updated owner'
        });
        expect(response.statusCode).toBe(400);
    });

    test('Test update post when item not found', async () => {
        const updatedPost = { ...testPosts[0], message: 'Updated message' };
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const response = await request(app).put(baseUrl + '/' + nonExistentId).send(updatedPost);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Item not found');
    });

    test('Test delete post with invalid id', async () => {
        const response = await request(app).delete(baseUrl + '/invalidId');
        expect(response.statusCode).toBe(400);
    });

    test('Test delete post when item not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const response = await request(app).delete(baseUrl + '/' + nonExistentId);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('Item not found');
    });
});
