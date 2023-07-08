import mongoose from "mongoose";
const{MONGO_URL} = process.env;

if(!MONGO_URL){
    throw new Error("No se ha encontrado la URL de la BD de MONGODB")
}
export const conectividad = async() =>{
    try {
        const {connection} =  await  mongoose.connect(MONGO_URL);
       if(connection.readyState === 1){
           console.log('Conectada a MongoDB');
           return Promise.resolve(true);
         }
    } catch (error) {
        console.log(error);
        return Promise.reject(false);
    }
}
