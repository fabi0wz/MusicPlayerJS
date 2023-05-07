class Playlist{
    #playlist = [];

    constructor() {
        this.#playlist = [];
    }

    addSong(song) {
        this.#playlist.push(song);
    }

    removeSong(id) {
        let index = this.#playlist.indexOf(this.#playlist.id);
        this.#playlist.splice(index, 1);
    }
}