import { Footer } from "~/components/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/Header";
import { generateStaticPage } from "~/core/generateStaticPage";

export const AppPage = () => {
  return (
    <div>
      <Head>
        <title>Sample Apps</title>
        <script src="/app/script.js" />
        <link rel="stylesheet" href="/app/style.css" />
      </Head>
      <Header />
      <main>
        <div id="app" />
      </main>
      <Footer />
    </div>
  );
};

export default generateStaticPage(<AppPage />);
