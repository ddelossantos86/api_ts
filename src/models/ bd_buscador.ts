import { Schema, model, Document } from 'mongoose';

export interface Ibd_buscador extends Document{

    tematica: string;
    titulo: string;
    link: string;
    dependencia: string;
    etiqueta: [];
    estado: string;
        
}


const schema = new Schema({

    tematica: { type: String, unique: true },
    titulo: { type: String, unique: true},
    link: { type: String, unique: true },
    dependencia: {type: String, unique: false},
    etiqueta:
    
    [
         {etiqueta_nombre: {type: String, unique: false}}
     ],  
    //etiqueta: { type: String, unique: false}, 
    
    
    estado: { type: String, unique: false}
},

    {
        timestamps: true,
    }

);

export const buscador_bases = model < Ibd_buscador >( 'bd_buscador', schema, 'bd_buscador');
