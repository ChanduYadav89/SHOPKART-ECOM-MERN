import React from "react";
import { Link } from "react-router-dom";
import "../Styles/product.css";

const ProductCard = ({ product }) => {
  const getImageSrc = (p) => {
    if (!p) return 'https://via.placeholder.com/800x600?text=No+Image';
    const src = p.imageUrl || p.image || p.image_url || (p.images && p.images.length ? (p.images[0].url || p.images[0]) : null);
    if (!src) return 'https://via.placeholder.com/800x600?text=No+Image';
    try { return encodeURI(src); } catch { return src; }
  };
  const imageSrc = getImageSrc(product);

  return (
    <div className="product-card">
      <img
        src={imageSrc}
        alt={product?.name || 'product'}
        className="product-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
        }}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
