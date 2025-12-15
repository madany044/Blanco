# Blanco Hiring Portal

Production-ready hiring portal for Blanco covering public job view, candidate application, and admin review.

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js, JWT, bcrypt, Prisma ORM (MySQL)
- Database: MySQL (Railway / PlanetScale / Aiven)
- Deployment: Frontend on Vercel/Netlify, Backend on Render (free tiers)

## Project Structure
```
backend/
  prisma/schema.prisma        # DB schema
  src/                        # Express app, routes, controllers, middleware
frontend/
  src/                        # React pages, components, services
```

## Local Setup
1) Prereqs: Node 18+, npm, MySQL instance.
2) Backend:
```
cd backend
cp env.example .env   # set DATABASE_URL, JWT_SECRET, CLIENT_URL
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
3) Frontend:
```
cd frontend
cp env.example .env   # set VITE_API_URL (e.g. http://localhost:4000/api)
npm install
npm run dev -- --host
```

## Environment Variables
Backend `.env`:
- `DATABASE_URL` mysql connection string
- `JWT_SECRET` JWT signing secret
- `PORT` (optional, default 4000)
- `CLIENT_URL` comma-separated allowed origins

Frontend `.env`:
- `VITE_API_URL` backend API base (e.g. https://your-render-app.onrender.com/api)

## Database Schema
- `users`: id, name, email (unique), password_hash, contact_number, role (`CANDIDATE|ADMIN`), created_at
- `applications`: id, user_id FK, all application fields, status (`DRAFT|SUBMITTED|NEW|SHORTLISTED|REJECTED|INTERVIEW_SCHEDULED|HIRED`), admin_notes, created_at/updated_at

## API (base `/api`)
- `POST /auth/register` {name,email,password,contactNumber}
- `POST /auth/login` {email,password} → {token,user,expiresIn}
- `POST /auth/logout`
- `POST /application/save-draft` (auth: candidate)
- `POST /application/submit` (auth: candidate)
- `GET /application/me` (auth: candidate)
- `GET /admin/applications` (auth: admin, query: page, limit, search, status, minExperience)
- `GET /admin/applications/:id` (auth: admin)
- `PUT /admin/applications/:id/status` {status} (auth: admin)
- `PUT /admin/applications/:id/notes` {adminNotes} (auth: admin)

## Admin Credentials
Create an admin row manually or via SQL after migrations:
```
INSERT INTO users (name,email,password_hash,contact_number,role)
VALUES ('Admin','admin@blanco.com', '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '0000000000', 'ADMIN');
```
Generate the bcrypt hash with `npx bcrypt-cli hash 'yourpassword'` or any bcrypt tool.

## Deployment (Free)
- **DB**: Provision MySQL on Railway/PlanetScale/Aiven → grab connection string.
- **Backend on Render**:
  - New Web Service → connect repo → root `/backend`
  - Build command: `npm install && npx prisma generate`
  - Start command: `npm start`
  - Add env: DATABASE_URL, JWT_SECRET, CLIENT_URL, PORT (4000)
  - Set health check `/api/health`
- **Frontend on Vercel/Netlify**:
  - Project root `/frontend`
  - Build command: `npm install && npm run build`
  - Output: `dist`
  - Env: `VITE_API_URL=https://<render-service>.onrender.com/api`

## Security Notes
- JWT auth with expiry (2h), bcrypt hashing.
- Role-based middleware (`candidate` vs `admin`).
- Input validation via express-validator, ORM protects SQL injection.
- No file uploads; CV can be text/link.

## Usage Flow
1. Public users see job landing with Apply/Register buttons.
2. Candidates register/login, see dashboard, fill multi-section form, save draft, submit (locked after submit).
3. Admins login, view dashboard with search/filter/pagination, open applications, update status, add private notes.

## Styling
Tailwind utility classes deliver responsive, clean UI. Custom `.input` component class is defined in `frontend/src/styles/tailwind.css`.

