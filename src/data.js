console.log("data.js");
export const rootAddresses = [
  
  "https://rmn30654.pythonanywhere.com/",
  "http://localhost:8000/",
  
];
export const fileLocation = '/';
export async function selectAliveRootAddress() {
  for (const address of rootAddresses) {
    console.log(`Checking address: ${address}`);
    try {
      const response = await fetch(address, { 
        method: "HEAD", 
        mode: "cors",
        // Adding a short timeout to avoid long waits
        signal: AbortSignal.timeout(3000)
      });
      
      if (response.ok) {
        console.log(`Found working address: ${address}`);
        localStorage.setItem('rootAddress', '');
        localStorage.setItem('rootAddress', address);
        return address;
      }
    } catch (error) {
      // If fetch fails (e.g., due to CORS or server down), try the next one
      console.warn(`Address ${address} not reachable:`, error.message);
    }
  }
  // Return default address if none are reachable
  console.warn("No addresses reachable, using first address as fallback");
  return rootAddresses[0];
}

// Note: This needs to be properly initialized using an async function
// You can't just assign the result of an async function directly

// Using an IIFE (Immediately Invoked Function Expression) to initialize
 // Default value
export let rootAddress = localStorage.getItem('rootAddress');
console.log(rootAddress);
// Initialize rootAddress properly
(async function initializeRootAddress() {
  try {
    let Address = await selectAliveRootAddress();
    console.log(`Selected root address: ${rootAddress}`);
  } catch (error) {
    console.error("Error selecting root address:", error);
  }
})();
export const siteTitle =
  "Al  Quran  learning , developed by RARE academy with Masum";

export const alphabetColorCombinations = [
  {
    theme: "Calm Learning",
    combinations: [
      {
        backgroundColor: "bg-blue-50",
        textColor: "text-blue-800",
        description: "Soft blue & deep blue",
      },
      {
        backgroundColor: "bg-orange-50",
        textColor: "text-orange-900",
        description: "Soft orange & deep orange",
      },
      {
        backgroundColor: "bg-yellow-100",
        textColor: "text-gray-900",
        description: "Light yellow & dark gray",
      },
      {
        backgroundColor: "bg-teal-50",
        textColor: "text-teal-900",
        description: "Mild teal & dark teal",
      },      
    ],
  },
  {
    theme: "High Contrast",
    combinations: [
      {
        backgroundColor: "bg-white",
        textColor: "text-black",
        description: "Classic black & white",
      },
      {
        backgroundColor: "bg-gray-100",
        textColor: "text-indigo-800",
        description: "Light gray & deep indigo",
      },
      {
        backgroundColor: "bg-yellow-50",
        textColor: "text-purple-900",
        description: "Soft yellow & deep purple",
      },
    ],
  },
  {
    theme: "Pastel Soft",
    combinations: [
      {
        backgroundColor: "bg-pink-50",
        textColor: "text-pink-900",
        description: "Soft pink & deep pink",
      },
      {
        backgroundColor: "bg-blue-100",
        textColor: "text-blue-900",
        description: "Light blue & deep blue",
      },
      {
        backgroundColor: "bg-green-50",
        textColor: "text-green-900",
        description: "Pale green & dark green",
      },
    ],
  },
  {
    theme: "Night Study",
    combinations: [
      {
        backgroundColor: "bg-gray-900",
        textColor: "text-yellow-100",
        description: "Dark gray & pale yellow",
      },
      {
        backgroundColor: "bg-black",
        textColor: "text-green-200",
        description: "Black & soft green",
      },
      {
        backgroundColor: "bg-gray-800",
        textColor: "text-purple-200",
        description: "Charcoal & light purple",
      },
    ],
  }
  

];
// console.log(alphabetColorCombinations[0].combinations[0].backgroundColor);
// let cl = alphabetColorCombinations[0].combinations[1];
// console.log(cl);

