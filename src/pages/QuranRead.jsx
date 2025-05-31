import React, { useState } from "react";
import AyahWord from "../components/AyahWord"
import RefTable from "../components//RefTable";
import { receiveDataFromDjango } from "../data";
export default function QuranRead({ selectedColor }) {
  const [sura, setSura] = useState("");
  const [aya, setAya] = useState("");
  const [refData, setRefData] = useState([]);
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reciter = localStorage
    .getItem("arabic-app-reciter")
    .split(",")[1]
    .split(":")[1]
    .slice(1, -2);
  let rootAddress = localStorage.getItem("rootAddress");
  const fetchQuran = async (sura, aya) => {
    let url = `${rootAddress}/quran-words/filter_by_sura/?sura=${sura}`;
    if (aya) {
      url += `&aya=${aya}`;
    }

    try {
      const res = await fetch(url);
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch");
      const result = await res.json();
      if (result.length != 0) setData(result);
      else setError("Ayah Number not exist");
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setData(null);
    if (sura < 1 || sura > 114) {
      setError("Number of Surah is wrong");
      setLoading(false);
    } else {
      fetchQuran(sura, aya);
    }
  };

  return (
    <div
      className={`w-[95%] md:w-[80%] mx-auto mt-10 p-4 ${selectedColor.backgroundColor} shadow-lg rounded-xl font-bangla`}
    >
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-center ">কুরআন</h1>
      <div className="flex gap-16">
        <div className="w-[45%]">
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                সূরাহ নং
              </label>
              <input
                type="number"
                value={sura}
                onChange={(e) => setSura(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                আয়াত নং (ঐচ্ছিক)
              </label>
              <input
                type="number"
                value={aya}
                onChange={(e) => setAya(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                &nbsp;
              </label>
              <button
                type="submit"
                className="text-sm md:text-2xl w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                কুরআনের সুরাহ বা আয়াত পড়ুন
              </button>
            </div>
          </form>
        </div>
        <div className="w-[45%] space-y-8">
          <label className="block text-sm font-medium text-gray-700">
            শব্দ
          </label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            dir="rtl"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            type="submit"
            onClick={async () => {
              console.log("word ", word);
              try {
                const ref = await receiveDataFromDjango(
                  rootAddress + "quran-words/filter_by_words/?word=" + word
                ); // ✅ waits here
                console.log("ref ", ref);
                if (!ref) {
                  console.log("Not found in Quran DB");
                } else {
                  ref.forEach(async (item) => {
                    console.log(item);
                  });
                  setRefData(ref); // update your state after data is fetched

                  // ✅ You can do more stuff *after* data is ready here
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }

              try {
                console.log(await refData);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            }}
            className="text-sm md:text-2xl w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            কুরআনের রেফারেন্স খুজুন
          </button>
        </div>
      </div>
      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && (
        <p className="mt-4 text-red-600">
          <pre>{error}</pre>
        </p>
      )}
      <div className="md:w-[100%]  flex flex-col gap-16 mt-8">
        {refData[0] && (
          <div className=" w-[98%]">
            <RefTable refData={refData} word={word}></RefTable>
          </div>
        )}
        {!error && data && (
          <>
            <AyahWord data={data} word={word}></AyahWord>
          </>
        )}
      </div>
    </div>
  );
}
