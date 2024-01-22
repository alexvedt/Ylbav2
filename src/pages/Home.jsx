import SpotifyLoginComponent from "../components/login";
import RandTrack from "../components/randomTrack";
import Navbar from "../components/navbar";
export default function Home() {
  return (
    <>
      <SpotifyLoginComponent />
      <Navbar />
          <RandTrack />
    </>
      );
  }
