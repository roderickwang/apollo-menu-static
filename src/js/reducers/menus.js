/**
 * Created by roderickWang on 8/27/15.
 */

import {MainTypes} from '../constants/ActionTypes';
import Immutable from 'immutable';
import binding from 'redux-2way-binding';
let bindingStore = binding.bindingStore;

const initialState = Immutable.fromJS({
    tree: []
});
//TODO defend override redux,write more code
export default bindingStore('menus', initialState, {
    [MainTypes.LOAD_MENU]: (data, action) => {
        return data.merge(Immutable.fromJS(action.data));
    }
})
