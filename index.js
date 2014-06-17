const replacement = '\ufffd';
// https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
const loneSurrogates = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|([^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g;

// string sanitizes the given str by replacing invalid UTF-16 code unit
// sequences with the unicode replacement character. Returns a new string.
exports.string = function(str) {
  return str.replace(loneSurrogates, '$1' + replacement);
}
