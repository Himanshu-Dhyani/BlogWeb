import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';

export default function UserList() {

    // States
    const [userList, setUserList] = useState([])

    // fetch api
    useEffect(() => {
        fetch(`https://blogweb-api-xdmo.onrender.com/api/users`)
            .then((res) => res.json())
            .then((json) => setUserList(json))
    }, [])

    return (
        <>
            <Header />
            {userList.length === 0 ? <Loader /> : (
                <>
                    {userList.map((user) => (
                        <Card className='userCard' key={user.id}>
                            <Card.Body>
                                <Card.Title>Name: {user.name}</Card.Title>
                                <Card.Title>Username : {user.username}</Card.Title>
                                <Card.Title>Email : {user.email}</Card.Title>
                                <Link to={`/user/${user.id}`}>
                                    <Button variant="primary">User Info</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </>
            )}
        </>
    )
}
