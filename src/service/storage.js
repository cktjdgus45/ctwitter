import "firebase/storage";
import firebaseApp from './firebase';
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref, uploadString } from "@firebase/storage";
import { v4 } from 'uuid';


class fileUpload {
    storageService
    storageRef;
    constructor() {
        this.storageService = getStorage();
    }
    async getFileUrl(userId, file, fireStore, tweet) {
        this.storageRef = ref(this.storageService, `${userId}/${v4()}`)
        const uploadFile = await uploadString(this.storageRef, file, "data_url");
        const fileUrl = await getDownloadURL(uploadFile.ref);
        console.log(fileUrl)
        fireStore.write(tweet, userId, fileUrl);
    }
}

export default fileUpload;