/**
 * Created by roderickWang on 7/31/15.
 */
import {AlertTypes} from '../constants/ActionTypes'
import {ModalTypes} from '../constants/ModalTypes'

export const httpFaild=(dispatch,data)=>{
    dispatch ({
        type:AlertTypes.CHANGE_ALERT,
        data:{
            showModal:true,
            alertType:ModalTypes.ERROR_INFO,
            title:'错误',
            info:data||'服务器通讯异常'
        }
    });
}
