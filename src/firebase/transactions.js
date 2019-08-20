import { db, storage } from "./firebase.js";

export function setSeriesFirebase(series, files) {
  return db
    .ref()
    .child(series.name)
    .set(series)
    .then(putPaintings(files, series.name))
    .catch(error => {
      console.log(error);
    });
}

export function getAllSeries() {
  const ref = db.ref();
  const series = ref.once("value");
  return series;
}

export function putPaintings(paintings, seriesName) {
  if (seriesName !== "") {
    const storageRef = storage.ref();
    paintings.map((painting, i) =>
      storageRef
        .child(seriesName + "/" + painting.name)
        .put(painting)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(function(downloadURL) {
            setImageURL(seriesName, i, downloadURL);
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
