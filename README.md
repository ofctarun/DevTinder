# DevTinder

**A "Tinder for developers" — a social/networking web app where developers can create profiles, discover other developers, send connection requests, match, and chat in real time.**

---

## 1. Elevator Pitch

DevTinder lets developers swipe through a feed of other developer profiles, express interest ("like") or skip ("ignore") them, and — once both sides express interest — become "connections." Connected users can then message each other instantly through a built-in real-time chat. It's essentially a dating-app-style UX (à la Tinder) repurposed for professional/developer networking.

---

## 2. Tech Stack

### Backend (`/BACKEND`)
| Layer | Technology |
|---|---|
| Runtime / Framework | Node.js + Express 5 |
| Database | MongoDB (via Mongoose ODM) |
| Authentication | JWT (JSON Web Tokens) stored in HTTP-only cookies, password hashing via bcrypt |
| Real-time | Socket.IO |
| Email | AWS SES (`@aws-sdk/client-ses`) |
| Scheduled jobs | node-cron (currently disabled/commented out) |
| Validation | validator.js |
| Other | cookie-parser, cors, dotenv, date-fns, xlsx |

### Frontend (`/FRONTEND`)
| Layer | Technology |
|---|---|
| Framework | React 19 + Vite (rolldown-vite) |
| Routing | React Router v7 |
| State management | Redux Toolkit + React-Redux |
| Styling | Tailwind CSS v4 + DaisyUI |
| HTTP client | Axios |
| Real-time | Socket.IO client |

---

## 3. High-Level Architecture

```
┌──────────────────┐        REST (Axios, cookies)        ┌───────────────────┐
│                  │ ───────────────────────────────────▶│                   │
│   React Frontend │                                       │  Express Backend  │
│  (Vite, Redux)   │ ◀─────────────────────────────────── │   (Node.js API)   │
│                  │                                       │                   │
│                  │        Socket.IO (WebSocket)          │                   │
│                  │ ◀────────────────────────────────────▶│                   │
└──────────────────┘                                       └─────────┬─────────┘
                                                                      │ Mongoose
                                                                      ▼
                                                              ┌───────────────┐
                                                              │   MongoDB     │
                                                              │ (Users, Chats,│
                                                              │ Connections)  │
                                                              └───────────────┘
```

- The **frontend** is a single-page React app served by Vite, talking to the backend over REST (with cookies for auth) and over WebSockets (for chat).
- The **backend** is a single Express app (`BACKEND/src/app.js`) that mounts all route groups, wraps an HTTP server, and attaches a Socket.IO server to it for real-time messaging.
- **MongoDB** stores three core collections: Users, Connection Requests, and Chats.
- The base API URL is resolved dynamically on the frontend (`FRONTEND/src/utils/constants.js`) based on the hostname — `localhost:1818` for local dev, a Render-hosted URL for the deployed Vercel frontend, or `/api` behind a proxy for custom domains.

---

## 4. Core Features

1. **Authentication** — Sign up, log in, log out using JWT stored in secure, HTTP-only cookies.
2. **Profile management** — View and edit your profile (name, bio, age, gender, photo, skills) and change your password.
3. **Developer feed** — A paginated feed of other developers, excluding yourself and anyone you've already interacted with.
4. **Connection requests** — Send an "interested" or "ignored" status toward another user; the recipient can then "accept" or "reject" pending requests.
5. **Matches/Connections** — A list of mutually-accepted connections you can message.
6. **Real-time chat** — Persistent, per-pair conversations powered by Socket.IO and stored in MongoDB, with message history.
7. **Email notifications** — When a user expresses interest in another, an email is sent via AWS SES.
8. **(Disabled) Scheduled reminder job** — A commented-out cron job that would email users about pending requests from the previous day.

---

## 5. Data Models (MongoDB / Mongoose)

### `User` (`models/user.js`)
- `firstName`, `lastName`, `email` (unique, validated), `password` (bcrypt-hashed on save)
- `age`, `gender` (enum: male/female/other), `photoURL`, `bio`, `skills` (array, max 20)
- `createdBy`, timestamps
- Instance methods: `getJWT()` (signs a JWT), `validatePassword()` (bcrypt compare)

### `ConnectionRequest` (`models/connectionRequest.js`)
- `fromUserId`, `toUserId` (refs to `Users`)
- `status`: one of `ignored | interested | accepted | rejected`
- Compound unique index on `(fromUserId, toUserId)` — prevents duplicate requests
- Pre-save guard preventing a user from sending a request to themselves

### `Chat` (`models/chat.js`)
- `participants`: array of two `User` references
- `messages`: embedded array of `{ senderId, text, timestamps }`

---

## 6. REST API Reference

All protected routes require a valid `token` cookie (set on login/signup) and pass through the `userAuth` middleware (`middleware/userAuth.js`), which verifies the JWT and attaches `req.user`.

