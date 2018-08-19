const admin = require("firebase-admin");
require("dotenv").config();

if (!process.env.FIREBASE_KEY_SOURCE) {
  return console.log("FIREBASE_KEY_SOURCE is missing");
}
if (!process.env.FIREBASE_KEY_TARGET) {
  return console.log("FIREBASE_KEY_TARGET is missing");
}
if (!process.env.FIREBASE_URL_SOURCE) {
  return console.log("FIREBASE_URL_SOURCE is missing");
}
if (!process.env.FIREBASE_URL_TARGET) {
  return console.log("FIREBASE_URL_TARGET is missing");
}

const firebaseKeySource = JSON.parse(process.env.FIREBASE_KEY_SOURCE);
const firebaseKeyTarget = JSON.parse(process.env.FIREBASE_KEY_TARGET);

const sourceApp = admin.initializeApp(
  {
    credential: admin.credential.cert(firebaseKeySource),
    databaseURL: process.env.FIREBASE_URL_SOURCE
  },
  "sourceApp"
);

const targetApp = admin.initializeApp(
  {
    credential: admin.credential.cert(firebaseKeyTarget),
    databaseURL: process.env.FIREBASE_URL_TARGET
  },
  "targetApp"
);

const sourceDb = sourceApp.database();
const sourceInventoryRef = sourceDb.ref();
const targetDb = targetApp.database();
const targetInventoryRef = targetDb.ref();

async function copySourceDataToTarget() {
  let snapshot = await sourceInventoryRef.once("value");
  return targetInventoryRef.update(snapshot.val());
}

copySourceDataToTarget();
