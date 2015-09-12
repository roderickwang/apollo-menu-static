/**
 * Created by pengfei on 2015/8/30.
 */
var fs = require('fs');
module.exports = function(content) {
    var callback = this.async();
    console.log(arguments)
    fs.readFile('./src/js/lib/date-time.js', 'utf8', function (err,data) {
        //console.log(data);
        if(err) return callback(err);
        callback(null, data);
    });
};
