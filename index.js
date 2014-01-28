const leadSurrogateStart = 0xd800;
const leadSurrogateEnd = 0xdbff;
const trailSurrogateStart = 0xdc00;
const trailSurrogateEnd = 0xdfff;
const replacement = '\ufffd';

// string sanitizes the given str by replacing invalid UTF-16 code unit
// sequences with the unicode replacement character. Returns a new string.
exports.string = function(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var currentUnit = str.charCodeAt(i);
    var nextUnit = (i + 1 < str.length)
      ? str.charCodeAt(i+1)
      : -1;

    if(!isSurrogate(currentUnit)) {
      result += str[i];
    } else if (isSurrogatePair(currentUnit, nextUnit)) {
      result += str[i]+str[i+1];
      i++;
    } else {
      result += replacement;
    }
  }
  return result;
}

function isSurrogate(unit) {
  return isLeadSurrogate(unit) || isTrailSurrogate(unit);
}

function isSurrogatePair(leadUnit, trailUnit) {
  return isLeadSurrogate(leadUnit) && isTrailSurrogate(trailUnit);
}

function isLeadSurrogate(unit) {
  return unit >= leadSurrogateStart && unit <= leadSurrogateEnd;
}

function isTrailSurrogate(unit) {
  return unit >= trailSurrogateEnd && unit <= trailSurrogateEnd;
}
