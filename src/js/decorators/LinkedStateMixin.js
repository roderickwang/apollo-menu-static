import getDisplayName from '../lib/getDisplayName';
import {React,Component} from 'react';
import ReactLink from '../lib/ReactLink'
import ReactStateSetters from '../lib/ReactStateSetters'

export default DecoratedComponent => {

    DecoratedComponent.prototype.linkState = function (key) {
        return new ReactLink(
            this.state[key],
            ReactStateSetters.createStateKeySetter(this, key)
        );
    }

    /**
     * Two ways binding func.
     * @param path
     * @param value
     * @returns {{value: (any|*), requestChange: Function}}
     */
    DecoratedComponent.prototype.binding = function (path, transValueFunc) {
        let {reducerPath}=this.bindingOrigin;
        let {dispatch}=this.props;

        let reducerPathArray = reducerPath.split(',');
        let reducerName = reducerPathArray[reducerPathArray.length - 1];

        let store = this.props[reducerName];
        let topicName = reducerPathArray.shift();
        let readPath = path.split(',');
        let pathArray = reducerPathArray.concat(readPath);
        let value = store.getIn(readPath);

        if (transValueFunc) {
            value = transValueFunc(value);
        }

        var valueLink = {
            //path string like 'a.b.0'
            value: value,
            requestChange: function (newValue) {
                dispatch({type: `${topicName}_BINDING_UPDATE`, path: pathArray, value: newValue});
            }
        };

        return valueLink;
    };

    /**
     * Two ways binding setStore first
     * @param store
     */
    DecoratedComponent.prototype.setBinding = function (reducerPath) {
        this.bindingOrigin = {
            reducerPath
        }
    }

    /**
     * manual change value by path
     * @param path
     * @param newValue
     */
    DecoratedComponent.prototype.manualChange = function (path, newValue) {
        let {reducerPath}=this.bindingOrigin;
        let reducerPathArray = reducerPath.split(',');
        let topicName = reducerPathArray.shift();
        let pathArray = reducerPathArray.concat(path.split(','));

        let {dispatch}=this.props;

        dispatch({type: `${topicName}_BINDING_UPDATE`, path: pathArray, value: newValue});
    }


}