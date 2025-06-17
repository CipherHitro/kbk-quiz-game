# 🎮 KBK – Kaun Banega Karodpati Game Web App

**KBK** is an interactive and responsive **KBC-style quiz game** built with **React**, **Vite**, and **Tailwind CSS**.  
The game challenges players with multiple-choice questions in an engaging interface that replicates the famous quiz show.

It supports lifelines, timer-based questions, smooth animations, responsive design, and a helpful **How To Play** guide with video demonstrations.

---

## 🚀 Features

- ✅ Responsive Design (Mobile + Desktop)
- 🏆 Play quiz game with KBC experience
- 🧠 Dynamic AI-generated questions
- 🎬 "How to Play" Slider with videos for each step
- ⏱️ Question Timer (45 sec / 60 sec / No timer after 10th Q)
- 🎮 Smooth game flow and animations
- 🆘 Lifelines:
  - 50-50
  - Phone a Friend ( In which you will ask to AI ChatBot )
  - Ask the Expert
  - Flip the Question
- 🔐 Lock your answer feature
- 🎨 Beautiful, modern UI with gradient backgrounds
- 🖥️ Built with React + Vite + Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend:

- **React.js**
- **Tailwind CSS**
- **React Router**

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Bcryptjs**  – for hashing user passwords
- **Jsonwebtoken** – for JWT-based auth

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/CipherHitro/kbk-quiz-game.git
cd kbk-quiz-game 
``` 

### 2. Setup Frontend

```bash
cd frontend
npm install
```
### 3. Create a .env file in frontend directory and add these things
```bash
VITE_MODE=development
VITE_API_URL=http://localhost:2001/
```

### 4. Start the frontend server

```bash
npm run dev 
```
- App will be running at http://localhost:5173/ 

### 5. Setup Backend 
- Open new ternimal and run these commands 

```bash
cd backend
npm install
```

### 6. Create a .env file in backend directory and add these things
```bash
#Set mode to development 
MODE=development

# add your secret key for JWT(json web token)
secretJWT=anything@123

# add your local mongdb URI 
MONGO_URI_DEV=mongodb://localhost:27017/kbk-game

# Add your openAI router key to generate question and interaction with AI
OPENROUTER_API_KEY=sk-your-openai-router-key

# Add your frontend URL 
FRONTEND_URL=http://localhost:5173
```

### 6. Start the backend server

```bash
npm run dev
```
