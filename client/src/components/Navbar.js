import React from 'react';

export default (props) => (
  <nav className="navbar navbar-dark bg-dark mb-3">
    <div className="container">
      <h1 className="navbar-brand">Books Manager</h1>
      <input 
        type="button" 
        className="btn btn-outline-light"
        value="Add a new book"
        onClick={ props.onAddBtnClick } />
    </div>
  </nav>
);