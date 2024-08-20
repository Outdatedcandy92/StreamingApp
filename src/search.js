const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');


console.log('Search query:', query);


const apiKey = '7c9d7d20';

const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const container = document.getElementById('container');
        container.innerHTML = '';
        data.Search.forEach((movie) => {
            if (movie.Poster === 'N/A') return;

            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'rounded-div-wrapper';

            const roundedDiv = document.createElement('div');
            roundedDiv.className = 'rounded-div';
            roundedDiv.id = 'rounded-div-id';
            roundedDiv.style.background = `url(${movie.Poster})`;
            roundedDiv.style.backgroundSize = 'cover';
            roundedDiv.style.backgroundPosition = 'center';
            roundedDiv.dataset.imdbid = movie.imdbID;

            const belowTextDiv = document.createElement('div');
            belowTextDiv.className = 'below-text';
            belowTextDiv.textContent = movie.Title;

            wrapperDiv.appendChild(roundedDiv);
            wrapperDiv.appendChild(belowTextDiv);
            container.appendChild(wrapperDiv);

            // Add event listener to each roundedDiv
            roundedDiv.addEventListener('click', () => {
                const query = roundedDiv.dataset.imdbid; 
                console.log('Query:', query);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
