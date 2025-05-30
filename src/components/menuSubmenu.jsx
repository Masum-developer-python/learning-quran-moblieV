import { arabicDiacritics } from "../data";
import { useState, useRef } from "react";
import { UserNavigation } from "./navigations";
import ThemeSelector from "./ThemeSelector";
import ColorSelector from "./ColorSelector";
import ReciterSelector from "./ReciterSelector";

function Submenu({
  selectedTheme,
  selectedColor,
  setSelectedTheme,
  setSelectedColor,
  alphabetColorCombinations,
  selectedReciter,
  setSelectedReciter,
  reciterList,
}) {
  const width = window.innerWidth;
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const [openCategories, setOpenCategories] = useState({});
  const [openSubCategories, setOpenSubCategories] = useState({});
  const submenuRefs = useRef({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => {
      const isCurrentlyOpen = prev[category];

      // If the clicked category is already open, close all
      if (isCurrentlyOpen) {
        return {};
      }

      // Otherwise, open only the clicked one
      return {
        [category]: true,
      };
    });
  };

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategories((prev) => {
      const isCurrentlyOpen = prev[subCategory];

      // If the clicked category is already open, close all
      if (isCurrentlyOpen) {
        return {};
      }

      // Otherwise, open only the clicked one
      return {
        [subCategory]: true,
      };
    });
  };
  return (
    <ul
      className={`font-bangla w-24 relative h-full text-center break-words whitespace-normal 
        ${selectedColor.backgroundColor} ${selectedColor.textColor} z-20`}
    >
      {Object.keys(arabicDiacritics).map((category, index) => (
        <li key={index} className="relative">
          <hr />
          <br />
          <br />
          {/* Category Name */}
          <a
            className="block px-3 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition 
            duration-1000"
            href={"/" + category.toLowerCase()}
          >
            {arabicDiacritics[category].title}
          </a>

          {arabicDiacritics[category]?.diacritics?.length > 0 && (
            <button
              onClick={() => {
                toggleCategory(category);
              }}
              className=" py-2"
            >
              {openCategories[category] ? ">" : "<"}
            </button>
          )}

          {(openCategories[category] || isDesktop) &&
            arabicDiacritics[category].diacritics && (
              <div
                className={`absolute z-30 left-14 ${
                  openCategories[category] ? "" : "hidden"
                } transform 
                -translate-y-1/2 mt-2 w-full ${selectedColor.backgroundColor} ${
                  selectedColor.textColor
                } 
                rounded shadow-lg transition duration-300 z-5`}
              >
                {/* Sub-Menu */}
                {arabicDiacritics[category].diacritics.map((item, index) => (
                  <div key={index} className="group/sub relative">
                    <a
                      href={
                        "/" +
                        category.toLowerCase() +
                        "/" +
                        item.name.toLowerCase()
                      }
                      className="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                      {item.title}
                    </a>

                    {(isMobile || isTablet || isDesktop) && (
                      <button
                        onClick={() => {
                          toggleSubCategory(item.name);
                        }}
                        className="px-4 py-2"
                      >
                        {openSubCategories[item.name] ? ">" : "<"}
                      </button>
                    )}

                    {(openSubCategories[item.name] || isDesktop) &&
                      item.pages && (
                        <div
                          className={`absolute left-14 top-0 mt-2 w-full rounded shadow-lg
                            ${
                              openSubCategories[item.name] ? "" : "hidden"
                            } transition duration-300
                            ${selectedColor.backgroundColor} ${
                            selectedColor.textColor
                          } 
                        `}
                        >
                          {item.pages.map((page, pageIndex) => (
                            <a
                              key={pageIndex}
                              href={
                                "/" +
                                category.toLowerCase() +
                                "/" +
                                item.name.toLowerCase() +
                                page.name.toLowerCase()
                              }
                              className="block py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            >
                              {page.title}
                            </a>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          <br />
          <br />
          <hr />
        </li>
      ))}
      <li key={"123"} className="group">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-3 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/words"}
        >
          শব্দ তৈরী
        </a>
        <br />
        <br />
        <hr />
      </li>

      <li key={"1234"} className="">
        <hr />
        <br />
        <br />
        {/* Category Name */}
        <a
          className="block px-3 py-2 rounded hover:bg-blue-700 focus:bg-red-200 transition duration-1000"
          href={"/quran"}
        >
          কুরআন পড়া
        </a>
        <br />
        <br />
        <hr />
      </li>
      <li>
        <hr />
        <br />
        <br />
        <ReciterSelector
          selectedReciter={selectedReciter}
          setSelectedReciter={setSelectedReciter}
          reciterList={reciterList}
          selectedColor={selectedColor}
        />
        <br />
        <br />
        <hr />
      </li>
      <li>
        <hr />
        <br />
        <br />
        <UserNavigation />
        <br />
        <br />
        <hr />
      </li>

      <li className="w-24">
        <hr />
        <br />
        <br />
        <ThemeSelector
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedTheme={(newTheme) => {
            setSelectedTheme(newTheme);
            setSelectedColor(newTheme.combinations[2]); // Reset color when theme changes
          }}
          alphabetColorCombinations={alphabetColorCombinations}
        />
        <ColorSelector
          selectedTheme={selectedTheme}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <br />
        <br />
        <hr />
      </li>
    </ul>
  );
}

export default Submenu;
