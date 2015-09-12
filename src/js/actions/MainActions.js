/**
 * Created by roderickWang on 8/13/15.
 */
import {MainTypes} from '../constants/ActionTypes'
import request from '../lib/httpRequest'

export function getMenu(){
    return dispatch => {
        request("permissions/menu",
            "GET",
            {},
            function (rep) {
                dispatch({
                    type: MainTypes.LOAD_MENU,
                    data: rep.msg
                });
            }, dispatch);
    };
}

