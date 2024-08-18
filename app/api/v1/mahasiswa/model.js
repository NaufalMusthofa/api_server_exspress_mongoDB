const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let mahasiswaSchema = new Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Panjang nama minimal 3 karakter'],
            maxlength: [40, 'Panjang nama maksimal 40 karakter'],
            required: [true, 'Nama harus diisi'],
        },
        nim: {
            type: Number,
            maxlength: [12, 'Panjang NIM maksimal 12 karakter'],
            required: [true, 'NIM harus diisi'],
        },
        jurusan: {
            type: String,
            maxlength: [28, 'Panjang jurusan maksimal 28 karakter'],
            required: [true, 'Jurusan harus diisi'],
        },
    },
    {
        timestamps: {
            currentTime: () => {
                // Menyesuaikan waktu ke WIB (UTC+7)
                const now = new Date();
                const offset = 7 * 60; // Menambahkan 7 jam dalam menit
                const localDate = new Date(now.getTime() + offset * 60 * 1000);
                
                // Mengonversi waktu ke format 24 jam
                return localDate;
            }
        }
    }
);

module.exports = model('Student', mahasiswaSchema);
