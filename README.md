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
cd <repository-name>
```
###  Install Dependencies
npm install

### Environment Setup
1.  Create a .env file in the root directory and add the following variables:

# Database
<!-- Database Setup -->
1.  Create a new project in Supabase
2.  Get your database connection string from Supabase dashboard
3.  Update the DATABASE_URL in your .env file

DATABASE_URL=postgresql://[username]:[your_password]@[YOUR-PROJECT-REF].supabase.com:5432/postgres

# JWT
JWT_KEY=[JWT_KEY]
JWT_LIFETIME=[1d]

## Prisma Setup
<!-- # Generate Prisma Client -->
npx prisma generate
<!-- # Run migrations -->
npx prisma migrate dev

### Start the Application 
# Development mode
npm run start:dev
