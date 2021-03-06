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
**TODO**: GIF file is big and ugly - Try with ffmpeg or ImageMagick. **DONE**

### Getting the audio from the file
```
ffmpeg -i gmleHMY3OOo.vob -ss 00:00:16.266 -t 1.3 -vn out.mp3
```
**TODO**: Normalise sound.

### Possible method
1. Identify all the laughs into a table [filename // start // length]
2. Run a script to decode the file, gif it (ffmpeg maybe) and extract the audio
3. Display the whole thing on a page

**TODO**: Try with one gif and see how many Chrome will take. **DONE**

# 2016/07/25

## YouTube videos
Can be transfered into MP4, which seem to be OKish. Still some issues but GIFs seem to be too big for the amounth of videos wanted.

`laughs.csv` contains the different extracts.
Processed by `clipsToGifs.sh`, except that it doesn't process GIFs anymore at the moment.

# 2016/07/26

## New approach
It looks like the video approach is simply not feasible this way. Since the important part is the sound, I will try to capture a few images (maybe 10 per second) and animate them in an object while the sound is played. This way I also have more control on the sound.

`ffmpeg -i gmleHMY3OOo_1.mp4 -vf fps=5 test_out%d.jpg` seems to do a pretty good job and the jpegs are about the size of the original video. It's probably possible to combine this with the mp4 extraction command to avoid having to convert into mp4. Then I'll get snapshots and mp3 audio that I can process.

# 2016/07/27

## General process

### Download FailArmy YouTube videos
* High quality & video using itag 22
* Split the audio (`ffmpeg`, see above)

### Extract laughs
* Use the split audio to find the laughs (It should be easier)
  - Using audacity or another audio editing software
* Write them down in the `laughs.csv` file.
* Reextract the audio using `ffmpeg`
* Extract small jpegs snapshots (can you make them smaller with `ffmpeg`?)

### Package the laughs in an object
* Container to display the laughs on the DOM
* Sync the snapshots with the audio

### Classify the laughs using unsupervised learning
**QUESTIONS**
* What neural networks should I use?
* What programming language tool should I use?
* How to input audio into neural nets?
* What output should I use? (matrix, or some distance measure)

### Display the laughs on the 'wall'
* According to their similarity
* Interaction through clicks on one laugh
  - Propagates through the other laughs
  - Random propagation to neighbours (including the number of neighbours 0 - 4)
  - Random delay between laughs
* If the user doesn't click, click one at random for her

## More on animated image
Using gifs from https://room208.org/blog/posts/48793543478.html
``` bash
> ffmpeg -i gmleHMY3OOo_1.mp4 -s 128x72 -f image2 ./anim/%03d.png  
> convert -delay 1x5 $(seq -f %03g.png 1 6 40) +dither -coalesce -layers OptimizeTransparency +map animation.gif
```

With a few tweaks, it works perfectly fine. Adding Buzz also makes everything work. Only issue with the repeated gifs: The GIF is repeated if it's more than once on the page. But that won't be a problem with the final product.

**TODO**: Make the images even smaller (64x36) seems to be good - **DONE**

# 2016/07/29

## File extraction
The file extraction now works well. It's a bit tedious to change the name of the files in different places, but I don't think it warrants major code changes.

### Workflow
1. Add the YouTube file ID in `index.js`, comment out the files that are in the done folder
2. Run `node index.js` to download the YouTube file
3. Open one file in Audacity and collect the laughs in `laughs.csv`
4. When laughs are collected, run `./clipsToGifs.sh laughs.csv` to extract the laughs
5. Amend the clipdata in `laughingWall.js`
6. Visualize the beautiful work on the webpage!

## Delay until next sound
**TODO**: Explore when the next sound is actually triggered. It seems that the TimeOut waits too long to trigger the next sound. **DONE**

It seems that Buzz doesn't measure the sound duration properly with `sound.getDuration()`

# 2016/08/12

## New name
Interstellarité - Concatenation of Interstellaire and Hillarité.
Will create constellation of laughs. Details to be designed. Check notebook at 2016/08/11.

## Change to Howler
* Offers panning and seems better at handling sound objects

**TODO** Use audiosprite https://github.com/tonistiigi/audiosprite to concatenate the sound files into a single file.

## Building a simple constellation
* Keep the square structure
* Select one laugh at random -> create a constellation of laughs on the wall and play them sequentially.

## Branch `random`
Contains a working version of the random progressing on the laughs

## Branch `constellation`
Creating a simple constellation based on the wall

# 2016/08/18

## Microphone capture
Inspiration from this pitch detect app:
https://github.com/cwilso/PitchDetect/network

# 2016/08/19

## The constellations
* Each laugh is a star
* Star brightness: Length of the laugh
* Star colour: The overall colour of the video (How?)
* Constellation: Laughs that are related (or not related)

# 2016/08/22

## The constellations - Audio setup
* Capture audio from microphone
* Create a moving average
* Any sound that is higher than the moving average triggers, e.g. http://p5js.org/examples/examples/Sound_Mic_Threshold.php
* Measure pitch/frequency of that sound and use it to correlate with a constellation

## Questions to solve
* How to layout the stars in 3D space?
* How to create the constellations?
  - What puts them together?
  - What sets them apart?
* How to correlate external sounds with the trigger of a constellation?
* How to navigate freely in the stars?


x

x

x

x

x

x

x

x
