# audiobuffer-slice

Slice out a portion of an AudioBuffer.

[![NPM](https://nodei.co/npm/audiobuffer-slice.png)](https://nodei.co/npm/audiobuffer-slice)

# Install

```bash
npm install audiobuffer-slice
```

```bash
bower install audiobuffer-slice
```

# Usage

See [example](https://github.com/miguelmota/audiobuffer-slice/tree/master/example) directory for full example. [Live example](http://lab.moogs.io/audiobuffer-slice/example)

```javascript
var AudioBufferSlice = require('audiobuffer-slice');

// audioBuffer slice from 10s to 15s; a 5 second (5000ms) slice.
AudioBufferSlice(audioBuffer, 10000, 15000, function(error, slicedAudioBuffer) {
  if (error) {
    console.error(error);
  } else {
    source.buffer = slicedAudioBuffer;
  }
});
```

# License

MIT
