import React, {Fragment} from 'react';
import axios from 'axios';
import './App.css';
import {
    Layout,
    Tabs,
    Card,
    Form,
    Icon,
    Input,
    PageHeader
} from 'antd';

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
                    <PageHeader
                        title="밀리의 서재"
                        subTitle={books.length + "권"}
                        style={{
                        backgroundColor: "#ffffff"
                    }}></PageHeader>
                    <Card type="flex">
                        {books.map((book, i) => <a key={i} className="millie_book_link" href={book.url}>

                            <Card.Grid >
                                <img
                                    style={{
                                    height: "20rem",
                                    padding:"1rem"
                                }}
                                    src={book.img}
                                    className="millie_book_img"/>
                                <Card.Meta title={book.title} description={book.writer}/>

                            </Card.Grid>
                        </a>)
}
                    </Card>
                </Layout.Content>
            )
        }
    }

    render() {

        return (
            <Layout
                style={{
                textAlign: 'center',
                backgroundColor: "#FFFFFF"
            }}className="App">

                <PageHeader
                    title="eBook Crawler"
                    subTitle="You can search All eBook in South Korea below."
                    style={{
                    border: '1px solid rgb(235, 237, 240)'
                }}>

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
                </PageHeader>

                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane key="1" tab={<span><img style={{width:25,borderRadius:5}} src="https://www.millie.co.kr/favicon/ios-icon.png"/> Millie</span>}>
                        {this.showMilliBooks()}
                    </Tabs.TabPane>
                    
                </Tabs>

            </Layout>
        );
    }

}
