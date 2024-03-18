import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/healthy', (req, res) => {
    res.send('Healthy');
});
