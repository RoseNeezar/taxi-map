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
    <div className=" flex flex-row absolute top-10 left-0 z-20   w-full  justify-center">
      <div className=" flex flex-row  w-96 bg-gray-500 p-3 rounded-xl">
        <input
          type="range"
          min="1"
          max="10"
          defaultValue="1"
          onChange={(e) => setSlider(Number(e.target.value))}
          className="w-full h-10 mr-10 transition-all cursor-pointer outline-none opacity-70 hover:opacity-100 rounded-lg overflow-hidden appearance-none bg-gray-400"
        />
        <p className="self-center text-white text-xl whitespace-nowrap">
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
        className="mr-10 p-3 text-white bg-gray-500 rounded-md"
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
