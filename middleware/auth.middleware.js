import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
      token = token.split(" ")[1]
     const decoded = jwt.verify(token, process.env.EXPRESS_SECRET_KEY);
     req.userId = decoded.userId;
     next();
     } catch (error) {
     res.status(401).json({ error: 'Invalid token' });
     }
  };