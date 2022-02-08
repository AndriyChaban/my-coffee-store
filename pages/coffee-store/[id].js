import Link from "next/link";
import { useRouter } from "next/router";
// import coffeeStoresData from '../../data/coffee-stores.json';
import Head from "next/head";
import styles from '../../styles/coffee-store.module.css';
import Image from "next/image";
import cls from 'classnames';
import { fetchCoffeeStores } from "../../lib/coffee-stores";


export async function getStaticProps({ params }) {
    console.log("params", params)
    const coffeeStoresData = await fetchCoffeeStores();
    return {
        props: {
            coffeeStore: coffeeStoresData.find(elem => String(elem.id) === params.id),
        }
    }
}

export async function getStaticPaths() {

    const coffeeStoresData = await fetchCoffeeStores();
    const paths = coffeeStoresData.map(store => {
        return {
            params: {
                id: store.id.toString()
            }
        }
    })

    return {
        paths: paths,
        fallback: true,
    }
}



const CoffeeStore = (props) => {

    const handleUpvoteButton = () => { }

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    const { address, name, neighbourhood, imgUrl, storeImg } = props.coffeeStore;

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image className={styles.storeImg} src={imgUrl} width={600} height={360}
                        alt={name}></Image>
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
                        <p className={styles.text}>1</p>
                    </div>
                    <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Upvote</button>
                </div>
            </div>
        </div>)
}

export default CoffeeStore;