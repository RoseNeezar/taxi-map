import React, { ChangeEvent, FC } from "react";

interface IMapActionsBanner {
  switchOfficeUK: () => void;
  switchOfficeSG: () => void;
  switcNearestLocation: () => void;
  slider: number;
  setSlider: React.Dispatch<React.SetStateAction<number>>;
}

const MapActionsBanner: FC<IMapActionsBanner> = ({
  setSlider,
  slider,
  switcNearestLocation,
  switchOfficeSG,
  switchOfficeUK,
}) => {
  return (
    <div className="absolute left-0 z-20 flex flex-row justify-center w-full  top-10">
      <div className="flex flex-row p-3 bg-gray-500  w-96 rounded-xl">
        <input
          type="range"
          min="1"
          max="15"
          defaultValue="1"
          onChange={(e) => setSlider(Number(e.target.value))}
          className="w-full h-10 mr-10 overflow-hidden transition-all bg-gray-400 rounded-lg outline-none appearance-none cursor-pointer opacity-70 hover:opacity-100"
        />
        <p className="self-center text-xl text-white whitespace-nowrap">
          {slider} taxi
        </p>
      </div>

      <button
        onClick={() => switchOfficeUK()}
        className="p-3 mx-10 text-white bg-gray-500 rounded-md"
      >
        London office
      </button>
      <button
        onClick={() => switchOfficeSG()}
        className="p-3 mr-10 text-white bg-gray-500 rounded-md"
      >
        SG office
      </button>
      <button
        onClick={() => switcNearestLocation()}
        className="p-3 text-white bg-gray-500 rounded-md"
      >
        nearest Location
      </button>
    </div>
  );
};

export default MapActionsBanner;
