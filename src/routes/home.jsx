import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Tweet from '../components/tweet';

const Home = ({ AuthService, fireStore, fileUploader }) => {
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState && historyState.id);
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);
    const [file, setFile] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        const fileUrl = fileUploader.getFileUrl(userId, file, fireStore, tweet);
        console.log(fileUrl)
        fireStore.write(tweet, userId, fileUrl);
        setTweet('');
        setFile('');
    }
    const onChange = (event) => {
        const { value } = event.target;
        setTweet(value);
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishEvent) => {
            const { currentTarget: { result } } = finishEvent;
            setFile(result);
        }
    }

    useEffect(() => {
        fireStore.watchingChange(setTweets);
        fireStore.read().then(data => setTweets(data));
    }, [])
    return (
        <>
            <span> Home </span>
            <form onSubmit={onSubmit}>
                <input type="text" value={tweet} onChange={onChange} placeholder="생각을 적어주세요" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                {file && //
                    <div>
                        <img src={file} alt="Preview_image" width="50" height="50" />
                    </div>
                }
                <input type="submit" value="트윗올리기" />
            </form>
            {
                tweets.map(tweet => (
                    <Tweet key={tweet.creator}
                        tweet={tweet}
                        isOwner={userId === tweet.creator}
                        fireStore={fireStore}
                        profile={tweet.fileUrl} />
                ))
            }
        </>
    );
}

export default Home;