# Health Program Tracker

A modern and efficient web application designed to help organizations track program activities, beneficiaries, facilities, and health indicators in a clean, intuitive dashboard. Built with **React**, **Vite**, and **TailwindCSS**, the app also includes a polished **Dark Mode system**, reusable UI components, and a scalable project structure.

---

## 🚀 Features

### ✅ **Dark Mode Support**

* Global dark/light theme toggle
* Smooth transitions
* Persistent theme using `localStorage`
* Tailwind-powered dark classes

### ✅ **Dashboard UI**

* Clean and professional layout
* Responsive design
* Component-based structure

### ✅ **Reusable Components**

* Navbar
* Sidebar (optional)
* Buttons, cards, icons

### ✅ **Fast & Lightweight**

* Powered by Vite
* Optimized for performance

---

## 📦 Tech Stack

| Technology       | Purpose                |
| ---------------- | ---------------------- |
| **React.js**     | UI Framework           |
| **Vite**         | Development build tool |
| **TailwindCSS**  | Styling                |
| **Lucide Icons** | Beautiful icons        |
| **Context API**  | Theme management       |

---

## 📁 Project Structure

```
health-program-tracker2/
├─ public/
├─ src/
│  ├─ components/
│  ├─ context/
│  │   └─ ThemeProvider.jsx
│  ├─ pages/
│  ├─ styles.css
│  ├─ main.jsx
│  └─ App.jsx
├─ .gitignore
├─ package.json
├─ README.md
└─ vite.config.js
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/<your-username>/health-program-tracker2.git
```

### 2️⃣ Navigate into the project folder

```sh
cd health-program-tracker2
```

### 3️⃣ Install dependencies

```sh
npm install
```

### 4️⃣ Run the app

```sh
npm run dev
```

Your app will be live at:

```
http://localhost:5173/
```

---

## 🌗 Dark Mode Setup

Dark mode is handled using a custom React Context:

* Adds or removes `.dark` on `<html>`
* Saves theme preference to `localStorage`
* Provides `darkMode` & `toggleTheme()` globally

You can easily use the theme anywhere:

```jsx
const { darkMode, toggleTheme } = useTheme();
```

---

## 🌍 Deployment

The app can be easily deployed to:

* **GitHub Pages**
* **Vercel (recommended)**
* **Netlify**

### Deploying to Vercel

```
npm i -g vercel
vercel
```

---

## 🤝 Contributing

Pull requests are welcome! Feel free to improve UI, add modules, or optimize the architecture.

---

## 📜 License

This project is open source under the **MIT License**.

---

## 👤 Author

**Muhammad Abdullahi Muhammad**

