import React, { useState } from "react";
import {
  Pencil,
  NotebookPen,
  BookOpen,
  Eraser,
  Save,
  CirclePlay,
  SquareX,
} from "lucide-react";
import { sendDataToDjango, receiveDataFromDjango } from "../data";
import Words from "../pages/WordMaker";
import RefTable from "./RefTable";
import axios from "axios";
import { fileLocation } from "../data";
export default function ActionBar({
  diacritics,
  position,
  id,
  pName,
  selectedColor,
  sendingWord,
  setSendingWord,
  arabicAlphabet,
  word,
  cellId,
}) {
  // console.log(diacritics, position, id, pName);
  let rootAddress = localStorage.getItem("rootAddress");
  let bangla='';
  const baseAddress = rootAddress + "arabic-words/";
  const [address, setAddress] = useState(baseAddress);
  const [method, setMethod] = useState("POST");
  const user = localStorage.getItem("user");
  const isAdmin = user == null ? false : true;
  const [refData, setRefData] = useState([]);
  const [visible, setVisible] = useState({});
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const reciter = localStorage
    .getItem("arabic-app-reciter")
    .split(",")[1]
    .split(":")[1]
    .slice(1, -2);
  // console.log(reciter);

  return (
    <>
      {/* actions */}
      <div className="flex flex-row w-full p-1 mt-6 bg-gray-200 rounded-lg">
        {isAdmin && (
          <>
            {word && (
              <>
                {/* Delete */}
                <button
                  title="Delete"
                  className="w-8 h-8 flex-1 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-red-200"
                  onClick={async () => {

                    try {
                      const refreshResponse = await axios.post(
                        rootAddress + "token/refresh/",
                        { refresh: refreshToken },
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      );
                  
                      if (refreshResponse.status === 200) {
                        const newAccessToken = refreshResponse.data.access;
                        const newRefreshToken = refreshResponse.data.refresh;
                  
                        localStorage.setItem("access_token", newAccessToken);
                        localStorage.setItem("refresh_token", newRefreshToken);
                      }
                    } catch (error) {
                      console.error("🔒 Token refresh failed:", error);
                      alert("Session expired. Please log in again.");
                      // Optionally redirect to login
                      return;
                    }
                    setMethod("DELETE");
                    console.log(address, method);
                    sendDataToDjango(
                      null,
                      baseAddress + cellId + "/",
                      method,
                      accessToken
                    );
                  }}
                >
                  <Eraser className="w-7 h-7 text-red-500" />
                </button>
                {/* ------------------------------------------------------------------------------------------------------------------- */}
                {/* Edit */}
                <button
                  title="Edit"
                  className="w-8 h-8 flex-1 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-blue-200"
                  onClick={ async () => {

                    try {
                      const refreshResponse = await axios.post(
                        rootAddress + "token/refresh/",
                        { refresh: refreshToken },
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      );
                  
                      if (refreshResponse.status === 200) {
                        const newAccessToken = refreshResponse.data.access;
                        const newRefreshToken = refreshResponse.data.refresh;
                  
                        localStorage.setItem("access_token", newAccessToken);
                        localStorage.setItem("refresh_token", newRefreshToken);
                      }
                    } catch (error) {
                      console.error("🔒 Token refresh failed:", error);
                      alert("Session expired. Please log in again.");
                      // Optionally redirect to login
                      return;
                    }


                    const key = position + id;
                    setSendingWord(word);
                    setVisible((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }));
                    setAddress(baseAddress + cellId + "/");
                    setMethod("PATCH");
                    console.log(
                      baseAddress + cellId + "/",
                      method,
                      accessToken
                    );
                  }}
                >
                  <Pencil className="w-7 h-7 text-blue-500" />
                </button>
              </>
            )}
            {/* ------------------------------------------------------------------------------------------------------------------- */}
            {!word && (
              <>
                {/* insert */}
                <button
                  title="Insert word"
                  className="w-8 h-8 flex-1 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-yellow-200"
                  onClick={async () => {

                    try {
                      const refreshResponse = await axios.post(
                        rootAddress + "token/refresh/",
                        { refresh: refreshToken },
                        {
                          headers: { "Content-Type": "application/json" },
                          withCredentials: true,
                        }
                      );
                  
                      if (refreshResponse.status === 200) {
                        const newAccessToken = refreshResponse.data.access;
                        const newRefreshToken = refreshResponse.data.refresh;
                  
                        localStorage.setItem("access_token", newAccessToken);
                        localStorage.setItem("refresh_token", newRefreshToken);
                      }
                    } catch (error) {
                      console.error("🔒 Token refresh failed:", error);
                      alert("Session expired. Please log in again.");
                      // Optionally redirect to login
                      return;
                    }
                    const key = position + id;
                    setVisible((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }));
                    setMethod("POST");
                    // address = baseAddress + "/" + String(id);
                    console.log(method);
                  }}
                >
                  <NotebookPen className="w-7 h-7 text-yellow-500" />
                </button>
              </>
            )}
          </>
        )}
        {/* ------------------------------------------------------------------------------------------------------------------- */}

        {/* refference start*/}
        <button
          title="Refference"
          className="w-8 h-8 flex-1 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-green-200"
          onClick={async () => {
            document
              .getElementById(position + id + "ID")
              .classList.toggle("hidden");
            console.log(word);
            try {
              const ref = await receiveDataFromDjango(
                rootAddress + "quran-words/filter_by_words/?word=" + word
              ); // ✅ waits here

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
          }}
        >
          <BookOpen className="w-7 h-7 text-green-500" />
        </button>

        <div
          id={`${position}${id}ID`}
          className={`hidden fixed overflow-y-scroll h-[calc(90%-10px)] w-[90%] md:max-w-[80%]  left-4 md:left-64 top-8 z-5 ${selectedColor.textColor} ${selectedColor.backgroundColor}`}
        >
          <button
            className="w-8 h-8 z-20 fixed bg-gray-100 rounded-lg hover:bg-red-200"
            onClick={() => {
              document
                .getElementById(`${position}${id}ID`)
                .classList.toggle("hidden");
            }}
          >
            <SquareX className="w-7 h-7 text-red-900"></SquareX>
          </button>
          <div className="">
            {" "}
            <RefTable refData={refData} word={word}/>
          </div>
        </div>
        {/* ref ayah show */}

        {/* refference end*/}
        {/* ------------------------------------------------------------------------------------------------------------------- */}
        {/* word audio */}
        <button
          title="Word Audio"
          className="w-8 h-8 flex-1 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-red-200"
          onClick={async () => {
            try {
              const ref = await receiveDataFromDjango(
                rootAddress + "quran-words/filter_by_word/?word=" + word
              );
              console.log(ref[0]);
              document.getElementById(position + id + "Audio").src =
                fileLocation +
                "audios/sura" +
                ref[0].audio.substring(0, 4) +
                ref[0].audio;
              document.getElementById(position + id + "Audio").play();
              document.getElementById(position + id + "Audio").classList =
                "hidden";
            } catch (error) {
              console.error("❌ Error fetching data:", error);
            }
          }}
        >
          <CirclePlay className="w-7 h-7 text-red-500" />
        </button>
        <audio controls id={`${position}${id}Audio`} className="hidden">
          <source src="" type="audio/mpeg" />
          The Word can't be found in Quran words database.
        </audio>
        {/* ------------------------------------------------------------------------------------------------------------------- */}
      </div>
      {/* word maker */}
      
      { visible[`${position}${id}`] && (<div id={`${position}${id}`} className="bg-gray-100 relative">
        <Words
          selectedColor={selectedColor}
          sendingWord={sendingWord}
          setSendingWord={setSendingWord}
          arabicAlphabet={arabicAlphabet}
        />
        <button
          className="bg-gray-300"
          onClick={() =>
            sendDataToDjango(
              {
                diacritics: diacritics,
                position: position,
                word: sendingWord,
                bangla: bangla,
                english: "",
                parts_of_speech: "",
                letter: id,
                join_diacritics: pName,
              }, // Data to send
              address, // URL
              method,
              accessToken
            )
          }
        >
          <Save className="w-8 h-8 text-blue-500" />
        </button>
        <input type="text" placeholder="bang" className="h-16 w-48 text-sm"
        onChange={(e)=>{
          bangla = e.target.value;
          console.log(bangla);
        }}
        ></input>
      </div>)}
    </>
  );
}
