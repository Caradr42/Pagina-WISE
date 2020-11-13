const Admin = require('../../database/models/admin')
const UsersCtrl = require("./usersCtrl");

let AdminsController = {}

AdminsController.pushAdmin = async(OID) => {
    const newAdmin = new Admin({OID});

    //if user exists in DB, allow for the creation of an Admin
    UsersCtrl.findByOID(OID).then(user => {
        if (user.OID === OID){
            newAdmin.save((err, admin) => {
                if (err) return console.error(err);
                console.log(admin.OID + " : " + user.email  + "saved to admins collection.");
            });
        }else{
            console.log("user for OID " + OID + " not found. Could not save Admin");
        }
    });    
}

AdminsController.deleteAdmin = async(OID) => {
    await Admin.findOneAndDelete({'OID': OID}, async(err) => {
        if (err) console.log(err);
        console.log("Successfuly deleted user");
    });    
}

AdminsController.getAll = async() => {
    const res = await Admin.find({}, (err) => {
        if (err) console.log(err);
    })

    return res;
}

AdminsController.findByOID = async(OID) => {
    const adm = await Admin.findOne({'OID': OID}, async(err, adm) => {
        if (err) console.log(err);

        return adm;
    });
    return adm;
}

module.exports = AdminsController;