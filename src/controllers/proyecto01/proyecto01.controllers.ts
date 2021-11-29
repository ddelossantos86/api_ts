import { Request, Response} from 'express';
import { ReadPosition } from 'fs';
import { RestrictionElement } from 'soap/lib/wsdl/elements';
import { buscador_bases, Ibd_buscador } from '../../models/ bd_buscador';


export const getPrueba =( req: Request, res: Response ) => { 
res.status(200).json({ ok: true });
    console.log ('oki');
};



export const getBuscarTodo = async ( req: Request, res: Response ) => {
const data_todo = await buscador_bases.find();
res.status(200).json ({
    data_todo
})}


export const getBuscar = async ( req: Request, res: Response ) => {
const datas = await buscador_bases.find({tematica: req.body.tematica});
res.status(200).json({
    datas
})
}

export const getBuscarTematica = async (req:Request, res: Response) => {
    
    const titulo = req.body.titulo;
    //console.log(data);
    //await buscador_bases.find({ titulo: { $regex: 'COVID'}},(err,data)=>{
    
    await buscador_bases.find({ titulo: { $regex: 'COVID'}},(err,data)=>{
    
    if(err){
            res.status(400).json({
                ok:false,
                err
            })
        }else{
            res.status(200).json({
                data
            })
        }
    });
    //console.log (respuesta);
 
} 

export const postGuardar = async (req: Request, res: Response) => {

    console.log (req.body);
    const guardar = new buscador_bases (req.body);
    await guardar.save();
    console.log (guardar);

}

//UPDATE REEMPLAZO

export const postModificar = async (req: Request, res: Response) => {

    console.log (req.body);
    const modificar = new buscador_bases ();
    const todos_tematica = await buscador_bases.find({'tematica':req.body.tematica});
    for(let tematica of todos_tematica){

        tematica.tematica = 'COVID-20';
        await tematica.save();
    }
    console.log ( todos_tematica );    
    
}



