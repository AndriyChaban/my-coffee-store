const getUrlForCoffeeStores = (latlong, query, limit = 6) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
}

export const fetchCoffeeStores = async (latlong = "40.70%2C-73.90", limit = 4, width = 200, height = 150) => {

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTHORIZATION_API_KEY
        }
    }

    const coffeeStoresData = await fetch(getUrlForCoffeeStores(latlong, "coffee", limit), options)
        .then(response => (response.json()));

    const fetchImageUrls = await Promise.all(coffeeStoresData.results.map(store => fetch(`https://api.foursquare.com/v3/places/${store.fsq_id}/photos`, options).then(response => (response.json()))))

    const imageUrls = fetchImageUrls.map(url => { return [url[0].prefix, `${width}x${height}`, url[0].suffix].join('') });

    let i = 0;
    let coffeeStores = []

    for (const store of coffeeStoresData.results) {
        // console.log(store);
        // const address = store.location.address;
        // const neighbourhood = store.location.locality;
        coffeeStores[i] = {
            id: store.fsq_id,
            name: store.name || null,
            imgUrl: imageUrls[i],
            address: store.location.address || null,
            neighbourhood: store.location.locality || null
        }
        i++;
    }

    return coffeeStores;
}