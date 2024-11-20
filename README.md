
# LondonTimes Watch Stores Management System ⌚🛠️

Welcome to the LondonTimes Watch Stores Management System! This application is designed to streamline operations for watch service centers, providing features like order tracking, service status updates, and customer interaction management. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the system ensures a seamless experience for store managers, employees, and customers alike.

## 🛠️ Features

### Backend
- **Order Management:** Add, track, and update watch service orders.
- **Status Updates:** Manage orders across various stages like pending, in-progress, completed, and delivered.
- **Scheduled Reports:** Automate reporting for upcoming orders and delivered services with cron jobs.
- **Authentication:** Secure login, signup, and token-based authentication.
- **API Endpoints:** RESTful API for seamless integration with the frontend.

### Frontend
- **Dashboard:** A user-friendly dashboard for managing watch services.
- **Order Tracking:** Allow customers to track their orders using their bill or phone number.
- **Authentication:** Secure user signup, login, and email verification.
- **Additional Pages:** Includes About Us, Contact Us, and Terms of Service pages.

### Cron Jobs
- **Daily Tasks:** Fetch and log upcoming estimated orders every day at 10:30 PM IST.
- **Monthly Reports:** Generate and log delivered services reports on the first of each month at 10:30 PM IST.

## 📁 Project Structure

The project is organized as follows:

```
/londontimes-watch-stores
├── /backend              # Server-side code
│   ├── /config           # Configuration files
│   ├── /controllers      # Business logic for routes
│   ├── /db               # Database connection logic
│   ├── /routes           # API endpoints
│   ├── /middleware       # Authentication and authorization middleware
│   └── /utils            # Utility functions
│
├── /frontend             # Client-side code
│   ├── /public           # Public assets
│   ├── /src              # React source files
│   │   ├── /components   # Reusable components
│   │   ├── /pages        # Page components (Dashboard, Order tracking, etc.)
│   │   ├── /store        # State management using Zustand
│   │   └── /styles       # CSS and styles
│   └── package.json      # Project metadata and dependencies
│
├── .env                  # Environment variables
└── README.md             # Project documentation
```

## 📁 Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB instance or cluster
- Environment file (.env) configured with necessary variables

### Steps to Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/londontimes-watch-stores.git
    cd londontimes-watch-stores
    ```

2. Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URI=your_mongodb_uri
    PORT=5000
    CLIENT_URL=http://localhost:5173
    NODE_ENV=development
    API_BASE_URL=http://localhost:5000
    ```

3. Install dependencies:

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

4. Run the application:

    - **Backend:**
        ```bash
        cd backend
        npm start
        ```
    - **Frontend:**
        ```bash
        cd ../frontend
        npm start
        ```

5. Visit [http://localhost:5173](http://localhost:5173) to access the application.

## 🚀 Usage

### Store Managers:
- Use the dashboard to manage watch service orders.
- Track service statuses and update customer details.

### Customers:
- Track their watch service using their bill number or phone number.

### Automated Tasks:
- Scheduled reports for upcoming orders and delivered services ensure timely operations.

## 🤝 Contributing

Contributions are welcome! If you’d like to improve the project or suggest new features, please feel free to open an issue or submit a pull request.

---

Thank you for exploring the LondonTimes Watch Stores Management System! For further assistance, feel free to reach out.
