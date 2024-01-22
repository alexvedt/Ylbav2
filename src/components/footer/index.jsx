import OppoScroll from "../scroll-hero";
import vinyl from "../../assets/vinyl.jpg";
import oldschool from "../../assets/oldschool.jpg";
import { Link } from "@tanstack/react-router";
import ButtonWrapper from "../btn";

const items = [
  {
    id: 1,
    title: "SamplefetcherGeneratorAnitaMaxWynn",
    description:
      "Are you a music producer? Are you always looking countless hours for samples? Well, look no further. Samplefetcher is here to help you find the perfect sample for your next hit.",
    img: vinyl,
    linkTo: "/samplefinder",
  },
  {
    id: 2,
    title: "PlayGen",
    description:
      "Are you ready to take the next step when it comes to listening to music? Well, look no further. PlayGen is here to help you find the perfect sample for your next hit.s",
    img: oldschool,
    linkTo: "/samplefinder",
  },
  {
    id: 3,
    title: "Play me up!",
    description: "Coming soon....",
    img: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
    linkTo: "/",
  },
  {
    id: 4,
    title: "Playlist generator",
    description: "Coming soon....",
    img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1662&q=80",
    linkTo: "/",
  },
];

export default function Footer() {
  return (
    <>
      <footer className="h-screen">
        <OppoScroll
          items={items.map((item) => ({
            ...item,
            btn: (
              <Link to={item.linkTo}>
                <ButtonWrapper linkTo={item.linkTo} />
              </Link>
            ),
          }))}
        />
      </footer>
    </>
  );
}
