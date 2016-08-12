class VideoWall {
  constructor (width=150) {
    this.videoNames = createVideoNames();
    this.sounds = [];
    this.timeouts = [];
    this.size = 20;
    this.madness = 50;
    this.constellation = [];
    this.constellationSize = 10;
    let self = this;

    // Slider
    $('#madnessSlider').on('mousedown mouseup mousemove', () => {
      self.madness = $('#madnessSlider').val();
    });

    for (let i = 0; i < this.size; i++) {
      $('.wrapper').append('<div class="videoLine"></div>');
      for (let j = 0; j < this.size; j++) {
        let pngName = this.videoNames[this.vidIndex(i, j)%this.videoNames.length] + '.png';// TODO Remove previous constellation
        $('.videoLine').last().append('<img>');
        let $target = $('img').last();
        $target
          .addClass('gif')
          .addClass('deactivated')
          .addClass('hidden')
          .attr({
            'i': `${i}`,
            'j': `${j}`,
            'id': `${i}_${j}`,
            'src': pngName
          });
        this.sounds[this.vidIndex(i, j)] = new Howl({
          src: this.videoNames[this.vidIndex(i, j)%this.videoNames.length] + '.mp3',
          stereo: 0.7 * (2 * j / (this.size - 1) - 1)
        });
      }
    }

    $('body').click (function(e) {
      let $target = $(e.target),
        ii = parseInt($target.attr('i')),
        jj = parseInt($target.attr('j'));
      if (!isNaN(ii)) {
        self.createConstellation(ii, jj);
        self.playConstellation();
      }
    });

  }

  vidIndex(l, c) {
    return this.size * l + c;
  }

  createConstellation(ii, jj) {
    if (this.constellation.length > 0) {
      this.constellation = [];
      $('img').addClass('hidden');
      for (let i = 0, l = this.sounds.length; i < l; i++) {
        this.sounds[i].stop();
      }
      for (let i = 0, l = this.timeouts.length; i < l; i++) {
        clearTimeout(this.timeouts[i]);
      }
      this.timeouts = [];
    }

    this.constellation.push([ii, jj]);
    let i = 0, nextStar;
    while(i < this.constellationSize) {
      nextStar = [randInt(this.size), randInt(this.size)];
      if (this.constellation.indexOf(nextStar) == -1){
        this.constellation.push(nextStar);
        i++;
      }
    }
  }

  playConstellation() {
    this.playVid(0);
  }


  playVid(index) {
    let l = this.constellation[index][0], c = this.constellation[index][1];
    let $target = $(`#${l}_${c}`);
    let nameIndex = this.vidIndex(l, c);
    let self = this;
    $target
      .addClass('activated')
      .removeClass('deactivated')
      .removeClass('hidden')
      .attr({
        'src': this.videoNames[nameIndex%this.videoNames.length] + '.gif'
      });
    // Blinking frame
    setTimeout(() => {
      $target
        .addClass('deactivated')
        .removeClass('activated');}, 100);
    let sound = this.sounds[nameIndex];
    sound.play();
    // Set trigger for next sound
    if (index < this.constellationSize) {
      this.timeouts.push(setTimeout(() => {
        self.playVid(index + 1);
      }, sound.duration() * 1000 * ( Math.random() *  (100 - self.madness) / 100))); // ms!!!
    }
  }
}

// Returns a random integer between 0 and n - 1
function randInt(n) {
  return Math.floor(Math.random() * n);
}

function createVideoNames() {
  let clipData = {
    'rootDir': './clips.nobackup/',
    'clips': [
      {'name': 'gmleHMY3OOo', n: 10},
      {'name': 'IQpPdkd0B6M', n: 11},
      {'name': 'VuCQGGhgAaQ', n: 12},
      {'name': '94SKl5gmtQw', n: 10},
      {'name': '-1Jo50Y8L3M', n: 9},
      {'name': 'JFO7YIK79So', n: 10},
      {'name': '16ZQeMl5ioI', n: 12},
      {'name': 'jyvJtA0c06M', n: 13}
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
