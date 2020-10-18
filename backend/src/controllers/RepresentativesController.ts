import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
//import representativeView from '../views/RepresentativesView';
import * as Yup from 'yup';

import Representative from '../models/Representative';

export default {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      password
    } = request.body;

    const representativesRepository = getRepository(Representative);

    const data = {
      name,
      email,
      password
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const existingRepresentative = await representativesRepository
      .findOne({ where: { email } });

    if (existingRepresentative) {
      return response.status(401).json({ message: 'E-mail already in use' });
    }

    const representative = representativesRepository.create(data);

    await representativesRepository.save(representative);

    return response.status(201).json(representative);
  }
};
