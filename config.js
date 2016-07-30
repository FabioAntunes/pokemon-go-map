const dotenv = require('dotenv');
dotenv.load();

let pokeball = process.env.POKEBALL || 'POKE_BALL';

switch (pokeball) {
  case 'ULTRA_BALL':
    pokeball = 3;
    break;
  case 'GREAT_BALL':
    pokeball = 2;
    break;
  default:
    pokeball = 1;
    break;
}

module.exports = {
  username: process.env.USERNAME || 'username',
  password: process.env.PASSWORD || 'password',
  provider: process.env.PROVIDER || 'google',
  pokeball: pokeball,
  location: {
    type: 'coords',
    coords: {
     //latitude: 51.546322,
     latitude: 51.501742,
      //longitude: -0.228539,
      longitude: -0.117093,
      altitude: 0
    }
  }

};
