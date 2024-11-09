import React from 'react';
import './OrderForm.css';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickupLocation: '',
            dropoffLocation: '',
            packageDetails: '',
            deliveryTime: '', // Assuming delivery time is a simple string for now
            successMessage: '', // Message to display upon successful submission
            errorMessage: '', // Message to display in case of validation errors
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            successMessage: '', // Clear success message on input change
            errorMessage: '' // Clear error message on input change
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Simple validation
        const { pickupLocation, dropoffLocation, packageDetails, deliveryTime } = this.state;
        if (!pickupLocation || !dropoffLocation || !packageDetails || !deliveryTime) {
            this.setState({ errorMessage: 'Please fill in all fields.' });
            return;
        }

        // Handle successful submission
        this.setState({ successMessage: 'Order submitted successfully!', errorMessage: '' });

        // Reset form fields (optional)
        this.setState({
            pickupLocation: '',
            dropoffLocation: '',
            packageDetails: '',
            deliveryTime: ''
        });

        // Simulate order submission logic
        alert('Order submitted: ' + JSON.stringify(this.state));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="order-form">
                <h2>Enter Order Details</h2>

                {/* Display error message */}
                {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

                {/* Display success message */}
                {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}

                <div className="form-group">
                    <label>
                        Pickup Location:
                        <input
                            type="text"
                            name="pickupLocation"
                            value={this.state.pickupLocation}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Drop-off Location:
                        <input
                            type="text"
                            name="dropoffLocation"
                            value={this.state.dropoffLocation}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Package Details:
                        <textarea
                            name="packageDetails"
                            value={this.state.packageDetails}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Delivery Time:
                        <select
                            name="deliveryTime"
                            value={this.state.deliveryTime}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Select a time</option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="evening">Evening</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="submit-button">Submit Order</button>
            </form>
        );
    }
}

export default OrderForm;
