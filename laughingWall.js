

class VideoWall {
  constructor (width=150) {
    this.videoNames = createVideoNames();
    this.sounds = [];
    this.size = 20;
    this.madness = 50;
    let self = this;

    // Slider
    $('#madnessSlider').on('mousedown mouseup mousemove', () => {
      self.madness = $('#madnessSlider').val();
    });


    for (let i = 0; i < this.size; i++) {
      $('.wrapper').append('<div class="videoLine"></div>');
      for (let j = 0; j < this.size; j++) {
        $('.videoLine').last().append('<img>');
        $('img').last().addClass('gif').addClass('deactivated').attr({
          'i': `${i}`,
          'j': `${j}`,
          'id': `${i}_${j}`,
          'src': this.videoNames[(this.size * i + j)%this.videoNames.length] + '.png'
        });
        this.sounds.push(new buzz.sound(this.videoNames[(this.size * i + j)%this.videoNames.length] + '.mp3'));

      }
    }

    $('body').click (function(e) {
      let $target = $(e.target),
        ii = parseInt($target.attr('i')),
        jj = parseInt($target.attr('j'));
      if (!isNaN(ii)) {
        self.playVid(ii, jj);
      }
    });

  }

  playVid(l, c) {
    let $target = $(`#${l}_${c}`);
    $target
      .addClass('activated')
      .removeClass('deactivated')
      .attr({
        'src': this.videoNames[(this.size * l + c)%this.videoNames.length] + '.gif'
      });
    setTimeout(() => {
      $target
        .addClass('deactivated')
        .removeClass('activated');}, 100);
    let sound = this.sounds[l * this.size + c];
    if (!sound.isPaused()) sound.stop();
    sound.play();
    let next = Math.floor(Math.random() * 4);
    switch (next) { // Trigonometric direction from 0 rads
      case 0:
        c++;
        break;
      case 1:
        l--;
        break;
      case 2:
        c--;
        break;
      case 3:
        l++;
        break;
    }
    console.log([l, c]);
    if (l < this.size && l >= 0 && c < this.size && c >= 0) {
      let self = this;
      // Play next sound
      setTimeout(() => {self.playVid(l, c);}, sound.getDuration() * 1000 * ((100 - self.madness) / 100));
    }
  }
}



function createVideoNames() {
  let clipData = {
    'rootDir': './clips.nobackup/',
    'clips': [
      {'name': 'gmleHMY3OOo', n: 10},
      {'name': 'IQpPdkd0B6M', n: 11},
      {'name': 'VuCQGGhgAaQ', n: 12},
      {'name': '94SKl5gmtQw', n: 10}
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
