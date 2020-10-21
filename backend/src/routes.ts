import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/auth';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import RepresentativesController from './controllers/RepresentativesController';
import SessionController from './controllers/SessionController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

routes.post('/representatives', RepresentativesController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

routes.get('/test', (req, res) => {
  return res.json({ message: 'voylá!' });
})

export default routes;
