
//middleware to check who can see hidden content  in /good, only if they are logged in
const isLoggedIn = async (req, res, next) => {
    //console.log(req);
    
    if (req.user && req.user.isAdmin) {
        next();
    }else{
        res.redirect('/failed');
    }
};

module.exports = isLoggedIn;