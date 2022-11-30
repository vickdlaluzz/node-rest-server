const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0.00,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String,
        default: 'El producto no tiene una descripcion'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    },
    imgId: {
        type: String
    }
});


ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    
    return data;
}

module.exports = model('Producto', ProductoSchema);