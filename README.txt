🚀 CIARDI DESIGN - CHATBOT BACKEND

1. Carica questi file su Render.com creando un nuovo Web Service.

2. Scegli:
   - Language: Node
   - Start Command: npm start
   - Root Directory: /

3. Imposta la variabile d'ambiente:
   - Nome: OPENAI_API_KEY
   - Valore: [la tua API key di OpenAI]

4. Una volta pubblicato, il tuo chatbot sarà raggiungibile su:
   https://tuo-nome-servizio.onrender.com/chat

5. Integra nel tuo sito WordPress il seguente widget:

------------------------------------------------------

<div id="chatbox" style="position:fixed; bottom:20px; right:20px; width:300px; background:#fff; border:1px solid #ccc; padding:10px;">
  <div id="messages" style="max-height:200px; overflow:auto;"></div>
  <input id="userInput" type="text" placeholder="Scrivi qui..." style="width:100%;" />
  <button onclick="sendMessage()">Invia</button>
</div>

<script>
async function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value;
  document.getElementById('messages').innerHTML += `<div><b>Tu:</b> ${message}</div>`;
  input.value = '';

  const response = await fetch('https://TUO-SITO.onrender.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  document.getElementById('messages').innerHTML += `<div><b>Bot:</b> ${data.reply}</div>`;
}
</script>

------------------------------------------------------

Per aggiornare le risposte, modifica il file knowledge.json.
