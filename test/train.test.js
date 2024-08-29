const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.json());
const trainRoutes = require('../routes/routes');
app.use('/trains', trainRoutes);

const mongoURI = process.env.MONGODB_URI;

beforeAll(async () => { 
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected");
});

afterAll(async () => { 
    
    await mongoose.connection.db.collection('trains').deleteMany({ trainNumber: '12345' });
    await mongoose.connection.close();
    console.log('Database connection closed');
});

describe('Train API', () => {

    describe('POST /trains', () => {
        it('should create a new train', async () => {
            const response = await request(app)
                .post('/trains')
                .send({
                    trainNumber: '67890',
                    trainName: 'Express Train'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('trainNumber', '67890');
            expect(response.body).toHaveProperty('trainName', 'Express Train');
        });

        it('should return error if train with same number exists', async () => {
            await request(app)
                .post('/trains')
                .send({
                    trainNumber: '67890',
                    trainName: 'Another Train'
                });

            const response = await request(app)
                .post('/trains')
                .send({
                    trainNumber: '67890',
                    trainName: 'Express Train'
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Train with this number already exists.');
        });
    });

    describe('GET /trains', () => {
        it('should retrieve all trains', async () => {
            await request(app)
                .post('/trains')
                .send({
                    trainNumber: '11223',
                    trainName: 'Local Train'
                });

            const response = await request(app)
                .get('/trains');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('trainNumber', '11223');
            expect(response.body[0]).toHaveProperty('trainName', 'Local Train');
        });
    });

});
