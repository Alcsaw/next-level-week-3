import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { promisify } from 'util';

interface DecodedToken {
  id: string;
}

export default async (request: Request, response: Response, next: NextFunction) => {

  if (!process.env.APP_SECRET) {
    return response.status(500).json({
      message: `Authentication failed due to missing server configuration.
      Please, contact the support if the error persists.`
    });
  }

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(verify)(token, process.env.APP_SECRET) as DecodedToken;

    request.representativeId = decoded.id;

    return next();
  } catch (err) {
    return response.status(401).json({ message: 'Invalid token' });
  }
};
