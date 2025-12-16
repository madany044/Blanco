# Blanco Hiring Portal

Hiring portal for Blanco covering public job view, candidate application, and admin review. [ This Application is Developed for a company Blanco Steel Detailing Services Pvt Ltd ]. which allowed me to showcase my skills and provided the exposure needed to build more applications. 

## Live Demo 
http://blanco-hiring.vercel.app

## Tech Stack
- Frontend: React (Vite), Tailwind CSS, Axios, React Router
- Backend: Node.js, Express.js, JWT
- Database: MySQL (Railway )
- Deployment: Frontend on Vercel, Backend on Render 

## Security Notes
- JWT auth with expiry (2h), bcrypt hashing.
- Role-based middleware (`candidate` vs `admin`).
- Input validation via express-validator, ORM protects SQL injection.

## Usage Flow
1. Public users see job landing with Apply/Register buttons.
2. Candidates register/login, see dashboard, fill multi-section form, save draft, submit (locked after submit).
3. Admins login, view dashboard with search/filter/pagination, open applications, update status, add private notes.

<div align="center">
  
## Designed & Developed By 
[ MADAN Y ]

 **Email**: madanmadany2004@gmail.com 

</div>
