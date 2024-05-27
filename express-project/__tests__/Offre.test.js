const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Offre = require('../models/Offre');
const Vehicule = require('../models/Vehicule');

describe('Offre routes', () => {
  let user, vehicule;
  const randomId = "4eb6e7e7e9b7f4194e000001";
  beforeAll(async () => {
    user = new User({
      _id: '605c72d7c9875e0015e7f5e3',
      pseudo: 'testuser',
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'Password12345678.',
      phone: 1234567890,
    });
    await user.save();
  
    vehicule = new Vehicule({
      _id: '605c72d7c9875e0015e7f5e4',
      proprietaire: '605c72d7c9875e0015e7f5e3',
      marque: 'Toyota',
      model: 'Corolla',
      places: 4,
    });
    await vehicule.save();
  
    await Offre.create([
      {
        expediteur: '605c72d7c9875e0015e7f5e3',
        titre: 'Road Trip',
        lieu_depart: 'New York',
        lieu_arrive: 'Boston',
        heure_depart: new Date('2024-12-01T10:00:00Z'),
        type: 'Co-Voiturage',
        vehicule: '605c72d7c9875e0015e7f5e4',
      },
      {
        expediteur: '605c72d7c9875e0015e7f5e3',
        titre: 'Business Trip',
        lieu_depart: 'Los Angeles',
        lieu_arrive: 'San Francisco',
        heure_depart: new Date('2024-11-01T10:00:00Z'),
        type: 'Taxi',
        vehicule: '605c72d7c9875e0015e7f5e4',
      },
    ]);
  });

  it('should return 400 if expediteur is not a valid ObjectId', async () => {
    const response = await request(app)
      .post('/offres')
      .send({
        expediteur: 'invalidUserId',
        titre: 'Trip',
        lieu_depart: 'New York',
        lieu_arrive: 'Los Angeles',
        heure_depart: new Date(Date.now() + 10000).toISOString(),
        type: 'Co-Voiturage',
        vehicule: vehicule._id
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      expect.objectContaining({
        msg: 'Expediteur must be a valid ObjectId'
      })
    ]);
  });

  it('should return 400 if title is too short', async () => {
    const response = await request(app)
      .post('/offres')
      .send({
        expediteur: user._id,
        titre: 'Tr',
        lieu_depart: 'New York',
        lieu_arrive: 'Los Angeles',
        heure_depart: new Date(Date.now() + 10000).toISOString(),
        type: 'Co-Voiturage',
        vehicule: vehicule._id
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      expect.objectContaining({
        msg: 'Title must be at least 3 characters long'
      })
    ]);
  });

  it('should return 201 if all fields are valid', async () => {
    const response = await request(app)
      .post('/offres')
      .send({
        expediteur: user._id,
        titre: 'Trip',
        lieu_depart: 'New York',
        lieu_arrive: 'Los Angeles',
        heure_depart: new Date(Date.now() + 10000).toISOString(),
        type: 'Co-Voiturage',
        vehicule: vehicule._id
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should return Error if the User Does Not Exist', async () => {
    const response = await request(app)
      .post('/offres')
      .send({
        expediteur: randomId ,
        titre: 'Trip',
        lieu_depart: 'New York',
        lieu_arrive: 'Los Angeles',
        heure_depart: new Date(Date.now() + 10000).toISOString(),
        type: 'Co-Voiturage',
        vehicule: vehicule._id
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      expect.objectContaining({
        msg: 'Expediteur must be a valid ObjectId',
        type: "field"
      })])
  });

  it('should return 404 If The Offer Does Not Exist', async () => {
    const response = await request(app)
      .get(`/offres/${randomId}`)
    expect(response.status).toBe(404);
  });

  it('should get all offers', async () => {
    const res = await request(app).get('/offres');
    expect(res.status).toBe(200);
    console.log(res.body);
   // expect(res.body.length).toBe(2);
  });

  // it('should filter offers by expediteur', async () => {
  //   const res = await request(app).get('/offres').query({ expediteur: '605c72d7c9875e0015e7f5e3' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(2);
  // });

  // it('should filter offers by titre', async () => {
  //   const res = await request(app).get('/offres').query({ titre: 'Road' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(1);
  //   expect(res.body[0].titre).toBe('Road Trip');
  // });

  // it('should filter offers by lieu_depart', async () => {
  //   const res = await request(app).get('/offres').query({ lieu_depart: 'New York' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(1);
  //   expect(res.body[0].lieu_depart).toBe('New York');
  // });

  // it('should filter offers by heure_depart', async () => {
  //   const res = await request(app).get('/offres').query({ heure_depart: '2024-11-01T10:00:00Z' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(1);
  //   expect(new Date(res.body[0].heure_depart).toISOString()).toBe('2024-11-01T10:00:00.000Z');
  // });

  // it('should filter offers by type', async () => {
  //   const res = await request(app).get('/offres').query({ type: 'Taxi' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(1);
  //   expect(res.body[0].type).toBe('Taxi');
  // });

  // it('should filter offers by vehicule', async () => {
  //   const res = await request(app).get('/offres').query({ vehicule: '605c72d7c9875e0015e7f5e4' });
  //   expect(res.status).toBe(200);
  //   expect(res.body.length).toBe(2);
  // });
});
