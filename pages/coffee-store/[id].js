import Link from "next/link";
import { useRouter } from "next/router";
// import coffeeStoresData from '../../data/coffee-stores.json';
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css';
import Image from "next/image";
import cls from 'classnames';
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
// import { StoreContext } from "../../context/store-context";
import { useGlobalState } from "../../context/global-state";


export async function getStaticProps({ params }) {
    // console.log("params", params)
    const coffeeStoresData = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStoresData.find(elem => String(elem.id) === params.id)
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        }
    }
}

export async function getStaticPaths() { //runs on SS
    const coffeeStoresData = await fetchCoffeeStores();
    const paths = coffeeStoresData.map(store => {
        return {
            params: {
                id: store.id.toString()  // must return list of params with dynamic [id] for SS pre-render
            }
        }
    })
    return {
        paths: paths,
        fallback: true,
    }
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

const CoffeeStore = (props) => {
    const router = useRouter();
    const id = router.query.id;
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
    // const context = useContext(StoreContext);
    // console.log("Context: ", context)
    // const { state: { coffeeStores } } = context;

    const [coffeeStores, setCoffeeStores] = useGlobalState('coffeeStores');

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const { id, name, voting, address, imgUrl, neighbourhood } = coffeeStore;
            const response = await fetch('/api/createCoffeeStore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, name, voting: 0, address: address || '', imgUrl, neighbourhood: neighbourhood || '' })
            });
            const dbCoffeeStore = response.json();
            // console.log({ dbCoffeeStore });


        } catch (err) {
            console.error('Error creating Coffee Store: ', err)
        }
    }

    useEffect(() => {
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id; //dynamic id
                });
                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext);
                    handleCreateCoffeeStore(coffeeStoreFromContext);
                }
            } 
        } else {
            handleCreateCoffeeStore(props.coffeeStore);
        }
    }, [id, props, props.coffeeStore]);

    const { address, name, neighbourhood, imgUrl, storeImg } = coffeeStore;
    
    const [votingCount, setVotingCount] = useState(1);

    const handleUpvoteButton = () => { 
        console.log("handle upvote");
        let count = votingCount + 1;
        setVotingCount(count);
     };
    
    
    if (router.isFallback) {
        return <div>Loading...</div>
    };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>&#x2190; Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image className={styles.storeImg}
                        src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                        width={600}
                        height={360}
                        alt={name}>
                    </Image>
                </div>

                <div className={cls("glass", styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/nearMe.svg" width="24" height="24" />
                        <p className={styles.text}> {address}</p>
                    </div>
                    {neighbourhood && <div className={styles.iconWrapper}>
                        <Image src="/static/icons/places.svg" width="24" height="24" />
                        <p className={styles.text}> {neighbourhood}</p>
                    </div>}
                    <div className={styles.iconWrapper}>
                        <Image src="/static/icons/star.svg" width="24" height="24" />
                        <p className={styles.text}>{ votingCount }</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote</button>
                </div>
            </div>
        </div>)
}

export default CoffeeStore;