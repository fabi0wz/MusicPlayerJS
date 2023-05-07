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

//initialize the player and all event listeners
const init = () => {
    setAudioPlayerInfo(songs[currentSong]);
    audioPlayer.addEventListener('timeupdate', updatePlayer);
    volumeBar.addEventListener('click', volumeChange);
    musicProgress.addEventListener('click', musicProgressChange);
    muteButton.addEventListener('click', mute);
    unmuteButton.addEventListener('click', unmute);
    playButton.addEventListener('click', playPause);
    pauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    audioPlayer.addEventListener('ended', nextSong);
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

const nextSong = () => {
    checkShuffle();
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    setAudioPlayerInfo(songs[currentSong]);
    playPause();
    playPause();
}

const prevSong = () => {

    if(!prevSongFlag){
    currentSong--;
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
    setAudioPlayerInfo(songs[currentSong]);
    playPause();
    playPause();
    }
    else{
        currentSong = previousSong;
        currentSong--;
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
        setAudioPlayerInfo(songs[currentSong]);
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
            currentSong = Math.floor(Math.random() * songs.length);
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


// list of songs
const songs = [
    {
        // name: 'acousticbreeze',
        name: 'song 1',
        artist: 'bensound',
        cover: 'assets/images/acousticbreeze.jpg',
        src: 'assets/audio/bensound-acousticbreeze.mp3'
    },
    {
        // name: 'anewbeginning',
        name: 'song 2',
        artist: 'bensound',
        cover: 'assets/images/anewbeginning.jpg',
        src: 'assets/audio/bensound-anewbeginning.mp3'
    },
    {
        // name: 'creativeminds',
        name: 'song 3',
        artist: 'bensound',
        cover: 'assets/images/creativeminds.jpg',
        src: 'assets/audio/bensound-creativeminds.mp3'
    },
    {
        // name: 'goinghigher',
        name: 'song 4',
        artist: 'bensound',
        cover: 'assets/images/goinghigher.jpg',
        src: 'assets/audio/bensound-goinghigher.mp3'
    },
    {
        // name: 'happyrock',
        name: 'song 5',
        artist: 'bensound',
        cover: 'assets/images/happyrock.jpg',
        src: 'assets/audio/bensound-happyrock.mp3'
    },
    {
        // name: 'jazzyfrenchy',
        name: 'song 6',
        artist: 'bensound',
        cover: 'assets/images/jazzyfrenchy.jpg',
        src: 'assets/audio/bensound-jazzyfrenchy.mp3'
    },
    {
        // name: 'littleidea',
        name: 'song 7',
        artist: 'bensound',
        cover: 'assets/images/littleidea.jpg',
        src: 'assets/audio/bensound-littleidea.mp3'
    },
    {
        // name: 'memories',
        name: 'song 8',
        artist: 'bensound',
        cover: 'assets/images/memories.jpg',
        src: 'assets/audio/bensound-memories.mp3'
    },
    {
        // name: 'ukulele',
        name: 'song 9',
        artist: 'bensound',
        cover: 'assets/images/ukulele.jpg',
        src: 'assets/audio/bensound-ukulele.mp3'
    }
];


const playPause = () => {
    if (isPlaying) {
        songCover.classList.add('paused');
        audioPlayer.pause();
        isPlaying = false;
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';
    } else {
        songCover.classList.remove('paused')
        audioPlayer.play();
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

