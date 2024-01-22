import db from '../../../libs/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') return req.status(405).end();

    const create = await db('posts').insert({
        tittle: 'post title 1',
        content: 'post content 1'
    });

    res.status(200);
    res.json({
        message: 'Post created successfully'
    });
    
}