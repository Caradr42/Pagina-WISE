const Evento = require('../../database/models/datosEventosSchema');

let EventosCtrl = {}

EventosCtrl.insert_event = async(title, imgs, content, link, event_date) => {

    let new_event = await new Evento({
        'title': title,
        'imgs': imgs,
        'markdownContent': content,
        'event_link': link,
        'event_date': event_date,
        'date': Date.now()
    });

    new_event.save(function(err, event) {
        if (err) return console.error(err);
        console.log(event.title + " saved to collection.");
    });
}

EventosCtrl.delete_event_by_id = async(id) => {
    await Evento.findOneAndDelete({ '_id': id }, async(err) => {
        if (err) console.log(err);
        console.log("Successful deletion");
    })
}

EventosCtrl.update = async(restrictions, data) => {
    await Evento.updateOne(restrictions, data, (err) => {
        if (err) return console.error(err); 
    });
}

EventosCtrl.getAll = async() => {
    const res = await Evento.find({}, (err) => {
        if (err) console.log(err)
    })
    return res;
}

module.exports = EventosCtrl;