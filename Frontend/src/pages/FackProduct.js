import React, { useEffect, useState } from 'react';
import './MobileCard.css'; // Optional styling

// Placeholder component to display while loading
const MobileCardPlaceholder = () => {
  return (
    <div className="card placeholder">
      <div className="card-image-placeholder"></div> {/* Placeholder for image */}
      <div className="card-body">
        <div className="placeholder-line title"></div> {/* Placeholder for title */}
        <div className="placeholder-line"></div> {/* Placeholder for text */}
        <div className="placeholder-line"></div> {/* Placeholder for text */}
        <div className="placeholder-line"></div> {/* Placeholder for text */}
      </div>
    </div>
  );
};

// MobileCard component to display individual card
const MobileCard = ({ mobile }) => {
  return (
    <a href={`/login/mobile/${mobile._id}`} className="card">
      <img src={mobile.image} alt={`${mobile.name}`} className="card-image" />
      <div className="card-body">
        <h3>{mobile.name}</h3>
        <p><strong>Brand:</strong> {mobile.brand}</p>
        <p><strong>Model:</strong> {mobile.model}</p>
        <p><strong>Price:</strong> ${mobile.price}</p>
        <p><strong>Release Date:</strong> {new Date(mobile.releaseDate).toLocaleDateString()}</p>
      </div>
    </a>
  );
};

// Main component to fetch and render list of cards
const FackMobileCardList = () => {
  const [mobiles, setMobiles] = useState([]); // State to hold mobile data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  // useEffect to fetch mobile data from backend
  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const response = await fetch(`https://backend-dun-zeta-26.vercel.app/api/mobiles`||`http://localhost:4000/api/mobiles`); // API URL
        if (!response.ok) throw new Error('Error fetching mobile data');
        const data = await response.json();
        setMobiles(data); // Update state with the fetched data
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Set error message if fetch fails
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchMobiles();
  }, []);

  if (loading) {
    // Show 4 placeholders while loading
    return (
      <div className="card-list">
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
        <MobileCardPlaceholder />
    
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>; // Show error message if any

  return (
    <div className="card-list">
      {mobiles.slice().reverse().map((mobile) => ( // Reverse the order of mobiles
        <MobileCard key={mobile._id} mobile={mobile} />
      ))}
    </div>
  );
};

export default FackMobileCardList;
