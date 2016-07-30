const app = require('http').createServer(handler);
const config = require('./config');
const io = require('socket.io')(app);
const fs = require('fs');
const Pokego = require('pokemon-go-node-api/pokego');
const PokegoService = require('./services/pokego-service');
const util = require('util');
let socket;
let shouldLoop = true;

app.listen(8903);

console.log('Server running on: http://localhost:8903');
function handler (req, res) {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', s => {
  socket = s;

  socket.on('Catch', (pokemon, cb) => {
    Pokego.EncounterPokemon(pokemon.position).then((data) => {
      console.log('EncounterPokemon', data);
      return Pokego.CatchPokemon(data.WildPokemon, config.pokeball);
    }).then((final) => {
      const status = ['Unexpected error', 'Successful catch', 'Catch Escape', 'Catch Flee', 'Missed Catch'];
      if (final.Status === null) {
        console.log('[x] Error: You have no more of that ball left to use!');
      } else {
        console.log('[s] Catch status for ' + pokemon.name + ': ' + status[parseInt(final.Status)]);
      }
      cb({
        code: final.Status,
        text: status[parseInt(final.Status, 10)]
      });
      return final;
    }).catch((err) => {
      console.log(err);
    });
  });

  socket.on('Position', (position, cb) => {
    Pokego.SetLocation(position).then(coords => {
      cb(null, coords);
    }).catch(err => {
      console.log(err);
      cb(err);
    });
  });

  socket.on('Inventory', (position, cb) => {
    Pokego.GetInventory().then(inventory => {
      cb(null, PokegoService.parseInventory(inventory));
    }).catch(err => {
      console.log(err);
      cb(err);
    });
  });

  socket.on('UserPosition', (data, cb) => {
    cb(config.location.coords);
  });
});

util.inspect(console, true);
Pokego.init(config.username, config.password, config.location, config.provider).then(apiEndpoint => {
  let repeatCount = 1;
  Pokego.GetProfile().then((profile) => Pokego.formatPlayercard(profile)).then(() => {
    setInterval(() => {
      if (shouldLoop) {
        Pokego.Heartbeat().then((heart) => {
          console.log('[o] pump' + '.'.repeat(repeatCount));
          repeatCount++;
          repeatCount = repeatCount > 3 ? 1 : repeatCount;
          heart.cells.map(cell => {
            if (cell.WildPokemon[0]) {
              shouldLoop = false;

              cell.WildPokemon.reverse().map(pokemonCell => {
                const pokemon = Pokego.pokemonlist[parseInt(pokemonCell.pokemon.PokemonId, 10) - 1];
                pokemon.position = pokemonCell;

                if (socket) socket.emit('Pokemon', pokemon);
                shouldLoop = true;
              });
            }
          });
        }).catch((err) => { console.log(err); });
      } else {
        console.log('[p] Looping stalled to complete execution of task..');
      }
    }, 2000);
  }).catch(err => console.log(err));
}).catch(err => console.log(err));
