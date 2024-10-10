import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditMobileForm.css'; // Import the CSS file

const EditMobileForm = () => {
  const { id } = useParams(); // Get the mobile ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    price: '',
    releaseDate: '',
  });
  
  const navigate = useNavigate();

  // Fetch mobile data when component mounts
  useEffect(() => {
    const fetchMobileData = async () => {
      try {
        const response = await fetch(`https://backend-dun-zeta-26.vercel.app/api/mobiles/${id}`||`http://localhost:4000/api/mobiles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch mobile data');
        }
        const data = await response.json();
        setFormData({
          name: data.name,
          brand: data.brand,
          model: data.model,
          price: data.price,
          releaseDate: data.releaseDate,
        });
      } catch (error) {
        console.error('Error fetching mobile data:', error);
        alert('Failed to fetch mobile data');
      }
    };
    fetchMobileData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Define the payload with all necessary data
    const payload = {
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      price: Number(formData.price),
      releaseDate: formData.releaseDate,
      specifications: {
        display: {
          size: '6.1 inches',
          type: 'Super Retina XDR',
          resolution: '1179 x 2556 pixels',
        },
        chipset: {
          type: 'Apple A17 Pro',
          cores: 6,
        },
        memory: {
          ram: '8GB RAM',
          storage: '128GB, 256GB, 512GB, 1TB',
          expandable: false,
        },
        camera: {
          rear: {
            main: '48 MP',
            ultrawide: '12 MP',
            telephoto: '12 MP',
            other: ['LiDAR'],
          },
          front: '12 MP',
          video: '4K@60fps',
        },
        battery: {
          capacity: '3200 mAh',
          fastCharging: true,
          wirelessCharging: true,
        },
        connectivity: {
          network: ['5G', '4G', '3G', '2G'],
          wifi: 'Wi-Fi 6',
          bluetooth: 'Bluetooth 5.3',
          gps: true,
          nfc: true,
        },
        os: 'iOS 17',
        sim: 'Dual SIM (Nano-SIM, eSIM)',
      },
      features: {
        waterproof: true,
        fingerprintSensor: false,
        faceRecognition: true,
        stereoSpeakers: true,
        otherFeatures: ['Always-On Display'],
      },
      dimensions: {
        height: '147.5 mm',
        width: '71.5 mm',
        thickness: '8.25 mm',
        weight: '221 grams',
      },
      ratings: {
        averageRating: 4.9,
        numberOfReviews: 1200,
      },
    };
  
    try {
      const response = await fetch(`https://backend-dun-zeta-26.vercel.app/api/mobiles/${id}`||`http://localhost:4000/api/mobiles/${id}`, {
        method: 'PATCH', // or 'PATCH' depending on your update logic
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the full payload
      });
  
      // Check the content type of the response
      const contentType = response.headers.get("Content-Type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          // If the response is JSON (even in error), handle it
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
        } else {
          // If the response is not JSON (likely HTML error page), handle as text
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
      }
  
      const data = await response.json();
      alert('Mobile updated successfully!');
      console.log(data);
      navigate('/crud'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating mobile:', error);
      alert('Failed to update mobile: ' + error.message);
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="edit-mobile-form">
        <h1 className="form-title">Edit Mobile</h1>

        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Release Date</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button type="submit" className="form-button">Update Mobile</button>
      </form>
    </div>
  );
};

export default EditMobileForm;
