const User = require('../../database/models/user');

let UsersController = {};

UsersController.createUser = async(name, OID, email, img) => {
    const newUser = new User({ name, OID, email, img});

    await newUser.save((err, datos) => {
        if (err) return console.error(err);
        console.log(datos.name + " : " + datos.email  + "saved to collection.");
    });
}

UsersController.updateUser = async(restrictions, data) => {
    await User.updateOne(restrictions, data, (err) => {
        if (err) return console.error(err); 
    });
}

UsersController.deleteUserByOID = async(OID) => {
    await User.findOneAndDelete({'OID': OID}, async(err) => {
        if (err) console.log(err);
        console.log("Successfuly deleted user");
    });    
}

UsersController.findAll = async() => {
    const usr = await User.find({}, (err, usrs) => {
        if (err) console.log(err);

        //console.log(usrs);
        return usrs;
    });
    return usr;
}

UsersController.findByOID = async(OID) => {
    const usr = await User.findOne({'OID': OID}, async(err, usr) => {
        if (err) console.log(err);
        return usr;
    });
    return usr;
}

UsersController.findOrCreate = async(name, OID, email, img) => {
    //console.log('finding user ======================');

    const user = await User.findOne({'OID': OID}, async(err, usr) => {
        if (err) console.log(err);

        if (usr){ //just return the found user
            //console.log('user found ======================: ' + usr.name);
            return usr;

        }else { //create new user in DB
            //console.log('creating user ====================');
            
            const newUser = new User({'name':name, 'OID': OID, 'email': email, 'img': img});

            return await newUser.save((err, datos) => {
                if (err) {
                    console.log("Error on user creation:" + err)
                    return console.error(err);
                }

                console.log(datos.name + " : " + datos.email  + " saved to users collection.");
                //console.log('user created ====================: ' + datos.name);
                return datos;
            });
        }
    });

    return user;
}

module.exports = UsersController;