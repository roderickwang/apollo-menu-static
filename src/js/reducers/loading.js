/**
 * Created by pengfei on 2015/8/2.
 */


/**
 * Created by roderickWang on 7/30/15.
 */
import {LoadingTypes} from '../constants/ActionTypes'
import createStore from '../lib/createStore'
import Immutable from 'immutable'

const initialState = Immutable.Map({
    show: false
});


export default createStore(initialState, {
    [LoadingTypes.LOADING]: (data, action) => {
        return data.merge(Immutable.fromJS(action.data));
    }
});

