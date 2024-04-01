import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { FirestoreTimestamp } from "../models";
import { Timestamp } from "@firebase/firestore";

// export const oilBinarySearch: any = (
//   arr: any,
//   val: any,
//   start = 0,
//   end = arr.length - 1
// ) => {
//   const mid = Math.floor((start + end) / 2);

//   if (val === arr[mid].id) {
//     return mid;
//   }

//   if (start >= end) {
//     return -1;
//   }

//   return val < arr[mid].id
//     ? oilBinarySearch(arr, val, start, mid - 1)
//     : oilBinarySearch(arr, val, mid + 1, end);
// };

const firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "go-finance-tracker.firebaseapp.com",
  projectId: "go-finance-tracker",
  storageBucket: "go-finance-tracker.appspot.com",
  messagingSenderId: "236818746694",
  appId: "1:236818746694:web:3c26fb000fa12a2da12947",
  measurementId: "G-10BB11XJMK",
};

// Initialize Firebase
// Get a reference to the Firebase auth service

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// Create a new instance of the Google provider
export const googleProvider = new GoogleAuthProvider();

export const firebaseAnalytics = getAnalytics(firebaseApp);

// Utility to parse the URL and calculate the expiration time

export const parseGoogleCloudStorageURL = (url: string) => {
  const params = new URLSearchParams(url.split("?")[1]);
  const googDate = params.get("X-Goog-Date");
  const googExpires = params.get("X-Goog-Expires");
  let expirationTime = 0;
  if (googDate && googExpires) {
    const retrievalTime = Date.parse(
      `${googDate.substring(0, 4)}-${googDate.substring(
        4,
        6
      )}-${googDate.substring(6, 8)}T${googDate.substring(
        9,
        11
      )}:${googDate.substring(11, 13)}:${googDate.substring(13, 15)}Z`
    );
    expirationTime = retrievalTime + parseInt(googExpires, 10) * 1000; // Convert to milliseconds
  }

  return expirationTime;
};

export const getFirebaseAuthErrorMessage = (error: FirebaseError) => {
  let errorMessage = "Error sending password reset email";

  switch (error.code) {
    case "auth/invalid-email":
      errorMessage = "The email address is badly formatted.";
      break;
    case "auth/user-not-found":
      errorMessage = "There is no user record corresponding to this email.";
      break;
    case "auth/missing-email":
      errorMessage = "Please enter an email address.";
      break;
    case "auth/wrong-password":
      errorMessage = "The password is invalid.";
      break;
    // Add more cases as needed for other error codes
    // ...
    default:
      errorMessage = error.message; // Use the default error message if no specific error code is found
      break;
  }

  return errorMessage;
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: window.location.origin + "/",
  // This must be true for email link sign-in.
  handleCodeInApp: true,
};

export const convertTimestampToLocaleString = (
  firestoreTimestamp: FirestoreTimestamp
): string => {
  const timestamp = new Timestamp(
    firestoreTimestamp._seconds,
    firestoreTimestamp._nanoseconds
  );
  const date: Date = timestamp.toDate();
  const localTime: string = date.toLocaleString();
  return localTime;
};

// export const convertTimestampToLocaleString = (
//   firestoreTimestamp: FirestoreTimestamp
// ): string => {
//   // const date: Date = firestoreTimestamp.toDate();
//   return "date.toLocaleString();";
// };
