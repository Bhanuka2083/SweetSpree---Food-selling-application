import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Welcome to SweetSpree 🍰</h1>
        <h3>Our Delicious Menu:</h3>
        
        {loading ? (
            <p>Loading sweets...</p>
        ) : (
            <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: 0, listStyle: 'none', gap: '20px'}}>
            {products.map(product => (
                <li key={product.id} style={{ margin: '20px 0', fontSize: '18px', listStyle: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                    {product.image && (
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            style={{ width: '150px', height: '150px', objectFit: 'cover', display: 'flex', marginBottom: '10px', maxWidth: '100%', height: 'auto' }} 
                        />
                    )}
                    <strong>{product.name}</strong>  ${parseFloat(product.price).toFixed(2)}
                    <a href={`/product/${product.id}`} className="view-details-btn">
                        View Details
                    </a>
                </li>
            ))}
            </ul>
        )}
        </div>
  );
}

export default Home;