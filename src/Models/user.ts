import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required:[true,"Email is Required"],
        match:[
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            'Email invalido'
        ]
    },
    passwordHash: {
       type: String,
       required: [true, "Contraseña requerida"],
       select: false
    },
    fullname: {
        type:String,
        required: [true, "Contraseña requerida"],
        minLength:[3, "el fullname debe tener al menos 3 carateres"],
        maxLength:[50, "el nombre completo no puede superar los 50 caracteres"]
    }
});

const usuario = models.User || model('User', UserSchema);
export default usuario;