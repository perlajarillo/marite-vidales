import { db, storage } from "./firebase.js";

export function setSummary(text, file) {
  if (file) {
    putProfileImage(file);
  }
  return db
    .ref()
    .child("biography")
    .child("summary")
    .set(text);
}

export function setEducation(key, data) {
  let educationKey = key;
  if (educationKey === "") {
    educationKey = db
      .ref()
      .child("biography")
      .child("education")
      .push().key;
  }

  const updates = {};
  updates["/biography/education/" + educationKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function setEducationIndex(mapOfKeys) {
  let reference = db
    .ref()
    .child("biography")
    .child("education");
  for (let [k, i] of mapOfKeys) {
    reference
      .child(k)
      .child("index")
      .set(i - 1);
  }
  return reference.once("value");
}

export function deleteEducation(key, index) {
  return db
    .ref()
    .child("biography")
    .child("education")
    .child(key)
    .remove()
    .then(() => {
      adjustIndex(index, "education");
    })
    .catch(
      () =>
        function(error) {
          console.log(error);
        }
    );
}

export function adjustIndex(index, section) {
  if (index === null) return;
  let reference = db
    .ref()
    .child("biography")
    .child(section);
  reference.once("value").then(snapshot => {
    const entries = snapshot.val();
    Object.keys(entries).forEach(element => {
      if (entries[element].index > index) {
        let i = reference.child(element).child("index");
        i.once("value").then(snapshot => {
          let newIndex = snapshot.val() - 1;
          i.set(newIndex);
        });
      }
    });
  });
}
export function setExperienceIndex(mapOfKeys) {
  let reference = db
    .ref()
    .child("biography")
    .child("experience");
  for (let [k, i] of mapOfKeys) {
    reference
      .child(k)
      .child("index")
      .set(i - 1);
  }
  return reference.once("value");
}

export function deleteExperience(key, index) {
  return db
    .ref()
    .child("biography")
    .child("experience")
    .child(key)
    .remove()
    .then(() => {
      adjustIndex(index, "experience");
    })
    .catch(
      () =>
        function(error) {
          console.log(error);
        }
    );
}

export function shiftExperienceIndex(key) {
  let reference = db
    .ref()
    .child("biography")
    .child("experience");
  let items = reference.once("value");

  items.then(snapshot => {
    Object.keys(snapshot.val()).forEach(k => {
      if (k !== key) {
        let i = reference.child(k).child("index");
        i.once("value").then(snap => {
          let newIndex = snap.val() + 1;
          i.set(newIndex);
        });
      }
    });
  });
}

export function setExperience(key, data) {
  let educationKey = key;
  let isEditing = false;
  if (educationKey === "") {
    educationKey = db
      .ref()
      .child("biography")
      .child("experience")
      .push().key;
  } else {
    isEditing = true;
  }
  const updates = {};
  updates["/biography/experience/" + educationKey] = data;
  return db
    .ref()
    .update(updates)
    .then(() => {
      if (!isEditing) {
        shiftExperienceIndex(educationKey);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function setProfileImageURL(url) {
  db.ref()
    .child("biography")
    .child("pictureUrl")
    .set(url);
}

export function putProfileImage(file) {
  if (file !== "") {
    const storageRef = storage.ref();
    storageRef
      .child("biography/" + file.name)
      .put(file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          setProfileImageURL(downloadURL);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function getBiography() {
  const ref = db.ref().child("biography");
  const biography = ref.once("value");
  return biography;
}

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
