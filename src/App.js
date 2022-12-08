import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetail from './app/views/BlogDetail';
import UserList from './app/views/UserList';
import UserDetail from './app/views/UserDetail';
import AlbumDetail from './app/views/AlbumDetail';

function App() {

  return (
    <>
      <Router>

        <Routes>
          <Route
            exact path='/BlogWeb'
            element={
              <UserList />
            }
          />

          <Route
            exact path='/user/:id'
            element={
              <UserDetail />
            }
          />

          <Route
            exact path='/blogDetail/:id'
            element={
              <BlogDetail />
            }
          />

          <Route
            exact path='/album/:id'
            element={
              <AlbumDetail />
            }
          />

        </Routes>
      </Router>
    </>
  );
}

export default App;
