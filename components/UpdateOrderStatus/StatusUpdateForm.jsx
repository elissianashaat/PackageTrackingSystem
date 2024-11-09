import React, { useState } from 'react';
import './StatusUpdateForm.css';

const StatusUpdateForm = ({ orderId, onUpdateStatus }) => {
    const [status, setStatus] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setStatus(e.target.value);
        setSuccessMessage('');
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!status) {
            setErrorMessage('Please select a status.');
            return;
        }

        try {
            await onUpdateStatus(orderId, status);
            setSuccessMessage('Status updated successfully!');
        } catch (error) {
            setErrorMessage('Failed to update status.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="status-update-form">
            <h2>Update Order Status</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="form-group">
                <label htmlFor="status">Select New Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="in transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <button type="submit" className="submit-button">Update Status</button>
        </form>
    );
};

export default StatusUpdateForm;
