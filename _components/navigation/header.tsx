import HeaderDesktop from "./desktop/header-desktop";
import { HeaderMobile } from "./mobile/header-mobile";

const Header = () => {
  return (
    <header className="top-0 bg-white sticky z-20 p-5 border-b border-black/25 desktop:px-10">
      <HeaderDesktop cssClasses="hidden desktop:block max-w-[1280px] mx-auto" />
      <HeaderMobile cssClasses="desktop:hidden" />
    </header>
  );
};

export default Header;
