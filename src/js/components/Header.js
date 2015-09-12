/**
 * Created by roderickWang on 8/13/15.
 */

import {Component ,PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import publicStyle from '../decorators/PublicStyles';
import * as MainActions from '../actions/MainActions.js';
import React from 'react/addons';
import Styles from 'material-ui/lib/styles';
import Paper from 'material-ui/lib/paper.js';
import Tabs from 'material-ui/lib/tabs/tabs.js';
import Tab from 'material-ui/lib/tabs/tab.js';
import LeftSideMenu from './LeftSideMenu.js';
/**
 * 总体类，放置侧边栏和提示框、loading框组件
 */
import apolloTheme from '../theme/apolloTheme.js';
import binding from 'redux-2way-binding'

let bindingMixin = binding.bindingMixin;

let ThemeManager = new Styles.ThemeManager();
ThemeManager.setTheme(apolloTheme);

@connect(state => ({
    loading: state.loading,
    menus: state.menus
}))
@bindingMixin
@publicStyle
export default
class Header extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(MainActions, props.dispatch);
        this.setBinding('menus');
        this.styles = this.mergeStyle(this.getStyles());
        this.actions.getMenu();
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    render() {
        let styles = this.styles;
        let {menus} = this.props;
        let tree = menus.get('tree');
        return (
            <div>
                <Paper
                    zDepth={1}
                    rounded={false}
                    style={styles.root}>
                    <div style={styles.topest}>
                    </div>
                    <div style={styles.container}>
                        <Tabs style={styles.tabs} valueLink={this.binding('menuIndex')}>
                            {
                                tree.map((menu, index)=>
                                    <Tab
                                        value={menu.get('menuKey')}
                                        label={menu.get('menuName')}
                                        style={this.tabStyle(menu.get('menuKey'))}
                                        />)
                            }
                        </Tabs>
                    </div>
                </Paper>
                <LeftSideMenu/>
            </div>
        )
    }

    tabStyle(value) {
        let {menus}=this.props;
        if (menus.get('menuIndex') == value) {
            return this.styles.selectTab;
        } else {
            return this.styles.tab;
        }
    }

    getStyles() {
        return {
            root: {
                backgroundColor: "#F25301",
                position: 'fixed',
                height: 96,
                top: 0,
                right: 0,
                zIndex: 10,
                width: '100%',
                textAlign: 'center',
            },
            container: {
                paddingLeft: '35%',
                paddingRight: '20%',
            },
            topest: {
                height: 32,
                background: '#000'
            },
            tab: {
                height: 64
            },
            selectTab: {
                height: 64,
                background: '#D84201'
            }

        };
    }


}
