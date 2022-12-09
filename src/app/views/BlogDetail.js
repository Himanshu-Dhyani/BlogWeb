import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Card from 'react-bootstrap/Card';
// import Comment from '../components/Comment';
import Loader from '../components/Loader';

export default function BlogDetail() {

    const params = useParams();
    const [activeList, setActiveList] = useState(null)

    // fetch api
    useEffect(() => {
        fetch(`https://blogweb-api-xdmo.onrender.com/api/posts/${params.id}`)
            .then((res) => res.json())
            .then((json) => setActiveList(json))
    }, [params.id])

    return (
        <>
            <Header />

            {activeList === null ? <Loader /> :
                (<div className="blogDetailContainer">
                    {activeList.map((activeList) => (
                        <Card className='blog_detail'>
                            {/* <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" /> */}
                            <Card.Body>
                                <Card.Title>{activeList.title}</Card.Title>
                                <Card.Text>{activeList.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                    {/* <Comment /> */}
                </div>)}
        </>

    )
}
