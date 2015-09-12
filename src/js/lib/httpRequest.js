/**
 * Created by roderickWang on 7/22/15.
 */
import {HTTP_ADDRESS,HIDE_ERROR_TIME} from '../constants/AppConstants'
import {httpFaild} from './actionLib'
import {LoadingTypes} from '../constants/ActionTypes'
import $ from 'jquery'
import fetch from 'isomorphic-fetch';

const SERVER_ERROR = '服务器通讯异常';
export default function (address, type = 'POST', params = {}, sucFuc, dispatch, loading = true) {
    let postfix = "";
    let urlPositfix = "";

    if (window.location.hostname.indexOf("localhost") != -1 && window.location.port.charAt(0) == "3") {
        type = 'GET';
        postfix = ".json";
        urlPositfix = 'server/'
    }

    let failFunc = httpFaild.bind(null, dispatch);

    if (loading) {
        dispatch({
            type: LoadingTypes.LOADING,
            data: {
                show: true
            }
        });
    }


    $.ajax({
        type: type,
        url: HTTP_ADDRESS + urlPositfix + address + postfix + "?uid=" + new Date(),
        data: params,
        timeout: 30000,
        success: function (data) {
            if (loading) {
                dispatch({
                    type: LoadingTypes.LOADING,
                    data: {
                        show: false
                    }
                });
            }
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            if (data.code == 200 || data.code == undefined) {
                sucFuc(data);
            } else {
                dispatch({
                    type: LoadingTypes.LOADING,
                    data: {
                        error: true,
                        errorMsg:data.msg || SERVER_ERROR
                    }
                });
                setTimeout(function(){
                    dispatch({
                        type: LoadingTypes.LOADING,
                        data: {
                            error: false
                        }
                    });
                },HIDE_ERROR_TIME);
            }
        },
        error: function (xhr, errorType, error) {
            if (loading) {
                dispatch({
                    type: LoadingTypes.LOADING,
                    data: {
                        show: false
                    }
                });
            }
            dispatch({
                type: LoadingTypes.LOADING,
                data: {
                    error: true,
                    errorMsg:data.msg || SERVER_ERROR
                }
            });
            setTimeout(function(){
                dispatch({
                    type: LoadingTypes.LOADING,
                    data: {
                        error: false
                    }
                });
            },HIDE_ERROR_TIME);
        }
    });
}