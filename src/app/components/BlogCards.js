import React, { useEffect, useState } from 'react';
import Pagination from "react-js-pagination";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import AddPostModal from './AddPostModal';
import Search from './Search';

function BlogCards() {

    const params = useParams();
    const [activeList, setActiveList] = useState([]);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [errorMsgForTitle, setErrorMsgForTitle] = useState("")
    const [errorMsgForDesc, setErrorMsgForDesc] = useState("")
    const [searchInput, setSearchInput] = useState("");
    const [activePage, setActivePage] = useState(1)
    const [postsPerPage] = useState(5);

    const handleClose = () => {
        setShow(false)
        setErrorMsgForTitle("")
        setErrorMsgForDesc("")
    };
    const handleShow = () => setShow(true);

    const getPost = () => {
        fetch(`https://blogweb-api-xdmo.onrender.com/api/users/${params.id}/posts`)
            .then((res) => res.json())
            .then((json) => setActiveList(json))
    }

    useEffect(() => {
        getPost()
    }, [params.id])

    const delPost = async (id) => {
        await fetch(`https://blogweb-api-xdmo.onrender.com/api/posts/delete/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            if (res.status !== 200) {
                return console.log("Error in Del")
            }
            else {
                setActiveList(activeList.filter((activeList) => {
                    return activeList.id !== id
                }))
            }
        }).catch((err) => {
            console.log("Err in Del", err)
        })
        getPost()
    };

    const handlePostTitle = (e) => {
        setTitle(e.target.value)
        setErrorMsgForTitle("")
    }

    useEffect(() => {
        if (/^\s/.test(title)) {
            setTitle("");
        }
    }, [title]);

    const handlePostDesc = (e) => {
        setDesc(e.target.value)
        setErrorMsgForDesc("")
    }

    const fetchAddPostApi = async () => {
        await fetch(`https://blogweb-api-xdmo.onrender.com/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({
                userId: `${params.id}`,
                title: `${title}`,
                body: `${desc}`
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            if (res.status !== 200) {
                return console.log("Error in Add Post")
            }
            else {
                return res.json()
            }
        }).then(async (json) => {
            await setActiveList((activeList) => [json, ...activeList])
        }).catch((err) => {
            console.log("Err in Add Post", err)
        })
        getPost()
    }

    const handleAddPost = () => {
        if (title.length === 0 && desc.length === 0) {
            setErrorMsgForTitle("Enter Title")
            setErrorMsgForDesc("Enter Description")
        }
        else if (title.length === 0) {
            setErrorMsgForTitle("Enter Title")
        }
        else if (desc.length === 0) {
            setErrorMsgForDesc("Enter Description")

        }
        else if (title && desc !== "") {
            fetchAddPostApi()
            handleClose()
            setTitle("")
            setDesc("")
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        if (/^\s/.test(searchInput)) {
            setSearchInput("");
        }
    }, [searchInput]);

    const filtered = activeList.filter(post => {
        const searchValue = searchInput.toLowerCase();
        const title = post.title.toLowerCase();
        return title.startsWith(searchValue) || title === searchValue || title.includes(searchValue);
    });

    const handleSearchClick = () => {
        if (searchInput !== "" && !/^\s/.test(searchInput)) {
            setActiveList(filtered)
        }
        setActivePage(1)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            handleSearchClick()
        }
    };

    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    }

    const indexOfLastPost = activePage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = activeList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <div className='postCardHeader'>
                <Search
                    handleChange={handleChange}
                    searchInput={searchInput}
                    handleSearchClick={handleSearchClick}
                    handleKeyDown={handleKeyDown}
                />

                <Button onClick={handleShow} className="addPostBtn">+ Add Post</Button>
            </div>
            <div className="card_container">
                {currentPosts.map((post) => (
                    <Card className="blogCard" key={post.postId} >
                        {/* <Card.Img variant="top" src="https://images.indianexpress.com/2022/06/Enchanted-lake-perseverance-rover-Mars.jpg" /> */}
                        <Card.Body >
                            <Card.Title className="card_title">{post.title}</Card.Title>
                            <Card.Text className="card_desc">{post.body}</Card.Text>

                            <Link to={`/blogDetail/${post.postId}`} >
                                <Button variant="primary">
                                    Detail
                                </Button>
                            </Link>{" "}
                            <Button variant="danger" onClick={() => delPost(post.postId)}>
                                Delete
                            </Button>
                        </Card.Body>
                    </Card>
                ))
                }
            </div>
            <Pagination
                innerClass={`${activeList.length <= 5 ? 'paginationMainHide' : 'paginationMain'}`}
                activeClass='activePageClass'
                activePage={activePage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={activeList.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
            />

            <AddPostModal
                handleClose={handleClose}
                show={show}
                handleAddPost={handleAddPost}
                handlePostTitle={handlePostTitle}
                handlePostDesc={handlePostDesc}
                errorMsgForTitle={errorMsgForTitle}
                errorMsgForDesc={errorMsgForDesc}
            />
        </>
    );
}

export default BlogCards;