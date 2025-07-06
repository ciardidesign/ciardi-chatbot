const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Carica la knowledge base
const knowledge = JSON.parse(fs.readFileSync('knowledge.json', 'utf8'));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const match = knowledge.find(item =>
    userMessage.toLowerCase().includes(item.domanda.toLowerCase())
  );

  const prompt = match
    ? `Domanda: ${userMessage}\nRisposta: ${match.risposta}`
    : `Agisci come chatbot di Ciardi Design. Rispondi alla seguente domanda: ${userMessage}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Errore durante la generazione della risposta." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server attivo sulla porta ${port}`));