### Auth (`routes/auth.js`)
| Method | Route | Description |
|---|---|---|
| POST | `/signup` | Create a new account, hash password, issue JWT cookie |
| POST | `/login` | Verify credentials, issue JWT cookie |
| POST | `/logout` | Clear the auth cookie |

### Profile (`routes/profile.js`) — auth required
| Method | Route | Description |
|---|---|---|
| GET | `/profile/view` | Get the logged-in user's profile |
| PATCH | `/profile/edit` | Update profile fields (validated) |
| POST | `/editPassword` | Change password (validates current password, rejects reuse) |

### Connection Requests (`routes/request.js`) — auth required
| Method | Route | Description |
|---|---|---|
| POST | `/request/send/:status/:toUserId` | Send `interested` or `ignored` toward another user; sends an email on "interested"; blocks duplicates |
| POST | `/request/review/:status/:requestId` | Accept or reject an incoming "interested" request |

### Users / Feed (`routes/user.js`) — auth required
| Method | Route | Description |
|---|---|---|
| GET | `/user/requests/received` | List incoming "interested" requests |
| GET | `/user/connections` | List mutual ("accepted") connections |
| GET | `/feed?page=&limit=` | Paginated list of discoverable users (excludes self & anyone already interacted with; max 10 per page) |

### Chat (`routes/chat.js`) — auth required
| Method | Route | Description |
|---|---|---|
| GET | `/chat/:targetUserId` | Fetch (or lazily create) the chat thread between the logged-in user and a target user, with sender names populated |

---

## 7. Real-Time Chat Flow (Socket.IO)

Backend: `utils/socket.js` · Frontend: `utils/socket.js`, `Components/Chat.jsx`

1. Both users' clients connect to the Socket.IO server and emit `joinChat` with their `userId` and the `targetUserId`.
2. The server derives a deterministic, private **room ID** by sorting the two user IDs, joining them, and SHA-256 hashing the result — so the same two users always land in the same room regardless of who initiates.
3. When a user sends a message, the client emits `sendMessage`; the server persists it to the `Chat` document (creating the chat document on first contact) and broadcasts `messageReceived` to everyone in that hashed room.
4. The chat history is also fetchable via REST (`GET /chat/:targetUserId`) for loading prior messages when opening a conversation.

---

## 8. Authentication Flow

1. On signup/login, the backend signs a JWT containing the user's Mongo `_id` and sets it as an `httpOnly`, `secure`, `sameSite=none` cookie (cross-domain friendly for the deployed Vercel + Render setup).
2. Every protected request automatically carries this cookie (`withCredentials: true` on the frontend's Axios calls).
3. The `userAuth` middleware decodes the JWT, loads the corresponding user from MongoDB, and attaches it to `req.user` for downstream handlers.
4. Logging out simply overwrites the cookie with an immediately-expired, null value.

---

## 9. Frontend Structure

- **State (Redux slices)**: `userSlice`, `feedSlice`, `connectionsSlice`, `requestsSlice` — each manages a slice of global app state, wired together in `utils/appStore.js`.
- **Routing** (`App.jsx`, React Router): a shared `Body` layout wraps pages — `Feed` (home `/` and `/feed`), `Login`, `Profile`, `EditProfile`, `Connections`, `Requests`, and `Chat` (`/chat/:targetUserId`).
- **Key components**: `NavBar`, `Footer`, `UserCard` (swipeable profile card), `Feed` (the main discovery feed), `Connections` & `Requests` (manage matches and incoming interest), `Chat` (real-time messaging UI), `Profile`/`EditProfile`/`EditForm` (profile management).
- **Styling**: Tailwind CSS v4 + DaisyUI components, with a Tinder-inspired gradient/glassmorphism aesthetic (visible in the unauthenticated `Feed` landing view).

---

## 10. Deployment Setup

- **Frontend**: deployed on Vercel (`devtinderrr.vercel.app`)
- **Backend**: deployed on Render (`devtinder-uw4i.onrender.com`)
- The frontend dynamically computes its API base URL depending on the hostname it's running on (local dev vs. Vercel vs. a custom proxy domain), so the same build works across environments.
- CORS on the backend explicitly allows the local dev origin and the deployed Vercel origin, with credentials enabled for cookie-based auth.

---

## 11. Notable Implementation Details Worth Knowing

- Passwords are never stored in plaintext — hashing happens automatically in a Mongoose `pre("save")` hook.
- The feed query actively excludes both the current user and anyone with any prior connection-request history (sent, received, accepted, or rejected) to avoid showing already-seen profiles.
- A duplicate connection request (in either direction) is blocked at the database level via a compound unique index, plus an explicit existence check in the route handler.
- The chat "room" hashing approach means no separate "conversation ID" needs to be generated or shared client-side — both participants independently compute the same room ID.
- An automated daily email-reminder cron job exists in the codebase but is currently disabled (commented out in `utils/cronjob.js` and not imported in `app.js`).
