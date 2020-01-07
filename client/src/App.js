import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            symbol: '',
        };
    }

    componentDidMount = (symbol) => {
        axios
            .get(`/stocktwits/${symbol}`)
            .then((response) => {
                this.setState({ message: response.data });
                console.log(this.state.message);
            })
            .catch((err) => console.log(err));
    };

    render() {
        return <ul>{this.state.message.map(({ body }) => body)}</ul>;
    }
}
