import React from "react";

function ReciterSelector({ selectedReciter, setSelectedReciter, reciterList }) {
  const handleReciterChange = (e) => {
    const reciter = reciterList.find((r) => r.name === e.target.value);
    setSelectedReciter(reciter);
  };

  return (
    <>
      <label className="font-bangla w-16 mb-2 font-small">Reciter : </label>
      <select
        value={selectedReciter.name}
        onChange={handleReciterChange}
        className="w-24 p-2 border rounded font-bangla"
      >
        {reciterList.map((reciter) => (
          <option key={reciter.name} value={reciter.name}>
            {reciter.name}
          </option>
        ))}
      </select>
      <br />
    </>
  );
}

export default ReciterSelector;
