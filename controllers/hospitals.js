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
  const hospitalId = req.params.id;
  const userId = req.uid;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found!',
      });
    }

    const newHospital = { ...req.body, user: userId };
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      newHospital,
      { new: true }
    );

    res.json({
      ok: true,
      msg: 'Hospital Updated',
      updatedHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Unexpected Error... Please, see the logs for more details',
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const hospitalId = req.params.id;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: 'Hospital not found!',
      });
    }

    await Hospital.findByIdAndDelete(hospitalId);

    res.json({
      ok: true,
      msg: 'Hospital Deleted',
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
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
