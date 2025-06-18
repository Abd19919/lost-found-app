# Lost & Found Frontend (React)

This is the frontend for a lost & found web application built with React + Vite.

🎯 **Description**
The app allows two types of users:

👤 **Regular users:**
- View lost and found items
- Add new items to the list

🛠️ **Admins:**
- Edit or delete any item
- View, edit, and delete users

Login and signup are included with a basic role-based access control system (user/admin). Sessions are persisted using `localStorage`.

🧑‍💻 **User Requirements**
- Login or Sign Up with email and password
- Role selection at signup (default is user)
- Admin can manage all users and items
- Users can add items and view all items
- Session is saved in `localStorage`

🛠️ **Technologies**
- React 18
- Vite
- Axios
- Bootstrap
- React Router

🚀 **Getting Started**
```bash
cd client
npm install
npm run dev