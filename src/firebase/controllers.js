import { firestore, auth, storage } from "./index";
import { getDocs, addDoc, collection, query, where } from "@firebase/firestore";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
const googleProvider = new GoogleAuthProvider();
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import toast from 'react-hot-toast'

// sign in with Google
export const signInWithGoogle = async (setUser) => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        console.log(user)
        const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            const newUser = {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                profileUrl: user.photoURL,
                phoneNumber: user.phoneNumber,
                email: user.email,
            }
            const doc = await addDoc(collection(firestore, "users"), newUser);
            console.log(doc)
            setUser(doc.data())
            toast("Signed in as", user.name)
        }else{
            setUser(docs.docs[0].data())
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


// get user details
export const getUser = async (setUser) => {
    try {
        const uid = localStorage.getItem('bkuserid')
        const q = query(collection(firestore, "users"), where("uid", "==", uid));
        const docs = await getDocs(q);
        if (docs.docs.length !== 0) {
            setUser({...docs.docs[0].data(), id: docs.docs[0].id});
        }
    } catch (err) {
        console.error(err);
    }
}

// logout
export const Logout = (setUser) => {
    signOut(auth);
    localStorage.removeItem('bkuserid')
    setUser(null)
    toast("Logged out from ", user.name)
};

// add new work
export const addNewService = async (data, file, setProgress, callBack) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            // Handle unsuccessful uploads
            console.log(error)
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const collRef = collection(firestore, "services");
                await addDoc(collRef, { ...data, imgUrl: downloadURL });
                console.log("Uploaded");
                callBack()
            });
        })
};

// add new work
export const addWork = async (file, setProgress, callBack) => {
    try {
        const storageRef = ref(storage, `works/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
            },
            callBack)
    } catch (err) {
        console.log(err);
    }
};

export const placeOrder = async (data, callBack) => {
    try{
        const collRef = collection(firestore, "orders");
        await addDoc(collRef, data);
        console.log("Uploaded");
        callBack();
    }catch(err){
        console.error(err)
    }
}
