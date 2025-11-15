import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dialogflow from "@google-cloud/dialogflow";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta al JSON descargado
const CREDENTIALS_PATH = path.join(__dirname, "dialogflow-key.json");

// Carga del cliente Dialogflow
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: CREDENTIALS_PATH,
});

const PROJECT_ID = "newagent-hlpq"; // remplázalo por tu ID real

app.post("/api/message", async (req, res) => {
  const { message, sessionId = "visitante123", languageCode = "es" } = req.body;

  try {
    const sessionPath = sessionClient.projectAgentSessionPath(PROJECT_ID, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode,
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({
      reply: result.fulfillmentText || "No hay respuesta definida.",
      intent: result.intent?.displayName || "Sin Intent",
    });
  } catch (error) {
    console.error("Error Dialogflow:", error);
    res.status(500).json({ error: "Error al comunicar con Dialogflow" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor backend activo en http://localhost:${PORT}`));
