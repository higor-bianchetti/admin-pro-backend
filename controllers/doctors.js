const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
  res.json({
    ok: true,
    msg: 'GET Doctors',
  });
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  const hospitalId = req.hospital;

  const doctor = new Doctor({
    user: uid,
    hospital: hospitalId,
    ...req.body,
  });

  try {
    const newDoctor = await doctor.save();

    res.json({
      ok: true,
      doctor: newDoctor,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
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
