# Blockchain-Based Voting System

A full-stack, secure voting application that leverages a custom Java-based blockchain engine to ensure votes are stored immutably. The system enforces strict "one user, one vote" rules and features a sleek, modern React frontend.

## 🚀 Key Features
- **Blockchain Core:** A simplified, custom-built Java blockchain using SHA-256 hashing. Each vote is appended as a new block.
- **Immutability Validation:** Cryptographic verification ensures that historical voting data hasn't been tampered with.
- **Secure Authentication:** Stateless session management using JWTs (JSON Web Tokens) and Spring Security.
- **Strict Constraints:** Enforces a strict one-vote-per-user policy.
- **Admin Dashboard:** Specific endpoints and UI for admins to add candidates and view/validate the raw blockchain.
- **Premium UI:** A responsive, rich glassmorphism dark-mode interface built with React and Vite.

## 🛠️ Tech Stack
- **Backend:** Java 17, Spring Boot 3.x, Spring Security, Spring Data JPA, JWT
- **Database:** MariaDB / MySQL
- **Frontend:** React 18, Vite, React Router, Axios, Vanilla CSS

---

## ⚙️ Prerequisites
Before you begin, ensure you have the following installed:
- [Java 17+](https://adoptium.net/)
- [Maven 3.8+](https://maven.apache.org/)
- [Node.js 18+](https://nodejs.org/)
- [MySQL or MariaDB](https://mariadb.org/)

---

## 🏃‍♂️ How to Run the Project

This project requires both the Spring Boot backend and the React frontend to run simultaneously.

### 1. Database Setup
1. Ensure your local MariaDB/MySQL server is running.
2. The application is configured to create the database automatically if it doesn't exist, but verify your connection credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://10.0.0.32:3306/voting_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=appuser
   spring.datasource.password=strongpassword
   ```

### 2. Start the Backend (Spring Boot)
Open your terminal and navigate to the root directory of the project:
```bash
cd Blockchain-voting
mvn clean install
mvn spring-boot:run
```
> The backend server will start on `http://localhost:8080`.

### 3. Start the Frontend (React + Vite)
Open a **new** terminal window and navigate to the frontend directory:
```bash
cd Blockchain-voting/frontend
npm install
npm run dev
```
> The frontend development server will start on `http://localhost:3000`. You can open this URL in your browser.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user and receive JWT |
| `POST` | `/api/vote` | `USER` | Cast a vote for a candidate |
| `GET` | `/api/results` | `USER` / `ADMIN` | Get real-time vote counts |
| `POST` | `/api/admin/candidate`| `ADMIN` | Add a new candidate to the election |
| `GET` | `/api/admin/candidates`| `ADMIN` / `USER`| List all candidates |
| `GET` | `/api/blockchain` | `ADMIN` | Get the entire raw blockchain data |
| `GET` | `/api/blockchain/validate`| `ADMIN`| Verify the cryptographic integrity of the chain |

---

## 📝 License
This project is open-source and available under the MIT License.
