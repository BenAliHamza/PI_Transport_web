const express = require('express'); 
const http = require('http'); 
const WebSocket = require('ws'); 
const mongoose = require('mongoose'); require('dotenv').config(); 
const app = express(); 
const server = http.createServer(app); const wss = new WebSocket.Server({ server }); // Connection to MongoDB const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/Projet'; mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }) .then(() => console.log('Connection Successful')) .catch(err => console.error('MongoDB connection error:', err)); // WebSocket connection wss.on('connection', (ws) => { console.log('New client connected'); ws.on('message', (message) => { console.log('Received:', message); }); ws.on('close', () => { console.log('Client disconnected'); }); }); // Express routes app.get('/', (req, res) => { res.send('WebSocket server is running'); }); // Start the server server.listen(5000, () => { console.log('Server is running on port 5000'); }); // Function to send notifications to all connected clients function sendNotification(data) { wss.clients.forEach((client) => { if (client.readyState === WebSocket.OPEN) { client.send(JSON.stringify(data)); } }); } // Example of sending a notification setInterval(() => { sendNotification({ message: 'Hello from server!' }); }, 10000