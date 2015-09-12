/**
 * Created by roderickWang on 7/31/15.
 */


export default function createStore(initialState, handlers) {
    return (state = initialState, action) => {

        handlers['BINDING_UPDATE']= (data, action) => {
            return data.setIn(action.path,action.value);
        };

        return handlers[action.type] ?
            handlers[action.type](state, action) :
            state;
    }
}