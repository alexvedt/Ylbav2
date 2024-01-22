import OppoScroll from "../scroll-hero";
import vinyl from "../../assets/vinyl.jpg";
import oldschool from "../../assets/oldschool.jpg";
import { Link } from "@tanstack/react-router";
import ButtonWrapper from "../btn";
import cassette from "../../assets/casetteeeeee.jpg";
import studio from "../../assets/studio.jpg";
const items = [
  {
    id: 1,
    title: "Snatch a sample",
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
    img: studio,
    linkTo: "/",
  },
  {
    id: 4,
    title: "Try something new",
    description: "Coming soon....",
    img: cassette,
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
