import Extend from '../lib/extend'
import Styles from 'material-ui/lib/utils/styles.js';

export default DecoratedComponent => {
    DecoratedComponent.prototype.publicStyles = function () {
        let styles = {
            paper: {
                padding: 25
            },
            flexColumn: {
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
            },
            flexRow: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
            },
            flex: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap'
            },
            searchFlex: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center'
            }
        };
        return styles;
    };

    DecoratedComponent.prototype.mergeStyle = function () {
        let styles = this.publicStyles();
        var args = Array.prototype.slice.call(arguments, 0);
        var base = styles;
        for (var i = 0; i < args.length; i++) {
            if (args[i]) {
                Object.keys(args[i]).forEach((key) => {
                    base[key] = args[i][key];
                });
            }
        }

        return base;
    };

    DecoratedComponent.prototype.mergeAndPrefix = function() {
        return Styles.mergeAndPrefix.apply(this, arguments);
    };
}