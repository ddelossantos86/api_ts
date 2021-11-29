import { Router } from 'express'
import { getPrueba, getBuscar, getBuscarTematica, postGuardar, getBuscarTodo, postModificar } from '../../controllers/proyecto01/proyecto01.controllers';


 const router = Router();
router.get('/buscador', getPrueba);
router.get('/datos',getBuscar);
router.get('/datos_todos',getBuscarTodo);
router.post('/datos2',getBuscarTematica);
router.post('/datos3',postGuardar);
router.post ('/datos4',postModificar);
export default router;
    