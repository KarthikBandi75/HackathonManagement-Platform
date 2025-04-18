# 🚀 Hackathon Management & Registration Platform

> 🏆 **Runner-up** – ISTE Hackathon (February 2025)

A full-featured web platform built to streamline the entire lifecycle of virtual hackathons — from registration and team creation to project submissions, judging, and leaderboard tracking.

## 🎯 Key Features

### 👥 Multi-Role Support  

- **Participants:**  
  - OTP-based secure signup/login  
  - View all hackathons posted by organizers and register for the ones they’re interested in  
  - Collaborate with your team using Microsoft Teams for real-time discussions, with instant updates powered by Socket.IO.  
  - Submit projects with GitHub links & demo URLs  
  - View their scores provided by judges

- **Organizers:**  
  - Add, edit, and delete hackathons  
  - View who has registered for their hackathons and their scores provided by judges  
  - Manage event timeline, hackathon themes, and participant access  
  - Approve/reject project submissions  
  - Monitor activity and control the **live leaderboard**

- **Judges:**  
  - Access project submissions assigned to them by organizers  
  - Evaluate projects based on predefined metrics  
  - Provide feedback and scores via the dashboard  
  - **Separate Frontends:**  
    - There are separate frontends for Participants, Organizers, and Judges.  
    - Organizers sign up as organizers and log in to manage their events.  
    - Organizers assign judges to their hackathons, and judges log in using credentials provided by the organizer.
  
---

## ⚙️ Tech Stack

| Frontend | Backend | Realtime | Auth | Media | Styling |
|----------|---------|----------|------|--------|---------|
| React.js | Node.js, Express | Socket.IO | JWT, OTP | Cloudinary | Tailwind CSS |

---

## 📌 Highlighted Integrations

### 🔐 OTP-Based Authentication  
- Provides a secure and user-friendly login/signup process.

### 📤 Project Submission Flow  
- Participants can submit GitHub links, demo videos, or deploy URLs for judge review.

### 🧑‍⚖️ Judge Panel  
- Intuitive scoring interface with personalized project assignments.

### 💬 Real-Time Team Chat  
- Built-in team chat powered by **Socket.IO** for seamless communication.

### ☁️ Media Management  
- Integrated **Cloudinary** to handle profile pictures and project-related media uploads.


## 🛠️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/KarthikBandi75/Hackathon
