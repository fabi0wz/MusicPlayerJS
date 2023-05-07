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

// music variables
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;
let currentSong = 0;
let previousSong = 0;
let prevSongFlag = false;


new Song('acousticbreeze', 'bensound', 'assets/images/acousticbreeze.jpg', 'assets/audio/bensound-acousticbreeze.mp3');
new Song('anewbeginning', 'bensound', 'assets/images/anewbeginning.jpg', 'assets/audio/bensound-anewbeginning.mp3');
new Song('creativeminds', 'bensound', 'assets/images/creativeminds.jpg', 'assets/audio/bensound-creativeminds.mp3');
new Song('goinghigher', 'bensound', 'assets/images/goinghigher.jpg', 'assets/audio/bensound-goinghigher.mp3');
new Song('happyrock', 'bensound', 'assets/images/happyrock.jpg', 'assets/audio/bensound-happyrock.mp3');
new Song('jazzyfrenchy', 'bensound', 'assets/images/jazzyfrenchy.jpg', 'assets/audio/bensound-jazzyfrenchy.mp3');
new Song('littleidea', 'bensound', 'assets/images/littleidea.jpg', 'assets/audio/bensound-littleidea.mp3');
new Song('memories', 'bensound', 'assets/images/memories.jpg', 'assets/audio/bensound-memories.mp3');
new Song('ukulele', 'bensound', 'assets/images/ukulele.jpg', 'assets/audio/bensound-ukulele.mp3');

//initialize the player and all event listeners
const init = () => {
    setAudioPlayerInfo(Song.songList[currentSong]);
    audioPlayer.addEventListener('timeupdate', updatePlayer);
    volumeBar.addEventListener('click', volumeChange);
    musicProgress.addEventListener('click', musicProgressChange);
    muteButton.addEventListener('click', mute);
    unmuteButton.addEventListener('click', unmute);
    playButton.addEventListener('click', playPause);
    pauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    audioPlayer.addEventListener('ended', checkRepeating);
    shuffleButton.addEventListener('click', shuffleSong);
    repeatButton.addEventListener('click', repeatSong);
}

const repeatSong = () =>{
    if(isRepeating){
        isRepeating = !isRepeating;
        repeatButton.style.backgroundColor = null;
    }
    else{
        isRepeating = !isRepeating;
        repeatButton.style.backgroundColor = 'orange';
    }
}

const checkRepeating = () =>{
    if(isRepeating){
        audioPlayer.currentTime = 0;
        playPause();
        playPause();
    }
    else{
        nextSong();
    }
}

const nextSong = () => {
    checkShuffle();
    currentSong++;
    if (currentSong > Song.songList.length - 1) {
        currentSong = 0;
    }
    setAudioPlayerInfo(Song.songList[currentSong]);
    playPause();
    playPause();
}

const prevSong = () => {

    if(!prevSongFlag){
    currentSong--;
        if (currentSong < 0) {
            currentSong = Song.songList.length - 1;
        }
    setAudioPlayerInfo(Song.songList[currentSong]);
    playPause();
    playPause();
    }
    else{
        currentSong = previousSong;
        currentSong--;
        if (currentSong < 0) {
            currentSong = Song.songList.length - 1;
        }
        setAudioPlayerInfo(Song.songList[currentSong]);
        playPause();
        playPause();
        prevSongFlag = false;
    }
}

const shuffleSong = () =>{

    if(isShuffling){
        isShuffling = !isShuffling;
        shuffleButton.style.backgroundColor = null;
    }
    else{
        isShuffling = !isShuffling;
        shuffleButton.style.backgroundColor = 'orange';
    }
}

const checkShuffle = () =>{
    previousSong = currentSong + 1;
    if(isShuffling){
        prevSongFlag = true;
        do {
            currentSong = Math.floor(Math.random() * Song.songList.length);
        }
        while (currentSong === previousSong);
        }
}

const volumeChange = (e) => {
  const volume = e.offsetX / volumeBar.offsetWidth;
  audioPlayer.volume = volume;
  volumeBarFill.style.width = `${volume * 100}%`;
}

const musicProgressChange = (e) => {
    const progress = e.offsetX / musicProgress.offsetWidth;
    audioPlayer.currentTime = progress * audioPlayer.duration;
    musicProgressFill.style.width = `${progress * 100}%`;
}


const mute = () => {
    audioPlayer.muted = true;
    muteButton.style.display = 'none';
    unmuteButton.style.display = 'block';
}

const unmute = () => {
    audioPlayer.muted = false;
    muteButton.style.display = 'block';
    unmuteButton.style.display = 'none';
}

const updateProgress = () => {
    musicProgressFill.style.width = `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`;
}

const updateVolume = () => {
    volumeBarFill.style.width = `${audioPlayer.volume * 100}%`;
}

const updatePlayer = () => {
    updateProgress();
    updateVolume();
}


const playPause = () => {
    if (isPlaying) {
        songCover.classList.add('paused');
        audioPlayer.pause();
        isPlaying = false;
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';
    } else {
        songCover.classList.remove('paused')
        void audioPlayer.play();
        isPlaying = true;
        pauseButton.style.display = 'block';
        playButton.style.display = 'none';
    }
}
const setAudioPlayerInfo = (song) => {
    songName.textContent = song.name;
    artist.textContent = song.artist;
    songCover.style.backgroundImage = `url(${song.cover})`;
    audioPlayer.src = song.src;
    volumeBarFill.style.width = `${audioPlayer.volume * 100}%`;
}

currentPlaylist = 'default';
init();

