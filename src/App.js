import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBar from './SearchBar'
import Header from './Header'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
      this.getBooks();
  }

  getBooks() {
      BooksAPI.getAll().then((books) => {
          this.setState({books});
      });
      //Use the BooksAPi to get all the books for the mainPage
  }

  filterBooks(shelfID) {
      return this.state.books.filter((book) => book.shelf === shelfID)
  }

  //Above method will filter all books and render them on the correct shelf

  updateShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then(response => {
      book.shelf = shelf
      var filteredBooks = this.state.books.filter(bookIterator => bookIterator.id !== book.id )
      //Filter the books so that the book with the previous state can be updated
      filteredBooks.push(book)
      //Push the book with updated shelf in the array
      this.setState({books: filteredBooks})
      //Update the state of books array with updated shelf
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          //React Routing for home page to render on /
          <div>
            <Header></Header>
            <div className="list-books">
              <div className="list-books-content">
                <BookShelf title="Currently Reading" books={this.filterBooks("currentlyReading")} onChangeShelf={this.updateShelf}>
                </BookShelf>
                <BookShelf title="Want to Read" books={this.filterBooks("wantToRead")} onChangeShelf={this.updateShelf}>
                </BookShelf>
                <BookShelf title="Read" books={this.filterBooks("read")} onChangeShelf={this.updateShelf}>
                </BookShelf>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          //React routing for search page to render on /search URL
            <SearchBar books={this.state.books} onChangeShelf={this.updateShelf}></SearchBar>
        )}/>
      </div>
    )
  }
}

export default BooksApp
