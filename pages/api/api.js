const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        Authorization: 'fsq3jZv9Ji6cSAC+5aObec6p0hrXyXoNolMffmTsJkauF1c='
    }
}

fetch('https://api.foursquare.com/v3/places/nearby?ll=47.86%2C35.14&query=coffee', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));