import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function AlbumList() {

    const params = useParams();

    const [albumsList, setAlbumsList] = useState([])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${params.id}/albums`)
            .then((res) => res.json())
            .then((json) => setAlbumsList(json))
    }, [params.id])


    return (
        <>
            {albumsList.map((alb) => (
                <Card className='albumCard' key={alb.id}>
                    <Card.Body className='albumCardBody'>
                        <Card.Title>{alb.title}</Card.Title>
                        <Link to={`/album/${alb.id}`}>
                            <Button variant="primary">Album</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}
