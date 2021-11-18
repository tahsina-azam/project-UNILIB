import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { Card } from 'react-bootstrap';

const Post = ({ message }) => {
    return <Card  style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Text>
            {message}
        </Card.Text>
        </Card.Body>
    </Card>
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

    if (loading) return <div>loading...</div>;
    if (error) return <div>error!</div>
    return (
        <>
            {data.posts.length === 0 ? <div>no posts, sorry</div> : data.posts.map(p => <Post key={p.id} message={p.message} />)}
        </>
    )
}

export default Forum;
