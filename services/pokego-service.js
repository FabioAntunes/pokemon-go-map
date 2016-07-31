const Pokego = require('pokemon-go-node-api/pokego');

module.exports = {
  parseInventory: parseInventory
};

function parseInventory (inventory) {
  inventory = inventory.inventory_delta.inventory_items;
  return inventory.reduce((inventory, item) => {
    const pokemon = item.inventory_item_data.pokemon;
    const bagItem = item.inventory_item_data.item;
    const candy = item.inventory_item_data.pokemon_family;
    const stats = item.inventory_item_data.player_stats;

    if (pokemon !== null && pokemon.pokemon_id !== null) {
      inventory.pokemons.push(Pokego.pokemonlist[parseInt(pokemon.pokemon_id, 10) - 1]);
    } else if (bagItem !== null && bagItem.item !== null) {
      inventory.items.push({
        item: Pokego.whatItem(bagItem.item),
        count: bagItem.count || 0
      });
    } else if (candy !== null && candy.family_id !== null) {
      inventory.candies.push({
        candy: Pokego.whatFamily(candy.family_id),
        count: candy.candy || 0
      });
    } else if (pokemon !== null && pokemon.is_egg === true) {
      inventory.eggs.push(pokemon);
      console.log('An egg', pokemon);
    } else if (stats !== null) {
      inventory.stats.push(stats);
    } else {
      console.log(item);
    }

    return inventory;
  }, {
    pokemons: [],
    items: [],
    candies: [],
    stats: [],
    eggs: []
  });
}
