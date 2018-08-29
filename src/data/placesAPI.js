let clientId, clientSecret, api, lat, lon, query;

clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ';
clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH';
api = 'https://api.foursquare.com/v2';
lat = 39.29;
lon = -76.61;
query = 'pizza';

export const search = (query) => {
    fetch(`${api}/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&ll=${lat},${lon}&query=${query}`, {
        body: JSON.stringify({ query })
    }).then(res => res.json())
    .then(data => data.books)
    .catch(function(err) {
        console.log('Failure:', err)
    });
}
