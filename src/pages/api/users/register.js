import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import User from '../../../models/User';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);

  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  return res.send(user);
});

export default handler;