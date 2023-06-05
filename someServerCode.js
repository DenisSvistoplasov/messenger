
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messenger-a8d9e-default-rtdb.europe-west1.firebasedatabase.app"
});
