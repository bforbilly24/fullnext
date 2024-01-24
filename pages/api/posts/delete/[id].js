import db from '../../../../libs/db';

export default async function(req, res) {
    if(req.method !== 'DELETE') return res.status(405).end();

    
}