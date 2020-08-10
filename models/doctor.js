const { Schema, model } = require('mongoose');

const DoctorSchema = Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
  }
  // { collection: 'Medicos' }  TO RENAME SCHEMA ON DATABASE
);

// Hide __v and parse '_id' to 'uid'
DoctorSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model('User', DoctorSchema);
