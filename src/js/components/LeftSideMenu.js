/**
 * Created by roderickWang on 9/12/15.
 */

import {Component ,PropTypes} from 'react';
import { connect } from 'react-redux';
import React from 'react/addons';
import Styles from 'material-ui/lib/styles';
import Paper from 'material-ui/lib/paper.js';
import Tabs from 'material-ui/lib/tabs/tabs.js';
import Tab from 'material-ui/lib/tabs/tab.js';
import binding from 'redux-2way-binding'
import publicStyle from '../decorators/PublicStyles';
let Transitions = require('material-ui/lib/styles/transitions');

let bindingMixin = binding.bindingMixin;

@bindingMixin
@publicStyle
export default
class LeftSideMenu extends Component {
    constructor(props){
        super(props);
    }

    static contextTypes = {
        muiTheme: React.PropTypes.object
    }

    render(){
        let styles=this.getStyles();
        return(
            <Paper
                zDepth={2}
                rounded={false}
                transitionEnabled={false}
                style={styles.root}>

            </Paper>
        );
    }

    getTheme() {
        return this.context.muiTheme.component.leftNav;
    }

    getStyles(){
        return {
            root: {
                height: '100%',
                width: this.getTheme().width,
                position: 'fixed',
                zIndex: 9,
                left: 0,
                top: 0,
                transform: 'translate3d(0px, 0, 0)',
                transition:Transitions.easeOut(),
                backgroundColor: this.getTheme().color,
                overflow: 'hidden'
            }
        };
    }
}