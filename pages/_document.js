import Document, { Head, Html, Main, NextScript } from "next/document";


export default class MyDocument extends Document {
    render() {
        return <Html lang="en">
            <Head>
                    <link rel="preload"              //rel=relationship   preload => tells browser to preload this resours
                        href="/fonts/IBMPlexSans-Bold.ttf"  //link to resource i.e. font in our case
                        as="font" // only used when rel=preload   it sets the necessary font header
                        crossOrigin="anonymous" // no credentials needed
                    />
                    <link rel="preload"              //rel=relationship   preload => tells browser to preload this resours
                        href="/fonts/IBMPlexSans-Regular.ttf"  //link to resource i.e. font in our case
                        as="font" // only used when rel=preload   it sets the necessary font header
                        crossOrigin="anonymous" // no credentials needed
                    />
                    <link rel="preload"              //rel=relationship   preload => tells browser to preload this resours
                        href="/fonts/IBMPlexSans-SemiBold.ttf"  //link to resource i.e. font in our case
                        as="font" // only used when rel=preload   it sets the necessary font header
                        crossOrigin="anonymous" // no credentials needed
                    />
            </Head>
            <body>
                <Main>
                </Main>
                <NextScript />
            </body>
        </Html>
    }
}

//lets walk the document 