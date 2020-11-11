const Patrocinador = require('../../database/models/salon_de_la_fama')
let PatrocinadorCtrl = {}

PatrocinadorCtrl.insert_publication = async(nombre, descripción, img) => {

    let newPatrocinadorCtrl = await new SalonDeLaFama({
        'nombre': nombre,
        'descripción': descripción,
        'img': img
    })

    newPatrocinadorCtrl.save(function(err, patrocinador) {
        if (err) return console.error(err);
        console.log(patrocinador.nombre + " saved to collection.");
    });
}

PatrocinadorCtrl.delete_patrocinador = async(nombre) => {
    await Patrocinador.findOneAndDelete({ 'nombre': nombre }, async(err) => {
        if (err) console.log(err);
        console.log("Successful deletion");
    })
}

PatrocinadorCtrl.getAll = async() => {

    const res = await Patrocinador.find({}, (err) => {
        if (err) console.log(err)
    })

    return res

}

PatrocinadorCtrl.insert_samples = async() => {

}


module.exports = PatrocinadorCtrl