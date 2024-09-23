import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFieldArray, set, get } from "react-hook-form";
import Axios from "../../../constants/Axios";

const UpdateProduct = () => {
  const { productId } = useParams();
  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  let loaded = false;

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
    const newImages = updatedVariants[variantIndex].new_images || [];
    updatedVariants[variantIndex].new_images = [...newImages, ...files];
    setValue("variants", updatedVariants);
  };

  const handleRemoveImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variantFields];
    const newImages = Array.from(updatedVariants[variantIndex].images);
    const image_id = newImages[imageIndex].id;
    newImages.splice(imageIndex, 1);
    const deleteImagesId = updatedVariants[variantIndex].delete_images_id || [];
    if (!Array.isArray(deleteImagesId)) {
      console.error("delete_images_id is not an array:", deleteImagesId);
    }
    updatedVariants[variantIndex].images = newImages;
    updatedVariants[variantIndex].delete_images_id = [...deleteImagesId, image_id];
    setValue("variants", updatedVariants);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!loaded) {
          const response = await Axios.get(`/get-product/${productId}`);
          const productData = response.data;

          setValue("name", productData.name);
          setValue("description", productData.description);
          setValue("price", productData.price);
          setValue("category_id", productData.category_id);

          if (productData.variants) {
            productData.variants.forEach((variant, variantIndex) => {
              appendVariant(variant);
              setValue(`variants[${variantIndex}].variant_id`, variant.id);
              variant.sizes.forEach((size, sizeIndex) => {
                setValue(
                  `variants[${variantIndex}].sizes[${sizeIndex}].name`,
                  size.name
                );
                setValue(
                  `variants[${variantIndex}].sizes[${sizeIndex}].stock_quantity`,
                  size.pivot.stock_quantity
                );
                setValue(
                  `variants[${variantIndex}].sizes[${sizeIndex}].price`,
                  size.pivot.price
                );
              });
            });
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await Axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
    fetchProductData();
    return () => {
      loaded = true;
    };
  }, [productId, appendVariant, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category_id", data.category_id);

    data.variants.forEach((variant, variantIndex) => {
      if (variant.variant_id) {
        formData.append(`variants[${variantIndex}][id]`, variant.variant_id);
      }
      // formData.append(`variants[${variantIndex}][id]`, variant.id);
      formData.append(`variants[${variantIndex}][name]`, variant.name);

      variant.sizes.forEach((size, sizeIndex) => {
        if (size.id) {
          formData.append(
            `variants[${variantIndex}][sizes][${sizeIndex}][id]`,
            size.id
          );
        }
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

      if (variant.new_images && variant.new_images.length > 0) {
        for (let i = 0; i < variant.new_images.length; i++) {
          formData.append(
            `variants[${variantIndex}][new_images][${i}]`,
            variant.new_images[i]
          );
        }
      }

      if (variant.delete_images_id && variant.delete_images_id.length > 0) {
        for (let i = 0; i < variant.delete_images_id.length; i++) {
          formData.append(
            `variants[${variantIndex}][delete_images_id][${i}]`,
            variant.delete_images_id[i]
          );
        }
      }
    });

    try {
      const response = await Axios.post(
        `/update-product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Product updated successfully");
    } catch (error) {
      setMessage("Failed to update product");
      console.error("Failed to update product:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-6 container mx-auto w-2/3 p-6 max-w-md bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl text-blue-500 font-bold mb-6 text-left">
        Edit Product
      </h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${message.includes("Failed")
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
                  className="border p-2 w-full"
                />
                {Array.from(variant.images || []).map((image, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <img
                      src={image instanceof File ? URL.createObjectURL(image) : image.url}
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

              <button
                type="button"
                onClick={() => removeVariant(variantIndex)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Remove Variant
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendVariant({ sizes: [{}], images: [] })}
            className="bg-green-500 text-white px-2 py-1"
          >
            Add Variant
          </button>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
