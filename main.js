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
const currentTimeplayer = document.querySelector('#currentTime');
const totalTime = document.querySelector('#totalTime');


//music buttons
const playButton = document.querySelector('#btPlay');
const pauseButton = document.querySelector('#btPause');
const nextButton = document.querySelector('#btNext');
const prevButton = document.querySelector('#btPrevious');
const shuffleButton = document.querySelector('#btShuffle');
const repeatButton = document.querySelector('#btRepeat');

const tablePlayButtons = document.querySelectorAll('.tablePlayButton');
const tablePauseButtons = document.querySelectorAll('.tablePauseButton');

//initialize the player and all event listeners
const init = () => {
    setAudioPlayerInfo(defaultPlaylist.getCurrentSong);
    audioPlayer.addEventListener('timeupdate', updatePlayer);
    audioPlayer.addEventListener('ended', checkRepeating);
    volumeBar.addEventListener('click', volumeChange);
    volumeBar.addEventListener('wheel', volumeChangewheel);
    volumeBar.addEventListener('mousedown', volumeChangeDrag);
    musicProgress.addEventListener('click', musicProgressChange);
    musicProgress.addEventListener('mousedown', musicMouseDown);
    muteButton.addEventListener('click', mute);
    unmuteButton.addEventListener('click', mute);
    playButton.addEventListener('click', playPause);
    pauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);
    shuffleButton.addEventListener('click', shuffleSong);
    repeatButton.addEventListener('click', repeatSong);
    tablePlayButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            tablePlayButton(index);
        });
    });
   tablePauseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            tablePauseButton(index);
        });
    });
    audioPlayer.addEventListener('loadedmetadata', function() { //only way i found to make the .duration not return a NaN
        musicTimes();
        setInterval(musicTimes, 1000);
      });
}

const shuffleBtnBg = (s) => {
    s ? shuffleButton.style.backgroundColor = 'orange' : shuffleButton.style.backgroundColor = null;
}
const repeatBtnBg = (s) => {
    s ? repeatButton.style.backgroundColor = 'orange' : repeatButton.style.backgroundColor = null;
}
const updateProgress = () => {
    musicProgressFill.style.width = `${(audioPlayer.currentTime / audioPlayer.duration) * 100}%`;
}
const updateVolumeFill = () => {
    volumeBarFill.style.width = `${audioPlayer.volume * 100}%`;
}

const muteBtnUpdate = () => {
    audioPlayer.muted ? muteButton.style.display = 'none' : muteButton.style.display = 'block';
    audioPlayer.muted ? unmuteButton.style.display = 'block' : unmuteButton.style.display = 'none';
}


const setAudioPlayerInfo = (song) => {
    songName.textContent = song.getname;
    artist.textContent = song.getartist;
    songCover.style.backgroundImage = `url(${song.getcover})`;
    audioPlayer.src = song.getsrc;
    volumeBarFill.style.width = `${audioPlayer.volume * 100}%`;
    renderTable(song);
    playCheck();
}

const renderTable = (song) => {
    const childElements = document.querySelectorAll('tr');
    childElements.forEach((child) => {
        child.classList.remove('tableActive');
    });
    //remover o active da musica anterior

    const tableActive = document.querySelector(`.${song.getname}`);
    tableActive.classList.add('tableActive');

    const tableHeight = document.querySelector('#musicTable').offsetHeight;
    const rowPosition = document.querySelector(`.${(defaultPlaylist.getCurrentSong).getname}`).offsetTop;
    const scrollPosition = rowPosition - (tableHeight / 2);
    document.querySelector('#musicTable').scrollTop = scrollPosition;

    isPlaying ? playTable(song) : pauseTable(song);
}

const pauseTable = (song) => {
    const tablePauseButtonsSelect = document.querySelectorAll('.tablePauseButton');
    tablePauseButtonsSelect.forEach((button) => {
        button.classList.add('hidden');
    });

    const tablePlayButtonsSelect = document.querySelectorAll('.tablePlayButton');
    tablePlayButtonsSelect.forEach((button) => {
        button.classList.remove('hidden');
    });
}

const playTable = () => {

    const tablePauseButtonsSelect = document.querySelectorAll('.tablePauseButton');
    tablePauseButtonsSelect.forEach((button) => {
        button.classList.add('hidden');
    });

    const tablePlayButtonsSelect = document.querySelectorAll('.tablePlayButton');
    tablePlayButtonsSelect.forEach((button) => {
        button.classList.remove('hidden');
    });

    const tablePauseButtonSelect = document.querySelector(`.${defaultPlaylist.getCurrentSong.getname} .tablePauseButton`);
    tablePauseButtonSelect.classList.remove('hidden'); // select the pause button and make it visible
    const tablePlayButtonSelect = document.querySelector(`.${defaultPlaylist.getCurrentSong.getname} .tablePlayButton`);
    tablePlayButtonSelect.classList.add('hidden'); // select the play button and make it hidden
}

const updatePausePlay = () => {
    if(isPlaying){
        songCover.classList.remove('paused')
        pauseButton.style.display = 'block';
        playButton.style.display = 'none';

    }else{
        songCover.classList.add('paused');
        pauseButton.style.display = 'none';
        playButton.style.display = 'block';
    }
}

const musicTimes = () => {
    currentTime.textContent = formatTime(audioPlayer.currentTime);
    totalTime.textContent = formatTime(audioPlayer.duration);
  }

init ();