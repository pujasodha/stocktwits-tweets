import React, { Fragment, Component } from 'react';
import './App.css';
import { Jumbotron, Container, Col, Row, Form, Card, Button } from 'react-bootstrap';
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
        }, 10000);
    }

    timer() {
        var arrMessageData = [];
        if (this.state.symbol) {
            const arrSymbol = this.state.symbol.split(',');
            for (var i = 0; i < arrSymbol.length; i++) {
                axios
                    .get(`/stocktwits/${arrSymbol[i]}`)
                    .then((response) => {
                        const data = response.data;
                        if (arrMessageData.length === 0) {
                            arrMessageData = data;
                        } else {
                            for (var i = 0; i < data.length; i++) {
                                arrMessageData.push(data[i]);
                            }
                        }
                        this.setState({ message: arrMessageData });
                        console.log(this.state.message);
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    componentDidMount = (symbol) => {};

    render() {
        return (
            <div>
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
                                        placeholder="Ex. AAPL"
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

                <Container>
                    <Row>
                        {this.state.message.map(({ user, created_at, body }) => (
                            <Col xs={12} md={4}>
                                <Card className="tweet-cards" bg="light">
                                    <Card.Header className="card-user">
                                        <img
                                            src={user.avatar_url}
                                            className="user-image"
                                            alt="users-avatar"
                                        ></img>
                                        <p>{user.username}</p>
                                        <hr />
                                    </Card.Header>
                                    <Card.Text className="card-body">
                                        <p>{body}</p>
                                    </Card.Text>
                                    {/* <Card.Footer>
                                        <p>{created_at}</p>
                                    </Card.Footer> */}
                                </Card>
                                <br />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}
