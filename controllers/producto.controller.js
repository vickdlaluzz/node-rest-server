const { request, response } = require("express");
const Producto = require("../models/producto");


const createProducto = async(req = request, res = response) => {
    const usuario = req.user._id;
    const { nombre, precio = 0.0, categoria, descripcion } = req.body;
    let producto = new Producto({
        nombre,
        precio,
        categoria,
        descripcion,
        usuario
    });
    producto = await Producto.create(producto);
    res.status(201).json({
        msg: 'Se ha creado el producto con exito',
        producto
    });

}


const getProductos = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };
    const [ productos, total ] = await Promise.all([
                    Producto.find(query)
                        .populate('usuario', 'nombre correo')
                        .populate('categoria', 'nombre')
                        .skip(Number(from))
                        .limit(Number(limit)),
                    Producto.countDocuments(query)
    ])
    res.json({
        total,
        elements: productos.length,
        productos
    })
}


const updateProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const { nombre, precio, categoria, descripcion, disponible } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, {
        nombre,
        precio,
        categoria,
        descripcion,
        disponible
    }, {new: true})
    .populate('usuario', 'nombre correo')
    .populate('categoria', 'nombre');
    res.status(200).json({
        msg: 'Se actualizo el producto correctamente',
        producto
    });

}

const deleteProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})
    .populate('usuario', 'nombre correo')
    .populate('categoria', 'nombre');
    res.status(200).json({
        msg: 'Se elimino el producto correctamente',
        producto
    }); 
}

module.exports = {
    createProducto,
    getProductos,
    updateProducto,
    deleteProducto
}