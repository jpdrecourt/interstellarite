

class VideoWall {
  constructor (width=150) {
    let videoNames = createVideoNames();
    let nVideos = 0, maxVideos = 10;

    for (let i = 0; i < 10; i++) {
      $('.wrapper').append('<div class="videoLine"></div>');
      for (let j = 0; j < 10; j++) {
        $('.videoLine').last().append('<div class="videoDiv"></div>');
        $('.videoDiv').last().append('<video></video>');
        $('video').last().attr({
          'src': videoNames[(i+j)%videoNames.length],
          'control': false,
          'width': '100px'
        });
      }
    }
    $('body').mouseover (function(e) {
      let target = $(e.target);
      if (nVideos < maxVideos && target.is('video') && target.get(0).paused) {
        nVideos++;
        target.get(0).play();
      }
    });

    $('video').on('ended', function() {
      nVideos--;
    });

  }
}


function createVideoNames() {
  let clipData = {
    'rootDir': './clips.nobackup/',
    'clips': [
      {'name': 'gmleHMY3OOo', n: 8}
    ]
  };
  let output = [];
  for (let i = 0, l = clipData.clips.length; i < l; i++) {
    for (let j = 0; j < clipData.clips[i].n; j++) {
      output.push(clipData.rootDir + clipData.clips[i].name + '_' + (j + 1) + '.mp4');
    }
  }
  return output;
}

$(document).ready(() => {
  let app = new VideoWall();
});
