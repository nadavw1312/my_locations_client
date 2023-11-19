import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ICategory } from "../models/Category";
import classNames from "classnames";
import categoriesService from "../services/categoriesService";

interface UserCategoriesProps {
  categories: ICategory[];
  onCategorySelected: (category: ICategory) => void;
  onCategoryAdded: () => Promise<any>;
  selectedCategoryId?: number;
}

const UserCategories = ({ categories, onCategorySelected, onCategoryAdded, selectedCategoryId }: UserCategoriesProps) => {
  const { user }: { user: any } = useAuth();
  const [newCategory, setNewCategory] = useState("");

  const addCategory = async () => {
    if (!categories.find((c) => c.title === newCategory)) {
      await categoriesService.create({
        title: newCategory,
        owner_id: user?.id,
      });
      await onCategoryAdded();
    } else {
      alert("category is taken");
    }
  };

  const handleCategorySelected = (category: ICategory) => {
    onCategorySelected(category);
  };

  return (
    <div>
      <div>
        <label htmlFor="category" className="block text-gray-600">
          Category
        </label>
        <div className="flex gap-1 justify-center items-center">
          <input
            type="text"
            id="category"
            name="category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full border rounded py-1 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Enter category"
            required
          />
          <button className=" bg-gray-700 text-white p-2 rounded-sm mt-2" onClick={addCategory}>
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div>Categories:</div>
        <div className="flex flex-wrap gap-2  items-center justify-center">
          {categories.map((c) => (
            <div
              className={classNames(
                "h-5 bottom-2 bg-slate-300 rounded-sm p-2  flex items-center justify-center cursor-pointer",
                c.id === selectedCategoryId && "bg-slate-400"
              )}
              onClick={() => handleCategorySelected(c)}
              key={c.id}
            >
              {c?.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserCategories;
