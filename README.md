# 🌍 CRC WORLD

[![Node.js Version](https://img.shields.io/badge/node-22.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.19.2-blue.svg)](https://expressjs.com/)
[![Mongoose](https://img.shields.io/badge/mongoose-8.6.0-red.svg)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

CRC WORLD is a robust web application built with the MERN stack (well, MEAN-ish with EJS), designed to provide a comprehensive management system. It features a complete user and admin dashboard, payment integration, and dynamic content management.

---

## ✨ Key Features

- **🚀 Dual Dashboards**: Specialized interfaces for both Users and Administrators.
- **💳 Payment Integration**: Secured with **Razorpay** for seamless transactions.
- **📧 Communication**: Automated email notifications using **N nodemailer**.
- **📁 File Handling**: Robust image and document management using **Multer** and **Cloudinary**.
- **🔐 Security**: Password hashing with **Bcrypt** and session-based authentication.
- **📊 Data Export**: Generate and export reports in **Excel (XLSX)** and **PDF (jsPDF)** formats.
- **💬 Real-time Feedback**: Interactive alerts using **SweetAlert2**.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Frontend**: EJS (Embedded JavaScript), Vanilla CSS, JavaScript
- **Utilities**: Moment.js (Date formatting), OTP Generator (Two-factor auth), UUID

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.x recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [Cloudinary Account](https://cloudinary.com/) (For file storage)
- [Razorpay Account](https://razorpay.com/) (For payments)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url>
    cd crc-world
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    PORT=7500
    MONGO_URI=your_mongodb_connection_string
    URL=http://localhost:7500
    # Add Cloudinary, Razorpay, and Email credentials here
    ```

4.  **Run the Application**
    ```bash
    # Development mode (with nodemon)
    npm run dev

    # Production mode
    npm start
    ```

---


