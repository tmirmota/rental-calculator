import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCVyrfHGEkL4L2S08YtWPmPySdVKjBYz_4',
  authDomain: 'reda-188106.firebaseapp.com',
  databaseURL: 'https://reda-188106.firebaseio.com',
  projectId: 'reda-188106',
  storageBucket: 'reda-188106.appspot.com',
  messagingSenderId: '854257419827',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.database()

export default firebase
