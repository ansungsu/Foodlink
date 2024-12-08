// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database"; // Realtime Database 사용
import "firebase/compat/auth"; // 인증 사용
import 'firebase/compat/storage';  // Firebase Storage 임포트
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 첫 번째 Firebase 설정 (Compat 방식)
const firebaseConfig1 = {
  apiKey: "AIzaSyDAe4Vp0vpG0j6qWKqfhBLKe_X7tLfScjM",
  authDomain: "foodlink-2b531.firebaseapp.com",
  databaseURL: "https://foodlink-2b531-default-rtdb.firebaseio.com",
  projectId: "foodlink-2b531",
  storageBucket: "foodlink-2b531.firebasestorage.app",
  messagingSenderId: "247328439601",
  appId: "1:247328439601:web:855b1ac29ec44e105b8410",
  measurementId: "G-89B7DRZXEC",
};

// 두 번째 Firebase 설정 (Modern 방식)
const firebaseConfig2 = {
  apiKey: "AIzaSyAE59hzZv9hupjsicHKUf_7uW_5rLl9cmw",
  authDomain: "notice-board-830ca.firebaseapp.com",
  projectId: "notice-board-830ca",
  storageBucket: "notice-board-830ca.firebasestorage.app",
  messagingSenderId: "90778277268",
  appId: "1:90778277268:web:f9224d2c3d5ab160b0ab81",
  measurementId: "G-B7974PE1PC",
};

// 첫 번째 Firebase 초기화 (Compat 방식)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig1);
}

// 두 번째 Firebase 초기화 (Modern 방식)
const app2 = initializeApp(firebaseConfig2, "SecondaryApp");

// 첫 번째 Firebase 객체 (Compat 방식)
const auth = firebase.auth(); // 인증
const firestore1 = firebase.firestore(); // Firestore
const realtimeDb = firebase.database(); // Realtime Database
const storage = firebase.storage();  // Firebase Storage 객체
const FieldValue = firebase.firestore.FieldValue;  // Firestore의 FieldValue 객체

// 두 번째 Firebase 객체 (Modern 방식)
const firestore2 = getFirestore(app2); // Firestore

// 내보내기
export { firebase, auth, firestore1, firestore2, realtimeDb, app2, FieldValue, storage };
