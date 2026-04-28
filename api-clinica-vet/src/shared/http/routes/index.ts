import animalsRouter from '@modules/animals/routes/animals.routes';
import { Router } from 'express';

const routes = Router();
routes.use('/animals', animalsRouter);

routes.get('/', (request, response) =>{
    response.json({message:"Heloo Dev!"});
    return;
})

export default routes;