function parseQuery(query) {
  const parsedQuery = {};
  const pairs = query.substr(1).split('&');
  const splitted = pairs.map(pair => pair.split('='));
  splitted.forEach(pair => {
    parsedQuery[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  });
  return parsedQuery;
}

document.addEventListener('DOMContentLoaded', () => {
  const query = parseQuery(window.location.search);
  if (query.url) {
    document.getElementById('url').innerText = query.url;
  }
});
