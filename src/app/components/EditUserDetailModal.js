import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditUserDetailModal = ({
    show,
    handleClose,
    editUserDetail,
    editAddressStreet,
    editName,
    editAddressCity,
    editAddressZipcode,
}) => {

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" placeholder='Name' onChange={editName} />
                            <div style={{ display: "flex", margin: "10px 0 0 0" }}>
                                <Form.Control type="text" placeholder='Street' onChange={editAddressStreet} />
                                <Form.Control style={{ margin: "0 10px 0 10px" }} type="text" placeholder='City' onChange={editAddressCity} />
                                <Form.Control type="text" placeholder='Zipcode' onChange={editAddressZipcode} />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editUserDetail}>
                        Make Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditUserDetailModal
