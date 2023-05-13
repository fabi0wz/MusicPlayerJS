DOM VARIABLES:

```
// artist
const audioPlayer = document.createElement('audio'); // Music Player
const songName = document.querySelector('#musictitle'); // Music Title
const artist = document.querySelector('#artist'); // Artist Name
const songCover = document.querySelector('#imgAudio'); // Artist Cover
// audio controls
const audioControls = document.querySelector('.audio-volume-controls');
const muteButton = audioControls.querySelector('#btSoundOff');
const unmuteButton = audioControls.querySelector('#btSoundOn');
const volumeBar = document.querySelector('#soundVolumeContainer');
const volumeBarFill = volumeBar.querySelector('#soundVolumeLevel');
// music controls
const musicProgress = document.querySelector('#trackProgressContainer');
const musicProgressFill = musicProgress.querySelector('#trackProgressBar');

//music buttons
const playButton = document.querySelector('#btPlay');
const pauseButton = document.querySelector('#btPause');
const nextButton = document.querySelector('#btNext');
const prevButton = document.querySelector('#btPrevious');
const shuffleButton = document.querySelector('#btShuffle');
const repeatButton = document.querySelector('#btRepeat');

```

STATUS VARIABLES
```
// music variables
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;
let currentSong = 0;
let previousSong = 0;
let prevSongFlag = false;
```


FUNCTIONS 

## no changes needed - DOM
`init` -> starts setAudioPlayerInfo and all eventListeners


## split logic from audioPlayerInfo
`nextSong` -> checkShuffle -> currentsong++ -> setAudioPlayerInfo

`prevSong` -> checks prevSongFlag -> currentSong--

## split changing variable status and changing bg color

`shufflesong` -> changes status variable -> changes btn bg color

## no changes needed - LOGIC (separate to different file)

`checkShuffle` -> saves CurrentSong on variable -> Math Random current song (shuffle)

# split changing status and btn color in different functions

`repeatSong` -> changes status variable -> changes btn bg color

#no changes needed - LOGIC (separate to a different file)

`checkRepeating` -> checks status variable ? sets currentTime = 0 : next song

## split logic from DOM 

`volumeChange` -> saves offset on variable -> changes volume -> changes volume bg width


`musicProgressChange` -> saves offset on variable -> changes song currentTime -> changes music progress bg width

`mute` -> sets muted true -> changes btn style displays

`unmute` - > sets muted false -> changes btn style displays

## start using on unmute/mute and musicprogresschange

`updateProgress` -> changes musicProgressFill -> # UNUSED ATM

`updateVolume` -> changes volumeBarFill -> # UNUSED ATM

`updatePlayer` -> updateProgress() -> updateVolume();

## split logic from DOM

`playPause` -> changes status variable -> changes player play/pause -> setAudioPlayerInfo();

## split logic from DOM

`setAudioPlayerInfo` -> change song name, artist, cover and src and volumeBarFill -> if(isPlaying) else btn change
