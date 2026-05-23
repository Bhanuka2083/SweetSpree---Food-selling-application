import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This state will track which image is currently displayed in the large banner
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/products/' + id + '/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details.');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        // Set the initial main banner image to be the primary cover image
        if (data.image) {
          setActiveImage(data.image);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Fixed syntax: Appended closing tags and stripped stray string syntax
  if (loading) {
    return <div style={{ padding: '20px' }}>Loading product details...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  }

  if (!product) {
    return <div style={{ padding: '20px' }}>No product found.</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      {/* Fixed syntax: Properly structured style object attribute */}
      <Link 
        to="/" 
        style={{ color: '#007bff', display: 'inline-block', textDecoration: 'none', marginBottom: '20px' }}
      >
        ← Back to Menu
      </Link>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          
          {activeImage ? (
            <img 
              src={activeImage} 
              alt={product.name} 
              style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px', border: '1px solid #ddd' }} 
            />
          ) : (
            <div style={{ width: '100%', height: '350px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
              No Image Available
            </div>
          )}

          <div>
            <h4>Product Gallery:</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              
              {product.image && (
                <img 
                  src={product.image} 
                  alt="Main cover" 
                  onClick={() => setActiveImage(product.image)}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    border: activeImage === product.image ? '2px solid #007bff' : '1px solid #ccc' 
                  }} 
                />
              )}

              {product.images && product.images.map(imgObj => (
                <img 
                  key={imgObj.id} 
                  src={imgObj.image} 
                  alt={imgObj.alt_text || product.name} 
                  onClick={() => setActiveImage(imgObj.image)}
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    objectFit: 'cover', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    border: activeImage === imgObj.image ? '2px solid #007bff' : '1px solid #ccc'
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ margin: '0 0 10px 0' }}>{product.name}</h1>
          <h2 style={{ color: '#e44d26', margin: '0 0 20px 0' }}>
            ${parseFloat(product.price).toFixed(2)}
          </h2>
          
          <h3>Description:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {product.description || "No description provided for this delicious item."}
          </p>

          <button style={{ padding: '12px 24px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
