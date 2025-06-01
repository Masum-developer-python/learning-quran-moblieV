import { BookOpenText, CirclePlay } from "lucide-react";
import React, { useState } from "react";
import { receiveDataFromDjango } from "../data";
import Audio from "./Audio";
import AyahWord from "./AyahWord";
import { fileLocation } from "../data";
export default function RefTable({ refData, word }) {
  const reciter = localStorage
    .getItem("arabic-app-reciter")
    .split(",")[1]
    .split(":")[1]
    .slice(1, -2);
  const rootAddress = localStorage.getItem("rootAddress");
  const [ayah, setAyah] = useState({});
  const [visible, setVisible] = useState({});
  // console.log(visible);
  // console.log(ayah);
  return (
    <div id="refTable" className="w-[99%]">
      <table className="text-xs md:text-2xl table-auto border-collapse">
        <thead>
          <tr className="md:sticky md:top-2 bg-green-100">
            <th className="hidden md:table-cell border-2 font-bangla border-gray-500">
              &nbsp;&nbsp;ক্রমিক&nbsp;&nbsp;
            </th>
            <th className="border-2 font-bangla border-gray-500"> &nbsp;&nbsp;সুরা&nbsp;&nbsp;</th>
            <th className="border-2 font-bangla border-gray-500"> &nbsp;&nbsp;আয়াত&nbsp;&nbsp;</th>
            <th className="border-2 font-bangla border-gray-500"> &nbsp;&nbsp;স্থান&nbsp;&nbsp;</th>
            <th className="border-2 font-bangla border-gray-500"> &nbsp;&nbsp;শব্দ&nbsp;&nbsp;</th>
            <th className="border-2 font-bangla border-gray-500">
              
            &nbsp;&nbsp;শব্দ&nbsp;&nbsp;
            &nbsp;&nbsp;অডিও&nbsp;&nbsp;
            </th>

            <th className="border-2 font-bangla border-gray-500">
              
            &nbsp;&nbsp;আয়াত&nbsp;&nbsp;
            &nbsp;&nbsp;অডিও&nbsp;&nbsp;
            </th>
            <th className="border-2 font-bangla border-gray-500">
            &nbsp;&nbsp;সুরাহ&nbsp;&nbsp;
            &nbsp;&nbsp;অডিও&nbsp;&nbsp;
            </th>
            <th className="border-2 font-bangla border-gray-500">
            &nbsp;&nbsp;রেফারেন্স&nbsp;&nbsp;
            </th>
            <th className="hidden md:table-cell border-2 font-bangla border-gray-500">
            &nbsp;&nbsp;পূর্ণাঙ্গ আয়াত&nbsp;&nbsp;
            </th>
          </tr>
        </thead>
        <tbody key={`tbody`}>
          {refData.map((item, index) => (
            <>
              <tr key={`${index}trow`}>
                <td className="hidden md:table-cell border-2 border-gray-500">
                  {index + 1}
                </td>
                <td className="border-2 border-gray-500">{item.sura}</td>
                <td className="border-2 border-gray-500">{item.aya}</td>
                <td className="border-2 border-gray-500">{item.position}</td>
                <td
                  className="border-2 border-gray-500 text-lg md:text-5xl font-akber"
                  dir="rtl"
                >
                  {/* {item.text}{" "}
                  {(() => {
                    const text = item.text;
                    const match = word;
                    const startIndex = text.indexOf(match);

                    if (startIndex === -1) return <span>{text}</span>;

                    const before = text.slice(0, startIndex);
                    const matched = text.slice(
                      startIndex,
                      startIndex + match.length
                    );
                    const after = text.slice(startIndex + match.length);

                    return (
                      <span>
                        {before}
                        <span className="text-green-500">{matched}</span>
                        {after}
                      </span>
                    );
                  })()} */}

                  {" "}
                  {(() => {
                    const text = item.text;
                    const search = word;
                    const highlightIndexes = [];

                    let tIndex = 0;
                    for (let sIndex = 0; sIndex < search.length; sIndex++) {
                      const char = search[sIndex];
                      while (tIndex < text.length && text[tIndex] !== char) {
                        tIndex++;
                      }
                      if (tIndex < text.length) {
                        highlightIndexes.push(tIndex);
                        tIndex++;
                      }
                    }

                    return (
                      <span>
                        {text.split("").map((char, index) =>
                          highlightIndexes.includes(index) ? (
                            <span key={index} className="text-green-500">
                              {char}
                            </span>
                          ) : (
                            <span key={index}>{char}</span>
                          )
                        )}
                      </span>
                    );
                  })()}
                </td>
                <td className="border-2 border-gray-500 ">
                  {/* every word audio */}
                  <Audio
                    title="Word Audio"
                    folder={fileLocation + "audios/sura"}
                    fileName={item.audio.substring(0, 4) + item.audio}
                  />
                </td>
                <td className="border-2 border-gray-500 ">
                  {/* ayah ref audio */}
                  <Audio
                    title={`Ayah Audio`}
                    folder={
                      fileLocation +
                      "audios/sura" +
                      item.audio.substring(0, 4) +
                      "/" +
                      reciter +
                      "/"
                    }
                    fileName={
                      item.audio.substring(0, 4) +
                      item.audio.substring(5, 8) +
                      ".mp3"
                    }
                  />
                </td>

                <td className="border-2 border-gray-500 ">
                  <Audio
                    title={`Surah Audio`}
                    folder={
                      fileLocation +
                      "audios/sura" +
                      item.audio.substring(0, 4) +
                      "/" +
                      reciter
                    }
                    fileName={item.audio.substring(0, 4) + ".mp3"}
                  />
                </td>

                <td className="border-2 border-gray-500">
                  {/* ayah ref text */}
                  <button
                    title="Click for Ayah text"
                    onClick={async () => {
                      const key = `${item.sura}-${item.aya}-${item.position}`;
                      try {
                        const refAyah = await receiveDataFromDjango(
                          rootAddress +
                            "quran-words/filter_by_sura?sura=" +
                            item.sura +
                            "&aya=" +
                            item.aya
                        );

                        console.log(refAyah);
                        setAyah((prev) => ({
                          ...prev,
                          [key]: refAyah,
                        }));
                      } catch (error) {
                        console.error("❌ Error fetching data:", error);
                      } finally {
                        setVisible((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }));
                      }
                    }}
                  >
                    <BookOpenText className="w-4 h-4 md:w-7 md:h-7 text-red-500" />
                  </button>
                </td>

                <td
                  dir="rtl"
                  id={`${item.sura}-${item.aya}-${item.position}`}
                  className="hidden md:table-cell border-2 border-gray-500 w-[55%] p-2 text-5xl font-akber"
                >
                  {visible[`${item.sura}-${item.aya}-${item.position}`] &&
                    ayah[`${item.sura}-${item.aya}-${item.position}`] && (
                      <AyahWord
                        data={ayah[`${item.sura}-${item.aya}-${item.position}`]}
                        suraAudio={false}
                        ayaAudio={false}
                        word={item.text}
                      ></AyahWord>
                    )}
                </td>
              </tr>
              <tr className=" md:hidden">
                <th className=" border-2 font-bangla border-gray-500">
                  পূর্ণাঙ্গ আয়াত
                </th>
                <td
                  dir="rtl"
                  id={`${item.sura}-${item.aya}-${item.position}`}
                  className=" border-2 border-gray-500 p-2 text-5xl font-akber"
                  colSpan={8}
                >
                  {visible[`${item.sura}-${item.aya}-${item.position}`] &&
                    ayah[`${item.sura}-${item.aya}-${item.position}`] && (
                      <>
                      <AyahWord
                        data={ayah[`${item.sura}-${item.aya}-${item.position}`]}
                        suraAudio={false}
                        ayaAudio={false}
                        word={item.text}
                      ></AyahWord>
                      <>
                      {}
                      </>
                      </>
                    )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
