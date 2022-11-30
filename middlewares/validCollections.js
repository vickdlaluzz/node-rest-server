const { request, response } = require("express")


const validCollections = (... validCollectionsNames) => {

    return (req = request, res = response, next) => {
        const { collection } = req.params;
        if (!validCollectionsNames.includes(collection)) {
            return res.status(400).json({
                msg: 'Coleccion no permitida'
            })
        }
    
        next();
    }


} 


module.exports = {
    validCollections
}