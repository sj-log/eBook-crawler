import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this
            .onSubmit
            .bind(this);

        this.onChange = this
            .onChange
            .bind(this);

        this.showMilliBooks = this
            .showMilliBooks
            .bind(this);

        this.state = {
            inputBookName: '',
            books: []
        }

    }
    onChange(e) {
        e.preventDefault();
        this.setState({inputBookName: e.target.value});
        console.log(this.state);
    }

    async onSubmit(e) {
        e.preventDefault();
        const {inputBookName, books} = this.state;
        console.log(inputBookName);

        await axios
            .get(`/search?inputBookName=${inputBookName}`)
            .then(res => res.data)
            .then(books => this.setState({books: books}));

        console.log(this.state.books);

    }

    showMilliBooks() {
        const {books} = this.state;
        if (books.length > 0) {
            return (
                <ul>
                    {books.map((book, i) => <li key={i}>
                        <h6>
                            {book}
                        </h6>
                    </li>)
}
                </ul>
            )
        }
    }

    render() {

        return (
            <div className="App">
                <h1>Book List</h1>
                <p>this is the page for crawling the all Korean eBook, from major eBook stores
                    in S.Korea</p>
                <form onSubmit={this.onSubmit}>

                    <input
                        placeholder="Search Book Name"
                        onChange={this.onChange}
                        name="inputBookName"></input>

                    <button type="submit">Search</button>

                </form>

                <h1>Result</h1>
                {this.showMilliBooks()}
            </div>
        );
    }

}
