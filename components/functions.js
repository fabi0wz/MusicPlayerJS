let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

const playPause = () => {
    isPlaying = !isPlaying;
    isPlaying ? play() : pause();

}
const playCheck = () => {
    isPlaying ? play() : pause();
}
const play = () => {
    audioPlayer.play();
    updatePausePlay();
}

const pause = () => {
    audioPlayer.pause();
    updatePausePlay();
}

const nextSong = () => {
    if(isShuffling){
        defaultPlaylist.setPreviousSong = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong);
        do{
        defaultPlaylist.setCurrentSongIndex = Math.floor(Math.random() * defaultPlaylist.getPlaylist.length);
        }
        while(defaultPlaylist.getCurrentSong === defaultPlaylist.getPreviousSong);
    }
    else {
        defaultPlaylist.setCurrentSongIndex = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong) + 1;
        if (defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong) === defaultPlaylist.getPlaylist.length -1) {
            defaultPlaylist.setCurrentSongIndex = 0;
        }
    }
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong);
}

const prevSong = () => { // on button press
    if(isShuffling){ // checks if shuffle is on
        setAudioPlayerInfo(defaultPlaylist.getPreviousSong); // sets audio player info to previous song
    }
    else{ // shuffle is off
        defaultPlaylist.setCurrentSongIndex = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong) - 1; // currentsong--
        if (defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong) < 0) { // checks if it goes below 0
            defaultPlaylist.setCurrentSongIndex = defaultPlaylist.getPlaylist.length - 1; // goes to end of playlist array
        }
        setAudioPlayerInfo(defaultPlaylist.getCurrentSong); // changes audio player info
    }
}

const shuffleSong = () => { // on button press
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

//Dados

//Lógica

//UI