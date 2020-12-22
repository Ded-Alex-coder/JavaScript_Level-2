const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

router.get('/', (req, res) => {
   fs.readFile('./db/getBasket.json', 'utf-8', (err, data) => {
      if (err) {
         res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
      } else {
         res.send(data);
      }
   })
});

router.post('/:id/:name', (req, res) => {
   handler(req, res, 'add', './db/getBasket.json');
});
router.put('/:id/:name', (req, res) => {
   handler(req, res, 'change', './db/getBasket.json');
});
router.delete(`/:id/:name`, (req, res) => {
   handler(req, res, 'remove', `./db/getBasket.json`);
});

module.exports = router;
