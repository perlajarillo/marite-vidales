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
        function (error) {
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
        function (error) {
          console.log(error);
        }
    );
}

export function shiftExperienceIndex(key, experienceTable) {
  let reference = db
    .ref()
    .child("biography")
    .child("experience");
  experienceTable.forEach(k => {
    if (k.key !== key) {
      //i is the index plus 1
      let i = k.i;
      reference
        .child(k.key)
        .child("index")
        .set(i);
    }
  });
}

export function setExperience(key, data, experienceTable) {
  let educationKey = key;
  if (educationKey === "") {
    educationKey = db
      .ref()
      .child("biography")
      .child("experience")
      .push().key;
    shiftExperienceIndex(educationKey, experienceTable);
  }
  const updates = {};
  updates["/biography/experience/" + educationKey] = data;
  return db
    .ref()
    .update(updates)
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
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
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
      imageRef.delete().catch(function (error) {
        console.log(error);
      });
    });
  }
}

export function deleteAllImages(series) {
  series.images_details.map(i => {
    let imageRef = storage.ref().child(series.key + "/" + i.file);
    imageRef.delete().catch(function (error) {
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
    .catch(function (error) {
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
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
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

export function getExhibitions() {
  const ref = db.ref().child("exhibits");
  const exhibitions = ref.once("value");
  return exhibitions;
}


export function setGallery(key, data) {
  let galleryKey = key;
  if (galleryKey === "") {
    galleryKey = db
      .ref()
      .child("exhibits")
      .child("galleries")
      .push().key;
  }

  const updates = {};
  updates["/exhibits/galleries/" + galleryKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function setGrantsAndAwards(key, data) {
  let grantAwardKey = key;
  if (grantAwardKey === "") {
    grantAwardKey = db
      .ref()
      .child("exhibits")
      .child("grantsAndAwards")
      .push().key;
  }

  const updates = {};
  updates["/exhibits/grantsAndAwards/" + grantAwardKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function setJuriedExhibition(key, data) {
  let juriedKey = key;
  if (juriedKey === "") {
    juriedKey = db
      .ref()
      .child("exhibits")
      .child("juried")
      .push().key;
  }

  const updates = {};
  updates["/exhibits/juried/" + juriedKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function setGroupExhibition(key, data) {
  let groupKey = key;
  if (groupKey === "") {
    groupKey = db
      .ref()
      .child("exhibits")
      .child("selected")
      .push().key;
  }

  const updates = {};
  updates["/exhibits/selected/" + groupKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function setSoloExhibition(key, data) {
  let soloKey = key;
  if (soloKey === "") {
    soloKey = db
      .ref()
      .child("exhibits")
      .child("solo")
      .push().key;
  }

  const updates = {};
  updates["/exhibits/solo/" + soloKey] = data;
  return db
    .ref()
    .update(updates)
    .catch(error => {
      console.log(error);
    });
}

export function deleteGrantAward(key) {
  return db
    .ref()
    .child("exhibits")
    .child("grantsAndAwards")
    .child(key)
    .remove()
    .catch(
      () =>
        function (error) {
          console.log(error);
        }
    );
}

export function deleteGallery(key) {
  return db
    .ref()
    .child("exhibits")
    .child("galleries")
    .child(key)
    .remove()
    .catch(
      () =>
        function (error) {
          console.log(error);
        }
    );
}

export function deleteJuriedExhibit(key) {
  return db
    .ref()
    .child("exhibits")
    .child("juried")
    .child(key)
    .remove()
    .catch(
      () =>
        function (error) {
          console.log(error);
        }
    );
}

export function deleteGroupExhibit(key) {
  return db
    .ref()
    .child("exhibits")
    .child("selected")
    .child(key)
    .remove()
    .catch(
      () =>
        function (error) {
          console.log(error);
        }
    );
}

export function deleteSoloExhibit(key) {
  return db
    .ref()
    .child("exhibits")
    .child("solo")
    .child(key)
    .remove()
    .catch(
      () =>
        function (error) {
          console.log(error);
        }
    );
}