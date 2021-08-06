const express = require('express');
const router = express.Router();
const { Souvenir, People, Places, Things } = require('../db');

router.get('/souvenir', async (req, res) => {
    res.send(await Souvenir.findAll({include: [People, Places, Things]}));
})





module.exports = router;