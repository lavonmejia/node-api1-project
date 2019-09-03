const express = require('express');
const database = require('./data/db');

const server = express();

server.use(express.json()) // for parsing application/json
server.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

server.get('/api/users', (req, res) => {
    database.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: "The users information could not be retrieved." }))
}); 

server.get('/api/users/:id', (req, res) => {
    database.findById(req.params['id'])
    .then((data) => { if (data === undefined) {res.status(404).json({message: "The user with the specified ID does not exist."})} else {res.status(200).json(data)}})
    .catch((err) => res.status(500).json({error:"The user information could not be retrieved."}))
});
   

server.post('/api/users', (req, res) => {
    if (!('bio' in req.body) || !('name' in req.body)){
      res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
    }
    database.insert({name: req.body.name, bio: req.body.bio})
    .then(data => res.status(200).json(data))
    .catch(reason => res.status(500).json({ error: "There was an error while saving the user to the database" }))
   });
    
server.delete('/api/users/:id', (req, res) => {
 database.remove(req.params['.id'])
  .then((data) => { 
      if (data === undefined) {
          res.status(404).json({message: "The user with the specified ID does not exist."})
      } else {res.status(200).json(data)}})
  .catch((err) => res.status(500).json({error: "The user could not be removed."}))
    });

server.put('/api/users/:id', (req, res) => {     
    database.update(req.params['.id'], {name: req.body.name, bio: req.body.bio})
    .then((data) => {
        if (data === undefined) {
            res.status(404).json({message:"The user with the specified ID does not exist."})
        } else  if ((!('bio' in req.body) || !('name' in req.body))){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {res.status(200).json(data)}
        })
    .catch((err) => res.status(500).json({error: "The user information could not be modified."}))
})    

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  res.status(200).json(hobbits);
});

server.listen(8000, () => console.log('API running on port 8000'));