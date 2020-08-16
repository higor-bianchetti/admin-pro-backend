const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate('user', 'name img');

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;

  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const newHospital = await hospital.save();

    res.json({
      ok: true,
      hospital: newHospital,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'PUT Hospital',
  });
};

const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'DELETE Hospital',
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
