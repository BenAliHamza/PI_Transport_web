const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Offre = require('../models/Offre');
const Vehicule = require('../models/Vehicule');
const { ObjectId } = require('mongoose');

describe('Offre routes', () => {
  let user, vehicule;

  beforeAll(async () => {
    user = await User.create({
      pseudo: 'john_doe',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      phone: 1234567890,
      image: 'https://example.com/profile.jpg'
    });

    vehicule = await Vehicule.create({
      proprietaire: user._id,
      marque: 'Toyota',
      model: 'Corolla',
      places: 5
    });
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
        Vehicule: vehicule._id
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
        Vehicule: vehicule._id
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
        Vehicule: vehicule._id
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should return Error if the User Does Not Exist', async () => {
    const randomId = new ObjectId().toString();
    console.log(randomId);
    const response = await request(app)
      .post('/offres')
      .send({
        expediteur: randomId ,
        titre: 'Trip',
        lieu_depart: 'New York',
        lieu_arrive: 'Los Angeles',
        heure_depart: new Date(Date.now() + 10000).toISOString(),
        type: 'Co-Voiturage',
        Vehicule: vehicule._id
      });
    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual([
      expect.objectContaining({
        msg: 'Expediteur must be a valid ObjectId',
        type: "field"
      })])
  });
});
