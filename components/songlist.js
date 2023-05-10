// Path: components\songlist.js

const musicList = document.querySelector('#musicList');

defaultPlaylist.getPlaylist.forEach((song) => {
    const tr = document.createElement('tr');
    const thId = document.createElement('th');
    const tdArtist = document.createElement('td');
    const tdName = document.createElement('td');

    thId.textContent = defaultPlaylist.(song);
    tdArtist.textContent = music.artist;
    tdName.textContent = music.name;

    tr.appendChild(thId);
    tr.appendChild(tdArtist);
    tr.appendChild(tdName);

    musicList.appendChild(tr);
});

