import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCB_oIEsw30atAUBmY5RLelNnLAW6iDO5M",
  authDomain: "hotel-e609b.firebaseapp.com",
  databaseURL: "https://hotel-e609b.firebaseio.com",
  projectId: "hotel-e609b",
  storageBucket: "hotel-e609b.appspot.com",
  messagingSenderId: "986144870862",
  appId: "1:986144870862:web:8963574a9619bb50481b9f"
};
// Initialize Firebase
const fb=firebase.initializeApp(firebaseConfig);

export default fb;
export const db = firebase.firestore(fb);
