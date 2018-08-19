// Firebase production to staging sync

var admin = require("firebase-admin");

if (!process.env.FIREBASE_KEY_PRODUCTION) {
  return console.log("FIREBASE_KEY_PRODUCTION is missing");
}
if (!process.env.FIREBASE_KEY_STAGING) {
  return console.log("FIREBASE_KEY_STAGING is missing");
}
if (!process.env.FIREBASE_URL_PRODUCTION) {
  return console.log("FIREBASE_URL_PRODUCTION is missing");
}
if (!process.env.FIREBASE_URL_STAGING) {
  return console.log("FIREBASE_URL_STAGING is missing");
}

var firebaseKeyProduction = JSON.parse(process.env.FIREBASE_KEY_PRODUCTION);
var firebaseKeyStaging = JSON.parse(process.env.FIREBASE_KEY_STAGING);

var productionApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseKeyProduction),
  databaseURL: process.env.FIREBASE_URL_PRODUCTION
});

var stagingApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseKeyStaging),
  databaseURL: process.env.FIREBASE_URL_STAGING
});

var productionDb = productionApp.database();
var productionInventoryRef = productionDb.ref();
var stagingDb = stagingApp.database();
var stagingInventoryRef = stagingDb.ref();

async function copyProductionDbToStaging() {
  let snapshot = await productionInventoryRef.once("value");
  stagingInventoryRef.update(snapshot.val());
}

copyProductionDbToStaging();
