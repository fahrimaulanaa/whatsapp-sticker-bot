const { app, db } = require("../firebaseConfig");
const { doc, setDoc, addDoc } = require("firebase/firestore");

async function uploadTobrut(name, age) {
    const tobrutData = {
        nama: name,
        umur: age,
    };

    await setDoc(doc(db, "tobrut", "tobrutdb"), tobrutData);
}

module.exports = { uploadTobrut };
