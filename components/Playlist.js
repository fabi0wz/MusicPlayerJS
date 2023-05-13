class Playlist{
    #playlist = [];
    #currentSong = 0;
    #previousSong = 0;

    constructor() {
        this.#playlist = [];
        this.#currentSong = 0;
    }

    addSong(song) {
        this.#playlist.push(song);
    }

    removeSong(id) {
        let index = this.#playlist.indexOf(this.#playlist.id);
        this.#playlist.splice(index, 1);
    }

    get getPlaylist() {
        return this.#playlist;
    }

    get getCurrentSong() {
        return this.#playlist[this.#currentSong];
    }

    set setCurrentSongIndex(songindex) {
        if (songindex < 0 || songindex >= this.#playlist.length) {
            throw new Error('Invalid song songindex');
        }
        this.#currentSong = songindex;
    }

    get getPreviousSong() {
        return this.#playlist[this.#previousSong];
    }

    set setPreviousSong(songindex) {
        if (songindex < 0 || songindex >= this.#playlist.length) {
            throw new Error('Invalid song index');
        }
        this.#previousSong = songindex;
    }
}