const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.find({}, 'name email role google');

  res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already registered',
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Add user
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

const updateUser = async (req, res = response) => {
  // TODO: Token validation

  const uid = req.params.id;

  try {
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }

    // Not update password and google fields
    const { password, google, email, ...fields } = req.body;

    // Validation to not update email that already exists
    if (user.email !== email) {
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return res.status(400).json({
          ok: false,
          msg: 'Email already registered',
        });
      }
    }

    fields.email = email;

    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error',
    });
  }
};

module.exports = { getUsers, createUser, updateUser };
