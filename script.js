const apiKey = 'sk_077de74b809401c64250c2571c62588377d1e2d02e9d76c6'; // Replace with your actual API key
const voiceId = 'VR6AewLTigWG4xSOukaG'; // Replace with your chosen voice ID

document.getElementById('generate-btn').addEventListener('click', generateVoice);

async function generateVoice() {
    const inputText = document.getElementById('input-text').value;
    if (!inputText) {
        alert('Please enter some text.');
        return;
    }

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            body: JSON.stringify({
                text: inputText,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = 'block';
        } else {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            alert(`Error generating voice. Status: ${response.status}. Check console for details.`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Error connecting to the API. Check console for details.');
    }
}
