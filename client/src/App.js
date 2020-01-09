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
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({ symbol: event.target.value });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ message: [] });
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
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    componentDidMount = (symbol) => {};

    render() {
        return (
            <div>
                <form>
                    <label>
                        Symbol:
                        <input type="text" value={this.state.symbol} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" onClick={this.handleClick} />
                </form>
                <ul>
                    {this.state.message.map(({ body }) => (
                        <li>{body}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
