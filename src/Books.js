import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'

class Book extends Component {
  render(){
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,   backgroundImage:`url(${this.props.avatarURL})`}}></div>
          <ShelfChanger onChangeShelf={this.props.onChangeShelf} book={this.props.book}></ShelfChanger>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.Author}</div>
      </div>
    )
  }
}

export default Book

//backgroundImage: 'url("")'
