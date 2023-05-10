// Path: components\songlist.js

const musicList = document.querySelector('#musicList');

defaultPlaylist.getPlaylist.forEach((song) => {
    const tr = musicList.createElement('tr');
    tr.innerHTML = '<th scope="row">1</th><td>Mark</td><td>Otto</td>';
   /*     <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
        </tr>*/

});

