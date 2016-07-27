 #!/bin/bash
# Script used to extract clips from a video file, getting data from a CSV
# file and returning an optimised GIF and a sound file
# Fields in the CSV file
# Original video file (relative path from script)
# Clip Start time in form HH:MM:SS.MMM
# Clip length in seconds
# Clip file name without extension (will return <name>.gif and <name>.mp3)
datafile="$1"
sourceDir="./rawData.nobackup"
targetDir="./clips.nobackup"
size="64x36"
fps="10"

while read -r line
do
  original=$(echo $line | cut -f1 -d,)
  clipStart=$(echo $line | cut -f2 -d,)
  clipLength=$(echo $line | cut -f3 -d,)
  clipName=$(echo $line | cut -f4 -d,)
  echo '***** Processing: '$original
  echo $line
  # Extract clip
  ffmpeg -i $sourceDir'/'$original -ss $clipStart -t $clipLength -f mp4 -strict -2 $targetDir'/'$clipName'.mp4' < /dev/null
  # Extract audio
  ffmpeg -i $targetDir'/'$clipName'.mp4' -ss 00:00:00 -t $clipLength -vn $targetDir'/'$clipName'.mp3' < /dev/null
  # Extract poster image
  ffmpeg -i $targetDir'/'$clipName'.mp4' -ss 00:00:00 -s $size -vframes 1 $targetDir'/'$clipName'.png' < /dev/null

  # Turn into GIF
  ffmpeg -i $targetDir'/'$clipName'.mp4' -s $size -vf fps=$fps -f image2 $targetDir'/anim/%03d.png' < /dev/null
  convert -delay 1x$fps -loop 1 $targetDir'/anim/*.png' +dither -coalesce -layers OptimizeTransparency +map $targetDir'/'$clipName'.gif' < /dev/null
  rm $targetDir'/anim/'*.png

done < "$datafile"
