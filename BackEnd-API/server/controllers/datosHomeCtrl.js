const mongoose = require('mongoose')
//const { update } = require('../../database/models/datosPublicacionesSchema')
const DatosHome = require('../../database/models/datosHomeSchema')
let DatosHomeCtrl = {};

// const infoGeneralModel = {
//     title: String,
//     top_content: [String],
//     slide_imgs: [String],
//     columns: [{
//         title: String,
//         content: String
//     }]
// }

// const contactoModel = {
//     tipo: String,
//     url: String,
//     icono: String
// };

//only necesary if to completely overwrite after deletion but not really necesary
// DatosHomeCtrl.insert_data = async (slide_imgs, title, columns, contactos, copyright) => {
//     newDatosHome = await new DatosHome({
//         slide_imgs: slide_imgs,
//         title: title,
//         columns: columns,
//         contactos: contactos,
//         copyright: copyright
//     });

//     await newDatosHome.save(function(err, datos) {
//         if (err) return console.error(err);
//         console.log("datos saved to collection.");
//     });
// }

DatosHomeCtrl.insert_contact = async (contact) => {

    newUpdate = { "$push": { contactos: contact } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
         if (err) return console.error(err);
         console.log("contact added saved to collection.");
    })
}

DatosHomeCtrl.delete_contact = async(contact) => {

    newUpdate = { "$pop": { contactos: contact } };

    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
        if (err) return console.error(err);
        console.log("contact deleted saved to collection.");
    });
}

DatosHomeCtrl.insert_column = async (column) => {

    newUpdate = { "$push": { columns: column } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
         if (err) return console.error(err);
         console.log("contact added saved to collection.");
    })
}

DatosHomeCtrl.delete_column = async(column) => {

    newUpdate = { "$pop": { columns: column } };

    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
        if (err) return console.error(err);
        console.log("contact deleted saved to collection.");
    });
}

DatosHomeCtrl.insert_slide_img = async (img) => {

    newUpdate = { "$push": { slide_imgs: img } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
         if (err) return console.error(err);
         console.log("contact added saved to collection.");
    })
}

DatosHomeCtrl.delete_slide_img = async(img) => {

    newUpdate = { "$pop": { slide_imgs: img } };

    await DatosHome.findOneAndUpdate({}, newUpdate, (err, contacto_u) => {
        if (err) return console.error(err);
        console.log("contact deleted saved to collection.");
    });
}

DatosHomeCtrl.update = async(data) =>{
    await DatosHome.findOneAndUpdate({}, data, (err, contacto_u) => {
        if (err) return console.error(err);
        console.log("Home data updated");
    });
}

DatosHomeCtrl.get = async() =>{

    

    const home_doc = await DatosHome.find({}, (err, doc) => {
        if (err) console.error(err);
    });

    return home_doc;
}

//no deberia de ser necesario
// DatosHomeCtrl.getAll = async() => {

//     const res = await DatosHome.find({}, (err) => {
//         if (err) console.log(err)
//     })

//     return res
// }

DatosHomeCtrl.inset_sampes = async() => {

}

module.exports = DatosHomeCtrl