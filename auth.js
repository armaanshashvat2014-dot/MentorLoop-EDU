import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyBOP356DMuNyWQyHDbksw0i_dWXfXsbQvI",
  authDomain: "mentorloop-55a37.firebaseapp.com",
  projectId: "mentorloop-55a37",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence);

export async function requireUser(callback){

  onAuthStateChanged(auth, async(user)=>{

    if(!user){
      location.href = "index.html";
      return;
    }

    const mapSnap = await getDoc(doc(db,"user_map",user.uid));

    if(!mapSnap.exists()){
      location.href = "index.html";
      return;
    }

    const publicId = mapSnap.data().publicId;

    const userSnap = await getDoc(doc(db,"leaderboard",publicId));

    if(userSnap.exists() && userSnap.data().banned === true){
      document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;">
          <div>
            <h1>🚫 Banned</h1>
            <p>ID: ${publicId}</p>
          </div>
        </div>
      `;
      return;
    }

    callback({
      authUser:user,
      publicId:publicId,
      name:userSnap.data().name || "User"
    });

  });
}
