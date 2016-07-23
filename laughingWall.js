class VideoWall {
  constructor (width=150) {
    let videoName = './rawData.nobackup/gmleHMY3OOo.vob';
    for (let i = 0; i < 6; i++) {
      $('body').append('<div class="videoLine"></div>');
      for (let j = 0; j < 6; j++) {
        $('.videoLine').last().append('<div class="videoDiv"></div>');
        $('.videoDiv').last().append('<video></video>');
        $('video').last().attr({
          'src': videoName,
          'control': false,
          'width': '150px',
          'onmouseover': 'this.play();',
          'onmouseout': 'let self = this; setTimeout(() => {self.pause();}, 1000);'
        });
      }
    }


  }
}

$(document).ready(() => {
  let app = new VideoWall();
});
