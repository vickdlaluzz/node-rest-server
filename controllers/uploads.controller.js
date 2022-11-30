const { request, response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const { uploadFile } = require("../helpers/uploadFile");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");



const cargarArchivo = async(req = request, res = response) => {
    // let sampleFile;
  let uploadPath;

  try {
    const filePath = await uploadFile(req.files);
    
    res.json({
      filePath
    })
  } catch (msg) {
    res.status(400).json({
      msg
    })
  }


}


const updateImg = async(req = request, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) return res.status(400).json({ msg: 'No existe el recurso solicitado'}) 
      
      
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) return res.status(400).json({ msg: 'No existe el recurso solicitado'}) 

      break
    default:
      return res.status(500).json({ msg: `No esta implementada la coleccion ${value}`})
  }

  // TODO: Limpiar imgs anteriores
  if ( modelo.img ) {
    const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
    if (fs.existsSync(pathImg)) {
      fs.unlinkSync( pathImg );
    }
  }

  const filePath = await uploadFile(req.files, undefined, collection);
  modelo.img = filePath;
  await modelo.save();
  
  
  
  
  res.json({
    msg: 'Imagen cargada correctamente',
    modelo
  })
}



const updateImgCloudinary = async(req = request, res = response) => {
  const { id, collection } = req.params;

  let modelo;

  switch (collection) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) return res.status(400).json({ msg: 'No existe el recurso solicitado'}) 
      
      
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) return res.status(400).json({ msg: 'No existe el recurso solicitado'}) 

      break
    default:
      return res.status(500).json({ msg: `No esta implementada la coleccion ${value}`})
  }

  // TODO: Limpiar imgs anteriores
  if ( modelo.imgId ) {
    try {
      await cloudinary.uploader.destroy(modelo.imgId)
      
    } catch (error) {
      console.log(error);
    }
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url, public_id } = await cloudinary.uploader.upload( tempFilePath );;

  // const filePath = await uploadFile(req.files, undefined, collection);
  // modelo.img = filePath;
  modelo.img = secure_url;
  modelo.imgId = public_id;
  await modelo.save();
  
  
  
  
  res.json({
    msg: 'Imagen cargada correctamente',
    modelo
  })
}

const getImg = async(req = request, res = response) => {
  const { id, collection } = req.params;
  
  let modelo;
  const pathNoImg = path.join(__dirname, '../uploads', 'no-image.jpg');

  switch (collection) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if (!modelo) return res.sendFile(pathNoImg);
      
      
      break;
    case 'productos':
      modelo = await Producto.findById(id);
      if (!modelo) return res.sendFile(pathNoImg);


      break
    default:
      return res.status(500).json({ msg: `No esta implementada la coleccion ${value}`})
  }

  // TODO: Limpiar imgs anteriores
  if ( modelo.img ) {
    const pathImg = path.join(__dirname, '../uploads', collection, modelo.img);
    if (fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  res.sendFile(pathNoImg);
}



module.exports = {
    cargarArchivo,
    updateImgCloudinary,
    updateImg,
    getImg
}