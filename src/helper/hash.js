export const hashCode = o => {
  const json = JSON.stringify(o)
  var hash = 0, i, chr;
  if (json.length === 0) return hash;
  for (i = 0; i < json.length; i++) {
    chr = json.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};