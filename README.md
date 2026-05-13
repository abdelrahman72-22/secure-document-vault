# Secure Document Vault System

## Overview

Secure Document Vault is a secure web-based platform that allows users to:

* Register and login securely
* Authenticate using JWT
* Login using Google OAuth
* Enable Two-Factor Authentication (2FA)
* Upload encrypted documents
* Verify document integrity using SHA-256 and Digital Signatures
* Manage users using Role-Based Access Control (RBAC)
* Detect tampering attacks on stored files

The project was built as part of the Data Integrity and Authentication course project.

---

# Features

## Authentication & Security

* User Registration & Login
* Password Hashing using bcrypt
* JWT Authentication
* Google OAuth Login
* Two-Factor Authentication (2FA)
* Logout Functionality

## Role-Based Access Control (RBAC)

### Admin

* Manage users
* Change user roles
* Access Admin Panel

### Manager

* Review uploaded documents
* Verify documents
* Access Manager Panel

### User

* Upload documents
* Download documents
* Delete own documents
* Verify own documents

---

# Document Security

## Encryption

All uploaded documents are encrypted before being stored on the server using AES encryption.

## Integrity Verification

For every uploaded file:

1. SHA-256 hash is generated
2. Digital signature is created
3. Signature is stored securely
4. File integrity can later be verified

If the encrypted file is modified directly on the server, the system detects tampering.

---

# Technologies Used

## Frontend

* React
* React Router
* Tailwind CSS
* Axios
* Vite

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT
* bcrypt
* Multer
* Passport.js
* Speakeasy
* Crypto

## Database

* PostgreSQL

---

# Project Structure

```bash
secure-document-vault/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── uploads/
│   │   └── config/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── package.json
│
└── README.md
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/secure-document-vault.git
```

```bash
cd secure-document-vault
```

---

# Backend Setup

## 2. Open Backend Folder

```bash
cd backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment Variables

Create a file named:

```bash
.env
```

Inside backend folder.

Add:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/documentvault"
JWT_SECRET="your_jwt_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CALLBACK_URL="http://localhost:5000/api/auth/google/callback"
```

---

## 5. Setup Database

Run:

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

---

## 6. Start Backend Server

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# Frontend Setup

## 7. Open Frontend Folder

Open another terminal:

```bash
cd frontend
```

---

## 8. Install Dependencies

```bash
npm install
```

---

## 9. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Google OAuth Setup

## 1. Open Google Cloud Console

[https://console.cloud.google.com/](https://console.cloud.google.com/)

---

## 2. Create OAuth Credentials

Create:

* OAuth Client ID
* OAuth Client Secret

---

## 3. Add Authorized Redirect URI

```text
http://localhost:5000/api/auth/google/callback
```

---

## 4. Copy Credentials into .env

```env
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

---

# Supported File Types

The system supports:

* PDF
* TXT
* DOCX
* PNG
* JPG
* JPEG

Maximum file size:

```text
5 MB
```

---

# How Integrity Verification Works

## Upload Process

1. User uploads file
2. File is encrypted
3. SHA-256 hash is generated
4. Digital signature is created
5. File and metadata are stored

---

## Verification Process

1. System recalculates file hash
2. Signature is verified
3. If hashes differ:

```text
Document Modified ❌
```

Otherwise:

```text
Document Integrity Verified ✅
```

---

# Tampering Demonstration

To simulate an attack:

Open encrypted file inside:

```bash
backend/src/uploads/
```

Edit any `.enc` file:

```bash
nano filename.enc
```

Modify content and save.

Then click:

```text
Verify
```

The system will detect tampering.

---

# Available Pages

* Login Page
* Register Page
* Dashboard
* Profile Page
* 2FA Page
* Admin Panel
* Manager Panel

