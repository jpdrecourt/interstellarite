# 2016/07/24

## Downloading YouTube video
Using ytdl-core in nodeJS

### Getting the stream infos
Including the itag to extract the proper type of video
```
ytdl.getInfo('http://www.youtube.com/watch?v=gmleHMY3OOo', (err, info) => {console.log('Error: ' + err); console.log(info);});
```

### Extracting the stream
Pipes it using fs into a video file
```
options.quality = '43'; // This is the itag number
ytdl('http://www.youtube.com/watch?v=gmleHMY3OOo', options).pipe(fs.createWriteStream('video.flv'));
```
### Getting the laugh time stamp and durantion
Use pitivy, left-right arrows give a frame by frame exploration

### Extract the clip
```
ffmpeg -i gmleHMY3OOo.vob -ss 00:00:16.266 -t 1.3 out.vob
```
Forces a recode of the file, which prevents reading issues (master frame?)

### Turning the file into a gif
```
gify('./rawData.nobackup/out.vob', 'out.gif', (err) => {
  if (err) throw err;});
```
**TODO**: GIF file is big and ugly - Try with ffmpeg or ImageMagick.

### Getting the audio from the file
```
ffmpeg -i gmleHMY3OOo.vob -ss 00:00:16.266 -t 1.3 -vn out.mp3
```
**TODO**: Normalise sound.

### Possible method
1. Identify all the laughs into a table [filename // start // length]
2. Run a script to decode the file, gif it (ffmpeg maybe) and extract the audio
3. Display the whole thing on a page

**TODO**: Try with one gif and see how many Chrome will take.

#25/07/2015

## YouTube videos
Can be transfered into MP4, which seem to be OKish. Still some issues but GIFs seem to be too big for the amounth of videos wanted.

`laughs.csv` contains the different extracts.
Processed by `clipsToGifs.sh`, except that it doesn't process GIFs anymore at the moment.
