# 👤 Profile-Temporal-App (MERN + Temporal + Auth0)

A full-stack **MERN** application enhanced with **Temporal.io** and **Auth0** to manage user profiles. It securely handles user updates via Temporal Workflows and syncs user data with external APIs like [CrudCrud](https://crudcrud.com).

## 📸 Preview

### 🔹 Home Page

![Home Page](./client//src/assets/profilehome.jpeg)

### 🔹 Authentication Page

## ![Authentication Page](./client//src/assets/authentication.jpeg)

### 🔹 Profile Page

## ![Profile Page](./client//src/assets/loggedin-profile.jpeg)

## 🚀 Tech Stack

### 🖥️ Frontend

- React.js (Vite)
- Auth0
- Axios, Plain CSS

### 🛠 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- Temporal.io (Workflows, Workers, Activities)
- Axios, dotenv, cors

---

## 🔐 Authentication with Auth0

- Frontend login/logout using Auth0's React SDK.

---

## 🧪 API Endpoints

| Method | Endpoint        | Auth | Description                                   |
| ------ | --------------- | ---- | --------------------------------------------- |
| GET    | `/users`        | ❌   | Get all users (dev only)                      |
| GET    | `/users/:email` | ✅   | Get user profile by email                     |
| POST   | `/users/login`  | ✅   | Create/login user if not already present      |
| PUT    | `/users/:email` | ✅   | **Triggers Temporal Workflow to update user** |

### 🔁 PUT `/users/:email`

- Starts a Temporal Workflow that:
  - Waits 10 seconds
  - Updates user in MongoDB
  - Sends updated data to [CrudCrud](https://crudcrud.com)

### Sample PUT Body

```json
{
  "firstName": "Dipali",
  "lastName": "Surve",
  "city": "Bengaluru",
  "phoneNumber": "9028460703",
  "pincode": "413310"
}
```

```

Profile-Temporal-App/
│
├── client/               # React frontend (with Auth0)
├── server/
│   ├── config/           # MongoDB connection
│   ├── controllers/      # userController.js
│   ├── routes/           # userRoute.js
│   ├── temporal/
│   │   ├── activities.js # Activity to update MongoDB & CrudCrud
│   │   ├── workflows.js  # Workflow to delay + call activity
│   │   └── worker.js     # Temporal Worker
│   └── server.js          # Express server
│
|
└── README.md             # This file






```

```bash
git clone https://github.com/Dipali2377/Profile-Temporal-App.git
cd Profile-Temporal-App
```

---

## 👩‍💻 Author

**Dipali Magar**  
💼 MERN Stack Developer  
🔗 [GitHub Profile](https://github.com/Dipali2377)
