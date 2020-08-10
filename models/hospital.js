const { Schema, model } = require('mongoose');

const HospitalSchema = Schema(
  {
    name: { type: String, required: true },
    img: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  }
  // { collection: 'Hospitais' }  TO RENAME SCHEMA ON DATABASE
);

// Hide __v and parse '_id' to 'uid'
HospitalSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();

  return object;
});

module.exports = model('User', HospitalSchema);
