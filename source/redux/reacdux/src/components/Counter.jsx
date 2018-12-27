import React, { Component } from 'react';
import Store from './Store';
import './counter.scss';


const initialState = {
    count: 0
}
function updateState(state, action){
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

const store = new Store(updateState, initialState);

export default class Counter extends Component {
    constructor(props){
        super(props);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    increment() {
        store.update(incrementAction);
    }
    decrement() {
        store.update(decrementAction);
    }
    reset() {
        store.update(resetAction)
    }
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }
    render() {
        return (
            <div>
                <div className="value">{store.state.count}</div>
                <ul className="buttons">
                    <li><button onClick={this.decrement}>-</button></li>
                    <li><button onClick={this.reset}>reset</button></li>
                    <li><button onClick={this.increment}>+</button></li>
                </ul>
            </div>
        )
    }
}

