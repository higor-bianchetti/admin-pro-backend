const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

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

    res.json({
      ok: true,
      msg: 'File Uploaded',
      fileName,
    });
  });
};

module.exports = { fileUpload };
