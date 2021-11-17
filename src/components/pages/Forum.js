import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';

const Post = ({ message }) => {
    return <div>
        {message}
    </div>
}

const GET_POSTS_QUERY = gql`
                 query MyQuery {
                     posts {
                         message
                         id
                     }
                 }`;

function Forum() {
    const { data, loading, error } = useSubscription(GET_POSTS_QUERY)

    if(loading) return <div>loading...</div>;
    if(error)return <div>error!</div>
    return (
        <div>
            {data.posts.length === 0 ? <div>no posts, sorry</div> : data.posts.map(p => <Post key={p.id} message={p.message} />)}
        </div>
    )
}

export default Forum;
