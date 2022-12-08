import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Search({ handleChange, searchInput, handleSearchClick, handleKeyDown }) {

    return (
        <div>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <Button variant="outline-success" onClick={handleSearchClick} >Search</Button>
            </Form>
        </div>
    )
}
