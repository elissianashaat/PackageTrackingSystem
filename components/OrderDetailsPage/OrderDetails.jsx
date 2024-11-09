import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StatusBadge from '../common/StatusBadge'; // Assuming StatusBadge component is available
import './OrderDetails.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const cancelOrder = async () => {
    try {
      await axios.post(`/api/orders/${orderId}/cancel`);
      setOrder((prevOrder) => ({ ...prevOrder, status: 'Cancelled' }));
    } catch (err) {
      setError('Failed to cancel order');
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Pickup Location:</strong> {order.pickupLocation}</p>
      <p><strong>Drop-off Location:</strong> {order.dropOffLocation}</p>
      <p><strong>Package Details:</strong> {order.packageDetails}</p>
      <p><strong>Courier Info:</strong> {order.courier ? order.courier.name : 'Not assigned'}</p>
      <p>
        <strong>Status:</strong> <StatusBadge status={order.status} />
      </p>
      
      {order.status === 'Pending' && (
        <button onClick={cancelOrder} className="cancel-button">Cancel Order</button>
      )}
    </div>
  );
};

export default OrderDetailsPage;
