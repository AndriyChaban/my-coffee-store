import Head from 'next/head';
import { useEffect, useState, useContext } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Card from '../components/card';
import Banner from '../components/banner';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
// import { ACTION_TYPES, StoreContext } from '../context/store-context';
import { useGlobalState } from '../context/global-state';
// import { StoreContext } from '../context/store-context';

// import coffeeStoresData from '../data/coffee-stores.json';

export async function getStaticProps(context) {

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
      city: coffeeStores[0].neighbourhood
    }
  }
}

export default function Home(props) {

  const { handleTrackLocation, locationErrorMsg, isFindingLoc } = useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const [latlong, setLatlong] = useGlobalState('latlong');
  const [coffeeStores, setCoffeeStores] = useGlobalState('coffeeStores');

  useEffect(() => {
    async function fetchData() {
      if (latlong) {
        try {
          const res = await fetch(`/api/getCoffeeStoresByLocation?latlong=${latlong}&limit=9`);
          const fetchedCoffeeStores = await res.json();
          // console.log({ fetchedCoffeeStores });
          // setCoffeeStores(fetchedCoffeeStores);
          // dispatch({ type: ACTION_TYPES.SET_COFFEESTORES, payload: { coffeeStores: fetchedCoffeeStores } });
          setCoffeeStores(fetchedCoffeeStores)
          //set coffee stores
          setCoffeeStoresError('');
        } catch (err) {
          //set error
          setCoffeeStoresError(err.message);
        }
      }

    }
    fetchData();
  }, [latlong])

  const handleOnBannerButtonClick = () => {
    // console.log('clicked banner button');
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="coffee-stores" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLoc ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerButtonClick} />
        {locationErrorMsg && <p>{locationErrorMsg}</p>}
        {coffeeStoresError && <p>{coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image src='/static/hero-image.png' width='700' height='400' alt="banner image" />
        </div>

        {coffeeStores.length > 0 && <>
          <h2 className={styles.heading2}>{coffeeStores[0].neighbourhood} stores near me</h2>
          <div className={styles.cardLayout}>
            {coffeeStores.map(store => {
              return (
                <Card className={styles.card} key={store.id} name={store.name} imgUrl={store.imgUrl} href={`/coffee-store/${store.id}`} />
              )
            })}
          </div>
        </>}

        {props.coffeeStores.length > 0 && <>
          <h2 className={styles.heading2}>{props.city} stores</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStores.map(store => {
              return (
                <Card className={styles.card} key={store.id} name={store.name} imgUrl={store.imgUrl} href={`/coffee-store/${store.id}`} />
              )
            })}
          </div>
        </>}

      </main>
    </div>
  )
}
