const Mahasiswa = require('./model');

// buat fungsi capitalize untuk huruf awal pertama nya
const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// post mahasiswa / create new
let createMahasiswa = async(req, res, next) => {
    try {
        const { name, nim, jurusan} = req.body;
        // kita panggil dulu untuk nama dan jurusan nya agar huruf awalnya itu uppercase
        const capitalizeName = capitalizeWords(name);
        const capitalizeJurusan = capitalizeWords(jurusan);

        // cek dulu apakah terdapat nama / nim yang sama
        const existingMahasiswa = await Mahasiswa.findOne({$or: [{name: capitalizeName}, {nim}]})

        // ketika ada jalankan ini
        if (existingMahasiswa){
            return res.status(404).json({
                error: "nama atau nim sudah ada!"
            })
        }

        // lalu kita buat baru
        const result = await Mahasiswa.create({name: capitalizeName, nim, jurusan: capitalizeJurusan});
        
        // lalu, panggil datanya menggunakan res status
        res.status(201).json({
            data: result,
        })
    } catch (error) {
        next(
            res.status(404).json({
                error: "Error..id tidak ditemukan",
            })
        );
    };
};

// get all mahasiswa
const indexAllMahasiswa = async(req, res, next) => {
    try {
        const result = await Mahasiswa.find().select('_id name nim jurusan');

        res.status(200).json({
            data: result,
        });
        
    } catch (error) {
        next(
            res.status(404).json({
                message: 'Error..',
            }),
        );
    };
};

// cari mahasiswa berdasarkan id / find id one
const findById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Mahasiswa.findById(id)

        // kita panggil
        res.status(200).json({
            data: result,
        })

        
    } catch (error) {
        next(
            res.status(404).json({
                error: 'error.. id tidak ditemukan'
            })
        )
    }
}

// cari mahasiswa berdasarkan nim / find nim one
const findByNim = async(req, res, next) => {
    try {
        const { nim } = req.params;
        const result = await Mahasiswa.findOne({nim})

        // kita panggil
        res.status(200).json({
            data: result,
        })

        
    } catch (error) {
        next(
            res.status(404).json({
                error: 'error.. id tidak ditemukan'
            })
        )
    }
};

// update mahasiswa berdasarkan id
const update = async(req, res, next) => {
    try {
        const { id } = req.params;
        const { name, nim } = req.body;
        // kita buat kondisi capitalize, klo semisal sudah terlanjur ada hurif kecil, maka harus kita update
        const capitalizeName = capitalizeWords(name)

        const result = await Mahasiswa.findByIdAndUpdate({_id: id}, {name: capitalizeName}, {new: true, runValidators: true})

        res.status(200).json({
            data: result
        })
        
    } catch (error) {
        next(
            res.status(404).json({
                error: "error.. id tidak ditemukan"
            })
        );
    };
};

// delete mahasiswa by id
const destroy = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Mahasiswa.findByIdAndDelete(id);

        res.status(200).json({
            data: result,
            message: "Data Berhasil Di Hapus!",
        })
        
    } catch (error) {
        next(
            res.status(404).json({
                error: "error.. id tidak ditemukan"
            })
        )
    }
}



module.exports = {
    createMahasiswa,
    indexAllMahasiswa,
    findById,
    findByNim,
    update,
    destroy,

}