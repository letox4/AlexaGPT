# GPT Alexa Server

Servidor Node.js (Express) que conecta una skill de **Amazon Alexa** con **ChatGPT
(GPT-3.5)** de OpenAI y, cuando el modelo no sabe responder, complementa con
**búsqueda web vía SerpAPI**.

## Requisitos

- Node.js 18+ (para `fetch`/TLS modernos y dependencias actuales).
- Cuenta y **API key de OpenAI**.
- Cuenta y **API key de SerpAPI**.

## Instalación

```bash
git clone https://github.com/letox4/AlexaGPT.git
cd AlexaGPT
npm install
cp .env.example .env     # Windows: copy .env.example .env
```

Edita `.env` con tus credenciales:

```env
OPENAI_API_KEY=tu_api_key_de_openai
SERPAPI_KEY=tu_api_key_de_serpapi
PORT=3000
```

## Uso

```bash
npm start
```

El servidor queda escuchando en `http://localhost:${PORT}` (por defecto `3000`).

### Endpoint

`POST /alexa`

```bash
curl -X POST http://localhost:3000/alexa \
  -H "Content-Type: application/json" \
  -d '{"query":"¿Cuál es la capital de Chile?"}'
```

Respuesta:

```json
{ "response": "La capital de Chile es Santiago." }
```

### Alexa Skill

En la consola de desarrollador de Alexa, configura el endpoint de tu skill para
que haga `POST` a `/alexa` en tu servidor desplegado (p. ej. Render).

## Cómo funciona

1. `POST /alexa` recibe `{ "query": "..." }`.
2. Consulta GPT-3.5 (`gpt-3.5-turbo`).
3. Si la respuesta indica que no sabe, hace una búsqueda en SerpAPI y la antepone
   como `"Según la web, ..."`.

## Seguridad

- **Nunca** subas tu `.env` al repositorio. Este repo lo ignora vía `.gitignore`.
- Rota cualquier API key que hayas expuesto públicamente (OpenAI y SerpAPI
  permiten revocar y regenerar keys desde su panel).
- Sirve el endpoint por HTTPS y considera autenticar/limitar las peticiones si lo
  expones a internet.

## Licencia

[MIT](LICENSE)
