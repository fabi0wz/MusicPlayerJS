let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

const playPause = () => {
    isPlaying = !isPlaying;
    isPlaying ? playStart() : pause();

}
const playCheck = () => {
    isPlaying ? playStart() : pause();
}
const playStart = () => {
    isPlaying = true;
    audioPlayer.play();
    updatePausePlay();
    playTable();
}

const pause = () => {
    audioPlayer.pause();
    updatePausePlay();
    pauseTable();
}

let shuffleFlag = false;
const nextSong = () => {
    if(isShuffling){
        shuffleFlag = true;
        defaultPlaylist.setPreviousSong = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong);
        do{
        defaultPlaylist.setCurrentSongIndex = Math.floor(Math.random() * defaultPlaylist.getPlaylist.length);
        }
        while(defaultPlaylist.getCurrentSong === defaultPlaylist.getPreviousSong);
    }
    else {

        try {
            defaultPlaylist.setCurrentSongIndex = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong) + 1;
        }
        catch (Error) {
            defaultPlaylist.setCurrentSongIndex = 0;
        }
    }
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong);
}


const prevSong = () => { // on button press
    if(shuffleFlag){ // checks if shuffle is on
            defaultPlaylist.setCurrentSongIndex = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getPreviousSong); // currentsong = previous song
            shuffleFlag = false;
    }
    else{ // shuffle is off
        try {
            defaultPlaylist.setCurrentSongIndex = (defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong)) - 1; // currentsong--
        } catch (Error) {
            // If an error is thrown, log it and set the current song to 0
            defaultPlaylist.setCurrentSongIndex = (defaultPlaylist.getPlaylist.length) - 1;
        }
    }
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong); // changes audio player info
}

const shuffleSong = () => { // on button press
    shuffleFlag = !shuffleFlag; // changes shuffle status
    isShuffling = !isShuffling; // changes shuffle status
    shuffleBtnBg(isShuffling); // changes bg fill
}


const repeatSong = () => {
    isRepeating = !isRepeating;
    repeatBtnBg(isRepeating);
}

const checkRepeating = () =>{
    isRepeating ? audioPlayer.currentTime = 0 : nextSong();
    playCheck();
}

const musicProgressChange = (e) => {
    const progress = e.offsetX / musicProgress.offsetWidth;
    audioPlayer.currentTime = progress * audioPlayer.duration;
    updatePlayer();
}

const volumeChange = (e) => {
    audioPlayer.volume = e.offsetX / volumeBar.offsetWidth;
    updatePlayer();
}

const mute = () =>{
    audioPlayer.muted = !audioPlayer.muted;
    muteBtnUpdate(audioPlayer.muted);
}


const updatePlayer = () => {
    updateProgress();
    updateVolumeFill();
}


const volumeChangewheel = (event) => {
    if (event.deltaY < 0) { // mousewheel up
        if(audioPlayer.volume >= 1){
            audioPlayer.volume = 1;
            return;
        }
        const up = audioPlayer.volume + 0.1;
        audioPlayer.volume = up.toFixed(1);
    } else if (event.deltaY > 0) { // mousewheel down
        if(audioPlayer.volume <= 0){
            audioPlayer.volume = 0;
            return;
        }
        const res = audioPlayer.volume - 0.1;
        audioPlayer.volume = res.toFixed(1);
    }
    updateVolumeFill();
};

const tablePlayButton = (index) => {
    defaultPlaylist.setCurrentSongIndex = index;
    playStart();
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong);
}

const tablePauseButton = () => {
    playPause();
    pauseTable();
}


//Dados

//Lógica

//UI