class Song {
    #id = 0;
    #name;
    #artist;
    #cover;
    #src;
    static songList = [];
    constructor(name, artist, cover, src) {
        this.#id = (defaultPlaylist.getPlaylist).length;
        this.#name = name;
        this.#artist = artist;
        this.#cover = cover;
        this.#src = src;
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

    get getId(){
        return this.#id;
    }
}




