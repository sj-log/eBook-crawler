import React from 'react';
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

        this.showRidiBooks = this
            .showRidiBooks
            .bind(this);

        this.showYesBooks = this
            .showYesBooks
            .bind(this);
        this.state = {
            inputBookName: '',
            ridiBooks: [],
            millieBooks: [],
            yesBooks: [],
            isLoading: false
        }

    }
    onChange(e) {
        e.preventDefault();
        this.setState({inputBookName: e.target.value});
        console.log(this.state);
    }

    async onSubmit() {
        const {inputBookName} = this.state;
        console.log(inputBookName);

        await axios
            .get(`/search?inputBookName=${inputBookName}`)
            .then(res => res.data, this.setState({isLoading: true}))
            .then(books => this.setState({isLoading: false, ridiBooks: books.ridiBooks, millieBooks: books.millieBooks, yesBooks: books.yesBooks}));

        console.log(this.state);

    }

    showMilliBooks() {
        const {millieBooks} = this.state;

        if (millieBooks.length > 0) {

            return (
                <Layout.Content>
                    <PageHeader
                        title="밀리의 서재"
                        subTitle={millieBooks.length + "권"}
                        style={{
                        backgroundColor: "#ffffff"
                    }}></PageHeader>
                    <Card type="flex">
                        {millieBooks.map((book, i) => <a key={i} className="millie_book_link" href={book.url}>

                            <Card.Grid >
                                <img
                                    alt={`thumbnail ${book.title}`}
                                    style={{
                                    height: "20rem",
                                    padding: "1rem"
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
    showRidiBooks() {
        const {ridiBooks} = this.state;

        if (ridiBooks.length > 0) {

            return (
                <Layout.Content>
                    <PageHeader
                        title="리디북스"
                        subTitle={ridiBooks.length + "권"}
                        style={{
                        backgroundColor: "#ffffff"
                    }}></PageHeader>
                    <Card type="flex">
                        {ridiBooks.map((book, i) => <a key={i} className="ridi_book_link" href={book.url}>

                            <Card.Grid >
                                <img
                                    alt={`thumbnail ${book.title}`}
                                    style={{
                                    height: "20rem",
                                    padding: "1rem"
                                }}
                                    src={book.img}
                                    className="ridi_book_img"/>
                                <Card.Meta title={book.title} description={book.writer}/>

                            </Card.Grid>
                        </a>)
}
                    </Card>
                </Layout.Content>
            )
        }

    }
    showYesBooks() {
        const {yesBooks} = this.state;

        if (yesBooks.length > 0) {

            return (
                <Layout.Content>
                    <PageHeader
                        title="예스24북클럽"
                        subTitle={yesBooks.length + "권"}
                        style={{
                        backgroundColor: "#ffffff"
                    }}></PageHeader>
                    <Card type="flex">
                        {yesBooks.map((book, i) => <a key={i} className="yes_book_link" href={book.url}>

                            <Card.Grid >
                                <img
                                    alt={`thumbnail ${book.title}`}
                                    style={{
                                    height: "20rem",
                                    padding: "1rem"
                                }}
                                    src={book.img}
                                    className="yes_book_img"/>
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
                    <Tabs.TabPane
                        key="1"
                        tab={< img alt = {
                        `icon-millie`
                    }
                    style = {{ width: 25, borderRadius: 5 }}src = "https://www.millie.co.kr/favicon/ios-icon.png" />}>
                        {this.showMilliBooks()}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="2"
                        tab={< img alt = {
                        `icon-ridiBook`
                    }
                    style = {{ width: 25, borderRadius: 5 }}src = "https://books.ridicdn.net/static/favicon/favicon.ico" />}>
                        {this.showRidiBooks()}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        key="3"
                        tab={< img alt = {
                        `icon-yesBookClub-24`
                    }
                    style = {{ width: 25, borderRadius: 5 }}src = "https://secimage.yes24.com/sysimage/renew/gnb/yes24.ico" />}>
                        {this.showYesBooks()}
                    </Tabs.TabPane>
                </Tabs>

            </Layout>
        );
    }

}
