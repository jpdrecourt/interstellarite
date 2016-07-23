const fs = require('fs'),
  ytdl = require('ytdl-core');

let options = {};
options.quality = '43';

// ytdl.getInfo('http://www.youtube.com/watch?v=gmleHMY3OOo', (err, info) => {console.log('Error: ' + err); console.log(info);});

ytdl('http://www.youtube.com/watch?v=gmleHMY3OOo', options)
  .pipe(fs.createWriteStream('video.flv'));
