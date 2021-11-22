import React from 'react';

const Tweet = ({ tweet, isOwner, fireStore }) => {
    const onDelete = () => {
        fireStore.delete(tweet.id);
    }
    const onUpdate = () => {

    }
    return (
        <div>
            <h4>{tweet.tweet}</h4>
            {isOwner && (
                <>
                    <button onClick={onDelete}>트윗 삭제</button>
                    <button onClick={onUpdate}>트윗 변경</button>
                </>
            )}
        </div>
    );
}

export default Tweet;