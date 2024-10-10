import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Badge, Table } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import {
  FiSmartphone,
  FiCpu,
  FiCamera,
  FiBatteryCharging,
  FiWifi,
  FiBluetooth,
  FiCheckCircle,
  FiCode,
} from 'react-icons/fi';
import { MdGpsFixed } from 'react-icons/md';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { SiNfc } from 'react-icons/si';
import { FaSimCard, FaMemory } from 'react-icons/fa';
import './MobileDetails.css';

const MobileDetails = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMobile = async () => {
      try {
        const response = await axios.get(`https://backend-dun-zeta-26.vercel.app/api/mobiles/${id}`||`http://localhost:4000/api/mobiles/${id}`);
        setMobile(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError('Mobile not found');
        } else {
          setError('An error occurred while fetching the mobile details');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMobile();
  }, [id]);

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    transform: loading ? 'translateY(20px)' : 'translateY(0px)',
    config: { tension: 200, friction: 20 },
  });

  if (loading) {
    return (
      <div className="mobile-details-container">
        <div className="loading-section">
          <div className="loading-placeholder image-placeholder" />
          <div className="loading-placeholder text-placeholder" />
        </div>
        <div className="loading-section">
          <div className="loading-placeholder large-placeholder" />
        </div>
        <div className="loading-section">
          <div className="loading-placeholder table-placeholder" />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <main className="container my-4">
    <animated.div style={fadeIn} className="mobile-details-container">
      <div className="mobile-header">
        <img
          src={mobile.image || '/path/to/placeholder-image.jpg'}
          alt={mobile.name}
          className="mobile-image"
        />
        <div className="mobile-info">
          <h2 className="mobile-title">
            {mobile.name} - {mobile.brand}
            <FiSmartphone className="icon" />
          </h2>
          <p><strong>Model:</strong> {mobile.model}</p>
          <p><strong>Price:</strong> ${mobile.price}</p>
          <p><strong>Release Date:</strong> {new Date(mobile.releaseDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {mobile.description}</p>
        </div>
      </div>

      <div className="spec-section">
        <h3 className="section-heading">Specifications</h3>
        <Table bordered responsive className="spec-table">
          <tbody>
            <tr>
              <th>Display</th>
              <td>
                <FiCheckCircle className="icon" /> {mobile.specifications?.display?.size} ({mobile.specifications?.display?.type}), {mobile.specifications?.display?.resolution}
              </td>
            </tr>
            <tr>
              <th>Chipset</th>
              <td>
                <FiCpu className="icon" /> {mobile.specifications?.chipset?.type}, {mobile.specifications?.chipset?.cores} cores
              </td>
            </tr>
            <tr>
              <th>Memory</th>
              <td>
                <FaMemory className="icon" /> {mobile.specifications?.memory?.ram}, {mobile.specifications?.memory?.storage} Storage {mobile.specifications?.memory?.expandable ? '(Expandable)' : '(Not Expandable)'}
              </td>
            </tr>
            <tr>
              <th>Camera</th>
              <td>
                <FiCamera className="icon" />
                <br />
                <strong>Front:</strong> {mobile.specifications?.camera?.front} <br />
                <strong>Rear:</strong> {mobile.specifications?.camera?.rear?.main} (Ultrawide: {mobile.specifications?.camera?.rear?.ultrawide || 'No'}, Telephoto: {mobile.specifications?.camera?.rear?.telephoto || 'No'}) <br />
                <strong>Video:</strong> {mobile.specifications?.camera?.video}
              </td>
            </tr>
            <tr>
              <th>Battery</th>
              <td>
                <FiBatteryCharging className="icon" /> {mobile.specifications?.battery?.capacity} <br />
                Fast Charging: {mobile.specifications?.battery?.fastCharging ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>} <br />
                Wireless Charging: {mobile.specifications?.battery?.wirelessCharging ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}
              </td>
            </tr>
            <tr>
              <th>Operating System</th>
              <td>
                <FiCode className="icon" /> {mobile.specifications?.os}
              </td>
            </tr>
            <tr>
              <th>SIM</th>
              <td>
                <FaSimCard className="icon" /> {mobile.specifications?.sim}
              </td>
            </tr>
            <tr>
              <th>Connectivity</th>
              <td>
                <FiWifi className="icon" /> WiFi: {mobile.specifications?.connectivity?.wifi}<br />
                <FiBluetooth className="icon" /> Bluetooth: {mobile.specifications?.connectivity?.bluetooth} <br />
                <MdGpsFixed className="icon" /> GPS: {mobile.specifications?.connectivity?.gps} <br />
                <SiNfc className="icon" /> NFC: {mobile.specifications?.connectivity?.nfc ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="features-section">
        <h3 className="section-heading">Features</h3>
        <Table bordered responsive>
          <tbody>
            <tr>
              <th>Waterproof</th>
              <td>{mobile.features?.waterproof ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
            </tr>
            <tr>
              <th>Fingerprint Sensor</th>
              <td>{mobile.features?.fingerprintSensor ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
            </tr>
            <tr>
              <th>Face Recognition</th>
              <td>{mobile.features?.faceRecognition ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
            </tr>
            <tr>
              <th>Stereo Speakers</th>
              <td>{mobile.features?.stereoSpeakers ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
            </tr>
            <tr>
              <th>Other Features</th>
              <td>{mobile.features?.otherFeatures && mobile.features.otherFeatures.length > 0 ? mobile.features.otherFeatures.join(', ') : 'None'}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="dimensions-section">
        <h3 className="section-heading">Dimensions & Weight</h3>
        <Table bordered responsive>
          <tbody>
            <tr>
              <th>Height</th>
              <td>{mobile.dimensions?.height}</td>
            </tr>
            <tr>
              <th>Width</th>
              <td>{mobile.dimensions?.width}</td>
            </tr>
            <tr>
              <th>Thickness</th>
              <td>{mobile.dimensions?.thickness}</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td>{mobile.dimensions?.weight}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="color-section">
        <h3 className="section-heading">Color Options</h3>
        {mobile.colorOptions?.length > 0 ? (
          mobile.colorOptions.map((color, index) => (
            <span key={index} className="color-option">
              {color}
            </span>
          ))
        ) : (
          <p>N/A</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3 className="section-heading">Reviews</h3>
        <p>
          <strong>Average Rating:</strong> {mobile.ratings?.averageRating || 'N/A'} / 5 <br />
          <strong>Number of Reviews:</strong> {mobile.ratings?.numberOfReviews || 'N/A'}
        </p>
      </div>
    </animated.div>
    </main>
  );
};

export default MobileDetails;
