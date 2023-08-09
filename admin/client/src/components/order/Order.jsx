import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'

const Order = () => {
    return (
        <div className="order-layout">
            <Sidebar />
            <div className="order-container">
                <Navbar />
            </div>
        </div>
    )
}

export default Order
