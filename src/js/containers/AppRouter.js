import React, { Component ,PropTypes} from 'react';
import {compose,createStore ,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import HashHistory from 'react-router/lib/HashHistory';
import reducers from '../reducers';
import Header  from '../components/Header';
import thunk from 'redux-thunk';

const finalCreateStore = compose(
    applyMiddleware(thunk),
    createStore
);

const store = finalCreateStore(reducers);

export default class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.history = new HashHistory();
    }

    /**
     * 页面路由总览，
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Provider store={store}>
                    {()=> <Header></Header>}
                </Provider>
            </div>
        );
    }
}







