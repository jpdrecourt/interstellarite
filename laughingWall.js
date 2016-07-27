

class VideoWall {
  constructor (width=150) {
    let videoNames = createVideoNames();
    let nVideos = 0, maxVideos = 10;
    let sounds = [];
    let size = 20;

    for (let i = 0; i < size; i++) {
      $('.wrapper').append('<div class="videoLine"></div>');
      for (let j = 0; j < size; j++) {
        $('.videoLine').last().append('<div class="videoDiv"></div>');
        $('.videoDiv').last().append('<img>');
        $('img').last().attr({
          'i': `${i}`,
          'j': `${j}`,
          'id': `${i}_${j}`,
          'src': videoNames[(i+j)%videoNames.length] + '.png'
        });
        sounds.push(new buzz.sound(videoNames[(i+j)%videoNames.length] + '.mp3'));

      }
    }
    $('body').mouseover (function(e) {
      let $target = $(e.target),
        ii = parseInt($target.attr('i')),
        jj = parseInt($target.attr('j'));
      if (ii !== undefined) {
        $(`#${ii}_${jj}`).attr({
          'src': videoNames[(ii+jj)%videoNames.length] + '.gif'
        });
        console.log(size* ii + jj);
        sounds[ii * size + jj].play();
      }
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
      output.push(clipData.rootDir + clipData.clips[i].name + '_' + (j + 1));
    }
  }
  return output;
}

$(document).ready(() => {
  let app = new VideoWall();
});
