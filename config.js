var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  username: process.env.USERNAME || 'username',
  password: process.env.PASSWORD || 'password',
  provider: process.env.PROVIDER || 'google',
  location: {
    type: 'coords',
    coords: {
      latitude: 51.508565,
      longitude: -0.048844,
      altitude: 0
    }
  }

};
