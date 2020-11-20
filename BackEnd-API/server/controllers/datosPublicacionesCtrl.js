const Publicacion = require('../../database/models/datosPublicacionesSchema');

let PublicacionesCtrl = {}

PublicacionesCtrl.insert_publication = async(title, imgs, content) => {

    let new_publication = await new Publicacion({
        'title': title,
        'imgs': imgs,
        'markdownContent': content,
        'date': Date.now()
    });

    new_publication.save(function(err, publication) {
        if (err) return console.error(err);
        console.log(publication.title + " saved to collection.");
    });
}

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