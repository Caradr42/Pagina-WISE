const AdminsCtrl = require("../../BackEnd-API/server/controllers/adminsCtrl");

//middleware to check who can see hidden content  in /good, only if they are logged in
const isLoggedIn = async (req, res, next) => {
    //console.log(req);
    
    if (req.user) {
        //Verify that the user is an admin in the admins collection
        const admin = await AdminsCtrl.findByOID(req.user.OID)
            .then(adm => {
                if(adm){
                    console.log("Admin found with ID: " + adm.OID);
                    next();
                }else{
                    console.log("User " + req.user.email + " is not admin");
                    res.redirect('/failed');
                }
                return adm;
            });
    }else{
        res.redirect('/failed');
    }
};

module.exports = isLoggedIn;