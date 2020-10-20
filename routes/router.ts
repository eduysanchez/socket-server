import { Router, Request, Response } from 'express';
import Server from '../class/server';

export const router = Router();

router.get('/message', (req: Request , res: Response) => {
    res.json({
        ok: true,
        mensaje: "Toda esta bien en Sion..."
    });
});

router.post('/message', (req: Request , res: Response) => {

    const msgBody    = req.body.msgBody;
    const msgFrom        = req.body.msgFrom;

    const payload = {
        msgFrom,
        msgBody
    }

    const server = Server.instance;

    server.io.emit('newMessage', payload);

    res.json({
        ok: true,
        msgBody,
        msgFrom
    });
});

router.post('/message/:id', (req: Request , res: Response) => {

    const msgBody    = req.body.msgBody;
    const msgFrom        = req.body.msgFrom;
    const id        = req.params.id;

    const payload = {
        msgFrom,
        msgBody
    }

    const server = Server.instance;

    server.io.in( id ).emit('messagePrivate', payload);

    res.json({
        ok: true,
        msgBody,
        msgFrom,
        id
    });
});

export default router;