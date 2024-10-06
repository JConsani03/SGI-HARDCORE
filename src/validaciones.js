import jwt from 'jsonwebtoken';

const SECRET_KEY = 'holacomoestasyomuybienytuahconchaleyobien38959193123812938194810948198349120';

export function authenticateToken(req, res, next) {
    const token = req.cookies.user;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        next();
    });
};