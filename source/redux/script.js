class Store {
    constructor(updateState, state){
        this._updateState = updateState;
        this._state = state;
        this._callbacks = [];
    }
    
    get state () {
        return this._state;
    }

    update(action) {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(callback => callback());
    }
    subscribe(callback){
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb!=callback);
    }

}
function reducer (state, action) {
    switch(action.type){
        case 'INCREMENT': {
            return { count: state.count + action.amount }
        }
        case 'DECREMENT': {
            return { count: state.count - action.amount }
        }
        default: {
            return state;
        }
    }
}

const incrementAction = { type: 'INCREMENT', amount: 5 };
const decrementAction = { type: 'DECREMENT', amount: 3 };

const initialState = {
    count: 0
};

const store = new Store(reducer, initialState);

const unsubscribe = store.subscribe(()=>{
    console.log('store changed - ', store.state);
})

store.update(incrementAction);
//console.log(store.state);
store.update(decrementAction);
//console.log(store.state);
store.update(incrementAction);
//console.log(store.state);
unsubscribe();
store.update(decrementAction);
//console.log(store.state);
store.update(decrementAction);
//console.log(store.state);
store.update({});
//console.log(store.state);