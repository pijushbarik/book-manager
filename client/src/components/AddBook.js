import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash'

import { 
  getAuthorsQuery, 
  addBookMutation,
  getBooksQuery
} from './../queries/queries';

class AddBook extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  };

  handleFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    if(!this.state.authorId.trim()) {
      return alert("Select an author");
    }
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      }, 
      refetchQueries: [
        { query: getBooksQuery }
      ]
    });
    alert("Book added");
    this.setState({
      name: '',
      genre: '',
      authorId: ''
    });
  }

  render() {
    // console.log(this.props);
    let authorOptions = [];
    let data = this.props.getAuthorsQuery;
    if(
        !data.loading && 
        !data.err && 
        data.authors
      ) {
      authorOptions = [...data.authors];
    }
    return (
      <div 
        className="modal" 
        style={{display: this.props.modalOpen ? "block" : "none"}} 
        tabIndex="-1" 
        role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title">Add a new book</h5>
              <button 
                type="button" 
                className="close"
                onClick={ this.props.closeModal }>
                <span>&times;</span>
              </button>
            </div>            
            <div className="modal-body">
              <form onSubmit={ this.handleFormSubmit }>
                <div className="form-group">
                  <label htmlFor="book-name-input">Book name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="book-name-input" 
                    placeholder="Enter name of the book"
                    required
                    value={ this.state.name }
                    name="name" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="book-genre-input">Book genre</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="book-genre-input" 
                    placeholder="Enter genre of the book"
                    required
                    value={ this.state.genre }
                    name="genre" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="book-author-input">Book author</label>
                  <select 
                    className="form-control" 
                    required
                    value={ this.state.authorId } 
                    name="authorId" 
                    onChange={this.handleFieldChange}>{
                      data.loading ? 
                      <option>Loading authors list...</option> :
                      <React.Fragment>
                        <option>Select an author...</option>
                        { 
                          authorOptions.map((author) => (
                          <option 
                            key={ author.id } 
                            value={ author.id }>{ author.name }</option>
                          )) 
                        }
                      </React.Fragment>
                    }</select>
                  
                </div>
                <div className="modal-footer">
                  <button 
                        className="btn btn-secondary"
                        onClick={ this.props.closeModal }>Cancel</button>
                  <button 
                      type="submit" 
                      className="btn btn-primary"
                      onClick={ this.handleFormSubmit }>Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);