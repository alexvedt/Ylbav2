import SpotifyLoginComponent from "../components/login";
import RandTrack from "../components/randomTrack";
export default function Home() {
  return (
    <>
      <p className="bg-red-300">home</p>
      <SpotifyLoginComponent />
      <RandTrack />
    </>
  );
}
