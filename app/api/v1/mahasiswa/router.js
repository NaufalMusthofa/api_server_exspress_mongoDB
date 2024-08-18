const { createMahasiswa, indexAllMahasiswa, findByNim, findById, update, destroy } = require('./controller');

const express = require('express').Router;
const router = express();

// get all
router.get('/mahasiswa', indexAllMahasiswa);

// post mahasiswa
router.post('/mahasiswa', createMahasiswa);

// get one mahasiswa by id / bisa juga nim
router.get('/mahasiswa/:id', findById);
router.get('/mahasiswa/:nim', findByNim);

// update
router.put('/mahasiswa/:id', update);

// delete
router.delete('/mahasiswa/:id', destroy);

module.exports = router;