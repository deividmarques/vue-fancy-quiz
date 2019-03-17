// Initialize Firebase
import Firebase from 'firebase'

var config = {
  apiKey: 'IzaSyAHlCQNniGuJ86-KMg_VVXRVh9RaOik8qo',
  authDomain: 'fancy-quiz-chat.firebaseapp.com',
  databaseURL: 'https://fancy-quiz-chat.firebaseio.com',
  projectId: 'fancy-quiz-chat',
  storageBucket: 'fancy-quiz-chat.appspot.com',
  messagingSenderId: '417263379253'
}

let app = Firebase.initializeApp(config)
let db = app.database()
let dbChat = db.ref('chat')

export default dbChat
