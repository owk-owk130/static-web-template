import { Footer } from "~/components/Footer";
import { Head } from "~/components/Head";
import { Header } from "~/components/Header";
import { generateStaticPage } from "~/core/generateStaticPage";

export const TopPage = () => {
  return (
    <div>
      <Head>
        <title>Sample Static Site</title>
        <script src="./script.js" />
        <link rel="stylesheet" href="./style.css" />
      </Head>
      <Header />
      <main>
        <h1>Top Page</h1>
        <div id="countDisplay">0</div>
        <button id="incrementButton" type="button">
          Increment
        </button>
        <button id="decrementButton" type="button">
          Decrement
        </button>

        <script src="path_to_compiled_js_file.js" />
      </main>
      <Footer />
    </div>
  );
};

export default generateStaticPage(<TopPage />);
