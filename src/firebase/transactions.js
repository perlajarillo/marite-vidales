import { db, storage } from "./firebase.js";

export function setSeriesFirebase(series, files, toDelete, n) {
  return db
    .ref()
    .child(series.name)
    .set(series)
    .then(() => {
      toDelete.length > 0 && deleteImages(series.name, toDelete);
      files.length > 0 && putPaintings(files, series.name, n);
    })
    .catch(error => {
      console.log(error);
    });
}

export function deleteImages(seriesName, toDelete) {
  if (toDelete && seriesName) {
    toDelete.map(image => {
      let imageRef = storage.ref().child(seriesName + "/" + image);
      imageRef.delete().catch(function(error) {
        console.log(error);
      });
    });
  }
}

export function deleteAllImages(series) {
  series.images_details.map(i => {
    let imageRef = storage.ref().child(series.name + "/" + i.file);
    imageRef.delete().catch(function(error) {
      console.log(error);
    });
  });
}

export function deleteSeries(series) {
  return db
    .ref()
    .child(series.name)
    .remove()
    .then(deleteAllImages(series))
    .catch(function(error) {
      console.log(error);
    });
}

export function getAllSeries() {
  const ref = db.ref();
  const series = ref.once("value");
  return series;
}

export function putPaintings(paintings, seriesName, n) {
  if (seriesName !== "") {
    const storageRef = storage.ref();
    paintings.map((painting, i) =>
      storageRef
        .child(seriesName + "/" + painting.name)
        .put(painting)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setImageURL(seriesName, i + n, downloadURL);
          });
        })
        .catch(error => {
          console.log(error);
        })
    );
  }
}

export function setImageURL(seriesName, i, url) {
  db.ref()
    .child(seriesName)
    .child("images_details")
    .child(i)
    .child("url")
    .set(url);
}
