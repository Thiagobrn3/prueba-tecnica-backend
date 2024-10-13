
const express = require('express'); // Framework para construir aplicaciones web
const axios = require('axios'); // Librería para hacer solicitudes HTTP
const cors = require('cors'); // Middleware para habilitar CORS
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

const app = express();
const PORT = process.env.PORT || 3000; 

const EXCHANGE_API = 'https://openexchangerates.org/api';
const API_KEY = process.env.EXCHANGE_API_KEY; // Obtener la clave API del archivo .env

app.use(cors()); 

// Definir la ruta para obtener la tasa de cambio más reciente
app.get('/api/latest', async (req, res) => {
    try {
        // Hacer una solicitud a la API para obtener las tasas de cambio más recientes
        const response = await axios.get(`${EXCHANGE_API}/latest.json?app_id=${API_KEY}`);
        res.json(response.data); // Enviar la respuesta como JSON
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange rates' });
    }
});

// Definir la ruta para obtener las tasas de cambio históricas
app.get('/api/historical/:date', async (req, res) => {
    const { date } = req.params; // Obtener la fecha de los parámetros de la URL
    try {
        // Hacer una solicitud a la API para obtener las tasas de cambio históricas
        const response = await axios.get(`${EXCHANGE_API}/historical/${date}.json?app_id=${API_KEY}`);
        res.json(response.data); // Enviar la respuesta como JSON
    } catch (error) {
        res.status(500).json({ error: 'Error fetching historical rates' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/api/currencies', async (req, res) => {
    try {
        const response = await axios.get(`${EXCHANGE_API}/currencies.json?app_id=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching currencies' });
    }
});

