const multer = require('multer');
const { credential } = require('firebase-admin');
const firebaseStorage= require('multer-firebase-storage')
const firebase=require('./firebase.config')
const serviceAccount=require('../drive-aniruddh-firebase-adminsdk-5k78j-dede77e97a.json')

const storage=firebaseStorage({
   credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-aniruddh.appspot.com',
    
})

const upload=multer({
    storage:storage
})
module.exports=upload
