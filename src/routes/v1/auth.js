import express from 'express';
import dbHandler from '../../database/dbHandler';

const router = express.Router();

router.post('/login', async (req, res) => {
  const user = dbHandler.find({
    body: req.body,
    table: 'users',
    query: 'email'
  });
  if (!user) {
    return res.status(400).send({
      status: 400,
      error: 'Invalid email or password'
    });
  }
  const token = await dbHandler.validateUser(req.body, user);
  if (!token) {
    return res.status(400).send({
      status: 400,
      error: 'Invalid email or password'
    });
  }
  return res.status(200).send({
    status: 200,
    data: {
      token,
      name: user.name
    }
  });
});

router.post('/register', async (req, res) => {
  const user = dbHandler.find({
    body: req.body,
    table: 'users',
    query: 'email'
  });
  if (!(req.body.name && req.body.email && req.body.password))
    return res.status(400).send({
      status: 400,
      error: 'fill all user data'
    });
  if (user) {
    return res.status(400).send({
      status: 400,
      error: 'user already exista'
    });
  }
  const token = await dbHandler.createUser(req.body);
  //enroll user on CAS
  return res.status(201).json({
    status: 201,
    data: {
      token,
      name: req.body.name
    }
  });
});

export default router;
