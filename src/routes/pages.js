import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/login/failed', (req, res) => {
  res.render('failed');
});

router.get('/login/success', (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.redirect('/login/failed');
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    res.render('successful');
  } catch (e) {
    res.render('failed');
  }
});

export default router;
