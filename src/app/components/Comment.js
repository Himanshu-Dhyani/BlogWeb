import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default function Comment() {

    const params = useParams();
    const [comment, setComment] = useState([])

    // fetch api
    useEffect(() => {
        fetch(`https://blogweb-api.herokuapp.com/api/posts/${params.id}/comments`)
            .then((res) => res.json())
            .then((json) => setComment(json))
    }, [params.id])

    return (
        <>
            <h3 className='commentHeading'>Comments</h3>
            {comment.map((comment) => (
                <Card className='commentCard' key={comment.id}>
                    <Card.Body>
                        <Card.Title>{comment.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{comment.email}</Card.Subtitle>
                        <Card.Text>{comment.body}</Card.Text>
                    </Card.Body>
                </Card>
            ))
            }
        </>
    )
}
