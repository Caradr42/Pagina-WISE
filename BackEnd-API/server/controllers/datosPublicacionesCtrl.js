const Publicacion = require('../../database/models/datosPublicacionesSchema')

let PublicacionesCtrl = {}

PublicacionesCtrl.insert_publication = async(title, content, imgs) => {

    let new_publication = await new Publicacion({
        'title': title,
        'markdownContent': content,
        'imgs': imgs
    })

    new_publication.save(function(err, publication) {
        if (err) return console.error(err);
        console.log(publication.title + " saved to collection.");
    });
}

PublicacionesCtrl.delete_publication = async(title) => {
    await Publicacion.findOneAndDelete({ 'title': title }, async(err) => {
        if (err) console.log(err);
        console.log("Successful deletion");
    })
}

PublicacionesCtrl.getAll = async() => {

    const res = await Publicacion.find({}, (err) => {
        if (err) console.log(err)
    })

    return res

}

PublicacionesCtrl.insert_samples = async() => {

}


module.exports = PublicacionesCtrl