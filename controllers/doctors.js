const { response } = require('express');

const getDoctors = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'GET Doctors',
  });
};

const createDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'POST Doctor',
  });
};

const updateDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'PUT Doctor',
  });
};

const deleteDoctor = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'DELETE Doctor',
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
