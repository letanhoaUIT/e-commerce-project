import Axios from "../../../constants/Axios";
import { useForm, useFieldArray } from "react-hook-form";
import React, { useState, useEffect } from "react";

const CreateProduct = () => {
  const { register, handleSubmit, setValue, control, getValues } = useForm();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category_id);

    data.variants.forEach((variant, variantIndex) => {
      formData.append(`variants[${variantIndex}][name]`, variant.name);

      variant.sizes.forEach((size, sizeIndex) => {
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][name]`,
          size.name
        );
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][stock_quantity]`,
          size.stock_quantity
        );
        formData.append(
          `variants[${variantIndex}][sizes][${sizeIndex}][price]`,
          size.price
        );
      });

      if (variant.images && variant.images.length > 0) {
        Array.from(variant.images).forEach((image, index) => {
          formData.append(`variants[${variantIndex}][images][${index}]`, image);
        });
      }
    });

    try {
      const response = await Axios.post("/create-new-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Product created successfully!");
      // Reset form data and variants
      setValue("name", "");
      setValue("description", "");
      setValue("price", "");
      setValue("category_id", "");
      setValue("variants", []);

      // Reset variant fields
      variantFields.forEach((_, index) => {
        removeVariant(index);
      });
    } catch (error) {
      setMessage("Failed to create product.");
      console.error("Failed to create product:", error);
    }
  };

  const handleAddSize = (variantIndex) => {
    const updatedVariants = [...getValues().variants];
    updatedVariants[variantIndex].sizes.push({});
    setValue("variants", updatedVariants);
  };

  const handleRemoveSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...variantFields];
    updatedVariants[variantIndex].sizes = updatedVariants[
      variantIndex
    ].sizes.filter((_, index) => index !== sizeIndex);
    setValue("variants", updatedVariants);
  };

  const handleFileChange = (event, variantIndex) => {
    const files = Array.from(event.target.files);
    const updatedVariants = [...variantFields];
    const currentImages = updatedVariants[variantIndex].images || [];
    updatedVariants[variantIndex].images = [...currentImages, ...files];
    setValue("variants", updatedVariants);
  };

  const handleRemoveImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variantFields];
    const newImages = Array.from(updatedVariants[variantIndex].images);
    newImages.splice(imageIndex, 1);
    updatedVariants[variantIndex].images = newImages;
    setValue("variants", updatedVariants);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/all-categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-6 container mx-auto w-2/3 p-6 max-w-md bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl text-blue-500 font-bold mb-6 text-left">
        Create New Product
      </h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.includes("Failed")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-2/3 mx-auto">
          <div>
            <label className="block text-lg font-medium mb-2">
              Product Name
            </label>
            <input
              {...register("name")}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Price</label>
            <input
              type="number"
              {...register("price")}
              className="border border-gray-300 p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Category ID
            </label>
            <select
              {...register("category_id")}
              className="border border-gray-300 p-2 w-full rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-4 text-left">
            Variants
          </h2>
          {variantFields.map((variant, variantIndex) => (
            <div
              key={variant.id}
              className="mb-6 bg-black-200 w-2/3 mx-auto shadow-lg border border-gray-300 p-4 rounded-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Variant {variantIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Variant Name
                </label>
                <input
                  {...register(`variants[${variantIndex}].name`)}
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Sizes</h4>
                {variant.sizes &&
                  variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="mb-4 border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-md font-semibold">
                          Size {sizeIndex + 1}
                        </h5>
                        {variant.sizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveSize(variantIndex, sizeIndex)
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Size Name
                        </label>
                        <input
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].name`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Stock Quantity
                        </label>
                        <input
                          type="number"
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].stock_quantity`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-md font-medium mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          {...register(
                            `variants[${variantIndex}].sizes[${sizeIndex}].price`
                          )}
                          className="border border-gray-300 p-2 w-full rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => handleAddSize(variantIndex)}
                  className="text-blue-500"
                >
                  Add Size
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Images</label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, variantIndex)}
                  multiple
                  className="border border-gray-300 p-2 w-full rounded-md"
                />
                <div className="mt-4">
                  {Array.from(variant.images || []).map((image, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md mr-2"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(variantIndex, index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendVariant({ sizes: [{}], images: [] })}
            className="text-blue-500"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
