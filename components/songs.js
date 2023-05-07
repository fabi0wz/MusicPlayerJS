class Song {
    #id
    #name;
    #artist;
    #cover;
    #src;
    songList = [];

    constructor(id, name, artist, cover, src) {
        this.#id = id;
        this.#name = name;
        this.#artist = artist;
        this.#cover = cover;
        this.#src = src;

        songCounter++;
        this.songList.push(this);
    }
}


