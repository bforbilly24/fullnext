import db from '../../../libs/db';

export default async function handler(req, res){
    const { email, password } = req.body;

    console.log({ email, password });
    
    res.status(200);
    res.json({
        message: 'Helllo, register'
    })
}