const mongoose = require('mongoose')

const DatosHome = require('../../database/models/datosHomeSchema')
let DatosHomeCtrl = {};

DatosHomeCtrl.update = async(data) =>{
    await DatosHome.updateOne({}, data, (err) => {
        if (err) return console.error(err);

        console.log("Home data updated");
    });
};

DatosHomeCtrl.get = async() =>{
    
    const home_doc = await DatosHome.find({}, (err, doc) => {
        if (err) console.error(err);
    });

    return home_doc;
};

///------------------ slides
DatosHomeCtrl.insert_slide_img = async (img) => {

    newUpdate = { "$addToSet": { slide_imgs: img } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err) => {
         if (err) return console.error(err);
         console.log("slide added saved to collection.");
    })
};

DatosHomeCtrl.delete_slide_img = async(img) => {

    newUpdate = { "$pull": { slide_imgs: img } };

    await DatosHome.findOneAndUpdate({}, newUpdate, (err) => {
        if (err) return console.error(err);
        console.log("slide deleted saved to collection.");
    });
};
///------------------ 


///------------------ columns
DatosHomeCtrl.insert_column = async (column) => {

    newUpdate = { "$addToSet": { columns: column } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err) => {
         if (err) return console.error(err);
         console.log("column added to collection.");
    });
};

DatosHomeCtrl.remove_column_by_index = async(index) => {

    let tempObj = {};
    tempObj[`columns.${index}`] = 1;

    await DatosHome.update({}, {$unset : tempObj});
    await DatosHome.update({}, {$pull : {"columns" : null}});
};
///------------------


///------------------ patrocinadores
DatosHomeCtrl.insert_patrocinador = async (data) => {

    newUpdate = { "$addToSet": { patrocinadores: data } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err) => {
         if (err) return console.error(err);
         console.log("column added to collection.");
    });
};

DatosHomeCtrl.remove_patrocinador_by_index = async(index) => {

    let tempObj = {};
    tempObj[`patrocinadores.${index}`] = 1;

    await DatosHome.update({}, {$unset : tempObj});
    await DatosHome.update({}, {$pull : {"patrocinadores" : null}});
};
///------------------


///------------------ salon
DatosHomeCtrl.insert_to_salon= async (data) => {

    newUpdate = { "$addToSet": { salon_de_la_fama: data } };
    
    await DatosHome.findOneAndUpdate({}, newUpdate, (err) => {
         if (err) return console.error(err);
         console.log("column added to collection.");
    });
};

DatosHomeCtrl.remove_from_salon_by_index = async(index) => {

    let tempObj = {};
    tempObj[`salon_de_la_fama.${index}`] = 1;

    await DatosHome.update({}, {$unset : tempObj});
    await DatosHome.update({}, {$pull : {"salon_de_la_fama" : null}});
};


module.exports = DatosHomeCtrl