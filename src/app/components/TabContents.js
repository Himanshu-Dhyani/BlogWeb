import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AlbumList from './AlbumList';
import BlogCards from './BlogCards';
import TodoList from './TodoList';

export default function TabContents() {
    return (
        <>
            <Tabs
                defaultActiveKey="Post"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Post" title="Post">
                    <BlogCards />
                </Tab>
                <Tab eventKey="Todos" title="Todos">
                    <TodoList />
                </Tab>
                {/* <Tab eventKey="Album" title="Album">
                    <AlbumList />
                </Tab> */}
            </Tabs>
        </>
    )
}
