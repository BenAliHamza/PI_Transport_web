const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Offre = require('../models/Offre');
const Vehicule = require('../models/Vehicule');
const jwt = require('jsonwebtoken');
const CategorieAccessoire = require('../models/categorieAccessoire');
describe('Vehicule Routes', () => {
  let offreId1, offreId2;

  beforeEach(async () => {
    const testOffre1 = await Offre.create({
      expediteur: "665a8810075d8bf66cfdff78",
      titre: 'Test Offer',
      lieu_depart: {
        ville: 'Bizerte',
        adresse: 'Ghar El Melah'
      },
      lieu_arrive: {
        ville: 'Tozeur',
        adresse: 'Chatt Jrid'
      },
      heure_depart: new Date('2024-12-01T10:00:00Z'),
      type: 'Co-Voiturage',
      vehicule: mongoose.Types.ObjectId()
    });
    const testOffre2 = await Offre.create({
      expediteur: mongoose.Types.ObjectId(),
      titre: 'Test Offer',
      lieu_depart: {
        ville: 'Ariana',
        adresse: 'mnihla'
      },
      lieu_arrive: {
        ville: 'Charguia',
        adresse: 'esprit'
      },
      heure_depart: new Date('2024-12-01T10:00:00Z'),
      type: 'Co-Voiturage',
      vehicule: mongoose.Types.ObjectId()
    });
    const user = new User({
      "_id": "665a8810075d8bf66cfdff78",
      "firstname": "Seif Eddine",
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
    offreId1 = testOffre1._id;
    offreId2 = testOffre2._id
  });

  afterAll(async () => {
  });

  it('should get all Offres', async () => {
    const res = await request(app)
      .get('/offres')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
      ;

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get one Offre by ID', async () => {
    const res = await request(app)
      .get(`/offres/${offreId1}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
      ;

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.titre).toBe('Test Offer');
  });

  it('should update an Offre', async () => {
    const updatedData = {
      titre: 'Updated Offer',
      lieu_depart: {
        ville: 'Updated Ville Depart',
        adresse: 'Updated adresse Depart'
      },
      lieu_arrive: {
        adresse: 'Updated adresse arrivee',
        ville: 'Updated Ville Arrivee'
      },
      heure_depart: new Date('2024-12-01T10:00:00Z'),
      type: 'Livraison'
    };

    const res = await request(app)
      .patch(`/offres/${offreId1}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.titre).toBe('Updated Offer');
    expect(res.body.lieu_depart.adresse).toBe('Updated adresse Depart');
    expect(res.body.lieu_depart.ville).toBe('Updated Ville Depart');
    expect(res.body.lieu_arrive.adresse).toBe('Updated adresse arrivee');
    expect(res.body.lieu_arrive.ville).toBe('Updated Ville Arrivee');
    expect(res.body.type).toBe('Livraison')
  });

  it('should delete an Offre', async () => {
    const res = await request(app)
      .delete(`/offres/${offreId1}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWE4ODEwMDc1ZDhiZjY2Y2ZkZmY3OCIsInJvbGUiOiJERUZBVUxUIiwiaWF0IjoxNzE3MjE5MjI3LCJleHAiOjE5MTcyMjI4Mjd9.c35SYnveMhhl1wdl4Xwy4vM_ysTCUADqPYVRAuYIep8')
      ;

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Offer deleted successfully');
  });
});