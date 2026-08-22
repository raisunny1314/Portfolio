[README (3).md](https://github.com/user-attachments/files/31334340/README.3.md)
# Portfolio

Personal MERN-stack portfolio — a Node/Express/MongoDB backend with a JWT-secured admin panel, paired with a React (Vite) frontend.

🔗 **Live site:** [vercel]( https://portfolio-sunnyrais-projects.vercel.app/)
🔗 **API base:** [render]( https://portfolio-bxpt.onrender.com/)

## Structure

```
Portfolio/
├── Backend/     # Express + MongoDB API (models, controllers, routes, auth)
└── Frontend/    # React (Vite) frontend + admin panel
```

## Backend

Built with Node.js, Express, and MongoDB (Mongoose). Exposes public endpoints for portfolio data and JWT-protected admin endpoints for managing content.

**Models:** Project, CodingProfile, Experience, SocialLink, GeneralInfo, Admin

**Features:**
- Full CRUD for Project, CodingProfile, Experience, and SocialLink
- Singleton pattern for GeneralInfo (upsert-based)
- Admin authentication with bcrypt password hashing and JWT (httpOnly cookie)
- Route protection via custom auth middleware on all `/admin/*` routes

### Setup

```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the server:
```bash
npm start
```

**Deployed on:** Render

## Frontend

Built with React + Vite + Tailwind CSS. Includes the public-facing portfolio site and a protected admin panel (sidebar layout)
for managing content — Projects, Experience Timeline, Coding Profiles, General Info, and Social Links, each with its own CRUD interface.

```bash
cd Frontend
npm install
npm run dev
```

**Deployed on:** Vercel

## Status

🚧 In progress — backend CRUD and auth complete; public frontend live; admin panel sections being built out one at a time (Projects Hub done, others in progress).
