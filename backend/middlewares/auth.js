const { getUser } = require("../services/auth");

function restrictToLoggedinUser(req, res , next){
    const token = req.cookies.uid
    // console.log(token)
    if(!token){
        return res.status(401).json({ message : "Unauthorized" } )
    }
    const user = getUser(token)
    if(!user){
        
        return res.status(401).json({ message : "Unauthorized" } )
    }
    req.user = user
    next();

}

module.exports = {
    restrictToLoggedinUser
}