function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function getDistanceKm(a, b) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(b.lat - a.lat);  // deg2rad below
  var dLon = deg2rad(b.long - a.long);
  var x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(a.lat)) * Math.cos(deg2rad(b.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  var d = R * c; // Distance in km
  return d;
}