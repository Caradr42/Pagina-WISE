const mongoose = require('mongoose')

const DatosMain = require('../../database/models/datosMainSchema')
let DatosMainCtrl = {};

DatosMainCtrl.update = async(data) =>{
    await DatosMain.updateOne({}, data, (err) => {
        if (err) return console.error(err);

        console.log("Home data updated");
    });
}

DatosMainCtrl.get = async() =>{
    
    const main_doc = await DatosMain.find({}, (err, doc) => {
        if (err) console.error(err);
    });

    return main_doc;
}

///------------------ contacto
DatosMainCtrl.insert_contacto = async (data) => {

    newUpdate = { "$addToSet": { contactos: data } };
    
    await DatosMain.findOneAndUpdate({}, newUpdate, (err) => {
         if (err) return console.error(err);
         console.log("column added to collection.");
    });
}

DatosMainCtrl.remove_contacto_by_index = async(index) => {

    let tempObj = {};
    tempObj[`contactos.${index}`] = 1;

    await DatosMain.update({}, {$unset : tempObj});
    await DatosMain.update({}, {$pull : {"contactos" : null}});
}





module.exports = DatosMainCtrl