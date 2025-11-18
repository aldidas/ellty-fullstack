# Ellty Fullstack Project: Operational Transformation Tree

This is a full-stack web application built with Next.js that allows users to collaboratively build a tree structure of numerical operations. Each node in the tree represents a number calculated from its parent's value and a chosen operation.

## Features

-   User authentication (Sign up / Sign in)
-   View a hierarchical tree of numerical nodes
-   Create new root nodes
-   Reply to any existing node to create a child node with a new calculation
-   Real-time updates (via server-side data fetching and revalidation)

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [better-auth](https://www.npmjs.com/package/better-auth)
-   **UI**: [React](https://react.dev/)
-   **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Testing**: [Vitest](https://vitest.dev/)
-   **Containerization**: [Docker](https://www.docker.com/)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v20 or later recommended)
-   [npm](https://www.npmjs.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ellty-fullstack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example:

```bash
cp .env.example .env
```

The `.env` file should contain the `DATABASE_URL` for connecting to the PostgreSQL instance managed by Docker.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
```

### 4. Start the Database

Run the PostgreSQL database in a Docker container using the development compose file:

```bash
docker-compose up -d
```

### 5. Apply Database Schema

Push the Prisma schema to your new database instance. This will create the necessary tables.

```bash
npx prisma db push
```

### 6. Run the Development Server

Now, start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

This project uses Vitest for unit testing the utility functions. To run the tests, first install the testing dependencies:

```bash
npm install -D vitest @vitest/ui jsdom vite-tsconfig-paths
```

Then, run the test script:

```bash
npm test
```

## 📁 Project Structure

-   `app/`: Contains the pages and layouts of the Next.js application (App Router).
-   `components/`: Contains shared React components, including UI components from shadcn/ui.
-   `lib/`: Contains utility functions, database logic, authentication actions, and schemas.
-   `prisma/`: Contains the Prisma schema file (`schema.prisma`) that defines the database models.
-   `docker-compose.yml`: Docker Compose file for setting up the development database.
-   `vitest.config.ts`: Configuration file for the Vitest test runner.
