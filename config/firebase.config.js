const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-aniruddh-firebase-adminsdk-5k78j-dede77e97a.json')


const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-aniruddh.appspot.com'
    
})

console.log(Firebase.app().options.storageBucket);
module.exports = Firebase;

