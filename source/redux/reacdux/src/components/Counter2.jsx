import React, { Component } from 'react';
import { createStore } from 'redux';
import './counter.scss';


const initialState = {
    count: 0
}
function reducer(state = { count: 0 }, action){
    switch(action.type){
        case 'INCREMENT': return { count: state.count + action.amount };
        case 'DECREMENT': return { count: state.count - action.amount };
        case 'RESET': return { count: action.amount };
        default: return state;
    }
}

const incrementAction = {
    type: 'INCREMENT',
    amount: 4
}

const decrementAction = {
    type: 'DECREMENT',
    amount: 4
}

const resetAction = {
    type: 'RESET',
    amount: 0 
} 

const store = createStore(reducer, initialState);

export default class Counter2 extends Component {
    constructor(props){
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    increment() {
        store.dispatch(incrementAction);
    }
    decrement() {
        store.dispatch(decrementAction);
    }
    reset() {
        store.dispatch(resetAction)
    }
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }
    render() {
        const state = store.getState();
        return (
            <div>
                <div className="value">{state.count}</div>
                <ul className="buttons">
                    <li><button onClick={this.decrement}>-</button></li>
                    <li><button onClick={this.reset}>reset</button></li>
                    <li><button onClick={this.increment}>+</button></li>
                </ul>
            </div>
        )
    }
}

