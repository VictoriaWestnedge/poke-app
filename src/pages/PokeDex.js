import { useState, useEffect } from "react";
import capitalizeName from "../components/capitalizeName";

const PokeDex = ({pokeDataById}) => {

  const [flavorData, setFlavorData] = useState(null)

  const fetchFlavorText = async (url) => {
    const flavorUrlData = await fetch(url);
    const flavorUrlsJson = await flavorUrlData.json();
    setFlavorData(flavorUrlsJson.flavor_text_entries[0].flavor_text);
  }

  useEffect(() => {
    fetchFlavorText(pokeDataById.species.url);
  }, []);

  return (
    <div>
      <img src={pokeDataById.sprites.front_default} style= {{ width: "60%" }} />
      <h2>#{pokeDataById.id} {capitalizeName(pokeDataById.name)}</h2>
      {flavorData &&
        <p>{flavorData}</p>
      }
      <p><strong>WT </strong>{pokeDataById.weight}</p>
      <p><strong>HT </strong>{pokeDataById.height}</p>
      <p><strong>Types </strong>{capitalizeName(pokeDataById.types.map(type => type.type.name).join(', '))}</p>
    </div>
  )
}

export default PokeDex;
