import React, { Component } from 'react'
import Book from './Books'

class BookShelf extends Component {
  render(){
    console.log(this.props.books)
    const bookItems = this.props.books.map((book) =>
      <li key={book.id}><Book book={book} title={book.title} Author={book.author} avatarURL={book.imageLinks.thumbnail}  onChangeShelf={this.props.onChangeShelf}/></li>
    );
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookItems}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
