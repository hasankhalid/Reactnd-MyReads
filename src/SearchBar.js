import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Books'

class SearchBar extends Component {
  state = {
    query: '',
    searchResults: []
  }

  initiateSearch = (event) => {
    const query = event.target.value.trim()
    this.setState({query:query})
    console.log(query)

    if (query) {
      BooksAPI.search(query).then((books) => {
        if (books.length > 0) {
          books.forEach((book) => {
            book.shelf="none"
            this.props.books.forEach((shelfBook) => {
              if (book.id === shelfBook.id){
                book.shelf = shelfBook.shelf
                console.log("true" + book.title + " " + shelfBook.shelf + " " + book.shelf)
              }
            })
          })
          this.setState ({searchResults: books})}
          //Search for the Query and return results. After doing so the application will loop through existing shelf books and set correct book states
        else {
          this.setState({searchResults: []})}
      })}
  }

  render(){
    console.log(this.state.searchResults)
    const searchBookItems = this.state.searchResults.map((book) =>
      <li key={book.id}><Book book={book} title={book.title} Author={book.author} avatarURL={book.imageLinks.thumbnail} onChangeShelf={this.props.onChangeShelf}/></li>
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.initiateSearch}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{searchBookItems}</ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
