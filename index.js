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
const path_to_piramide = `${__dirname}/Piramide`

//EACH ROUTe HAS TO HAVE ITS OWN FILE HTML TO RENDER, AND YOU CAN GO 
//FROM ONE TO ANOTHER USING LINKS IN THE HTML FILES

//loads at route / the index.html conteined on path /public/home/index.html
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/home/index.html'));
});

app.use('/', router);
app.use(express.json());//indispensabile sennò il body della request è undefinied
app.use(express.text());

//you can perform a post request to each route of the server, specifing it
//NB: you can also do it to a route which does not already exist: in this case that route is created

app.post('/access', (request, response) => {

  //the data sended to route /access
  //are searched in the database; if the user is already registered he is logged in
  //otherwise he is suggested to register (by the html file)
  const data = request.body;
  const user = data.user;

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
  router.get(`/LogicGames/${user}/SkyScrapers/images`, (req, res) => {
    res.sendFile(path_to_skyscrapers + '/background.jpg');
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
  router.get(`/LogicGames/${user}/BattleShip/images`, (req, res) => {
    res.sendFile(path_to_BattleShip + '/background.jpg');
  })

  //piramide
  router.get(`/LogicGames/${user}/Piramide`, (req, res) => {
    res.sendFile(path_to_piramide + '/index.html');
  })
  router.get(`/LogicGames/${user}/Piramide/GameCreation`, (req, res) => {
    res.sendFile(path_to_piramide + '/GameCreation.js');
  })
  router.get(`/LogicGames/${user}/Piramide/Interaction`, (req, res) => {
    res.sendFile(path_to_piramide + '/Interaction.js');
  })
  router.get(`/LogicGames/${user}/Piramide/Grid`, (req, res) => {
    res.sendFile(path_to_piramide + '/Grid.js');
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
})

app.listen(port, () => console.log('listening to port ' + port));

