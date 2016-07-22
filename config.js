var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  username: process.env.USERNAME || 'username',
  password: process.env.PASSWORD || 'password',
  provider: process.env.PROVIDER || 'google',
  location: {
    type: 'coords',
    coords: {
      latitude: 51.507284,
      longitude: -0.051099,
      altitude: 0
    }
  }

};
