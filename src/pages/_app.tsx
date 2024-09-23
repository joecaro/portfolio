import Page from "@/components/Page";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    );
}

export default MyApp;
