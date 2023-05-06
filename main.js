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

const playButton = document.querySelector('#btPlay');
const pauseButton = document.querySelector('#btPause');
const nextButton = document.querySelector('#btNext');
const prevButton = document.querySelector('#btPrevious');



let isPlaying = false;

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
        name: 'acousticbreeze',
        artist: 'bensound',
        cover: 'assets/images/acousticbreeze.jpg',
        src: 'assets/audio/bensound-acousticbreeze.mp3'
    },
    {
        name: 'anewbeginning',
        artist: 'bensound',
        cover: 'assets/images/anewbeginning.jpg',
        src: 'assets/audio/bensound-anewbeginning.mp3'
    },
    {
        name: 'creativeminds',
        artist: 'bensound',
        cover: 'assets/images/creativeminds.jpg',
        src: 'assets/audio/bensound-creativeminds.mp3'
    },
    {
        name: 'goinghigher',
        artist: 'bensound',
        cover: 'assets/images/goinghigher.jpg',
        src: 'assets/audio/bensound-goinghigher.mp3'
    },
    {
        name: 'happyrock',
        artist: 'bensound',
        cover: 'assets/images/happyrock.jpg',
        src: 'assets/audio/bensound-happyrock.mp3'
    },
    {
        name: 'jazzyfrenchy',
        artist: 'bensound',
        cover: 'assets/images/jazzyfrenchy.jpg',
        src: 'assets/audio/bensound-jazzyfrenchy.mp3'
    },
    {
        name: 'littleidea',
        artist: 'bensound',
        cover: 'assets/images/littleidea.jpg',
        src: 'assets/audio/bensound-littleidea.mp3'
    },
    {
        name: 'memories',
        artist: 'bensound',
        cover: 'assets/images/memories.jpg',
        src: 'assets/audio/bensound-memories.mp3'
    },
    {
        name: 'ukulele',
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

const nextSong = () => {
    currentSong++;
    if (currentSong > songs.length - 1) {
        currentSong = 0;
    }
    setAudioPlayerInfo(songs[currentSong]);
    playPause();
    playPause();
}

const prevSong = () => {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    setAudioPlayerInfo(songs[currentSong]);
    playPause();
    playPause();
}

let currentSong = 0;

const setAudioPlayerInfo = (song) => {
    songName.textContent = song.name;
    artist.textContent = song.artist;
    songCover.style.backgroundImage = `url(${song.cover})`;
    audioPlayer.src = song.src;
    volumeBarFill.style.width = `${audioPlayer.volume * 100}%`;
}


init();

