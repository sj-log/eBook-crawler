import React, {Fragment} from 'react';
import axios from 'axios';
import './App.css';
import {Layout, Card,Form,Row,Col, Icon, Button, Input} from 'antd';

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
            books: [],
            loading: false
        }

    }
    onChange(e) {
        e.preventDefault();
        this.setState({inputBookName: e.target.value});
        console.log(this.state);
    }

    async onSubmit(e) {
        // e.preventDefault();
        const {inputBookName} = this.state;
        console.log(inputBookName);

        await axios
            .get(`/search?inputBookName=${inputBookName}`)
            .then(res => res.data)
            .then(books => this.setState({books: books}));

        console.log(this.state.books);

    }

    showMilliBooks() {
        const {books, loading} = this.state;

        console.log(books);
        if (books.length > 0) {
            return (
                <Layout.Content>
                    <Layout.Header style={{backgroundColor:"#ffffff"}}>밀리의 서재 총 {books.length}</Layout.Header>
                   <Layout.Content>
                    <Row > 
                        {books.map((book, i) =>
                        
                        <a className="millie_book_link" href={book.url}>
                          <Col xs={6} >
                            <Card bordered  hoverable key={i} cover={   <img className="millie_book_img"  src={book.img}/>}>
                                                     
                                <Card.Meta title={book.title}/>
                                    
                            </Card>
                            </Col>
                            </a>
                        )
}
                    </Row>
                    </Layout.Content>
                </Layout.Content>
            )
        }
    }

    render() {

        return (
            <Layout style={{textAlign:'center',backgroundColor:"#FFFFFF"}}className="App">
           
                    <h1>
                        Book List</h1>
                    <p>this is the page for crawling the all Korean eBook, from major eBook stores
                        in S.Korea</p>
               
                <Form layout='inline'>
                    <Form.Item>
                        <Input.Search
                            prefix={< Icon type = "book" />}
                            onSearch={this.onSubmit}
                            placeholder="Search Book Name"
                            enterButton
                            onChange={this.onChange}
                            name="inputBookName"></Input.Search>
                    </Form.Item>
                 
                </Form>

                {this.showMilliBooks()}
            </Layout>
        );
    }

}
