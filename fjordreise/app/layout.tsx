import type { AppProps } from 'next/app';
import Head from 'next/head';
import "globals.css";


export default function App({ Component, pageProps }: AppProps) {
    return(
        <>
            <Head>
                <title>Fjordresie</title>

                <meta name="description" content="Søk etter og book ferjeavganger langs den norskekysten!! " />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}
