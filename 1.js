// import { initializeApp } from 'firebase/app';
// import {getFirestore, collection, getDocs, } from 'firebase/firestore/lite';

// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCaQlSpkmaa4a1c6AZfySssSf4OpXkUwbU",
//   authDomain: "messenger-a8d9e.firebaseapp.com",
//   projectId: "messenger-a8d9e",
//   storageBucket: "messenger-a8d9e.appspot.com",
//   messagingSenderId: "643926024708",
//   appId: "1:643926024708:web:b532bbb2c9bcfe4b074b51"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// // Get a list of cities from your database
// export async function getCities() {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }