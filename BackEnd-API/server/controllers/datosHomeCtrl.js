const mongoose = require('mongoose')
const { update } = require('../../database/models/datosPublicacionesSchema')
const DatosHome = require('../../database/models/datosPublicacionesSchema')
let DatosHomeCtrl = {}

const infoGeneralModel = {
    title: String,
    top_content: [String],
    slide_imgs: [String],
    columns: [{
        title: String,
        content: String
    }]
}

const contactoModel = {
    tipo: String,
    url: String,
    icono: String
}

DatosHomeCtrl.insert_data = async(infoGeneral, contacto) => {
    newDatosHome = await new DatosHome({
        infoGeneral: infoGeneral,
        contacto: [contacto]
    })

    await newDatosHome.save(function(err, datos) {
        if (err) return console.error(err);
        console.log("datos saved to collection.");
    });
}

DatosHomeCtrl.insert_contact = async(contact) => {

    newUpdate = { "$push": { contacto: contact } }

    await DatosHome.findOneAndUpdate({}, newUpdate, function(err, contacto_u) {
        if (err) return console.error(err);
        console.log("contact added saved to collection.");
    })
}

DatosHomeCtrl.delete_contact = async(contact) => {

    newUpdate = { "$pop": { contacto: contact } }

    await DatosHome.findOneAndUpdate({}, newUpdate, function(err, contacto_u) {
        if (err) return console.error(err);
        console.log("contact deleted saved to collection.");
    })
}

DatosHomeCtrl.getAll = async() => {

    const res = await DatosHome.find({}, (err) => {
        if (err) console.log(err)
    })

    return res

}

DatosHomeCtrl.inset_sampes = async() => {



}

module.exports = DatosHomeCtrl