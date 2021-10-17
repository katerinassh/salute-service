const Photo = require('../../models/photo.model');

async function addPhoto(newPhoto) {
  return Photo.transaction(async (trx) => {
    const photo = await Photo.query(trx).insert({ body: newPhoto, is_main: true });
    return Photo.query(trx).findById(photo.photo_id);
  });
}

module.exports = { addPhoto };
