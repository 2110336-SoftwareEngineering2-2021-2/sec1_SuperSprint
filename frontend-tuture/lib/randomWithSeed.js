function randomWithSeed(seed = Date.now().toString()) {
  var hash = 0;
  for (var i = 0; i < seed.length; i++) {
    var char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  };
  return hash;
}

export default randomWithSeed;
