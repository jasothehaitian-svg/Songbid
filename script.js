const audioFileInput = document.getElementById('audioFile');
const player = document.getElementById('player');

const startRecBtn = document.getElementById('startRecBtn');
const stopRecBtn = document.getElementById('stopRecBtn');
const recStatus = document.getElementById('recStatus');
const recordingOutput = document.getElementById('recordingOutput');

let mediaRecorder = null;
let recordedChunks = [];

// Load local audio file
audioFileInput.addEventListener('change', () => {
  const file = audioFileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  player.src = url;
});

// Recording setup
async function startRecording() {
  recordedChunks = [];
  recStatus.textContent = 'Requesting microphone access...';

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    // Use WAV so iPhone/Android can download the file properly
const blob = new Blob(recordedChunks, { type: 'audio/wav' });
const url = URL.createObjectURL(blob);

...

// Save as .wav (universal)
downloadLink.download = 'songbid-vocal.wav';

      recordingOutput.innerHTML = '';
      const audioEl = document.createElement('audio');
      audioEl.controls = true;
      audioEl.src = url;

      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'songbid-vocal.webm';
      downloadLink.textContent = 'Download your vocal take';

      recordingOutput.appendChild(audioEl);
      recordingOutput.appendChild(document.createElement('br'));
      recordingOutput.appendChild(downloadLink);

      recStatus.textContent = 'Recording stopped. You can listen or download your vocal.';
    };

    mediaRecorder.start();
    recStatus.textContent = 'Recording... perform your song!';
    startRecBtn.disabled = true;
    stopRecBtn.disabled = false;
  } catch (err) {
    console.error(err);
    recStatus.textContent = 'Microphone access denied or not available.';
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  startRecBtn.disabled = false;
  stopRecBtn.disabled = true;
}

startRecBtn.addEventListener('click', startRecording);
stopRecBtn.addEventListener('click', stopRecording);