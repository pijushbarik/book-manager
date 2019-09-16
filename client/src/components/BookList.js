import React from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from './../queries/queries';

const bookList = (props) => {
  // console.log(props);
  let result = <h3>Error occurred while fetching books list</h3>;
  if(!props.data.loading && !props.data.err && props.data.books) {
    result = <React.Fragment> { 
        props.data.books.map((book) => <button 
          key={ book.id }
          className="btn btn-outline-success btn-book-list text-capitalize"
          onClick={ () => props.onSelectBook(book.id) }>
            {book.name} (<em>{book.genre}</em>)
        </button>) 
      } </React.Fragment>
  }
  return (
    <div>
      <h3>All available books</h3>
      { props.data.loading ? <h1>Loading book lists...</h1> : result}
    </div>
  )
};

export default graphql(getBooksQuery)(bookList);