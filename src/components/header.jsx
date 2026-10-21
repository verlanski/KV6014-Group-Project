import { NavLink } from "react-router";
import HeaderImage from "../assets/GroupImage.png";




const NAV_LINKS = [
    {label: "Home", href: "/"},
  { label: "Book Appointment", href: "/booking" },
  { label: "Cervical cancer", href: "/home#cervical-cancer" },
  { label: "Register", href: "/register" },
];

// Classes for when the user is hovering over the link, when the link is active and when the link is inactive.
const linkBase =

  "block whitespace-nowrap rounded-full px-2.5 py-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:px-4";
const linkActive = "bg-slate-200/80 font-medium text-blue-600";
const linkInactive = "text-slate-800 hover:bg-white/50";

export default function Header() {

  return (
    <header className="relative">
      {/* Inner wrapper: clips the oversized blue shape */}
      <div className="relative h-56 sm:h-60 md:h-65 overflow-hidden bg-bg-surface">
        {/* Blue background with a rounded bottom */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[-15%] top-0 h-[96%] rounded-b-[50%] bg-bg-surface-alternative"
        />

        {/* 2. The illustration (picture) from the figma wireframe */}
        <div className="absolute right-0 top-0 h-[95%] w-[70%] overflow-hidden rounded-b-[50%] opacity-40 md:w-[55%] md:opacity-100">
          <img
            src={HeaderImage}
            alt="Wireframe picture of a group of people"
            className="h-full w-full object-cover object-[center-20%] mask-[linear-gradient(to_right,transparent,black_35%)]"
          />
        </div>

        {/* 3. Logo + title still need to get the logo to put here, if no logo is needed jjust delete the container for logo and it's placeholder */}
        <div className="relative z-10 flex h-full items-center gap-4 px-4 pb-10 sm:gap-6 sm:px-6 md:gap-10 md:px-16 md:pb-0">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-center text-sm leading-tight text-slate-800 sm:h-24 sm:w-24 sm:text-lg md:h-28 md:w-28">
            Logo
            <br />
            Here
          </div>

          <h1 className="text-xl font-bold leading-tight text-black sm:text-2xl md:text-3xl">
            Cervical
            <br />
            Cancer
            <br />
            Screening
          </h1>
        </div>
      </div>

      {/* 4. Nav bar*/}
      <nav
        aria-label="Main"
        className="absolute inset-x-0 bottom-[15%] z-20 mx-auto w-[calc(100%-2rem)] max-w-xl translate-y-1/2 rounded-full border border-white/60 bg-white/40 px-2 py-2 shadow-lg backdrop-blur-md sm:px-3"
      >
        <ul className="flex items-center justify-center gap-1 overflow-x-auto text-xs sm:gap-3 sm:text-sm md:gap-5">
          {NAV_LINKS.map(({ label, href }) => {
            return (
              <li key={label}>
                <NavLink
                    to={href}
                    end={href === "/"}
                    className={({ isActive }) =>
                    `${linkBase} ${isActive ? linkActive : linkInactive}`
                    }
                >
                    {label}
                </NavLink>
                </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}