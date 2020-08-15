const poke_container = document.querySelector("#poke_container");
const pokemons_nbr = 204;
const api_url = "https://pokeapi.co/api/v2/pokemon";
const pokEffectUrl = "https://pokeapi.co/api/v2/ability";
const grassEffect =
  "When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.";
const fireEffect =
  "When this Pokémon has 1/3 or less of its HP remaining, its fire-type moves inflict 1.5× as much regular damage.";
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

let i = 0;

const main_types = Object.keys(colors);
//console.log(main_types);

const getPokemon = async (id) => {
  const pokUrl = `${api_url}/${id}`;
  const res = await fetch(pokUrl);
  const pokemon = await res.json();
  const abilityUrl = pokemon.abilities[0].ability.url;
  const pokemonEffect = await getPokEffects(abilityUrl);

  //console.log(id);
  //console.log(pokemon);
  createPokemonCard(pokemon, pokemonEffect);
};

const getPokEffects = async (EffectsUrl) => {
  const pokEffectsUrl = `${EffectsUrl}`;
  const res = await fetch(EffectsUrl);
  const pokEffect = await res.json();
  return pokEffect;
};

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_nbr; i++) await getPokemon(i);
};

fetchPokemons();

function createPokemonCard(pokemon, pokemonEffect) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  const poke_name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  let effect;
  const ability = pokemon.abilities[0].ability.name;
  i++;
  effect = pokemonEffect.effect_entries[1].effect;

  if (i > 6) {
    //effect = pokemonEffect.effect_entries[1].effect;
  }

  const pokeInnerHtml = `
    <div class="img-container">
        <img src= "https://pokeres.bastionbot.org/images/pokemon/${
          pokemon.id
        }.png" />
    </div>
 
  <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${poke_name}</h3>
    <small class="type"> Type : <span>${type}</span></small> <br>
    <small class="ability"> Ability : <span>${ability}</span></small> <br>
    <!--small>${
      i > 6 ? effect : i > 3 ? fireEffect : i <= 3 ? grassEffect : ""
    }</small-->
    <a href="#" data-izimodal-open="#effectModal" class="effectBtn" data-izimodal-transitionin="fadeInDown"> <small> Effect <small> </a>
  </div>
  `;
  pokemonEl.innerHTML = pokeInnerHtml;
  poke_container.appendChild(pokemonEl);

  pokemonEl.style.backgroundColor = color;
}

$(document).on("click", ".effectBtn", function (event) {
  event.preventDefault();
  // $('#modal').iziModal('setZindex', 99999);
  // $('#modal').iziModal('open', { zindex: 99999 });

  $("#effectModal").iziModal("open");
});
