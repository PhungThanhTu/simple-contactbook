# Simple Contactbook
React and Node simple contact book

# Prerequisites
NodeJS v18 LTS, please see the installation guide at: 
[NodeJS page](https://nodejs.org)

# Run the app

Prepare environment variables:
Create environment variable files (.env) for both client and server:
```bash
touch client/.env
```
```bash
touch server/.env
```
Edit the environment variable files:
```bash
# client/.env
VITE_BACKEND=http://localhost:7999

# server/.env
PORT=7999
MONGO_CONSTRING=<your_mongodb_url>
```

First, install neccessary dependencies:
```bash
npm run setup
```
Then, run the app:
```bash
npm run dev
```
