import SpotifyLoginComponent from "../components/login";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Modal from "../components/modal";

export default function Home() {
  return (
    <>
      <header></header>
      <main>
        <Modal />
        <Navbar />
        <Footer />
      </main>
    </>
  );
}
