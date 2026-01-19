import HeaderDesktop from "./desktop/header-desktop";
import { HeaderMobile } from "./mobile/header-mobile";

const Header = () => {
  return (
    <header className="top-0 sticky z-20 bg-black px-5 py-7 border-b-4 border-white">
      <HeaderDesktop cssClasses="hidden desktop:block max-w-[1280px] mx-auto" />
      <HeaderMobile cssClasses="desktop:hidden" />
    </header>
  );
};

export default Header;
