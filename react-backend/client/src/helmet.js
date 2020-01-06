import React from "react";
import {Helmet} from "react-helmet";

export default class helmet extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>eBook Crawler KOR</title>
                    <link rel="canonical" href="https://eBook-crawler.herokuapp.com"/>
                    <meta property="og:title" content="eBook Crawler KOR"/>
                    <meta property="og:description" content="eBook 찾기 웹사이트"/>
                    <meta property="og:image" content="https://user-images.githubusercontent.com/35059428/71813579-5880a700-30bd-11ea-86ea-616f0ee69fc0.png"/>
                    <meta property="og:url" content="https://eBook-crawler.herokuapp.com"/>
                </Helmet>
            </React.Fragment>
        );
    }
};