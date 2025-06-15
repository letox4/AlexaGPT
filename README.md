# GPT Alexa Server

Este es un servidor Node.js para conectar Alexa con ChatGPT (GPT-3.5) y búsquedas web usando SerpAPI.

## Variables de entorno necesarias

- OPENAI_API_KEY: Tu API key de OpenAI.
- SERPAPI_KEY: Tu API key de SerpAPI.

## Cómo usar

1. Clona o descomprime el proyecto.
2. Instala dependencias: `npm install`
3. Crea un archivo `.env` con las variables de entorno.
4. Ejecuta el servidor: `npm start`
5. Configura tu Alexa Skill para hacer POST a `/alexa` en tu servidor Render.