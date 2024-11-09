import React from 'react';
import StatusBadge from '../common/StatusBadge'; // Assuming StatusBadge is in common components folder
import './OrderTable.css';

const OrderTable = ({ orders, onUpdateStatus, onDeleteOrder }) => {
  return (
    <div className="manage-orders-container">
      <h2>Manage Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Pickup Location</th>
            <th>Drop-off Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.pickupLocation}</td>
              <td>{order.dropOffLocation}</td>
              <td><StatusBadge status={order.status} /></td>
              <td>
                <button 
                  className="update-status-button" 
                  onClick={() => onUpdateStatus(order.id)}
                >
                  Update Status
                </button>
                <button 
                  className="delete-order-button" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this order?")) {
                      onDeleteOrder(order.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
