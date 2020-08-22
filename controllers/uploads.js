const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { updatePicture } = require('../helpers/update-picture');

const fileUpload = (req, res = response) => {
  const collection = req.params.collection;
  const id = req.params.id;

  const validCollections = ['hospitals', 'doctors', 'users'];

  if (!validCollections.includes(collection)) {
    return res.status(400).json({
      ok: false,
      msg:
        'Collection not found. Possible collections: doctors, hospitals or users',
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No files were uploaded',
    });
  }

  const file = req.files.image;
  const names = file.name.split('.');
  const extension = names[names.length - 1];

  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

  if (!validExtensions.includes(extension)) {
    return res.status(400).json({
      ok: false,
      msg: 'Extension invalid. Possible extensions: png, jpg, jpeg or gif',
    });
  }

  const fileName = `${uuidv4()}.${extension}`;
  const path = `./uploads/${collection}/${fileName}`;

  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error moving the image',
      });
    }

    updatePicture(collection, id, fileName);

    res.json({
      ok: true,
      msg: 'File Uploaded',
      fileName,
    });
  });
};

const getPicture = (req, res = response) => {
  const collection = req.params.collection;
  const picture = req.params.picture;

  const pathPicture = path.join(
    __dirname,
    `../uploads/${collection}/${picture}`
  );

  // Default Picture
  if (fs.existsSync(pathPicture)) {
    res.sendFile(pathPicture);
  } else {
    const defaultPicture = path.join(__dirname, '../uploads/no-img.jpg');
    res.sendFile(defaultPicture);
  }
};

module.exports = { fileUpload, getPicture };
