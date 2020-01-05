import React from 'react';
import axios from 'axios';
import './App.css';
import {
    Spin,
    Layout,
    Tabs,
    Card,
    Form,
    Icon,
    Input,
    message,
    PageHeader
} from 'antd';
import GoogleTagManager from './GTM';

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

        this.showSearchPart = this
            .showSearchPart
            .bind(this);

        this.showLoadingIcon = this
            .showLoadingIcon
            .bind(this);

        this.showBooksResult = this
            .showBooksResult
            .bind(this);

        this.state = {
            inputBookName: '',
            ridiBooks: [],
            millieBooks: [],
            yesBooks: [],
            isLoading: false,
            didResearch: Boolean,
            sccssMsgNeed: true
        }

        message.config({duration: 4, maxCount: 3});

    }
    onChange(e) {
        e.preventDefault();
        this.setState({inputBookName: e.target.value, didResearch: false, sccssMsgNeed: false});
        console.log(this.state);
    }
    async onSubmit() {
        const {inputBookName} = this.state;
        console.log(inputBookName);

        await axios
            .get(`/search?inputBookName=${inputBookName}`)
            .then(res => res.data, this.setState({isLoading: true, didResearch: true, sccssMsgNeed: true}))
            .then(books => this.setState({isLoading: false, ridiBooks: books.ridiBooks, millieBooks: books.millieBooks, yesBooks: books.yesBooks}));

        console.log(this.state);

    }

    showMilliBooks() {
        const {millieBooks, didResearch, sccssMsgNeed} = this.state;

        if (millieBooks.length > 0) {
            if (sccssMsgNeed) {
                message.success('밀리의 서재에서 책을 찾았습니다!');
            }

            return (

                <Tabs.TabPane
                    key="1"
                    tab={< img alt = {
                    `icon-millie`
                }
                style = {{ width: 25, borderRadius: 5 }}src = "https://www.millie.co.kr/favicon/ios-icon.png" />}>

                    <Layout.Content>

                        <PageHeader
                            title="밀리의 서재"
                            subTitle={millieBooks.length + "권"}
                            style={{
                            backgroundColor: "#ffffff"
                        }}/>

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
                </Tabs.TabPane>
            )
        } else if (didResearch == true && millieBooks.length == 0) {
            message.warning("밀리의 서재에 책이 없네요. 😪")
        }
    }
    showRidiBooks() {
        const {ridiBooks, didResearch, sccssMsgNeed} = this.state;

        if (ridiBooks.length > 0) {
            if (sccssMsgNeed) {
                message.success('리디셀렉트에서 책을 찾았습니다!');
            }

            return (
                <Tabs.TabPane
                    key="2"
                    tab={< img alt = {
                    `icon-ridiBook`
                }
                style = {{ width: 25, borderRadius: 5 }}src = "https://books.ridicdn.net/static/favicon/favicon.ico" />}>

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
                </Tabs.TabPane>
            )

        } else if (didResearch == true && ridiBooks.length == 0) {
            message.warning("리디셀렉트에 책이 없네요. 🙄")
        }
    }
    showYesBooks() {
        const {yesBooks, didResearch, sccssMsgNeed} = this.state;

        if (yesBooks.length > 0) {
            if (sccssMsgNeed) {
                message.success('예스24 북클럽에서 책을 찾았습니다!');
            }
            return (
                <Tabs.TabPane
                    key="3"
                    tab={< img alt = {
                    `icon-yesBookClub-24`
                }
                style = {{ width: 25, borderRadius: 5 }}src = "https://secimage.yes24.com/sysimage/renew/gnb/yes24.ico" />}>

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
                </Tabs.TabPane>
            )
        } else if (didResearch === true && yesBooks.length === 0) {
            message.warning("예스24 북클럽, 책을 찾을 수 없습니다. 🙄")
        }

    }
    showSearchPart() {
        return (
            <PageHeader
                title="eBook Crawler"
                subTitle="내가 찾는 e북 어디에 있을까?"
                style={{
                border: '1px solid rgb(235, 237, 240)'
            }}>

                <Form layout='inline'>
                    <Form.Item>
                        <Input.Search
                            size="large"
                            prefix={< Icon type = "book" />}
                            onSearch={this.onSubmit}
                            placeholder="무슨 책을 찾고 있나요?"
                            required
                            onChange={this.onChange}
                            name="inputBookName"></Input.Search>
                    </Form.Item>

                </Form>
            </PageHeader>
        )
    }
    showLoadingIcon() {
        return (<Spin
            size={"large"}
            style={{
            fontSize: "72px",
            top: "40%",
            position: "fixed",
            left: "50%",
            translate: "-50% -50%"
        }}/>)
    }
    showBooksResult() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (this.showLoadingIcon())
        } else {
            return (
                <Tabs>
                    {this.showMilliBooks()}
                    {this.showRidiBooks()}
                    {this.showYesBooks()}
                </Tabs>
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

                {this.showSearchPart()}
                {this.showBooksResult()}
                <GoogleTagManager gtmId='GTM-PPBS6FW' scriptId='gtm-script-container'/>
            </Layout>

        );
    }

}