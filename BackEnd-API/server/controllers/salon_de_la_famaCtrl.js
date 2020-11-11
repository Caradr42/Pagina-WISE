const SalonDeLaFama = require('../../database/models/salon_de_la_fama')
let SalonDeLaFamaCtrl = {}

SalonDeLaFamaCtrl.insert_publication = async(nombre, descripción, img) => {

    let newSalonDeLaFamaCtrl = await new SalonDeLaFama({
        'nombre': nombre,
        'descripción': descripción,
        'img': img
    })

    newSalonDeLaFamaCtrl.save(function(err, salon_de_la_fama) {
        if (err) return console.error(err);
        console.log(salon_de_la_fama.nombre + " saved to collection.");
    });
}

SalonDeLaFamaCtrl.delete_salon_de_la_fama = async(nombre) => {
    await SalonDeLaFama.findOneAndDelete({ 'nombre': nombre }, async(err) => {
        if (err) console.log(err);
        console.log("Successful deletion");
    })
}

SalonDeLaFamaCtrl.getAll = async() => {

    const res = await SalonDeLaFama.find({}, (err) => {
        if (err) console.log(err)
    })

    return res

}

SalonDeLaFamaCtrl.insert_samples = async() => {



}


module.exports = SalonDeLaFamaCtrl