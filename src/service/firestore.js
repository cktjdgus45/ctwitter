import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";


const db = getFirestore();

class fireStore {
    async write(tweet, userId) {
        try {
            const docRef = await addDoc(collection(db, "nweets"), {
                tweet,
                creator: userId,
                createdAt: Date.now()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async read() {
        const tweets = [];
        const querySnapshot = await getDocs(collection(db, "nweets"));
        querySnapshot.forEach((doc) => {
            tweets.push({ ...doc.data(), id: doc.id });
        });
        return tweets;
    }

    watchingChange(setTweets) {
        const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push({ ...doc.data(), id: doc.id });
            });
            setTweets(tweets);
        });
    }
    async delete(docId) {
        await deleteDoc(doc(db, "nweets", `${docId}`));
    }
}

export default fireStore;

