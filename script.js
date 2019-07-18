const cityJson = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


const cities = [];

fetch(cityJson).then(blob => blob.json())
    .then(data => cities.push(...data));


function numberWithCommas(num){
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}

function displayMatch() {
    const matchAray = findMatches(this.value, cities);
    const html = matchAray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="h1">${this.value}</span>`)

        return `
        <li><span class="name">${cityName} , ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span></li>`
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);
