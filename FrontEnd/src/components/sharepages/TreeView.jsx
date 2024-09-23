import React from "react";

const TreeView = ({ categories, onEdit, onDelete, onAddChild }) => {
  return (
    <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
      {categories.map((category) => (
        <li key={category.id}>
          <div className="flex my-2 items-center">
            <div className="mx-2">{category.name}</div>
            <span
              className="material-symbols-outlined cursor-pointer text-green-500"
              onClick={() => {
                const childName = prompt("Enter child category name:");
                if (childName) onAddChild(category.id, childName);
              }}
            >
              add
            </span>
            <span
              className="material-symbols-outlined cursor-pointer text-blue-500"
              onClick={() => {
                const newName = prompt("Enter new name:", category.name);
                if (newName) onEdit(category.id, newName);
              }}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined cursor-pointer text-red-500"
              onClick={() => onDelete(category.id)}
            >
              delete
            </span>
          </div>
          {category.children && category.children.length > 0 && (
            <TreeView
              categories={category.children}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TreeView;
