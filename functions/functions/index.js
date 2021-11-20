const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

exports.addUserWithDefaultsToDatabase = functions.auth
  .user()
  .onCreate(async (user) => {
    console.log("user", user)
    const firestore = admin.firestore()
    const userDataToSave = {
      id: user.uid,
      name: user.displayName,
      role: "participant",
      teamId: "",
    }
    await firestore.collection("users").doc(user.uid).set(userDataToSave)
  })