export const arabicDiacritics = {
  Letter: {
    title: "বর্ণমালা",
    diacritics: [],
  },
  Harakat: {
    title: "হরকত",
    diacritics: [
      {
        name: "Fathah",
        title: "যবর",
        symbol: "\u064E", // ـَ
        unicode: "U+064E",
        description: "Short 'a' sound",
        pages: [
          {
            name: "Words",
            title: "যবরযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
      {
        name: "Kasrah",
        title: "যের",
        symbol: "\u0650", // ـِ
        unicode: "U+0650",
        description: "Short 'i' sound",
        pages: [
          {
            name: "Words",
            title: "যেরযুক্ত শব্দ",
            column: ["", "", "উদাহরন"],
            columnEn : ['', '', 'start'],
          },
        ],
      },
      {
        name: "Dhammah",
        title: "পেশ",
        symbol: "\u064F", // ـُ
        unicode: "U+064F",
        description: "Short 'u' sound",
        pages: [
          {
            name: "Words",
            title: "পেশযুক্ত শব্দ",
            column: ["", "", "উদাহরন"],
            columnEn : ['', '', 'start'],
          },
        ],
      },
    ],
  },

  others: {
    title: "সাকিন & তাশদীদ",
    diacritics: [
      {
        name: "Saakinah",
        title: "সাকিন",
        symbol: "\u0652", // ـْ
        unicode: "U+0652",
        description: "No vowel (silent letter)",
        pages: [
          {
            name: "Words",
            title: "সাকিনযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
      {
        name: "AshShaddah",
        title: "তাশদীদ",
        symbol: "\u0651", // ـّ
        unicode: "U+0651",
        description: "Indicates doubling (gemination)",
        pages: [
          {
            name: "Words_harakat",
            title: "তাশদীদ এবং হারকাত যুক্ত শব্দ",
            column: ["দ্বাম্মাহ এর সাথে", "কাসরাহ এর সাথে", "ফাতহাহ এর সাথে"],
            columnEn : ['end', 'middle', 'start'],
          },
          {
            name: "Words_tanween",
            title: "তাশদীদ এবং তানভীন যুক্ত শব্দ",
            column: ["দ্বাম্মাহ তানভীনের সাথে", "কাসরাহ তানভীনের সাথে", "ফাতহাহ তানভীনের সাথে"],
            columnEn : ['end', 'middle', 'start'],
          },
          {
            name: "Words_madd",
            title: "তাশদীদ এবং মাদ্দ যুক্ত শব্দ",
            column: ["ওয়াও মাদ্দ এর সাথে", "ইয়া মাদ্দ এর সাথে", "আলিফ মাদ্দ এর সাথে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
    ],
  },

  Tanween: {
    title: "তানভীন",
    diacritics: [
      {
        name: "FathahTanween",
        title: "দুই যবর",
        symbol: "\u064B", // ـً
        unicode: "U+064B",
        description: "Indicates 'an' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই যবরযুক্ত শব্দ",
            column: ["", "", "দুই যবর"],
            columnEn : ['', '', 'start'],
          },
        ],
      },
      {
        name: "KasrahTanween",
        title: "দুই যের",
        symbol: "\u064D", // ـٍ
        unicode: "U+064D",
        description: "Indicates 'in' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই যেরযুক্ত শব্দ",
            column: ["", "দুই যের", ""],
            columnEn : ['', 'middle', ''],
          },
        ],
      },
      {
        name: "DhammahTanween",
        title: "দুই পেশ",
        symbol: "\u064C", // ـٌ
        unicode: "U+064C",
        description: "Indicates 'un' sound (tanween)",
        pages: [
          {
            name: "Words",
            title: "দুই পেশযুক্ত শব্দ",
            column: ["দুই পেশ", "", ""],
            columnEn : ['end', '', ''],
          },
        ],
      },
    ],
  },
  Madd: {
    title: "মদ",
    diacritics: [
      {
        name: "AlifMadd",
        title: "আলিফ মদ / খাড়া যবর",
        symbol: "\u0657", // ـٰ
        unicode: "U+0670",
        description: "Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "আলিফ মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
      {
        name: "YaaMadd",
        title: "ইয়া মদ / খাড়া যের",
        symbol: "\u0656", // ـٰ
        unicode: "U+0656",
        description: "Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "ইয়া মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
      {
        name: "WaaoMadd",
        title: "ওয়াও মদ / উল্টা পেশ",
        symbol: "\u0657", // ـٰ
        unicode: "U+0657",
        description: "Represents a prolonged vowel sound",
        pages: [
          {
            name: "Words",
            title: "ওয়াও মাদ্দযুক্ত শব্দ",
            column: ["শেষে", "মধ্যে", "শুরুতে"],
            columnEn : ['end', 'middle', 'start'],
          },
        ],
      },
    ],
  },

};



export async function sendDataToDjango(sdata, address, method = "POST", accessToken=null) {
  try {
    // const response = await fetch(address, {
    //   method: method,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sdata),
    // });
    console.log(accessToken);
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
    };

    // Only include body for methods that support it
    if (method !== "DELETE") {
      options.body = JSON.stringify(sdata);
    }

    const response = await fetch(address, options);


    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Data sent successfully:", result);
    location.reload();
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

export async function receiveDataFromDjango(address) {
  try {
    const response = await fetch(address);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
    console.log("Data sent successfully:", result);
  } catch (error) {
    console.error("Error sending data:", error);
    return null;
  }
}




{/* ayah image container */}
{/* <div
id="imageframe"
className="hidden z-20 fixed top-0 bg-gray-100 w-[1500px]"
>
<button
  className="w-8 h-8  bg-gray-100 rounded-lg hover:bg-red-200"
  onClick={() => {
    document.getElementById("imageframe").classList.toggle("hidden");
  }}
>
  <SquareX className="w-7 h-7 text-red-500"></SquareX>
</button> */}
{/* <Audio
  folder={''}
/> */}
{/* <button
  className="w-8 h-8  bg-gray-100 rounded-lg hover:bg-red-200"
  onClick={() => {
    const src = document
      .getElementById("image")
      .src.split("a/")[1]
      .split(/[_\.]/);
    console.log(
      "/wbw/" +
        src[0].padStart(3, "0") +
        "/" +
        reciter +
        "/" +
        src[0].padStart(3, "0") +
        src[1].padStart(3, "0") +
        ".mp3"
    );
    document.getElementById(position + id + "Audio").src =
      "/wbw/" +
      src[0].padStart(3, "0") +
      "/" +
      reciter +
      "/" +
      src[0].padStart(3, "0") +
      src[1].padStart(3, "0") +
      ".mp3";
    document.getElementById(position + id + "Audio").play();
    document.getElementById(position + id + "Audio").classList =
      "hidden";
  }}
>
  <CirclePlay className="w-7 h-7 text-red-500" />
</button>
<img id="image" className="bg-white" src="" />

<div
  id="ayahShow"
  className=" bg-green-100 p-4 rounded shadow-md"
></div>
</div> */}
{/* refference table container */}
{/* <table className="text-2xl table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  ক্রমিক{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  রেফারেন্স{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500"> সুরা </th>
                <th className="border-2 font-bangla border-gray-500"> আয়াত </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  স্থান{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500"> শব্দ </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  শব্দ অডিও{" "}
                </th>
                <th className="border-2 font-bangla border-gray-500">
                  {" "}
                  আয়াত অডিও{" "}
                </th>
              </tr>
            </thead>
            <tbody key={`${position}${id}tbody`}>
              {refData.map((item, index) => (
                <tr key={`${position}${id}${index}trow`}>
                  <td className="border-2 border-gray-500">{index + 1}</td>

                  <td className="border-2 border-gray-500"> */}
                    {/* ayah ref */}
                  //   <button
                  //     onClick={async () => {
                  //       const refAyah = await receiveDataFromDjango(
                  //         rootAddress +
                  //           "quran-words/filter_by_sura?sura=" +
                  //           item.sura +
                  //           "&aya=" +
                  //           item.aya
                  //       );
                  //       const src =
                  //         "/aba/" + item.sura + "_" + item.aya + ".png";
                  //       console.log(src);
                  //       document.getElementById("image").src = src;
                  //       document
                  //         .getElementById("imageframe")
                  //         .classList.toggle("hidden");

                  //       const ayah = refAyah
                  //         .map((item1) => item1.text)
                  //         .join(" ");
                  //       console.log(ayah);
                  //       document.getElementById("ayahShow").innerText = ayah;
                  //     }}
                  //   >
                  //     <BookOpenText className="w-7 h-7 text-green-800" />
                  //   </button>
                  // </td>
                  // <td className="border-2 border-gray-500">{item.sura}</td>
                  // <td className="border-2 border-gray-500">{item.aya}</td>
                  // <td className="border-2 border-gray-500">{item.position}</td>
                  // <td className="border-2 border-gray-500">{item.text}</td>
                  // <td className="border-2 border-gray-500 ">
                  //   {/* every word audio */}
                  //   <button
                  //     onClick={async () => {
                  //       try {
                  //         const src =
                  //           "/wbw" + item.audio.substring(0, 4) + item.audio;
                  //         console.log(src);
                  //         document.getElementById(position + id + "Audio").src =
                  //           src;
                  //         document
                  //           .getElementById(position + id + "Audio")
                  //           .play();
                  //         document.getElementById(
                  //           position + id + "Audio"
                  //         ).classList = "hidden";
                  //       } catch (error) {
                  //         console.error("❌ Error fetching data:", error);
                  //       }
                  //     }}
                  //   >
                  //     <CirclePlay className="w-7 h-7 text-green-500" />
                  //   </button>
                  // </td>
                  // <td className="border-2 border-gray-500">
                  //   {/* ayah ref audio */}
          //           <button
          //             onClick={async () => {
          //               try {
          //                 const src =
          //                   "/wbw" +
          //                   item.audio.substring(0, 4) +
          //                   "/" +
          //                   reciter +
          //                   "" +
          //                   item.audio.substring(0, 4) +
          //                   item.audio.substring(5, 8) +
          //                   ".mp3";
          //                 console.log(src);
          //                 document.getElementById(position + id + "Audio").src =
          //                   src;
          //                 document
          //                   .getElementById(position + id + "Audio")
          //                   .play();
          //                 document.getElementById(
          //                   position + id + "Audio"
          //                 ).classList = "hidden";
          //               } catch (error) {
          //                 console.error("❌ Error fetching data:", error);
          //               }
          //             }}
          //           >
          //             <CirclePlay className="w-7 h-7 text-red-500" />
          //           </button>
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </table>
