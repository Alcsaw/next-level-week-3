import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Representative from '../models/Representative';

export default {
  async store(request: Request, response: Response) {

    if (!process.env.APP_SECRET) {
      return response.status(500).json({
        message: `Authentication failed due to missing server configuration.
        Please, contact the support if the error persists.`
      });
    }

    const {
      email,
      password
    } = request.body;

    const representativesRepository = getRepository(Representative);

    const data = {
      email,
      password
    };

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const representative = await representativesRepository
      .findOne({ where: { email } });

    if (!representative) {
      return response.status(401).json({ message: 'User not found' });
    }

    if (!(await compare(password, representative.password))) {
      return response.status(401).json({ message: 'Incorrect password.' });
    }

    return response.json({
      representative,
      token: sign({ id: representative.id }, process.env.APP_SECRET, {
        expiresIn: '1d'
      })
    });
  }
};
