class Song {
    #id
    #name;
    #artist;
    #cover;
    #src;
    constructor(id, name, artist, cover, src) {
        this.#id = id;
        this.#name = name;
        this.#artist = artist;
        this.#cover = cover;
        this.#src = src;
    }
}

songCounter = 0; // counter for generating unique IDs for songs
function addSongs(currentPlaylist) {
    let id = songCounter;
    let title = prompt("Enter the song title:");
    let artist = prompt("Enter the artist:");
    let source = prompt("Enter the source:");
    let imageSource = prompt("Enter the image source:");

    let newSong = new Song(id, title, artist, source, imageSource); // create a new song object
    currentPlaylist.addSong(newSong); // add the song to the playlist
    songCounter++; // increment the counter for the next song
}