const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SERPAPI_KEY = process.env.SERPAPI_KEY;

// Función para llamar a GPT-3.5
async function callGPT(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  };
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.7
  };
  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
    return 'Lo siento, no pude procesar tu solicitud.';
  }
}

// Función para buscar en la web con SerpAPI
async function callSerpAPI(query) {
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}&num=1&hl=es&gl=cl`;
  try {
    const response = await axios.get(url);
    const results = response.data.organic_results;
    if (results && results.length > 0) {
      return results[0].snippet || results[0].title;
    }
    return null;
  } catch (error) {
    console.error('Error calling SerpAPI:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Endpoint para Alexa
app.post('/alexa', async (req, res) => {
  const userQuery = req.body.query;
  console.log('Query recibida:', userQuery);

  // Primero intenta responder con GPT
  let gptResponse = await callGPT(userQuery);

  // Si GPT responde que no sabe, intenta búsqueda web
  if (gptResponse.toLowerCase().includes('no sé') || gptResponse.toLowerCase().includes('lo siento')) {
    const searchResult = await callSerpAPI(userQuery);
    if (searchResult) {
      gptResponse = `Según la web, ${searchResult}`;
    }
  }

  res.json({
    response: gptResponse
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});