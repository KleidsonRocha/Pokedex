const parametro = new URLSearchParams(window.location.search)
const pokemon = parametro.get('pokemon')
getDetail(pokemon)

function ConvertApiDetailPokemonObject(pokeDetail) {

    
    //falta criar o objeto certinho do pokemon

    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)
    const [move] = moves
    pokemon.moves = moves
    pokemon.move = move

    pokemon.hp = pokeDetail.stats[0].base_stat

    pokemon.experience = pokeDetail.base_experience

    pokemon.atack = pokeDetail.stats[1].base_stat

    pokemon.defence = pokeDetail.stats[2].base_stat

    pokemon.spatack = pokeDetail.stats[3].base_stat

    pokemon.spdefence = pokeDetail.stats[4].base_stat

    pokemon.speed = pokeDetail.stats[5].base_stat

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    return pokemon
}

function getDetail(pokemon = "ditto") {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

    return fetch(url)
        .then((response) => response.json())
        .then(ConvertApiDetailPokemonObject)
        .then((PokemonDetais) => atualizaHtml(PokemonDetais))
}

function atualizaHtml(dadosPokemon) {
    const html = convertToPageHtml(dadosPokemon);

    const pokeDetail = document.getElementById('PokeDetails') 
    pokeDetail.innerHTML = html;
}

function convertToPageHtml(PokemonDetais) {
    //falta exibir os dados do pokemon
    return `
        <div class="content">
            <section class="detailHeader">
                <a href="http://127.0.0.1:5500/"><img src="/assets/images/pokedexLogo.png" alt="Pokedex" class="img"></h1></a>
                <h1>#${PokemonDetais.number}</h1>
            </section>
            <section class="detailPhoto">
              <img class="img" src="${PokemonDetais.photo}" alt="${PokemonDetais.name}">
            </section>      
        </div>

        <div>
            <h1>${PokemonDetais.name}</h1>
            <div class="pokeInfo">
                <h2 class="pokemonInfo">HP${PokemonDetais.hp}/${PokemonDetais.hp}</h2>
                <h2 class="pokemonInfo">EXP${PokemonDetais.experience}</h2>
            </div>
            <div >
                <ol class="pokemonType">
                ${PokemonDetais.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="pokemonHeightWeight">
                <ol class="pokemonHeight">
                <h1 class="pokemonSize">${PokemonDetais.height} KG</h1>
                <p class="pokemonSizeComplement">height</p>
                </ol>
                <ol class="pokemonWeight">
                <h1 class="pokemonSize">${PokemonDetais.weight} M</h1>
                <p  class="pokemonSizeComplement">weight</p>
                </ol>
        </div>
        
        <ol class="pokemonStats">
            <h1>Base Stats</h1>
            <li class="pokemonStat">
                <h1>HP:</h1>
                <h2 class="pokemonStatName">${PokemonDetais.hp}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.hp}" max="250"></progress>
            </li>
            <li class="pokemonStat">
                <h1>Atack:</h1>
                <h2 class="pokemonStatName">${PokemonDetais.atack}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.atack}" max="250"></progress>
            </li>
            <li class="pokemonStat">
                <h1>Defence:</h1>
                <h2 class="pokemonStatName">${PokemonDetais.defence}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.defence}" max="250"></progress>
            </li>
            <li class="pokemonStat">
                <h1>SPAtack:</h1>
                <h2 class="pokemonStatName">${PokemonDetais.spatack}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.spatack}" max="250"></progress>
            </li>
            <li class="pokemonStat">
                <h1>SPDefence</h1>
                <h2 class="pokemonStatName">${PokemonDetais.spdefence}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.spdefence}" max="250"></progress>
            </li>
            <li class="pokemonStat">
                <h1>Speed</h1>
                <h2 class="pokemonStatName">${PokemonDetais.speed}</h2>
                <progress class="pokemonStatBar" value="${PokemonDetais.speed}" max="250">kleidson</progress>
            </li>
        </ol>
        
    `;
}



