import { apiKey } from './config.js';

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');


console.log('Search query:', query);



const url = `http://www.omdbapi.com/?i=${query}&apikey=${apiKey}`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('Data:', data);


        console.log("Selected Name: ", data.Title);

        const bgImageDiv = document.getElementById('bgImage');
        const bgLogoDiv = document.getElementById('bgLogo');

        bgImageDiv.style.background = `url('https://images.metahub.space/background/medium/${data.imdbID}/img') no-repeat center center/cover`;
        bgLogoDiv.src = `https://images.metahub.space/logo/medium/${data.imdbID}/img`;


        const movTime = document.getElementById('movTime');
        const movYear = document.getElementById('movYear');
        const movRating = document.getElementById('movRating');

        movTime.innerHTML = data.Runtime;
        movYear.innerHTML = data.Year;
        movRating.innerHTML = data.imdbRating;


        const movGeneres = document.getElementById('movGeneres');
        const movCast = document.getElementById('movCast');
        const movDirector = document.getElementById('movDirector');
        const movSummary = document.getElementById('movSummary');

        // TODO: IF SERIES CHECK THE WRITERS
        movGeneres.innerHTML = data.Genre;
        movCast.innerHTML = data.Actors;
        movDirector.innerHTML = data.Director;
        movSummary.innerHTML = data.Plot;

        torrentBrowse.search(
            torrentBrowse.defaultProviders,
            data.Title
        ).then(torrents => {
            console.log("Torrent Results: ", torrents);

            const playerContainer = document.getElementById('player-container');
            playerContainer.innerHTML = '';

            torrents.items.slice(0, 20).forEach(item => {
                const { provider, data: { name, seeds, peers, magnet } } = item;
                console.log(`Provider: ${provider}, Name: ${name}, Seeds: ${seeds}, Peers: ${peers},\nMagnet: ${magnet}`);


                const torrentElement = document.createElement('div');
                torrentElement.classList.add('player-item');

                torrentElement.onclick = () => {
                    const torrentData = {
                        id: data.imdbID,
                        magnet: magnet
                    };

                    console.log('Torrent Data:', torrentData);  
                    window.location.href = `play.html?magnet=${encodeURIComponent(magnet)}`;
                    //window.electron.send('torrent-selected', torrentData);
                };

                // CHANGE THIS LATER
                torrentElement.innerHTML = `
                    <div class="player-subitem">${provider}</div>
                    <div class="player-subitem" id="Info-sub">${name}</div>
                    <div class="player-extra">
                        ${seeds} Seeds
                        ${peers} Peers
                    
                    </div>
    `;


                playerContainer.appendChild(torrentElement);
            });
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });