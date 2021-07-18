import axios from "axios";
import React, { useEffect } from "react";

const MapPage = () => {
  const callHelo = async () => {
    const body = {
      latitude: 51.5049375,
      longitude: -0.0964509,
      count: 3,
    };
    const result = await axios.get("/api/drivers", {
      params: {
        ...body,
      },
    });
    return result.data;
  };
  useEffect(() => {
    callHelo();
  }, []);
  return <div className="bg-red-300 h-screen">map</div>;
};

export default MapPage;
