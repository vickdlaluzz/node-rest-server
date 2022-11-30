const path = require('path');
const { v4: uuidv4 } =require('uuid');

const uploadFile = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], foledeName = '' ) => {

    console.log(files);
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const extension = archivo.name.split('.')[ archivo.name.split('.').length - 1 ];
        if (!validExtensions.includes( extension )) return reject(`No se permite este tipo de archivo`);
        const name = uuidv4() + '.' + extension;
        uploadPath = path.join(__dirname,'../uploads/', foledeName, name);
      
        archivo.mv(uploadPath, function(err) {
          if (err) return reject(err);

          resolve(name);
        });
    })
}



module.exports = {
    uploadFile
}