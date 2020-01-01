import React from 'react';
import io from 'socket.io-client';

export default class Home
extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            book: []
        }
    }

    componentDidMount() {

    }

    handleSearch() {
        const books = fetch(`/search`)
            .then(res => res.json())
            .then(books => console.log(books))
        console.log(books);

    }

    render() {

        const handleSearch = () => this.handleSearch();
        return (
            <div>
                <h1>Simple E-Book crawler</h1>
                <form action="/search" method="GET">
                    <input type="text" name="bookName" placeholder="Search your Book!" required/>
                    <button type="submit" onClick={handleSearch()}>Find</button>
                </form>
            </div>
        )
    }
}
