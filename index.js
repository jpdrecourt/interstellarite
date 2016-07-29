const fs = require('fs'),
  ytdl = require('ytdl-core');

let options = {};
options.quality = '22'; //hd720 quality, mostly for sound in this case
// options.quality = 'lowest';


// ytdl.getInfo('http://www.youtube.com/watch?v=gmleHMY3OOo', (err, info) => {console.log('Error: ' + err); console.log(info);});

let videos = [
  // 'gmleHMY3OOo',
  // 'IQpPdkd0B6M',
  // 'VuCQGGhgAaQ',
  // '94SKl5gmtQw',
  // 'JFO7YIK79So',
  // '-1Jo50Y8L3M',
  // 'jyvJtA0c06M',
  // 'ndFTtjiFQAk',
  // 'OHs-OcIglJM',
  // 'WI5nf1s-8po',
  // '16ZQeMl5ioI',
  'yL1cHkNtXuE'
];

getStream(videos);

function getStream(videos, index=0) {
  if (index < videos.length) {
    let videoUrl = 'http://www.youtube.com/watch?v=' + videos[index];
    let path = './rawData.nobackup/' + videos[index] + '.mp4';
    console.log('Processing: ' + videoUrl);
    fs.access(path, fs.F_OK, function(err) {
      if (err) {
        // Download video
        ytdl(videoUrl, options)
          .pipe(fs.createWriteStream(path))
          .on('finish', () => {getStream(videos, ++index);});
      } else {
          // Skip, it's already downloaded
          console.log('Already downloaded, skipping');
          getStream(videos, ++index);
      }
    });
  } else {
    return false;
  }
}
