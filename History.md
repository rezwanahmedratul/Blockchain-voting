# Project History: Blockchain-Based Voting System

*This file serves as a comprehensive history and context document for any AI agents or developers resuming work on this project.*

## 1. Project Overview
Built a Full-Stack Blockchain-Based Voting System designed to enforce a strict "One user = one vote" policy. The system stores vote records immutably on a custom-built Java blockchain alongside a traditional relational database for easy querying.

### Tech Stack
- **Backend:** Java 17, Spring Boot 3.2.0, Spring Security, Spring Data JPA, JWT (jjwt)
- **Database:** MySQL
- **Frontend:** React 18, Vite, React Router DOM, Axios, Vanilla CSS (Dark Mode/Glassmorphism)

---

## 2. Backend Implementation (Spring Boot)
The backend follows clean architecture principles with separate packages for config, controllers, dtos, exceptions, models, repositories, security, and services.

### Core Blockchain Engine (`com.voting.blockchain`)
- **`Block.java`**: Represents a block. Marked as a JPA `@Entity` to persist blocks to MySQL (`blocks` table). Contains fields: `id`, `index`, `timestamp`, `data` (JSON string of the vote payload), `previousHash`, and `hash`. Hashes are calculated using `index + previousHash + timestamp + data`.
- **`Blockchain.java`**: In-memory representation of the chain. Contains logic to validate the integrity of the chain (`isChainValid()`).
- **`StringUtil.java`**: Utility class that applies `SHA-256` hashing to the block data.

### Database Models (`com.voting.model`)
- **`User`**: Tracks `id`, `username`, `password`, `role` (`USER` or `ADMIN`), and a critical `voted` boolean to prevent duplicate voting.
- **`Candidate`**: Tracks `id`, `name`, and `party`.
- **`Vote`**: Traditional relational store of the vote. Tracks `id`, `userId`, `candidateId`, and `timestamp`.

### Security (`com.voting.security` & `com.voting.config`)
- Fully stateless JWT authentication.
- **`SecurityConfig`**: Disables CSRF, sets session management to STATELESS, and defines route permissions (e.g., `/api/admin/**` and `/api/blockchain/**` require `ADMIN` role).
- **`JwtAuthenticationFilter`**: Intercepts requests, validates the `Bearer` token using `JwtTokenProvider`, and sets the `SecurityContext`.

### Services (`com.voting.service`)
- **`AuthService`**: Handles `/register` and `/login` (generates JWT).
- **`VoteService`**: Checks if a user has already voted. If not, it saves a `Vote` to the DB, marks the `User` as `voted=true`, and asks `BlockchainService` to append a new `Block` containing the vote data payload. It also calculates the live election results.
- **`BlockchainService`**: Upon startup, loads the existing blockchain from the MySQL `blocks` table. If the table is empty, it mines and persists the Genesis Block. Provides methods to safely add new blocks and validate the chain.
- **`AdminService`**: Handles adding candidates and retrieving the list of candidates.

### API Contract (Controllers)
| HTTP Method | Endpoint | Role | Description |
|-------------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Authenticate user & get JWT |
| POST | `/api/vote` | USER | Cast vote |
| GET | `/api/results` | Public/USER | Get candidate vote counts |
| POST | `/api/admin/candidate`| ADMIN | Add candidate |
| GET | `/api/admin/candidates`| ADMIN | List candidates |
| GET | `/api/blockchain` | ADMIN | Get full blockchain |
| GET | `/api/blockchain/validate`| ADMIN | Verify cryptographic chain integrity |

---

## 3. Frontend Implementation (React + Vite)
The frontend is located in the `/frontend` directory and runs on port `3000`. 

### Setup & Configuration
- **Vite Config:** `vite.config.js` is configured to proxy all `/api` requests to `http://localhost:8080` to bypass CORS issues during local development.
- **State Management:** Uses React Context (`AuthContext.jsx`) to decode the JWT (using `jwt-decode`) and store `user`, `role`, and `token` in `localStorage`.
- **Axios Interceptor:** Configured in `api/axiosConfig.js` to automatically attach the `Authorization: Bearer <token>` header to outgoing requests.

### UI / UX Architecture
- **CSS:** Designed from scratch in `index.css` using modern aesthetic principles (Sleek Dark Mode, Glassmorphism, CSS gradients, dynamic hover states). No external CSS frameworks were used.
- **Routing:** Handled via `react-router-dom`.
- **`ProtectedRoute.jsx`**: A wrapper component that inspects the current user's role and redirects unauthorized access attempts to `/login`.

### Pages
- **`Login.jsx` & `Register.jsx`**: Standard authentication forms with robust error handling (displays exact network or server errors).
- **`VotePage.jsx`**: Displays candidate cards. Handles voting state and prevents users from voting twice.
- **`ResultsPage.jsx`**: Displays real-time election results using dynamic CSS progress bars.
- **`AdminDashboard.jsx`**: Allows the admin to add new candidates to the database and view the full `Blockchain Explorer`. Includes a button to hit the backend `/validate` endpoint and visually confirm chain integrity.

---

## 4. Network & Infrastructure Configurations
During deployment, the following specific configurations were established to expose the system externally:
- **Database:** The backend was configured to connect to an external MariaDB server at `10.0.0.32:3306` (`application.properties`).
- **Backend Network:** Spring Boot was bound to `0.0.0.0` (`server.address=0.0.0.0`) to accept connections from any interface.
- **Frontend Network:** Vite was configured with `--host` to expose the UI to the local network, and explicitly allowed the domain `vote.ratul.fun` via the `allowedHosts` config in `vite.config.js`.

---

## 5. Current Status & Next Steps
- The foundational architecture is 100% complete and working.
- A critical bug was patched where the Genesis Block was not being instantiated on the first empty database boot.
- Users can register, login, view candidates, cast exactly one vote, and view results.
- Admins can add candidates, view the blockchain data, and validate cryptographic integrity.

**Potential Future Enhancements for the next AI Agent:**
- Implement real-time WebSockets to update the `ResultsPage` dynamically when a new vote is cast.
- Add Proof-of-Work (mining difficulty) to the `Block.java` hashing algorithm.
- Dockerize the application (create `docker-compose.yml` for the frontend, backend, and MySQL database).
- Write JUnit and Mockito tests for the backend services.
