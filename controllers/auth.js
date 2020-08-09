const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check email
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'Email or password invalid',
      });
    }

    // Check password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Email or password invalid',
      });
    }

    // Generate token - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

module.exports = { login };
