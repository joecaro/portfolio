import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* <!-- Start of HubSpot Embed Code --> */}
          <script
            type='text/javascript'
            id='hs-script-loader'
            async
            defer
            src='//js.hs-scripts.com/21057690.js'></script>
          {/* <!-- End of HubSpot Embed Code --> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
