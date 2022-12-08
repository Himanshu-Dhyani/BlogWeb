import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import TabContents from '../components/TabContents';
import Header from '../components/Header';
import Loader from '../components/Loader';
import EditUserDetailModal from '../components/EditUserDetailModal';

export default function UserDetail() {
    const params = useParams();

    const [userDetail, setUserDetail] = useState([])
    const [showEdit, setShowEdit] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")

    const editName = (e) => setName(e.target.value)
    const editAddressStreet = (e) => setStreet(e.target.value)
    const editAddressCity = (e) => setCity(e.target.value)
    const editAddressZipcode = (e) => setZipcode(e.target.value)

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


    const getUSerDetail = () => {
        fetch(`https://blogweb-api-xdmo.onrender.com/api/users/${params.id}`)
            .then((res) => res.json())
            .then((json) => setUserDetail(json))
    }

    useEffect(() => {
        getUSerDetail()
    }, [params.id])

    const editUserDetailBtn = (username, email) => {
        handleShowEdit()
        setUsername(username)
        setEmail(email)
    }

    const editUserDetail = async () => {
        const data = {
            "username": `${username}`,
            "name": `${name}`,
            "email": `${email}`,
            "address": {
                "street": `${street}`,
                "city": `${city}`,
                "zipcode": `${zipcode}`
            },
            // "phone": "7039109098",
            // "website": "ewebcore.com",
            // "company": {
            //     "name": "Ewebcore Technologies",
            //     "catchPhrase": "xyz",
            //     "bs": "abc"
            // }
        }
        await fetch(`https://blogweb-api-xdmo.onrender.com/api/users/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => {
            if (res.status !== 200) {
                return console.log("Error in UserDetail")
            }
            else {
                return res.json()
            }
        }).then((json) => {
            const editedUserDetail = userDetail.map((userDetail) => {
                if (userDetail.id === json.id) {
                    return data;
                }
                return userDetail
            })
            setUserDetail(editedUserDetail)
            getUSerDetail()
            handleCloseEdit()
        })
    }

    return (
        <div>
            <Header />
            {userDetail.length === 0 ? <Loader /> : (
                <>
                    {userDetail.map((userDetail) => (
                        <Card className='userCarduserDetail' key={userDetail.id}>
                            <Card.Body>
                                <Card.Text><b>Name :</b> {userDetail.name}</Card.Text>
                                <Card.Text><b>Username :</b> {userDetail.username}</Card.Text>
                                <Card.Text><b>Email :</b> {userDetail.email}</Card.Text>
                                <Card.Text><b>Address :</b>
                                    {userDetail.address ? (
                                        <> {userDetail.address.street} {userDetail.address.city} {userDetail.address.zipcode}</>

                                    ) : " -"}
                                </Card.Text>
                                <Card.Text><b>Phone :</b>
                                    {userDetail.phone ? (
                                        <> {userDetail.phone}</>

                                    ) : " -"}
                                </Card.Text>
                                <Card.Text><b>Website :</b>
                                    {userDetail.website ? (
                                        <> {userDetail.website}</>

                                    ) : " -"}
                                </Card.Text>
                                <Card.Text><b>Company :</b>
                                    {userDetail.company ? (
                                        <> {userDetail.company.name}</>

                                    ) : " -"}
                                </Card.Text>
                                <Button onClick={() => editUserDetailBtn(userDetail.username, userDetail.email)}>Edit</Button>
                            </Card.Body>
                            <TabContents />
                        </Card>
                    ))}
                </>
            )}
            <EditUserDetailModal
                show={showEdit}
                handleClose={handleCloseEdit}
                editUserDetail={editUserDetail}
                editAddressStreet={editAddressStreet}
                editName={editName}
                editAddressCity={editAddressCity}
                editAddressZipcode={editAddressZipcode}
            />
        </div>
    )
}
