import { db, storage } from "./firebase.js";

export function setSeriesFirebase(series, key, files, toDelete, n) {
  let seriesKey = key;
  if (seriesKey === "") {
    seriesKey = db
      .ref()
      .child("series")
      .push().key;
  }
  const updates = {};
  updates["/series/" + seriesKey] = series;
  return db
    .ref()
    .update(updates)
    .then(() => {
      toDelete.length > 0 && deleteImages(seriesKey, toDelete);
      files.length > 0 && putPaintings(files, seriesKey, n);
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteImages(seriesKey, toDelete) {
  if (toDelete && seriesKey) {
    toDelete.map(image => {
      let imageRef = storage.ref().child(seriesKey + "/" + image);
      imageRef.delete().catch(function(error) {
        console.log(error);
      });
    });
  }
}

export function deleteAllImages(series) {
  series.images_details.map(i => {
    let imageRef = storage.ref().child(series.key + "/" + i.file);
    imageRef.delete().catch(function(error) {
      console.log(error);
    });
  });
}

export function deleteSeries(series) {
  return db
    .ref()
    .child("series")
    .child(series.key)
    .remove()
    .then(deleteAllImages(series))
    .catch(function(error) {
      console.log(error);
    });
}

export function getAllSeries() {
  const ref = db.ref().child("series");
  const series = ref.once("value");
  return series;
}

export function putPaintings(paintings, seriesKey, n) {
  if (seriesKey !== "") {
    const storageRef = storage.ref();
    paintings.map((painting, i) =>
      storageRef
        .child(seriesKey + "/" + painting.name)
        .put(painting)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setImageURL(seriesKey, i + n, downloadURL);
          });
        })
        .catch(error => {
          console.log(error);
        })
    );
  }
}

export function setImageURL(seriesKey, i, url) {
  db.ref()
    .child("series")
    .child(seriesKey)
    .child("images_details")
    .child(i)
    .child("url")
    .set(url);
}
