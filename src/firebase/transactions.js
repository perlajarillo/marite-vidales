import { db, storage } from "./firebase.js";

export function setSeriesFirebase(series, files) {
  //const data = { name: series.name, description: series.description };
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
  return ref.once("value");
}

function putPaintings(paintings, seriesName) {
  if (seriesName !== "") {
    const storageRef = storage.ref();
    paintings.map(painting =>
      storageRef
        .child(seriesName + "/" + painting.name)
        .put(painting)
        .catch(error => {
          console.log(error);
        })
    );
  }
}
