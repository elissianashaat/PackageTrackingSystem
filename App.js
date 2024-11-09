import React , { useState, useEffect }from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'my-app/src/components/common/Navbar';
import Sidebar from 'my-app/src/components/common/Sidebar';
import AssignedOrderList from 'my-app/src/components/AssignedOrdersPage/AssignedOrderList';
import CourierOrderList from 'my-app/src/components/AssignedOrdersToCourier/CourierOrderList';
import OrderTable from 'my-app/src/components/ManageOrderPage/OrderTable';
import MyOrders from 'my-app/src/components/MyOrdersPage/MyOrders';
import OrderDetailsPage from 'my-app/src/components/OrderDetailsPage/OrderDetails';
import OrderForm from 'my-app/src/components/OrderPage/OrderForm';
import StatusUpdateForm from 'my-app/src/components/UpdateOrderStatus/StatusUpdateForm';
import LoginSignUp from 'my-app/src/components/loginsignup/LoginSignUp';


function App() {
  const dummyOrders = [
    { id: 1, pickupLocation: 'Location A', dropOffLocation: 'Location B', status: 'pending' },
    { id: 2, pickupLocation: 'Location C', dropOffLocation: 'Location D', status: 'in transit' },
  ];

  const courierOrders = [
    { id: 3, pickupLocation: 'Location E', dropOffLocation: 'Location F', courierName: 'John' },
    { id: 4, pickupLocation: 'Location G', dropOffLocation: 'Location H', courierName: 'Doe' },
  ];

  const handleReassignOrder = (orderId) => {
    console.log(`Reassigning order ${orderId}`);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // Simulate API call or status update logic here
  };

  const handleDeleteOrder = (orderId) => {
    console.log(`Deleting order ${orderId}`);
    // Simulate deletion logic here
  };

  const handleOrderSubmission = (orderData) => {
    console.log('Order submitted:', orderData);
    // Simulate submission logic here
  };

  return (
    <Router>
      <div className="App">
        <Navbar />

        <div className="main-content">
          <Sidebar />

          <div className="page-content">
            <Routes>
              {/* Assigned Orders for Courier */}
              <Route path="/assigned-orders" element={<AssignedOrderList orders={dummyOrders} />} />
              <Route
                path="/courier-orders"
                element={<CourierOrderList assignedOrders={courierOrders} onReassignOrder={handleReassignOrder} />}
              />

              {/* Manage Orders Page */}
              <Route
                path="/manage-orders"
                element={
                  <OrderTable
                    orders={dummyOrders}
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteOrder={handleDeleteOrder}
                  />
                }
              />

              {/* My Orders Page */}
              <Route path="/my-orders" element={<MyOrders orders={dummyOrders} />} />

              {/* Order Details Page */}
              <Route path="/order-details/:orderId" element={<OrderDetailsPage />} />

              {/* Create Order Page */}
              <Route path="/create-order" element={<OrderForm onSubmitOrder={handleOrderSubmission} />} />

              {/* Update Order Status Page */}
              <Route
                path="/update-order-status/:orderId"
                element={<StatusUpdateForm onUpdateStatus={handleUpdateStatus} />}
              />

              {/* Login/SignUp Page */}
              <Route path="/login" element={<LoginSignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
