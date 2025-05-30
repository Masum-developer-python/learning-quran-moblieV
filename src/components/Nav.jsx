import Submenu from "./menuSubmenu";
import { Menu } from "lucide-react";

function Nav({
  selectedColor,
  selectedTheme,
  setSelectedTheme,
  setSelectedColor,
  alphabetColorCombinations,
  selectedReciter,
  setSelectedReciter,
  reciterList,
}) {
  console.log("Nav.jsx");
  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        className={`md:hidden ${selectedColor.backgroundColor} ${selectedColor.textColor} p-2 h-[50px] 
        z-10 rounded-full fixed`}
        onClick={() => {
          const menu = document.getElementById("vertical-menu");
          menu.classList.toggle("hidden");
        }}
      >
        <Menu />
      </button>
      <div
        className={`${selectedColor.backgroundColor} ${selectedColor.textColor} w-32  p-4 h-screen 
        md:block hidden mt-16`}
      ></div>
      {/* Navbar */}
      <nav
        id="vertical-menu"
        className={`${selectedColor.backgroundColor} ${selectedColor.textColor} w-32  p-2 
        fixed h-[calc(100vh-50px)] hidden overflow-y-scroll hover:w-52 md:block mt-16 md:mt-0 z-10`}
      >
        <div className="text-lg font-bold mb-6">আরবী শেখা</div>
        <Submenu
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedTheme={setSelectedTheme}
          setSelectedColor={setSelectedColor}
          alphabetColorCombinations={alphabetColorCombinations}
          selectedReciter={selectedReciter}
          setSelectedReciter={setSelectedReciter}
          reciterList={reciterList}
        />
      </nav>
    </>
  );
}
export default Nav;
