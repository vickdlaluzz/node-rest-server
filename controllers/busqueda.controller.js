const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");



const coleccionesDisponibles = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async(termino, res = response) => {
    if (isValidObjectId(termino)) {
        const user = await Usuario.findById(termino);
        return res.status(200).json({
            results: (user) ? [ user ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    
    const [ results, count ] = await Promise.all([
        Usuario.find({ 
            $or: [
                { nombre: regex},
                { correo: regex }
            ],
            $and: [
                { estado: true }
            ]
        }),
        Usuario.count({ 
            $or: [
                { nombre: regex},
                { correo: regex }
            ],
            $and: [
                { estado: true }
            ]
        })
    ])
    return res.status(200).json({
        count,
        results
    })
}


const buscarCategorias = async(termino, res = response) => {
    if (isValidObjectId(termino)) {
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            results: (categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    
    const [ results, count ] = await Promise.all([
        Categoria.find({ 
            nombre: regex
        }),
        Categoria.count({ 
            nombre: regex
        })
    ])
    return res.status(200).json({
        count,
        results
    })
}


const buscarProducto = async(termino, res = response) => {
    if (isValidObjectId(termino)) {
        const producto = await Producto.findById(termino);
        return res.status(200).json({
            results: (producto) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i');
    
    const [ results, count ] = await Promise.all([
        Producto.find({ 
            $or: [
                { nombre: regex},
                { descripcion: regex }
            ],
            $and: [
                { estado: true }
            ]
        }),
        Producto.count({ 
            $or: [
                { nombre: regex},
                { descripcion: regex }
            ],
            $and: [
                { estado: true }
            ]
        })
    ])
    return res.status(200).json({
        count,
        results
    })
}

const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesDisponibles.includes(coleccion)) return res.status(400).json({
        msg: `Las colecciones permitidas son: ${coleccionesDisponibles}`
    });

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res);
            break;
    
        default:
            res.status(500).json({
                msg: `La busqueda en ${coleccion} aun no esta implementada. Contacte al administrador.`
            });
            break;
    }
}


module.exports = {
    buscar
}