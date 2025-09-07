# Blog Platform Capstone Project

A full-stack blogging platform with CI/CD pipelines, Docker containerization, and optional Kubernetes orchestration. Users can create, view, update, and delete posts. The project demonstrates modern DevOps practices, containerization, and cloud database integration.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Setup and Installation](#setup-and-installation)
* [Environment Variables](#environment-variables)
* [Docker & CI/CD](#docker--cicd)
* [Usage](#usage)
* [Future Enhancements](#future-enhancements)

---

## Features

* Full-stack blog platform (React frontend + Node.js/Express backend)
* MongoDB Atlas integration for cloud database
* User authentication and authorization
* Create, read, update, delete (CRUD) posts
* CI/CD pipelines with Jenkins & GitHub Actions
* Docker containerization for frontend and backend
* Optional Kubernetes deployment for orchestration
* Logging and monitoring support
* Automated testing pipelines

---

## Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js, Mongoose
* **Database:** MongoDB Atlas
* **Containerization:** Docker, Docker Compose
* **CI/CD:** Jenkins, GitHub Actions
* **Cloud:** AWS / Kubernetes
* **Other Tools:** Cloudinary for image storage, Jest for testing

---

## Project Structure

```
blog-api/
│
├── backend/             # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── Dockerfile
│
├── frontend/            # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://github.com/NandishM0618/capstone.git
cd capstone
```

2. **Install dependencies:**

* Backend:

```bash
cd backend
npm install
```

* Frontend:

```bash
cd frontend
npm install
```

3. **Set environment variables:**

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=<mongodb_atlas_connection_string>
CLOUD_NAME=<cloudinary_cloud_name>
CLOUD_API=<cloudinary_api_key>
CLOUD_SECRET=<cloudinary_api_secret>
```

---

## Docker & CI/CD

### Run with Docker Compose

```bash
docker compose up --build
```

* Frontend available at `http://localhost:3000`
* Backend available at `http://localhost:5000`

### CI/CD

* **Jenkins** or **GitHub Actions** pipelines automatically:

  * Pull code from GitHub
  * Build Docker images
  * Deploy containers
  * Run tests

---

## Usage

* Access the frontend at `http://localhost:3000`
* Create an account or login
* Create, edit, or delete posts
* All posts are stored in MongoDB Atlas

---

## Future Enhancements

* Deploy frontend & backend to Kubernetes clusters
* Implement full monitoring & alerting (Prometheus + Grafana)
* Add Redis caching for better performance
* Enable user role-based access control

---

## Author

**Nandish M**

* GitHub: [NandishM0618](https://github.com/NandishM0618)
* LinkedIn: [linkedin.com/in/nandishm](https://www.linkedin.com/in/nandishm/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
