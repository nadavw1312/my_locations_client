import { useEffect, useState } from "react";

import UserCategories from "./UserCategories";
import { ICategory } from "../models/Category";
import axiosInstance from "../services/axios";
import { IFavoriteLocation } from "../models/FavoriteLocation";
import favoriteLocationsService from "../services/favoriteLocationsService";

interface FavoriteLocationFormProps {
  savedFavoriteLocation: Partial<IFavoriteLocation>;
  handleLocationAdded: () => Promise<any>;
  onCategoryAdded: () => Promise<any>;
  categories: ICategory[];
}

const FavoriteLocationForm = ({ savedFavoriteLocation, handleLocationAdded, onCategoryAdded, categories }: FavoriteLocationFormProps) => {
  const [favoriteLocation, setFavoriteLocation] = useState({
    ...savedFavoriteLocation,
  });

  useEffect(() => {
    setFavoriteLocation({ ...savedFavoriteLocation });
  }, [savedFavoriteLocation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFavoriteLocation({
      ...favoriteLocation,
      [name]: value,
    });
  };

  const add = async (e) => {
    e.preventDefault();
    await favoriteLocationsService.create(favoriteLocation);
    await handleLocationAdded();
  };

  const update = async (e) => {
    e.preventDefault();
    await favoriteLocationsService.update({ item: favoriteLocation });
    await handleLocationAdded();
  };

  const onCategorySelected = (category: ICategory) => {
    setFavoriteLocation({
      ...favoriteLocation,
      category_id: category.id,
    });
  };

  return (
    <div className="">
      <UserCategories
        selectedCategoryId={favoriteLocation.category_id}
        onCategorySelected={onCategorySelected}
        categories={categories}
        onCategoryAdded={onCategoryAdded}
      />
      <form>
        <div className="mb-4"></div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={favoriteLocation.title}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-600">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            readOnly
            value={favoriteLocation.location?.name}
            className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter location"
            required
          />
        </div>
        {!favoriteLocation.id ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={add}
          >
            Add
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={update}
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default FavoriteLocationForm;
