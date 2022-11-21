const { request, response } = require("express")


const isAdmin = (req = request, res = response, next) => {
    const user = req.user;
    if (user.rol !== 'ADMIN_ROLE') return res.status(403).end();
    

    next();
}

const hasRole = ( ...roles) => {

    return (req = request, res = response, next) => {
        if (!roles.includes(req.user.rol)) return res.status(403).end();
        next();
    }
}

const isOwner = (req = request, res = response, next) => {
    
}

module.exports = {
    isAdmin,
    hasRole
}