import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../constants/Axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../sharepages/Loading";
import { useAuth } from '../../contexts/AuthContext.jsx';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/products/${id}/variants`);
        const product = response.data;
        setProductData(product);

        if (product.variants.length > 0) {
          setSelectedVariant(product.variants[0]);
          if (product.variants[0].sizes.length > 0) {
            setSelectedSize(product.variants[0].sizes[0]);
          }
        }

        // Fetch comments for the product
        const commentsResponse = await Axios.get(`/products/${id}/comments`);
        setComments(commentsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await Axios.post(`/products/${id}/comments`, {
        user_id: user.id,
        comment: comment,
      });
      setComments([...comments, response.data]);
      setComment('');
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  const handleFacebookShare = () => {
    const url = window.location.href; // URL hiện tại của trang sản phẩm
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, '_blank');
  };

  if (loading) {
    return <Loading />;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    if (!selectedVariant || !selectedSize) {
      toast.error("Please select a size and color");
      return;
    }

    try {
      const response = await Axios.post("/add-to-cart", {
        product_variant_id: selectedVariant.id,
        size_id: selectedSize.id,
        quantity: 1,
      });
      if (response.status === 201 || response.status === 202) {
        toast.success("Added to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="product-detail p-4 mx-auto max-w-screen-lg flex">
      {/* Left Side: Image and Toast */}
      <div className="w-2/3">
        {selectedVariant && selectedVariant.images.length > 0 && (
          <Slider {...settings}>
            {selectedVariant.images.map((image, index) => (
              <div key={index} className="p-2">
                <img
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </Slider>
        )}
        <ToastContainer />
      </div>

      {/* Right Side: Product Details and Add to Cart */}
      <div className="w-1/3">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <div className="text-2xl font-bold text-red-600">
            ${productData.price.toFixed(2)}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">COLOR</h3>
          <div className="flex flex-wrap">
            {productData.variants.map((variant, index) => (
              <button
                key={index}
                className={`border-2 p-2 m-1 ${selectedVariant === variant ? "border-black" : "border-gray-300"}`}
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold">SELECT A SIZE</h3>
          <div className="flex flex-wrap">
            {selectedVariant && selectedVariant.sizes.map((size, index) => (
              <button
                key={index}
                className={`border p-2 m-1 ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
                onClick={() => handleSizeClick(size)}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-black text-white py-2 px-4 font-bold"
            onClick={addToCart}
          >
            ADD TO CART
          </button>
        </div>

        {/* Facebook Share Button */}
        <div className="text-center mt-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 font-bold"
            onClick={handleFacebookShare}
          >
            Share on Facebook
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Leave a Comment</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment here..."
          />
          <button
            className="bg-black text-white py-2 px-4 mt-2 font-bold w-full"
            onClick={handleCommentSubmit}
          >
            Submit Comment
          </button>
        </div>

        {/* Display Comments */}
        <div className="mt-8">
          <h3 className="text-lg font-bold">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-t pt-2 mt-2">
                <strong>{comment.user.name}</strong>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
