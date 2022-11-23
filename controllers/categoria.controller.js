const { request, response } = require("express");
const categoria = require("../models/categoria");

const Categoria = require("../models/categoria");

const crearCategoria  = async(req = request, res = response) => {
    const  nombre = req.body.nombre.toUpperCase();

    const catDb = await Categoria.findOne({nombre});

    if (catDb) return res.status(400).json({
        msg: `La categoria ${ nombre } ya existe.`
    })

    const data = {
        nombre,
        usuario: req.user._id,
        estado: true
    }

    let categoria = new Categoria(data);
    
    categoria = await Categoria.create(categoria);
    res.status(201).json({
        msg: 'Se ha creado la categoria',
        categoria
    })
}

const getCategorias = async(req = request, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };
    const [ categorias, total ] = await Promise.all([
                    Categoria.find(query)
                        .populate('usuario', 'nombre correo')
                        .skip(Number(from))
                        .limit(Number(limit)),
                    Categoria.countDocuments(query)
    ])
    res.json({
        total,
        elements: categorias.length,
        categorias
    })
}

const getCategoriaById = async(req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
                .populate('usuario', 'nombre correo');
    res.status(200).json({
        categoria
    })
}

const updateCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();
    const catDb = await Categoria.findOne({nombre});
    if (catDb) return res.status(400).json({
        msg: `Ya existe una categoria ${nombre}`
    })
    const catUpdated = await Categoria.findByIdAndUpdate(id, {nombre}); 
    res.status(200).json({
        msg: 'Categoria actualizada correctamente',
        categoria: catUpdated
    })

}

const deleteCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const catDb = await Categoria.findByIdAndUpdate(id,{estado: false});
    res.status(200).json({
        msg: `Se ha eliminado la categoria ${catDb.nombre}`,
    })
}

module.exports = {
    crearCategoria,
    getCategorias,
    updateCategoria,
    getCategoriaById,
    deleteCategoria
}