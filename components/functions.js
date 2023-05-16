let isPlaying = false;
let isRepeating = false;
let isShuffling = false;

const playPause = () => { //play/pause button
    isPlaying = !isPlaying;
    isPlaying ? playStart() : pause();

}
const playCheck = () => { //check if the song is playing or not and act accordingly
    isPlaying ? playStart() : pause();
}
const playStart = () => { //start / play button
    isPlaying = true;
    audioPlayer.play();
    updatePausePlay();
    playTable();
}

const pause = () => { // pause button
    audioPlayer.pause();
    updatePausePlay();
    pauseTable();
}

let shuffleFlag = false; //flag for saving previous song (make the shuffle return to previous song and then each song --)
const nextSong = () => { // next song function, song index++ or shuffle with math rand
    if(isShuffling){
        shuffleFlag = true;
        defaultPlaylist.setPreviousSong = defaultPlaylist.getPlaylist.indexOf(defaultPlaylist.getCurrentSong);
        do{
        defaultPlaylist.setCurrentSongIndex = Math.floor(Math.random() * defaultPlaylist.getPlaylist.length);
        }
        while(defaultPlaylist.getCurrentSong === defaultPlaylist.getPreviousSong);
    }
    else {

        try { //if next song is not available, go to the first song
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
            // If an error is thrown, set the current song to 0
            defaultPlaylist.setCurrentSongIndex = (defaultPlaylist.getPlaylist.length) - 1;
        }
    }
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong); // changes audio player info
}

const shuffleSong = () => { // on button press (toggle)
    shuffleFlag = !shuffleFlag; // changes shuffle status
    isShuffling = !isShuffling; // changes shuffle status
    shuffleBtnBg(isShuffling); // changes bg fill
}


const repeatSong = () => { // on button press (toggle)
    isRepeating = !isRepeating; // changes repeat status
    repeatBtnBg(isRepeating); // changes bg fill
}

const checkRepeating = () =>{ // checks if repeat is on and acts accordingly
    isRepeating ? audioPlayer.currentTime = 0 : nextSong(); // if repeat is on, restart song, else, go to next song
    playCheck(); // check if the song is playing or not and act accordingly
}

const musicProgressChange = (e) => { // changes song progress on click
    const progress = e.offsetX / musicProgress.offsetWidth; // get the progress in %
    audioPlayer.currentTime = progress * audioPlayer.duration; // set the current time to the progress
    updatePlayer(); // update the player
}

const musicMouseDown = () => {
    musicProgress.addEventListener('mousemove', musicProgressChange);
    document.addEventListener('mouseup', () => {
        musicProgress.removeEventListener('mousemove', musicProgressChange);
    });
}



const volumeChange = (e) => {
    audioPlayer.volume = e.offsetX / volumeBar.offsetWidth;
    updatePlayer();
}

const volumeChangeDrag = () => {
    volumeBar.addEventListener('mousemove', volumeChange);
    volumeBar.addEventListener('mouseup', () => {
        volumeBar.removeEventListener('mousemove', volumeChange);
    });
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


const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

//Dados

//Lógica

//UI