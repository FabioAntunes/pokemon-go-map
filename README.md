# Pokemon-GO-Map

Walk on the map and catch pokemon.

![Map image](https://cloud.githubusercontent.com/assets/2544673/17276415/d4b3ba76-5720-11e6-8701-1a9b6753802b.png)

## Install instructions

Do a git clone of this project `cd` into the directory an run:

`npm install`

There's a `.env.example` file run the following command:

`cp .env.example .env`

Edit the `.env` file with your credentials, if you want to login with your pokemon trainer club change the provider to ptc:
`PROVIDER=ptc`

To change your starting position, edit the `config.js`, right now it's starting in the middle of London.

Tested and working on node 6.3.0

### Features
- [x] Click to Walk
- [x] Catch pokemon on click
- [x] Remove expired pokemon, from the map
- [x] Browser notifications, on new pokemon
- [ ] Change Pokeball
- [ ] See invetory items
- [ ] Show pokestops, interact with them and get the items
- [ ] Walk from a point to another, automatically
