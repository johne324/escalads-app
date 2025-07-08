const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

let mockCampaigns = [
  { id: 1, name: "Campaña Restaurante 1", roas: 1.3, cpm: 9700 },
  { id: 2, name: "Campaña Cafetería 2", roas: 2.1, cpm: 6100 },
];

app.get("/api/campaigns", (req, res) => {
  res.json(mockCampaigns);
});

app.post("/api/generate-copy", async (req, res) => {
  const prompt = `Genera un copy publicitario atractivo para una máquina dispensadora de bebidas de 18L enfocada en negocios.`;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  res.json({ copy: completion.data.choices[0].message.content });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API de EscalAds corriendo en puerto ${PORT}`));
