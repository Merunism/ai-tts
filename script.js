const voiceId = 'VR6AewLTigWG4xSOukaG'; // Replace with your chosen voice ID

document.getElementById('generate-btn').addEventListener('click', generateVoice);

async function generateVoice() {
    const inputText = document.getElementById('input-text').value;
    const selectedVoice = document.getElementById('voice-select').value;

    if (!inputText) {
        alert('Please enter some text.');
        return;
    }

    try {
        const response = await fetch('/generate-speech', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                voiceId: selectedVoice
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
