var query;

function displayResults(resJson){
    var resText = document.querySelector('.js-search-results');

    resText.innerHTML = ``;

    resText.innerHTML +=`
        <h3>${resJson.name}</h3>
        <img src="${resJson.sprites.front_default}"/>
        <h4>Moves</h4>
    `
    for(let i = 0;i<resJson.moves.length;i++){
        resText.innerHTML += `
        <p>-${resJson.moves[i].move.name}</p>
        `
    }
    resText.innerHTML +=`<h4>Stats</h4>`
    for(let i = 0;i<resJson.stats.length;i++){
        resText.innerHTML += `
        <p>-${resJson.stats[i].base_stat}  ${resJson.stats[i].stat.name}</p>
        `
    }
    
    
}
function fetchPokemon(){
    var url = 'https://pokeapi.co/api/v2/pokemon/'+query+'/';

    var settings = {
        method : 'GET'
    };

    fetch(url,settings)
    .then(res =>{
        if(res.ok){
            console.log(res);
            return res.json();
        }
        else{
            alert("an Error has ocurred")
            throw new Error(res.statusText);
        }
    })
    .then(resJSON =>{
        displayResults(resJSON);
    })
    .catch(error =>{
        console.log(error);
    })

}
function watchPokeForm(){
    var pokeForm = document.querySelector('.submit-button');
     

    pokeForm.addEventListener('click',(event) =>{
        event.preventDefault();

        query = document.getElementById('query').value;

        console.log(query);

        fetchPokemon();

    })

}



function init(){
    watchPokeForm();
}

init();