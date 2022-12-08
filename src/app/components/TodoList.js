import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import AddTodoModal from './AddTodoModal';
import { Button } from 'react-bootstrap';
import EditTodoModal from './EditUserDetailModal';

export default function TodoList() {

    const params = useParams()

    const [todos, setTodos] = useState([])
    const [content, setContent] = useState("")
    // const [showEditId, setShowEditId] = useState(0);
    // const [editTitle, setEditTitle] = useState("")
    const [show, setShow] = useState(false);
    // const [showEdit, setShowEdit] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleCloseEdit = () => setShowEdit(false);
    // const handleShowEdit = () => setShowEdit(true);

    const getTodo = () => {
        fetch(`https://blogweb-api-xdmo.onrender.com/api/users/${params.id}/todos`)
            .then((res) => res.json())
            .then((json) => setTodos(json))
    }

    useEffect(() => {
        getTodo()
    }, [params.id])

    const delTodo = async (id) => {
        try {
            await fetch(`https://blogweb-api-xdmo.onrender.com/api/todos/delete/${id}`, {
                method: 'DELETE'
            }).then((res) => {
                if (res.status !== 200) {
                    return console.log("Error in Del")
                }
                else {
                    // setTodos(todos.filter((todo) => {
                    //     return todo.todoId !== id
                    // }))
                    getTodo()
                }
            })
        } catch (err) {
            console.log("Err in Del Todo >>>", err)
        }
    }

    const handleTodoTitle = (e) => setContent(e.target.value)

    const handleAddTodo = async () => {
        try {
            await fetch(`https://blogweb-api-xdmo.onrender.com/api/todos/add`, {
                method: 'POST',
                body: JSON.stringify({
                    "userId": `${params.id}`,
                    "content": `${content}`,
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
            }).then((json) => {
                return setTodos((todos) => [json, ...todos])
            })
        }
        catch (err) {
            console.log("Error in Add Post>>", err)
        }
        getTodo()
        handleClose()
    }

    // const editTodoBtn = (id) => {
    //     handleShowEdit()
    //     setShowEditId(id)
    // }

    // const handleTodoEditTitle = (e) => setEditTitle(e.target.value)

    // const editTodos = async () => {
    //     const data = {
    //         // id: `${showEditId}`,
    //         content: `${editTitle}`,
    //         completed: false,
    //         // userId: `${params.id}`,
    //     }

    //     await fetch(`https://jsonplaceholder.typicode.com/todos/${showEditId}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     }).then((res) => {
    //         if (res.status !== 200) {
    //             return console.log("Err in Edit")
    //         }
    //         else {
    //             return res.json()
    //         }
    //     }).then((json) => {
    //         const editedTodo = todos.map(todo => {
    //             if (todo.id === json.id) {
    //                 return data;
    //             }
    //             return todo;
    //         });
    //         setTodos(editedTodo);
    //         console.log(editedTodo)
    //         handleCloseEdit()
    //     })
    // }

    return (
        <>
            <div className='postCardHeader'><Button onClick={handleShow}>+ Add Todo</Button></div>
            {todos.map((todo) => (
                <Card className='albumCard' key={todo.todoId}>
                    <Card.Body>
                        <Card.Title className='todoTitle'>
                            <Form.Check
                                key={todo.id}
                                type="checkbox"
                                id={`default-checkbox`}
                                defaultChecked={todo.completed}
                            />
                            {todo.content}
                        </Card.Title>
                        <div className='postCardHeader'>
                            <Button className="todoDelBtn btn-danger" onClick={() => delTodo(todo.todoId)}>Delete</Button>
                            {/* <Button className="btn-secondary" onClick={() => editTodoBtn(todo.id)}>Edit</Button> */}
                        </div>
                    </Card.Body>
                </Card>
            ))}
            <AddTodoModal
                show={show}
                handleClose={handleClose}
                handleAddTodo={handleAddTodo}
                handleTodoTitle={handleTodoTitle}
            />

            {/* <EditTodoModal
                show={showEdit}
                handleClose={handleCloseEdit}
                editTodos={editTodos}
                handleTodoEditTitle={handleTodoEditTitle}
            /> */}

        </>
    )
}
