
# BlogApp

A modern, feature-rich blog application built with React, Vite, and Tailwind CSS. BlogApp enables users to discover, create, and interact with blog posts in a social environment.

---

## 🚀 Features

- **Authentication:** Secure sign up/sign in with Firebase
- **Create & Edit Posts:** Write, preview, edit, and delete posts
- **Social Interactions:** Like, comment, save, and share posts
- **User Profiles:** View, edit, and follow other users
- **Trending & Recommended:** Discover popular and recommended posts
- **Responsive UI:** Mobile-friendly design
- **Loading States:** Smooth loading animations

---

## 🛠️ Tech Stack

- React
- Vite
- Tailwind CSS
- Firebase
- PostCSS

---

## 📦 Project Structure

```
blogs/
├── public/           # Static assets (images, icons)
├── src/
│   ├── components/   # UI components (Posts, Comments, Auth, Home, Profile, etc.)
│   ├── Context/      # React context for global state
│   ├── firebase/     # Firebase configuration
│   ├── utils/        # Utility functions and helpers
│   ├── App.jsx       # Main app component
│   └── main.jsx      # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🖥️ Getting Started

1. **Clone the repository:**
	```bash
	git clone https://github.com/Riya-dudeja/blogApp.git
	cd blogApp/blogs
	```
2. **Install dependencies:**
	```bash
	npm install
	```
3. **Configure Firebase:**
	- Update `src/firebase/firebase.js` with your Firebase project credentials.
4. **Start the development server:**
	```bash
	npm run dev
	```
5. **Build for production:**
	```bash
	npm run build
	```

---

## 📸 Screenshots

_Add screenshots of the app UI here (e.g., Home, Post, Profile pages)_

---

## 📝 Usage Examples

- **Create a Post:**
  1. Sign in or sign up.
  2. Click 'Write' to create a new post.
  3. Preview and publish your post.
- **Interact:**
  - Like, comment, save, or share posts.
- **Edit Profile:**
  - Go to your profile and update your information.

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.
