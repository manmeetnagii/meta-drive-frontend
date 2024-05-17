import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { url } from "./url";



const firebaseConfig = {
  apiKey: "AIzaSyBhkXcRCo2_sisrvsaoDMOSlJnAE8Vjx40",
  authDomain: "gdrive-2cc52.firebaseapp.com",
  projectId: "gdrive-2cc52",
  storageBucket: "gdrive-2cc52.appspot.com",
  messagingSenderId: "248469940151",
  appId: "1:248469940151:web:5ee8957bfface3878caa32",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signup = async ( name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    
    localStorage.setItem("token", user.uid);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    
    const token = localStorage.getItem("token")
    const folderKey = `user_${email}_${token}`

    localStorage.setItem("folderKey", folderKey);

    const data = {
      name,
      email,
      folderKey
    }

    const response = await axios.post(`${url}/setUser`, { data });
    console.log(response.data)
    const userId = response.data._id
    localStorage.setItem("userId", userId);
  } 
  catch (error) {
    console.log(error);
  }
};

export const login = async ( email, password) => {
  try {
    const signedInUserRes = await signInWithEmailAndPassword(auth, email, password);

    const user = signedInUserRes.user;
    const folderKey = `user_${email}_${user.uid}`

    localStorage.setItem("email", email);
    localStorage.setItem("token", user.uid);
    localStorage.setItem("folderKey", folderKey);

    const folderKeyParams = {
      folderKey: folderKey
    }

    const userDetailsRes = await axios.get(`${url}/getuser`, {
      params: folderKeyParams,
    });
    console.log(userDetailsRes)
    const userId = userDetailsRes.data._id
    const name = userDetailsRes.data.name
    localStorage.setItem("userId", userId); 
    localStorage.setItem("name", name); 
  } 
  catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  signOut(auth).then(
    localStorage.clear()
  );
  window.location.reload();
};
