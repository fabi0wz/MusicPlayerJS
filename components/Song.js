class Song {
    #id
    #name;
    #artist;
    #cover;
    #src;
    static songList = [];
    static songCounter = 0;
    constructor(name, artist, cover, src) {
        this.#id = ++Song.songCounter;
        this.#name = name;
        this.#artist = artist;
        this.#cover = cover;
        this.#src = src;

        Song.songCounter++;
        Song.songList.push(this);
    }

    get name() {
        return this.#name;
    }
    get artist() {
        return this.#artist;
    }
    get cover() {
        return this.#cover;
    }
    get src() {
        return this.#src;
    }
}


