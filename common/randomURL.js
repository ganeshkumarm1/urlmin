exports.url = function() {
	var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
    var length = 6;
    var minurl = '';
    for (var i=0; i < length; i++) {
        minurl += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return minurl;
}