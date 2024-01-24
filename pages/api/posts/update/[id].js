import db from '../../../../libs/db';

export default async function handler(req, res) {
    const { id } = req.query;

    console.log(id)
 
    res.status(200);
    res.json({
        message: 'Posts updated successfully'
    });
}