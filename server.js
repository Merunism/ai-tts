const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate-speech', async (req, res) => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${req.body.voiceId}`,
      {
        text: req.body.text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        },
        responseType: 'arraybuffer'
      }
    );
    
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error generating speech' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
