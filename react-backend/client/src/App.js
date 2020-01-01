import React, {useEffect, useState} from 'react';
import './App.css';

export default class App extends React.Component {
    state = {
        books: []
    }
   
	componentDidMount() {
  
    }

    handleSearching(){
        
    }

    render() {

        return (
            <div className="App">
                <h1>Book List</h1>
                <p>this is the page for crawling the all Korean eBook, from major eBook stores
                    in S.Korea</p>
                <form action="/search" method="GET">
                    <input title="Which book are you looking for?" name="bookName"></input>
                    <button type="submit">Search</button>
                </form>
            
            <h1>Result</h1>
            </div>
        );
    }

}
