import { useEffect, useState } from "react";
import Map from "./Map";
import FavoriteLocationForm from "../FavoriteLocationForm";
import { ILocation } from "../../types/types";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import axiosInstance from "../../services/axios";
import { useAuth } from "../../hooks/useAuth";
import LocationsList from "../LocationsList";
import { ICategory } from "../../models/Category";
import { IFavoriteLocation } from "../../models/FavoriteLocation";
import favoriteLocationsService from "../../services/favoriteLocationsService";
import categoriesService from "../../services/categoriesService";

const MapContainer = () => {
  const { user }: { user: any } = useAuth();
  const [showMobileEditor, setShowMobileEditor] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [userLocations, setUserLocations] = useState([]);
  const [favortieLocation, setFavoriteLocation] = useState<Partial<IFavoriteLocation>>({
    title: "",
    owner_id: user?.id,
    location: { position: { lat: 0, lng: 0 }, name: "" },
  });

  useEffect(() => {
    initLocations();
    initCategories();
  }, []);

  const initLocations = async () => {
    const response = await favoriteLocationsService.getUserLocations(user?.id);
    setUserLocations(response.data);
  };

  const initCategories = async () => {
    const response = await categoriesService.getByUserId(user?.id);
    setCategories(response.data);
  };

  const handlePositionChange = async (p: [number, number] | null) => {
    if (p) {
      const position: ILocation["position"] = {
        lat: p[0],
        lng: p[1],
      };

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${p[0]}&lon=${p[1]}`
      );
      const name = response.data.display_name;
      setFavoriteLocation({
        title: "",
        id: undefined,
        category_id: undefined,
        owner_id: user.id,
        location: {
          position,
          name,
        },
      });
    }
  };

  const handleLocationAdded = async () => {
    const response = await axiosInstance.get(`favorite_locations/get_user_locations/${user?.id}`);
    setUserLocations(response.data);
  };

  const handleLocationClicked = async (selectedLocation: IFavoriteLocation) => {
    setFavoriteLocation({
      ...selectedLocation,
    });
  };

  const handleEditorVisibality = () => {
    setShowMobileEditor(!showMobileEditor);
  };

  return (
    <div className="relative h-full w-full">
      <div className="visible md:hidden z-40 flex justify-center border-t-2" onClick={handleEditorVisibality}>
        {showMobileEditor ? "close editor" : "open editor"}
      </div>
      <div
        className={`flex flex-col h-full absolute right-0 z-10 bg-white text-black bg-opacity-70 p-8 rounded shadow-md max-w-md  md:visible ${
          showMobileEditor ? "visible" : "invisible"
        } `}
      >
        <FavoriteLocationForm
          categories={categories}
          onCategoryAdded={initCategories}
          savedFavoriteLocation={favortieLocation}
          handleLocationAdded={handleLocationAdded}
        />
        <LocationsList
          locations={userLocations}
          categories={categories}
          handleLocationClicked={handleLocationClicked}
        />
      </div>
      <div className="relative h-full w-full z-[2]">
        <Map
          userLocations={userLocations}
          handlePositionChange={handlePositionChange}
          location={favortieLocation.location}
        />
      </div>
    </div>
  );
};
export default MapContainer;
