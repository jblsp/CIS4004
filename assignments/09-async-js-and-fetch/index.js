function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const path = window.location.pathname; // page specific
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ").filter((c) => c.includes(`=`));
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(val);
    }
  }
  return null;
}

async function fetchPokemon(name) {
  if (name === "") {
    throw new Error("No name or ID given");
  }
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    throw new Error("Pokemon not found");
  }
  const obj = await res.json();
  let moves = [];
  obj.moves.forEach((move) => {
    moves.push(move.move.name);
  });
  return {
    id: obj.id,
    name: obj.name,
    sprite: obj.sprites.front_default,
    sound: obj.cries.latest,
    moves: moves,
  };
}

async function getPokemon(query) {
  let id;
  // checks if the query is an id
  if (/^[0-9]+$/.test(query)) {
    id = query;
  } else {
    id = getCookie(query);
  }

  if (id) {
    const pokemon = getCookie(id);
    if (pokemon) {
      return JSON.parse(pokemon);
    }
  }

  const pokemon = await fetchPokemon(query);
  setCookie(pokemon.name, pokemon.id);
  setCookie(pokemon.id, JSON.stringify(pokemon));
  return pokemon;
}

window.onload = () => {
  const findPokemonForm = document.getElementById("findPokemonForm");
  const errMsg = document.getElementById("errMsg");
  const loadedAudio = document.getElementById("loadedPokemonAudio");
  const move1 = document.getElementById("smove1");
  const move2 = document.getElementById("smove2");
  const move3 = document.getElementById("smove3");
  const move4 = document.getElementById("smove4");
  const addBtn = document.getElementById("addBtn");
  const loadedImg = document.getElementById("loadedPokemonImg");
  const loadedName = document.getElementById("loadedPokemonName");

  function loadPokemon(pokemon) {
    loadedName.textContent = pokemon.name;
    loadedImg.src = pokemon.sprite;
    const source = document.createElement("source");
    source.src = pokemon.sound;
    source.type = "audio/ogg";
    loadedAudio.replaceChildren(source);
    loadedAudio.load();
    let moveOptions = [];
    pokemon.moves.forEach((move) => {
      const opt = document.createElement("option");
      opt.value = move;
      opt.textContent = move;
      moveOptions.push(opt);
    });

    move1.replaceChildren(...moveOptions.map((opt) => opt.cloneNode(true)));
    move2.replaceChildren(...moveOptions.map((opt) => opt.cloneNode(true)));
    move3.replaceChildren(...moveOptions.map((opt) => opt.cloneNode(true)));
    move4.replaceChildren(...moveOptions.map((opt) => opt.cloneNode(true)));
  }

  findPokemonForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const formData = new FormData(findPokemonForm);
    const query = formData.get("query");
    getPokemon(query.toLowerCase())
      .then((pokemon) => {
        errMsg.textContent = "";
        loadPokemon(pokemon);
      })
      .catch((err) => {
        errMsg.textContent = err;
      });
  });

  addBtn.addEventListener("click", (_) => {
    if (loadedName.textContent === "") {
      return;
    }

    const team = document.getElementById("team");

    const pokemon = document.createElement("div");

    const img = document.createElement("img");
    img.src = loadedImg.src;
    pokemon.appendChild(img);

    const movesList = document.createElement("ol");
    const movel1 = document.createElement("li");
    const movel2 = document.createElement("li");
    const movel3 = document.createElement("li");
    const movel4 = document.createElement("li");
    movel1.textContent = move1.value;
    movel2.textContent = move2.value;
    movel3.textContent = move3.value;
    movel4.textContent = move4.value;
    movesList.appendChild(movel1);
    movesList.appendChild(movel2);
    movesList.appendChild(movel3);
    movesList.appendChild(movel4);
    pokemon.appendChild(movesList);

    team.appendChild(pokemon);
  });
};
