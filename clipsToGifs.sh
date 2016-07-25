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
  # # Extract audio
  # ffmpeg -i $targetDir'/'$clipName'.mp4' -ss 00:00:00 -t $clipLength -vn $targetDir'/'$clipName'.mp3' < /dev/null
  # # Make GIF (http://xmodulo.com/convert-video-animated-gif-image-linux.html)
  # ffmpeg -t $clipLength -ss 00:00:00 -i $targetDir'/'$clipName'.vob' $targetDir'/'$clipName'%04d.jpg' < /dev/null
  # convert -delay 1x20 -loop 0 $targetDir'/'$clipName'*.jpg' $targetDir'/'$clipName'_large.gif' < /dev/null
  # convert -layers Optimize $targetDir'/'$clipName'_large.gif' $targetDir'/'$clipName'_small.gif' < /dev/null

done < "$datafile"
