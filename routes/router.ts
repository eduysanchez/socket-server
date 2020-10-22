import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usersOnline } from '../sockets/sockets';

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

//Get ID users
router.get('/userslist', (req: Request , res: Response) => {

    const server = Server.instance;

    server.io.clients( (err: any, clients: string[]) => {
        if(err){
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clients
        });

    });
});

//Get user names
router.get('/userslist/details', (req: Request , res: Response) => {

    res.json({
        ok: true,
        clients: usersOnline.getList()
    });

});


export default router;