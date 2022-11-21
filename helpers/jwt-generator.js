const jwt = require('jsonwebtoken');

const jwtGenerator = (uid = '') => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.JWTSECRET, { expiresIn: '4h'}, ( err, tkn ) => {
            if(err) {
                console.error(err);
                reject('No fue posible generar el token')
            } else {
                resolve( tkn );
            }
        })
    })
}


module.exports = {
    jwtGenerator
}