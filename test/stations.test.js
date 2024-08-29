const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


app.use(express.json());
const stationRoutes = require('../routes/routes');
app.use('/trains', stationRoutes); 


const mongoURI = process.env.MONGODB_URI;

beforeAll(async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connected");
});

afterAll(async () => {
   
    
    await mongoose.connection.close();
    console.log('Database connection closed');
});

describe('Station API', () => {

    describe('POST /trains/Stations', () => {
        it('should create a new station', async () => {
            const response = await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S001',
                    stationName: 'Main Station',
                    coordinates: [40.7128, -74.0060] 
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('stationNumber', 'S001');
            expect(response.body).toHaveProperty('stationName', 'Main Station');
        });

        it('should return error if station with same number exists', async () => {
            await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S002',
                    stationName: 'Secondary Station',
                    coordinates: [34.0522, -118.2437]
                });

            const response = await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S002',
                    stationName: 'Another Station',
                    coordinates: [34.0522, -118.2437]
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Station with this number already exists.');
        });

        it('should return error if station with same name exists', async () => {
            await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S003',
                    stationName: 'Unique Station',
                    coordinates: [37.7749, -122.4194]
                });

            const response = await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S004',
                    stationName: 'Unique Station',
                    coordinates: [37.7749, -122.4194]
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Station with this name already exists.');
        });
    });

    describe('GET /trains/Stations', () => {
        it('should retrieve all stations', async () => {
            await request(app)
                .post('/trains/Stations')
                .send({
                    stationNumber: 'S005',
                    stationName: 'Test Station',
                    coordinates: [51.5074, -0.1278]
                });

            const response = await request(app)
                .get('/trains/Stations');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('stationNumber', 'S005');
            expect(response.body[0]).toHaveProperty('stationName', 'Test Station');
        });
    });

});
