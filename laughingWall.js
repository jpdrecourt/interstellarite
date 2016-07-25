class VideoWall {
  constructor (width=150) {
    let videoName = [];
    videoName[0] = './clips.nobackup/gmleHMY3OOo_1.mp4';
    videoName[1] = './clips.nobackup/gmleHMY3OOo_2.mp4';

    for (let i = 0; i < 8; i++) {
      $('body').append('<div class="videoLine"></div>');
      for (let j = 0; j < 8; j++) {
        $('.videoLine').last().append('<div class="videoDiv"></div>');
        $('.videoDiv').last().append('<video></video>');
        $('video').last().attr({
          'src': videoName[(i+j)%2],
          'control': false,
          'width': '150px',
          'onmouseover': 'if (this.paused) {this.play(); console.log("Played")}'
        });
      }
    }


  }
}

$(document).ready(() => {
  let app = new VideoWall();
});
