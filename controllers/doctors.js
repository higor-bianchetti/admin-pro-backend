const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate('hospital', 'name img')
    .populate('user', 'name img');

  res.json({
    ok: true,
    doctors,
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
  const doctorId = req.params.id;
  const userId = req.uid;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: 'Doctor not found!',
      });
    }

    const newDoctor = { ...req.body, user: userId };
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, newDoctor, {
      new: true,
    });

    res.json({
      ok: true,
      msg: 'Doctor Updated',
      updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const doctorId = req.params.id;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: 'Doctor not found!',
      });
    }

    await Doctor.findByIdAndDelete(doctorId);

    res.json({
      ok: true,
      msg: 'Doctor deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
