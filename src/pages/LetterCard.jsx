import React, { useState, useEffect } from "react";
import SideBar from "../components/sideBar";
import Audio from "../components/Audio";
import { fileLocation } from "../data";
function Cards({
  arabicAlphabet,
  selectedColor,
  arabicAlphabetDiacritics = "",
  withHoverChildren = false,
  isSaddah = false,
  isSaakinah = false,
  title,
  audioFolder=''
}) {
  const [preAlphabetDiacriticsUnicode, setPreAlphabetDiacriticsUnicode] =
    useState("");
  const [preAlphabet, setPreAlphabet] = useState("");
  const [postAlphabetDiacriticsUnicode, setPostAlphabetDiacriticsUnicode] =
    useState("");

  let rowIndex = 0;

  console.log("LetterCard.jsx");
  console.log(arabicAlphabet);
  return (
    <>
      <div key={rowIndex} className="flex flex-wrap w-[calc(100%-10px)] space-x-1 md:space-x-4 m-1 ">
        <div
          className={`font-bangla flex  justify-center items-center text-center text-2xl relative left-6 w-[calc(100%-30px)] md:left-0 md:w-[100%] m-2 max-h-[100px] ${selectedColor.backgroundColor} ${selectedColor.textColor}`}
        >
          <span className="text-3xl text-center">
            আরবী বর্ণমালা <span className="text-3xl">{title} </span>
            {arabicAlphabetDiacritics &&
              "-" +
                String.fromCodePoint(parseInt(arabicAlphabetDiacritics, 16)) +
                "  দিয়ে"}
          </span>
        </div>
        {isSaakinah && (
        <div className="">
          <SideBar
            selectedColor={selectedColor}
            preAlphabetDiacriticsUnicode={preAlphabetDiacriticsUnicode}
            setPreAlphabetDiacriticsUnicode={setPreAlphabetDiacriticsUnicode}
            preAlphabet={preAlphabet}
            setPreAlphabet={setPreAlphabet}
            postAlphabetDiacriticsUnicode={postAlphabetDiacriticsUnicode}
            setPostAlphabetDiacriticsUnicode={setPostAlphabetDiacriticsUnicode}
            isSaddah={isSaddah}
            arabicAlphabet={arabicAlphabet}
          />
        </div>
      )}
        <div className="flex flex-0 flex-wrap flex-row-reverse w-full relative left-8 md:left-0 md:m-2 h-full">
          {arabicAlphabet
            .filter((row) => row.extra != 1)
            .map((item, itemIndex) => (
              <div
                key={`container-${rowIndex}-${itemIndex}`}
                className=" group flex-grow"
              >
                <Audio
                  folder={`${fileLocation}audios/alphabets${audioFolder}/`}
                  fileName={`${itemIndex + 1}.mp3`}
                >
                  <div
                    key={`item-${rowIndex}-${itemIndex}`}
                    className={`rtl p-1 py-2 m-auto my-2 w-[150px] md:w-64 ${withHoverChildren ? "":"h-32"} md:h-48
            ${selectedColor.backgroundColor} 
            text-8xl text-center 
            ${selectedColor.textColor} rounded-lg`}
                  >
                    {preAlphabet && preAlphabet}
                    {preAlphabet &&
                      preAlphabetDiacriticsUnicode &&
                      String.fromCodePoint(
                        parseInt(preAlphabetDiacriticsUnicode, 16)
                      )}

                    {item.alphabet}
                    {arabicAlphabetDiacritics &&
                      String.fromCodePoint(
                        parseInt(arabicAlphabetDiacritics, 16)
                      )}
                    {postAlphabetDiacriticsUnicode &&
                      String.fromCodePoint(
                        parseInt(postAlphabetDiacriticsUnicode, 16)
                      )}

                    {withHoverChildren && (
                      <>
                        <div
                          dir="rtl"
                          key={`itemNameAr-${rowIndex}-${itemIndex}`}
                          className="text-5xl text-right opacity-0 group-hover:opacity-100"
                        >
                          {item.alphabet_name}
                        </div>
                        <div
                          key={`itemNameBn-${rowIndex}-${itemIndex}`}
                          className="text-2xl text-left opacity-0 group-hover:opacity-100"
                        >
                          {item.alphabet_banglaname}
                        </div>
                      </>
                    )}
                  </div>
                </Audio>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Cards;
