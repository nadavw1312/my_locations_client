import classNames from "classnames";
import { ICategory } from "../models/Category";
import { IFavoriteLocation } from "../models/FavoriteLocation";
import { useState } from "react";

interface LocationsListProps {
  locations: IFavoriteLocation[];
  categories: ICategory[];
  handleLocationClicked: (favoriteLocation: IFavoriteLocation) => void;
}

const LocationsList = ({ locations, categories, handleLocationClicked }: LocationsListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const handleCategorySelected = (category: ICategory) => {
    setSelectedCategory(category);
  };

  const filtredLocations = selectedCategory
    ? locations.filter((l) => l.category_id === selectedCategory.id)
    : locations;

  return (
    <div className=" overflow-auto">
      <div>
        <div className="flex flex-wrap gap-2">
          <div>Categories:</div>
          <div className="flex flex-wrap gap-2  items-center justify-center">
            {categories.map((c) => (
              <div
                className={classNames(
                  "h-5 bottom-2 bg-slate-300 rounded-sm p-2  flex items-center justify-center cursor-pointer",
                  c.id === selectedCategory?.id && "bg-slate-400"
                )}
                onClick={() => handleCategorySelected(c)}
                key={c.id}
              >
                {c?.title}
              </div>
            ))}
          </div>
          <button onClick={() => setSelectedCategory(null)} className=" bg-blue-300 rounded-md p-1">
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {filtredLocations.map((favoriteLocation) => (
          <div
            key={favoriteLocation.id}
            className="flex flex-col cursor-pointer border-b-2"
            onClick={() => handleLocationClicked(favoriteLocation)}
          >
            <div>{favoriteLocation.title}</div>
            <div>{favoriteLocation.location.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LocationsList;
