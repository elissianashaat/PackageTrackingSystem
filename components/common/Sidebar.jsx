import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="sidebar">
    <ul>
      <li><Link to="/assigned-orders">Assigned Orders</Link></li>
      <li><Link to="/courier-orders">Courier Orders</Link></li>
      {/* Add more links here */}
    </ul>
  </aside>
);

export default Sidebar;
