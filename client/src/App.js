import React, { Fragment, Component } from 'react';
import Moment from 'react-moment';
import './App.css';
import { Jumbotron, Container, Col, Row, Form, Toast, Table, Card, Button } from 'react-bootstrap';
const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            symbol: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.timer = this.timer.bind(this);
    }

    handleChange(event) {
        this.setState({ symbol: event.target.value });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ message: [] });
        this.timer();
        var intervalId = setInterval(() => {
            this.timer();
        }, 30000);
    }

    timer() {
        var arrMessageData = [];
        if (this.state.symbol) {
            const arrSymbol = this.state.symbol.split(',');
            for (var i = 0; i < arrSymbol.length; i++) {
                var strSymbol = arrSymbol[i].split(' ').join('');
                axios
                    .get(`/stocktwits/${strSymbol}`)
                    .then((response) => {
                        arrMessageData.push(response.data);

                        console.log(arrMessageData);
                        this.setState({ message: arrMessageData });
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    componentDidMount = (symbol) => {};

    render() {
        function handleRemoveClick(e) {
            e.preventDefault();
            var elem = (document.getElementById(e.target.value).style.display = 'none');
        }
        return (
            <Fragment>
                <Jumbotron fluid className="jumbo bg-dark">
                    <Container className="header text-center">
                        <h1>Stocktwits Board</h1> <br />
                        <h4>Check out the latest tweets about any stock!</h4>
                        <h4>Just enter in the symbol below, and we'll do the rest</h4>
                    </Container>
                </Jumbotron>
                {/* Search */}
                <Container>
                    <Form className="form">
                        <Row className="justify-content-md-center">
                            <Col xs={12} md={8}>
                                <Form.Label className="form-label">
                                    <Form.Control
                                        type="text"
                                        value={this.state.symbol}
                                        onChange={this.handleChange}
                                        placeholder="Enter Symbol(s) Ex. AAPL, BAC"
                                        className="search-box"
                                    />
                                </Form.Label>
                            </Col>
                        </Row>

                        <Row className="justify-content-md-center">
                            <Col xs={12} md={8}>
                                <Button
                                    type="submit"
                                    value="Submit"
                                    onClick={this.handleClick}
                                    className="search-button"
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                {/* Results */}
                {this.state.message.map(function(arrData) {
                    var mainKey;
                    Object.keys(arrData).forEach(function(key) {
                        mainKey = key;
                    });
                    return (
                        <Container>
                            <Table bordered hover id={mainKey} className="result-container">
                                <Row justify-content-md-center>
                                    <Col xs={12} md={12}>
                                        <thead>
                                            <tr>
                                                <th className="symbol">${mainKey}</th>
                                                <th width="5%">
                                                    <Button
                                                        type="button"
                                                        value={mainKey}
                                                        onClick={handleRemoveClick}
                                                    >
                                                        x
                                                    </Button>
                                                </th>
                                            </tr>
                                        </thead>
                                    </Col>
                                </Row>
                                <Row justify-content-md-center>
                                    <Col xs={12}>
                                        {arrData[mainKey].map((mainData, length) => (
                                            <Card className="tweet-cards" bg="light">
                                                <Card.Header className="card-user">
                                                    <img
                                                        src={mainData.user.avatar_url}
                                                        className="user-image"
                                                        alt="users-avatar"
                                                    ></img>
                                                    <div className="username">
                                                        {mainData.user.username}
                                                    </div>
                                                    <div className="count">{length}</div>
                                                </Card.Header>
                                                <Card.Text className="card-body">
                                                    {mainData.body}
                                                </Card.Text>
                                                <Card.Footer>
                                                    <div className="date">
                                                        <Moment>{mainData.created_at}</Moment>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        ))}
                                    </Col>
                                </Row>
                            </Table>
                        </Container>
                    );
                })}
            </Fragment>
        );
    }
}
