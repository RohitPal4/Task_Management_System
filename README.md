# Task Management System

A full-stack task management application built with React.js frontend and Node.js backend, featuring user authentication, task categorization, and real-time statistics tracking.

## 🚀 Features

- **User Authentication**: Secure signup/login system with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Categories**: 
  - All Tasks
  - Important Tasks (⭐)
  - Completed Tasks (✅)
  - Incomplete Tasks (📝)
- **Real-time Statistics**: Track total, completed, and incomplete tasks
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Icons** - Icon components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure


   App.css
│   App.js
│   App.test.js
│   index.css
│   index.js
│   logo.svg
│   reportWebVitals.js
│   setupTests.js
│
├───assets
├───components
│   └───home
│           Cards.jsx
│           InputData.jsx
│           Sidebar.jsx
│
├───pages
│       Alltasks.jsx
│       Completedtasks.jsx
│       Home.jsx
│       Importanttasks.jsx
│       Incompletedtasks.jsx
│       Login.jsx
│       Signup.jsx
│
└───store
        auth.js
        index.js
        stats.js

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the application**
   
   Backend:
   ```bash
   cd backend
   npm start
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm start
   ```

## 📱 Usage

### Authentication
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account using email and password

### Task Management
1. **Create Task**: Click the add button (+) to create a new task
2. **Edit Task**: Click on any task to edit its details
3. **Mark Important**: Toggle the importance status of tasks
4. **Complete Task**: Mark tasks as completed
5. **Delete Task**: Remove unwanted tasks

### Navigation
- **All Tasks**: View all your tasks
- **Important Tasks**: View only important tasks
- **Completed Tasks**: View completed tasks
- **Incomplete Tasks**: View pending tasks

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/signup` - User registration
- `POST /api/v1/login` - User login

### Tasks
- `GET /api/v2/get-all-tasks` - Get all tasks
- `GET /api/v2/get-imp-tasks` - Get important tasks
- `GET /api/v2/get-complete-tasks` - Get completed tasks
- `GET /api/v2/get-incomplete-tasks` - Get incomplete tasks
- `POST /api/v2/create-task` - Create new task
- `PUT /api/v2/update-task/:id` - Update task
- `DELETE /api/v2/delete-task/:id` - Delete task

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required),
  tasks: [ObjectId] (ref: 'task'),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required),
  desc: String (required),
  important: Boolean (default: false),
  complete: Boolean (default: false),
  user: ObjectId (ref: 'user', required),
  timestamps: true
}
```

## 🎨 Features in Detail

### State Management
- **Auth Slice**: Manages user authentication state
- **Stats Slice**: Tracks task statistics (total, completed, incomplete)

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive sidebar that transforms on mobile devices
- Touch-friendly interface elements

### Loading States
- Skeleton loading animations
- Spinner components for better UX
- Error handling for API calls

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes requiring authentication
- Token storage in localStorage
- Automatic logout on token expiry

## 🚀 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting service

### Backend Deployment
1. Set environment variables on your hosting platform
2. Deploy to services like Heroku, Railway, or Render
3. Update the API base URL in frontend code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 🐛 Known Issues

- Tasks may take a moment to refresh after operations
- Mobile sidebar could be improved for better UX

## 🔮 Future Enhancements

- [ ] Task due dates and reminders
- [ ] Task categories and tags
- [ ] Dark/Light theme toggle
- [ ] Drag and drop task reordering
- [ ] Task search and filtering
- [ ] Email notifications
- [ ] Task sharing and collaboration
- [ ] Data export functionality



---

**Built with ❤️ using React and Node.js**
