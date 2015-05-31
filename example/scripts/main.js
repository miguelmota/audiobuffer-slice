
(function() {
  var url = './media/ethos-final-hope.mp3';
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  var oscilloscope = AudioOscilloscope(canvas, {
    canvas: {
      width: function() {
        return window.innerWidth;
      },
      height: 200
    },
    canvasContext: {
      lineWidth: 2,
      fillStyle: 'rgb(0,0,0)',
      strokeStyle: 'green'
    }
  });

  oscilloscope.draw();

  var startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.disabled = true;
  startButton.onclick = function() {
    source.start();
    stopped = false;
  };

  document.body.appendChild(startButton);

  var stopButton = document.createElement('button');
  var stopped = false;
  stopButton.textContent = 'Stop';
  stopButton.onclick = function() {
    source.stop();
    stopped = true;
  };

  document.body.appendChild(stopButton);

  var audioContext = new AudioContext();
  var analyser = audioContext.createAnalyser();
  var source = audioContext.createBufferSource();

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'arraybuffer';
  xhr.onerror = handleError;
  xhr.onload = function() {
    if (xhr.status === 200) {
      handleBuffer(xhr.response);
    } else {
      console.error(xhr.statusText);
    }
  };
  xhr.send();

  function handleError(error) {
    console.error(error);
  }

  function handleBuffer(audioData) {
    audioContext.decodeAudioData(audioData, decodeDone);
  }

  function decodeDone(buffer) {
    var begin = 50000;
    var end = begin + 20000;

    AudioBufferSlice(buffer, begin, end, function(error, slicedAudioBuffer) {
      if (error) {
        console.error(error);
      } else {
        source.buffer = slicedAudioBuffer;

        var gainNode = audioContext.createGain();
        gainNode.gain.value = 1;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscilloscope.addSource(source);
        startButton.disabled = false;
      }
    });
  }
})();
