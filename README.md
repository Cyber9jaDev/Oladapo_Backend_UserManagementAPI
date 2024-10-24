###
# Postman Collection
In the root directory, import [Oladapo_Backend_UserManagementAPI.postman_collection.json] file

# User Management REST API

A RESTful API for user management built with NestJS, Prisma ORM, and PostgreSQL (Supabase).

## Technologies Used
- NestJS
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication
- TypeScript


## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Cyber9jaDev/Oladapo_Backend_UserManagementAPI.git
```
```bash
cd <repository-name>
```
###  Install Dependencies
```bash
npm install
```

### Environment Setup
1.  Create a .env file in the root directory and add the following variables:

# Database
<!-- Database Setup -->
1.  Create a new project in Supabase
2.  Get your database connection string from Supabase dashboard
3.  Update the DATABASE_URL in your .env file

```bash
DATABASE_URL=postgresql://[username]:[your_password]@[YOUR-PROJECT-REF].supabase.com:5432/postgres
```

# JWT
1.  JWT_KEY=[JWT_KEY]
2.  JWT_LIFETIME=[1d]

## Prisma Setup
```bash
npx prisma generate
```
```bash
npx prisma migrate dev
```

### Start the Application 
```bash
npm run start:dev
```
