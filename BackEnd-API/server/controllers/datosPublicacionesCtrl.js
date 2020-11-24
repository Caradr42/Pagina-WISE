const Publicacion = require('../../database/models/datosPublicacionesSchema');

let PublicacionesCtrl = {}

PublicacionesCtrl.insert_publication = async(title, imgs, content, link, linkText) => {

    let publicacion = {
        'title': title,
        'imgs': imgs,
        'markdownContent': content,
        'date': Date.now()
    };

    if (link || link !== ""){
        publicacion['link'] = link;
        publicacion['linkText'] = linkText;
    }

    let new_publication = await new Publicacion(publicacion);

    new_publication.save(function(err, publication) {
        if (err) return console.error(err);
        console.log(publication.title + " saved to collection.");
    });
}


// PublicacionesCtrl.remove_publication_by_index = async(index, imgs) => {

//     let tempObj = {};
//     tempObj[`patrocinadores.${index}`] = 1;

//     await DatosHome.update({}, {$unset : tempObj});
//     await DatosHome.update({}, {$pull : {"patrocinadores" : null}}).then((err) => {
//         fs.unlink("./public/" + img, (err) => {
//             if (err) {
//                 console.log("failed to delete local image:"+err);
//             } else {
//                 console.log('successfully deleted local image');                                
//             }
//         });
//     });
// };


PublicacionesCtrl.delete_publication_by_id = async(id) => {
    await Publicacion.findOneAndDelete({ '_id': id }, async(err) => {
        if (err) console.log(err);
        console.log("Successful deletion");
    })
}

PublicacionesCtrl.update = async(restrictions, data) => {
    await Publicacion.updateOne(restrictions, data, (err) => {
        if (err) return console.error(err); 
    });
}

PublicacionesCtrl.getAll = async() => {
    const res = await Publicacion.find({}, (err) => {
        if (err) console.log(err)
    })
    return res;
}

module.exports = PublicacionesCtrl;