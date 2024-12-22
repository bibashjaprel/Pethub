
# PetHub

PetHub is a comprehensive pet adoption platform designed to connect pet lovers with their future furry friends. It provides a seamless user experience for viewing available pets, donating pets, and managing adoption requests. The application features role-based access, ensuring functionality tailored for admins, users, and donors.

---

## Features

- **Browse Pets**: Explore a variety of pets available for adoption.
- **Donate Pets**: Easily donate your pets for adoption using a user-friendly form.
- **Adoption Requests**: Submit adoption requests and view the status of your applications.
- **Image Storage**: Pet images are securely stored in **Cloudinary**.
- **Role-Based Access Control**:
  - Admin: Manage pets, adoption requests, and applications.
  - Users: View pets, donate pets, and send adoption requests.
- **Authentication**: Secure login and signup functionality with token-based authentication.
- **Responsive Design**: Tailored for an optimal experience on both desktop and mobile devices.


---

## Tech Stack

### Frontend:
- **React.js** with React Router for navigation.
- **Material UI** for some  componenet.
- **Tailwind CSS** for styling.

### Backend:
- **Node.js** and **Express.js** for API development.
- **MongoDB** with **Mongoose** for database management.
- **Cloudinary** for pet image storage.

### Utilities:
- **JWT (JSON Web Tokens)** for authentication.
- **LocalStorage** for persisting user preferences and tokens.

---

## Installation

### Prerequisites:
- **Node.js** and **npm** installed on your system.
- **MongoDB** instance running (local or cloud).
- **Cloudinary** account for image storage.

### Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/bibashjaprel/pethub.git
   cd pethub
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     MONGO_URI=mongodb+srv://root9t2:9U218ntpHVGRNjCX@cluster0.i1xkw.mongodb.net/
PORT=5000
SECRET=SUP3RSECRETPASS00RD
CLOUDINARY_CLOUD_NAME=dzrahzo3u
CLOUDINARY_API_KEY=863483184537926
CLOUDINARY_API_SECRET=QPiu5rioMErlkNeW6ae1BAdbczc
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Folder Structure

```
PetHub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── public/
├── README.md
└── .gitignore
```

---

## API Endpoints

### Authentication:
- `POST /api/v1/user/signup` - Register a new user.
- `POST /api/v1/user/login` - Authenticate a user.

### Pets:
- `GET /api/v1/pets` - View all available pets.
- `POST /api/v1/pets` - Add a new pet (Admin only).
  - Pet image is uploaded to Cloudinary.
- `PUT /api/v1/pets/:id` - Update a pet's details (Admin only).
- `DELETE /api/v1/pets/:id` - Remove a pet from the list (Admin only).

### Adoption:
- `POST /api/v1/adoption/request` - Submit an adoption request.
- `GET /api/v1/adoption/requests` - View all adoption requests (Admin only).

---

## Cloudinary Integration

- **Why Cloudinary?** 
  - Cloudinary is a powerful media management service that ensures fast and secure image storage.
  - It offers APIs for uploading and transforming images directly from the backend.

- **Configuration**:
  - Add your Cloudinary credentials to the `.env` file.
  - Use the `cloudinary` library in the backend for image uploads:
    ```javascript
    const cloudinary = require('cloudinary').v2;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    ```

- **Example Usage**:
  ```javascript
  const uploadImage = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'pethub',
    });
    return result.secure_url;
  };
  ```

---

## Contributions

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/username/pethub/issues).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Developed by **[Bibash Japrel](https://github.com/username)**. 
Feel free to connect with me for any queries or collaborations.
