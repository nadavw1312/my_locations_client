import { useState, useEffect } from "react";
import axios from "axios";

export const useCurrentLocation = () => {
  const [isInitilaized, setIsInitilaized] = useState(false);
  const [currPosition, setCurrPosition] = useState({
    lat: 47.21725,
    lng: -1.55336,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrPosition({ lat: coords.latitude, lng: coords.longitude });
        setIsInitilaized(true);
      },
      (blocked) => {
        if (blocked) {
          const fetch = async () => {
            try {
              const { data } = await axios.get("https://ipapi.co/json");
              setCurrPosition({ lat: data.latitude, lng: data.longitude });
              setIsInitilaized(true);
            } catch (err) {
              console.error(err);
            }
          };
          fetch();
        }
      }
    );
  }, []);
  return { currPosition, isInitilaized };
};
