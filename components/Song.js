class Song {
    #name;
    #artist;
    #cover;
    #src;
    static songList = [];
    constructor(name, artist, cover, src) {
        this.#name = name;
        this.#artist = artist;
        this.#cover = cover;
        this.#src = src;
r
        defaultPlaylist.addSong(this);
    }

    get getname() {
        return this.#name;
    }
    get getartist() {
        return this.#artist;
    }
    get getcover() {
        return this.#cover;
    }
    get getsrc() {
        return this.#src;
    }
}




