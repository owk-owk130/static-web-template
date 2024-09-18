import { Footer } from "~/components/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/Header";
import { generateStaticPage } from "~/core/generateStaticPage";

export const TopPage = () => {
  return (
    <div>
      <Head>
        <title>Sample Static Site</title>
        <script src="/about/script.js" />
        <link rel="stylesheet" href="/about/style.css" />
      </Head>
      <Header />
      <main>
        <h1>About Page</h1>
      </main>
      <Footer />
    </div>
  );
};

export default generateStaticPage(<TopPage />);
