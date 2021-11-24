import React, { useRef, useState } from 'react';

const Tweet = ({ tweet, isOwner, fireStore, profile }) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweet.tweet);
    const inputRef = useRef();
    const onDelete = () => {
        const ok = window.confirm("트윗을 삭제하시겠습니까?");
        if (ok) {
            fireStore.delete(tweet.id);
        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev);
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewTweet(value);
    }
    const onUpdate = (event) => {
        event.preventDefault();
        const {
            current: {
                value: tweet,
                id
            },
        } = inputRef;
        fireStore.update(id, tweet);
        setEditing(false);
    }

    return (
        <div>
            {
                editing ?
                    (
                        <>
                            <form onSubmit={onUpdate}>
                                <input ref={inputRef} id={tweet.id} type="text" placeholder="트윗 변경하기" required value={newTweet} onChange={onChange} />
                                <input type="submit" value="트윗 업데이트" />
                            </form>
                            <button onClick={toggleEditing}>변경 취소</button>
                        </>
                    ) :
                    (
                        <>
                            {isOwner && (
                                <>
                                    {profile !== "" ? (<img src={profile} alt="profile" />) : (<></>)}
                                    <h4>{tweet.tweet}</h4>
                                    <button onClick={onDelete}>트윗 삭제</button>
                                    <button onClick={toggleEditing}>트윗 변경</button>
                                </>
                            )}
                        </>
                    )
            }
        </div>
    );
}

export default Tweet;