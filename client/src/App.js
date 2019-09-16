import React from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import Navbar from './components/Navbar';

// Apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends React.Component {
  state = {
    selectedBookId: '',
    modalIsOpen: false
  };

  handleSelectBook = (id) => {
    this.setState({
      selectedBookId: id
    });
  }

  handleAddBtn = () => {
    this.setState((prevState) => ({ modalIsOpen: !prevState.modalIsOpen }));
  }

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar onAddBtnClick={ this.handleAddBtn } />
        <ApolloProvider client={ client }>
          <div id="app" className="container">
            <div className="row">
              <div className="col-md-6">
                <BookList onSelectBook = { (id) => this.handleSelectBook(id) } />
                <AddBook 
                  modalOpen={ this.state.modalIsOpen }
                  closeModal={ this.handleModalClose } />
              </div>
              <div className="col-md-6">
                <BookDetails 
                  bookId={ this.state.selectedBookId }
                  onSelectBook = { (id) => this.handleSelectBook(id) } />
              </div>
            </div>
          </div>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
