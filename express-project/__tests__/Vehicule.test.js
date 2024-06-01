const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Offre = require('../models/Offre');
const Vehicule = require('../models/Vehicule');
const jwt = require('jsonwebtoken');
describe('Vehicule Routes', () => {
    let vehiculeId1,vehiculeId2;

    beforeEach(async () => {
        const testVehicule = await Vehicule.create({
            proprietaire: "665a8810075d8bf66cfdff78",
            marque: 'Toyota',
            model: 'Corolla',
            places: 5
        });
        const testVehicule2 = await Vehicule.create({
            proprietaire: "665a8810075d8bf66cfdff78",
            marque: 'Mercedes',
            model: 'Benz',
            places: 8
        });
        const user  = new User({
                "_id": "665a8810075d8bf66cfdff78",
                "firstname" : "Seif Eddine",
                "lastname": "Jridi",
                "email": "jridisayf@gmail.com",
                "password": "$2b$10$qHjwhInbqTJY0e4sZdT/p.ejVi4wS44zDCy9cQXQfLCGut1FSFIl6",
                "phone": 12345678,
                "role": "DEFAULT",
                "status": "APPROVED",
                "ville": "tunis",
              }
        ) 
        await user.save();
        vehiculeId1 = testVehicule._id;
        vehiculeId2 = testVehicule2._id
    });

    afterAll(async () => {
    });

    it('should get all Vehicules', async () => {
        const res = await request(app)
          .get('/vehicules')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
          ;

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });

    it('should filter By Model', async () => {
        const res = await request(app)
          .get('/vehicules?model=Benz')
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
          ;

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].model).toBe("Benz")
        expect(res.body[0]._id).toBe(vehiculeId2.toString())
    });


    it('should get one Vehicule by ID', async () => {
        const res = await request(app)
               .get(`/vehicules/${vehiculeId1}`)
               .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
         ;

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.marque).toBe('Toyota');
    });

    it('should update a Vehicule', async () => {
        const updatedData = {
            marque: 'Honda',
            model: 'Accord',
            places: 4
        };

        const res = await request(app)
            .patch(`/vehicules/${vehiculeId1}`)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
            .send(updatedData);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.marque).toBe('Honda');
        expect(res.body.places).toBe(4);
    });

    it('should delete a Vehicule', async () => {
        const res = await request(app)
            .delete(`/vehicules/${vehiculeId1}`)
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
            ;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Vehicule deleted');
    });
});