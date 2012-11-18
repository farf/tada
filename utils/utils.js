function in_array(needle, haystack) {
  for (var i = 0, maxi = haystack.length; i < maxi; ++i) {
    if (haystack[i] == needle) {
      return true;
    }
  }
  return false;
}