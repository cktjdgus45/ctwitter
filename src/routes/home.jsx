import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Tweet from '../components/tweet';

const Home = ({ AuthService, fireStore }) => {
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState && historyState.id);
    const [tweet, setTweet] = useState('');
    const [tweets, setTweets] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        fireStore.write(tweet, userId);
        setTweet('');
    }
    const onChange = (event) => {
        const { value } = event.target;
        setTweet(value);
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
                <input type="submit" value="트윗올리기" />
            </form>
            {
                tweets.map(tweet => (
                    <Tweet key={tweet.creator}
                        tweet={tweet}
                        isOwner={userId === tweet.creator}
                        fireStore={fireStore} />
                ))
            }
        </>
    );
}

export default Home;