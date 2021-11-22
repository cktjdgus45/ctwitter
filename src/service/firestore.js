import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";


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
        const dbArr = [];
        const querySnapshot = await getDocs(collection(db, "nweets"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            dbArr.push(data);
        });
        return dbArr;
    }

    watchingChange(setTweets) {
        const q = query(collection(db, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push(doc.data());
            });
            console.log(tweets)
            setTweets(tweets);
        });
    }
}

export default fireStore;

