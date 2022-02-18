const getUrlForCoffeeStores = (latlong, query, limit=6) => {
    return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`
}


export const fetchCoffeeStores = async (latlong = "40.70%2C-73.90", limit=6, width = 200, height = 150) => {

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTHORIZATION_API_KEY
        }
    }
    // const getPictureUrl = async (id, width = 200, height = 150) => {

    //     const result = await fetch(`https://api.foursquare.com/v3/places/${id}/photos`, options).then(response => response.json())


    //     // const resultData = await response.json();

    //     const pictureUrl = [result[0].prefix, `${width}x${height}`, result[0].suffix].join('');
    //     console.log(typeof(pictureUrl), pictureUrl)
    //     // return await pictureUrl
    //     return 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80';
    // }

    const coffeeStoresData = await fetch(getUrlForCoffeeStores(latlong, "coffee", limit), options)
        .then(response => (response.json()));
    // console.log(coffeeStoresData.results[1].location);

    // console.log(coffeeStoresData);

    const fetchImageUrls = await Promise.all(coffeeStoresData.results.map(store => fetch(`https://api.foursquare.com/v3/places/${store.fsq_id}/photos`, options).then(response => (response.json()))))

    // fetchImageUrls.forEach(url => console.log(url[0]));

    const imageUrls = fetchImageUrls.map(url => { return [url[0].prefix, `${width}x${height}`, url[0].suffix].join('') });

    // console.log(imageUrls);

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