/*
we want to :
-host static files (as html)
-comunicat with the client
-save to a database
-autenticaion
*/

//ROUTE = PROCESSO 
//ROUTER = L'APPLICAZIONE CHE SI OCCUPA DI GESTIRE TUTTI I PROCESSI, LE ROUTES
//IL ROUTING è IL MODO IN CUI VENGONO GESTITE LE RICHIESTE E LE RISPOSTE DEL CLIENT 
//TRAMITE D METODI DI APP

//IL ROUTE PATH è IL PATH A CUI UNO SPECIFICO METODO SI OCCUPA DI REQUESTS E RESPOSNES

const express = require('express');
// const https = require('https');
const path = require('path');
const fs = require('fs');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;//port to which the server start listening
//the express server hosts the html file
const Datastore = require('nedb');
// const { dirname } = require('path/posix');
// app.use(express.static('public'));


const db = new Datastore('database.db');
db.loadDatabase();//load the file on the memory

const path_to_skyscrapers = `${__dirname}/Grattacieli`
const path_to_BattleShip = `${__dirname}/BattagliaNavale`

//EACH ROUTe HAS TO HAVE ITS OWN FILE HTML TO RENDER, AND YOU CAN GO 
//FROM ONE TO ANOTHER USING LINKS IN THE HTML FILES

//loads at route / the index.html conteined on path /public/home/index.html
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/home/index.html'));
});

router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/register/register.html'));
});

app.use('/', router);
app.use(express.json());//indispensabile sennò il body della request è undefinied
app.use(express.text());

//you can perform a post request to each route of the server, specifing it
//NB: you can also do it to a route which does not already exist: in this case that route is created
app.post('/register', (request, response) => {

  //find username in the database:
  //if it does already exist gives an error and asks to change username
  //otherwhise it inserts user and password in the database
  const data = request.body;
  const user = data.user;
  // const pass = data.pass;

  db.find({ user: user }, (err, docs) => {
    if (docs.length == 0) {
      db.insert(data);//to insert data in the database
      console.log(data);
      response.json({
        status: 'success',
        user: user,
        // pass: pass
      })
    }
    else {
      console.log('user already existing');
      response.json({
        status: 'user already existing',
      })
    }
  });
})

app.post('/access', (request, response) => {

  //the data sended to route /access
  //are searched in the database; if the user is already registered he is logged in
  //otherwise he is suggested to register (by the html file)
  const data = request.body;
  const user = data.user;

  db.find({ user: user }, (err, docs) => {
    if (docs.length != 0) {
      let user_data = docs[0];//data in database about the user logging in
      console.log(user_data);

      router.get(`/LogicGames/${user}`, (req, res) => {
        res.sendFile(__dirname + '/LogicGames/index.html');
      });

      //skyscrapers
      router.get(`/LogicGames/${user}/SkyScrapers`, (req, res) => {
        res.sendFile(path_to_skyscrapers + '/index.html');
      })

      router.get(`/LogicGames/${user}/SkyScrapers/Clues`, (req, res) => {
        res.sendFile(path_to_skyscrapers + '/Clues.js');
      })
      router.get(`/LogicGames/${user}/SkyScrapers/Grid`, (req, res) => {
        res.sendFile(path_to_skyscrapers + '/Grid.js');
      })
      router.get(`/LogicGames/${user}/SkyScrapers/GameCreation`, (req, res) => {
        res.sendFile(path_to_skyscrapers + '/GameCreation.js');
      })
      router.get(`/LogicGames/${user}/SkyScrapers/Interaction`, (req, res) => {
        res.sendFile(path_to_skyscrapers + '/Interaction.js');
      })
      
      //battleship
      router.get(`/LogicGames/${user}/BattleShip`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/index.html');
      })

      router.get(`/LogicGames/${user}/BattleShip/Elements`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/Elements.js');
      })
      router.get(`/LogicGames/${user}/BattleShip/Grid`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/Grid.js');
      })
      router.get(`/LogicGames/${user}/BattleShip/Indizi`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/Indizi.js');
      })
      router.get(`/LogicGames/${user}/BattleShip/Interaction`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/Interaction.js');
      })
      router.get(`/LogicGames/${user}/BattleShip/Navi`, (req, res) => {
        res.sendFile(path_to_BattleShip + '/Navi.js');
      })

      app.post(`/LogicGames/${user}/select`, (req, res) => {
        res.json({
          user: user,
          status: 'success'
        })
      })

      response.json({
        status: 'success',
        user: user
      })

      //skyscrapers
      app.post(`/LogicGames/${user}/SkyScrapers/data`, (req, res) => {

        db.update({ user: user }, {
          $set: {
            "skyscrapers.grid": req.body.grid,
            "skyscrapers.cluegrid": req.body.cluegrid,
            "skyscrapers.solution": req.body.solution,
            "skyscrapers.usage": req.body.usage
          }
        }, {}, function () {
        })
        
        console.log(user + ' sended his data about skyscrapers');

        db.find({ user: user }, (err, docs) => {
          user_data = docs[0];
        })

        res.json({
          status: 'done'
        })
      })

      app.post(`/LogicGames/${user}/SkyScrapers/get_data`, (req, res) => {

        if (user_data.skyscrapers) { 
          const grid = user_data.skyscrapers.grid;
          const cluegrid = user_data.skyscrapers.cluegrid;
          const solution = user_data.skyscrapers.solution;
          const usage = user_data.skyscrapers.usage;
          res.json({
            status: 'done',
            grid: grid,
            cluegrid: cluegrid,
            solution: solution,
            usage: usage

          })
        }
        else {
          res.json({
            status: 'empty'
          })          
        }
        
      })

      //battleship
      app.post(`/LogicGames/${user}/BattleShip/data`, (req, res) => {

        db.update({ user: user }, {
          $set: {
            "battleship.grid": req.body.grid,
            "battleship.naviPosizionate": req.body.naviPosizionate,
            "battleship.elements": req.body.elements
          }
        }, {}, function () {
        })

        db.find({ user: user }, (err, docs) => {
          user_data = docs[0];
        })

        console.log(user + ' sended his data about battleship');

        res.json({
          status: 'done'
        })
      })

      app.post(`/LogicGames/${user}/BattleShip/get_data`, (req, res) => {

        if (user_data.battleship) {
          const grid = user_data.battleship.grid
          const naviPosizionate = user_data.battleship.naviPosizionate
          const elements = user_data.battleship.elements
          res.json({
            status: 'done',
            grid: grid,
            naviPosizionate: naviPosizionate,
            elements: elements
          })
        }
        else {
          res.json({
            status: 'empty'
          })
        }

      })


    }
    else {
      console.log('not registered');
      response.json({
        status: 'failed',
      })
    }
  });
})

app.listen(port, () => console.log('listening to port ' + port));
// const httpsServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

//httpsServer.listen(3443, () => console.log('Secure server with https on port 3000'))

// //TO REMOVE ELEMENTS FROM THE DATABASE
// db.remove({ user: 'franco' }, { multi: false }, (err, numRemoved) => {
//     console.log(numRemoved);
// });


