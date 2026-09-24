# 📖 DailyScroll

> A secure, distraction-free digital journaling platform built with the MERN stack.

## ✨ Features

* 📝 Create and manage journal entries
* 🔐 Secure user authentication
* 💾 Persistent data storage
* 📱 Responsive user interface
* ⚡ MERN stack full-stack architecture
* 🎯 Simple and distraction-free journaling experience

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB

## 📂 Project Structure

```text
DailyScroll/
│
├── frontend/
│   └── Client-side application
│
├── backend/
│   └── Server-side application
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/adwitiya-ag/DailyScroll.git
cd DailyScroll
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add the required environment variables.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

## 🔒 Security

* Sensitive credentials are stored using environment variables.
* Database credentials should not be committed to the repository.
* `.env` files should be excluded through `.gitignore`.
* Authentication and protected operations are handled by the backend.

## 🔮 Future Enhancements

* 🌙 Dark mode
* 🔍 Journal search
* 🏷️ Tags and categories
* 📅 Calendar-based journal navigation
* 📊 Journaling statistics
* 🖼️ Image attachments
* 🔔 Daily journaling reminders
* ☁️ Cloud deployment

## 👨‍💻 Author

**Adwitiya Ghosh**
**Intern ID:** `CITS8969`

GitHub: [@adwitiya-ag](https://github.com/adwitiya-ag)

## 📄 License

This project is developed for educational and internship purposes.
