import Audio from "./Audio";
import { fileLocation } from "../data";
export default function AyahWord({
  data,
  suraAudio = true,
  ayaAudio = true,
  word,
}) {
  let selectedColor = localStorage.getItem("arabic-app-color");
  const reciter = localStorage
    .getItem("arabic-app-reciter")
    .split(",")[1]
    .split(":")[1]
    .slice(1, -2);
  console.log(data);
  const data1 = data.filter((i) => i.audio);
  return (
    <div className={`${selectedColor.textColor} `}>
      {data[0] && (
        <p className="text-xs md:text-2xl ">
          <strong>
            {" "}
            {suraAudio && (
              <span>আয়াত সংখ্যা : {data[data.length - 1].aya}</span>
            )}{" "}
            &nbsp; &nbsp; শব্দ সংখ্যা : &nbsp;
            {Number(data1.length)}
          </strong>
        </p>
      )}
      {data[0] && suraAudio && (
        <Audio
          title="Surah Audio"
          folder={`${fileLocation}audios/sura/${String(data[0].sura).padStart(
            3,
            "0"
          )}/${reciter}/`}
          fileName={String(data[0].sura).padStart(3, "0") + ".mp3"}
        >
          {/* <strong className="text-3xl">সুরাহ অডিও</strong> */}
        </Audio>
      )}

      <div
        className={`text-xl md:text-4xl ${selectedColor.textColor}`}
        dir="rtl"
      >
        {suraAudio && (
          <>
            <br />
            <hr />
            <hr />
            <hr />
            <br />
          </>
        )}
        {data[0] &&
          data.map((i) => (
            <>
              {/* যদি শব্দ থাকে  */}
              {i.text ? (
                <Audio
                  title={i.translation}
                  folder={`${fileLocation}audios/sura`}
                  fileName={
                    i.audio != null ? i.audio.substring(0, 4) + i.audio : ""
                  }
                >
                  {/* যদি শব্দ ম্যাচিং হয় বোল্ড হবে */}
                  {i.audio ? (
                    i.text === word ? (
                      <strong>
                        <span className="m-1 md:py-2 md:m-2 leading-relaxed font-akber hover:text-green-900">
                          {i.text + " "}
                        </span>
                      </strong>
                    ) : (
                      <span className="m-1 md:py-2 md:m-2 leading-relaxed font-akber hover:text-green-900">
                        {i.text + " "}
                      </span>
                    )
                  ) : (
                    " "
                  )}
                </Audio>
              ) : ayaAudio ? (
                <Audio
                  title={`${i.aya}-Ayah Audio`}
                  folder={
                    fileLocation +
                    "audios/sura/" +
                    String(i.sura).padStart(3, "0") +
                    "/" +
                    reciter +
                    "/"
                  }
                  fileName={
                    String(i.sura).padStart(3, "0") +
                    String(i.aya).padStart(3, "0") +
                    ".mp3"
                  }
                />
              ) : (
                <>۞
                <br/>
                <span className="font-bangla text-sm">
                {i.translation_bn}
                </span>
                </>
              )}{" "}
              {/* যদি আয়াত শেষে অডিও শুনতে চায় তাহলে অডিও বাটন আর না হয় ৮কোনা*/}
            </>
          ))}
      </div>
      {/* <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre> */}
    </div>
  );
}
