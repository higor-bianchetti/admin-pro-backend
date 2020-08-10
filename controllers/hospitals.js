const { response } = require('express');

const getHospitals = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'GET Hospitals',
  });
};

const createHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'POST Hospital',
  });
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
