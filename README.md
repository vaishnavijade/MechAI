# 🔧 Mech AI – Virtual Car Mechanic Chatbot

**Mech AI** is a smart, AI-powered chatbot that acts as a **virtual car mechanic**, helping users diagnose and troubleshoot common car issues through natural language queries. It is built using the **MERN Stack**, powered by the **Ollama 3B LLM**, and uses **LangChain** and **MongoDB Compass** for efficient data flow and management.

---

## 🚗 Project Overview

Many car owners visit a mechanic for small issues that could easily be fixed at home — like a dead battery, blinking dashboard lights, or engine warning signs. Mech AI provides **step-by-step guidance** for such problems, saving users time and money.

The chatbot leverages car manuals, maintenance guides, and service records to provide accurate, vehicle-specific advice. It also supports **secure login via OTP**, maintains **chat history**, and delivers **personalized troubleshooting**.

---

## 🧠 How It Works

1. **User Input:**  
   Users describe their car problem in **natural language** via the chatbot interface.

2. **NLP Engine (Ollama 3B):**  
   The backend processes the input using a **large language model** to understand context and intent.

3. **Embeddings Generation (MiniLM-v6):**  
   Queries are converted into numerical vectors using Hugging Face's **all-MiniLM-v6** embeddings.

4. **Similarity Search (LangChain + Pinecone or local DB):**  
   Embeddings are matched against indexed car data to retrieve the most relevant diagnostic solution.

5. **Response Generation:**  
   The best match is used to generate a **clear, step-by-step repair guide** for the user.

---

## 🌐 Live Demo

> Coming Soon 

---

## 📱 Key Features

- 🔒 **Secure OTP Login** via email (SMTP)
- 💬 **Natural Language Chat Interface**
- 🧠 **LLM-based Query Understanding**
- 🔍 **Smart Search with Embeddings + LangChain**
- 🛠️ **Troubleshooting Step-by-Step Guidance**
- 🗃️ **Chat History Storage (MongoDB)**

---

## 🛠️ Tech Stack

### 📦 Frontend
- React.js
- HTML/CSS
- Bootstrap (optional)

### ⚙️ Backend
- Node.js + Express.js
- FastAPI (for LLM API)
- SMTP for OTP authentication

### 🧠 AI & NLP
- Ollama 3B (LLM)
- Hugging Face `all-MiniLM-v6` embeddings
- LangChain for RAG and retrieval logic

### 💾 Database
- MongoDB (with MongoDB Compass for DB management)
  - `User` Collection: stores login credentials
  - `ChatLogs` Collection: stores chat queries and responses

---

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)
- Python (for LLM server if separate)
- Ollama installed and running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mech-ai.git
cd mech-ai

# Install server dependencies
cd mech-ai-backend
npm install

# Start the backend
npm run dev

# Start React frontend
cd ../mech-ai-frontend
npm install
npm run dev


