const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

// Delete previous picture
const deletePicture = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updatePicture = async (collection, id, fileName) => {
  let oldPath = '';

  switch (collection) {
    case 'doctors':
      const doctor = await Doctor.findById(id);

      if (!doctor) {
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deletePicture(oldPath);

      doctor.img = fileName;
      await doctor.save();

      return true;

    case 'hospitals':
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deletePicture(oldPath);

      hospital.img = fileName;
      await hospital.save();

      return true;

    case 'users':
      const user = await User.findById(id);

      if (!user) {
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deletePicture(oldPath);

      user.img = fileName;
      await user.save();

      return true;
  }
};

module.exports = { updatePicture };
