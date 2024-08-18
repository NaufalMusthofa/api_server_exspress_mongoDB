// kita panggil mongoose
const mongoose = require('mongoose');

// setealh itu, kita panggil urlDb nya
const { urlDb } = require('../config');

// konekan ke mongo db yang tealh kita konfigurasi
mongoose.connect(urlDb);

// buat constant db nya
const db = mongoose.connection;

// export
module.exports = db;

