const { response } = require('express');

const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email role google');

  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already registered',
      });
    }

    const user = new User(req.body);

    await user.save();

    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

module.exports = { getUsers, createUser };
