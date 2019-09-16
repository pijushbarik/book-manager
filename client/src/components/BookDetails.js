import React from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from './../queries/queries';

const bookDetails = (props) => {
  // console.log(props);
  
  const noBookSelectedMsg = <h3>Select a book from left side to get details</h3>;
  const fetchingMsg = <h3>Fetching book details...</h3>;
  const fetchingErrMsg = <h3>Error occurred while fetching books list</h3>;
  let output;

  if(!props.data.loading && !props.data.err && props.data.book) {
    // console.log(props);
    const data = props.data.book;
    output = <React.Fragment>
      <h3>About the book</h3>
      <div className="mt-3">
        <p className="h3 text-capitalize">{ data.name } &nbsp; 
          <em><small className="badge badge-success text-capitalize">
            { data.genre }</small></em></p>
        <p className="h4 text-capitalize">Author: { data.author.name }</p>
        <div className="card">
          <div className="card-body">
            <p className="card-title h4">About the author</p>
            <p>Age: { data.author.age }</p>
            <p>All books written by the author:</p>
            <React.Fragment>
              { data.author.books.map((book) => <button
                key={ book.id }
                className="btn btn-outline-success btn-book-list text-capitalize"
                onClick={ () => props.onSelectBook(book.id) }>
                  { book.name }
                </button>) }
            </React.Fragment>
          </div>
        </div>
      </div>
    </React.Fragment>
  }

  return(
    <React.Fragment>
      {
        !props.bookId ? noBookSelectedMsg : 
          (props.data.loading ? fetchingMsg : 
            (
              props.data.err ? fetchingErrMsg : output
            )
          )
      }
    </React.Fragment>
  );
}

export default graphql(getBookQuery, {
  options: (props) => {
    if(props.bookId !== "") return {
      variables: {
        id: props.bookId
      }
    }
  }
})(bookDetails);