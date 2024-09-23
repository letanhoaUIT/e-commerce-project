import React, { useState, useEffect } from "react";
import Axios from "../../../constants/Axios";
import TreeView from "../../sharepages/TreeView";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await Axios.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleEdit = async (categoryId, newName) => {
    try {
      await Axios.put(`/categories/${categoryId}`, { name: newName });
      
      setCategories((prevCategories) =>
        updateCategoryName(prevCategories, categoryId, newName)
      );
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  const updateCategoryName = (categories, categoryId, newName) => {
    return categories.map((category) => {
      if (category.id === categoryId) {
        return { ...category, name: newName };
      }
  
      if (category.children) {
        return {
          ...category,
          children: updateCategoryName(category.children, categoryId, newName),
        };
      }
  
      return category;
    });
  };

  const handleDelete = async (categoryId) => {
    try {
      await Axios.delete(`/categories/${categoryId}`);
      setCategories((prevCategories) =>
        removeCategoryById(prevCategories, categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleAddChild = async (parentId, childName) => {
    try {
      const response = await Axios.post('/categories', {
        name: childName,
        parent_id: parentId
      });
      const newCategory = response.data;
  
      setCategories((prevCategories) =>
        addChildCategory(prevCategories, parentId, newCategory)
      );
    } catch (error) {
      console.error("Failed to add child category", error);
    }
  };

  const addChildCategory = (categories, parentId, newCategory) => {
    return categories.map((category) => {
      if (category.id === parentId) {
        return {
          ...category,
          children: [...(category.children || []), newCategory],
        };
      }
  
      if (category.children) {
        return {
          ...category,
          children: addChildCategory(category.children, parentId, newCategory),
        };
      }
  
      return category;
    });
  };

  const removeCategoryById = (categories, categoryId) => {
    return categories
      .filter((category) => category.id !== categoryId)
      .map((category) => ({
        ...category,
        children: removeCategoryById(category.children || [], categoryId),
      }));
  };

  const handleSubmit = async (e) => {
    try {
      const response = await Axios.post("/categories", { name: name });
      console.log("Created category:", response.data);
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setName("");
    } catch (error) {
      console.error("Failed to create category", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Category Tree</h1>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white p-2"
        >
          Create
        </button>
      </div>
      <TreeView
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddChild={handleAddChild}
      />
    </div>
  );
};

export default CategoryManager;
