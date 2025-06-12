# Vue + Hono + Better Auth

A full-stack application demonstrating modern authentication with Vue 3, Hono, and Better Auth.

## 🚀 Features

- **Frontend**: Vue 3 with TypeScript, Vite, and Tailwind CSS
- **Backend**: Hono with TypeScript and Prisma
- **Authentication**: Better Auth with email/password and OAuth (Google, GitHub)
- **UI Components**: Reka UI with custom form components
- **Validation**: Vee-Validate with Zod schemas
- **Styling**: Tailwind CSS with custom transitions
- **Type Safety**: Full TypeScript support across frontend and backend

## 📁 Project Structure

```
├── client/                 # Vue 3 frontend
│   ├── src/
│   │   ├── components/     # Reusable Vue components
│   │   ├── pages/          # Route pages
│   │   ├── lib/            # Utilities and configurations
│   │   ├── types/          # TypeScript type definitions
│   │   └── stores/         # Pinia state management
│   └── ...
├── server/                 # Hono backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── lib/            # Server utilities and configurations
│   │   └── ...
│   └── prisma/             # Database schema and migrations
└── README.md
```

## 🛠️ Tech Stack

### Frontend (Vue)

- **Vue 3.5+** - Composition API with `<script setup>`
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first styling
- **Reka UI** - Headless UI components
- **Vee-Validate + Zod** - Form validation
- **Better Auth Client** - Authentication client

### Backend (Hono)

- **Hono** - Lightweight web framework
- **TypeScript** - Server-side type safety
- **Prisma** - Database ORM
- **Better Auth** - Authentication server
- **Bun** - Fast JavaScript runtime

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Database (PostgreSQL, MySQL, or SQLite)

### 1. Clone the repository

```bash
git clone https://github.com/sothearo-kay/vue-hono-better-auth.git
cd vue-hono-better-auth
```

### 2. Server Setup

```bash
cd server
bun install

# Configure your database in prisma/schema.prisma
# Create .env file with database connection
cp .env.example .env

# Generate Prisma client and run migrations
bunx prisma generate
bunx prisma db push
```

### 3. Development Mode

**Option A: Separate Dev Servers (Recommended for development)**

```bash
# Terminal 1 - Start client dev server
cd client
bun install
bun dev          # Runs on http://localhost:5173

# Terminal 2 - Start server dev server
cd server
bun dev          # Runs on http://localhost:3000
```

**Option B: Single Server (Production-like)**

```bash
# Build client first
cd client
bun install
bun run build    # Creates client/dist/ with static files

# Start server (serves both API and built client)
cd server
bun dev          # Serves everything on http://localhost:3000
```

### 4. Environment Variables

**Server (.env)**

```env
DATABASE_URL="your-database-connection-string"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## 🎯 Development

### Available Scripts

**Client:**

```bash
bun dev          # Start development server
bun build        # Build for production
bun preview      # Preview production build
bun test:unit    # Run unit tests
bun lint         # Lint and fix code
bun type-check   # TypeScript type checking
```

**Server:**

```bash
bun dev          # Start development server with hot reload
bunx prisma studio    # Open Prisma Studio
bunx prisma generate  # Regenerate Prisma client
```

### Static File Serving

The server can serve the built Vue client alongside the API:

1. **Build the client**: `cd client && bun run build`
2. **Server configuration**:

   ```js
   // Serve static files (JS, CSS, assets)
   app.use("*", serveStatic({ root: "../client/dist" }));

   // SPA fallback for Vue Router
   app.get("*", serveStatic({ path: "index.html", root: "../client/dist" }));
   ```

3. **Single endpoint**: Server handles both `/api/*` and all client routes

### Code Style

- **ESLint + Prettier** - Code formatting and linting
- **TypeScript strict mode** - Enhanced type checking
- **Conventional commits** - Standardized commit messages

## 🔐 Authentication Flow

1. **Email/Password**: Traditional registration and login
2. **OAuth Providers**: Google and GitHub integration
3. **Session Management**: Better Auth handles sessions automatically
4. **Route Protection**: Client-side route guards
5. **Type-Safe API**: Shared types between client and server

## 🎨 UI Components

- **Form Components**: LoginForm, SignupForm with validation
- **UI Library**: Custom components built with Reka UI
- **Transitions**: Smooth animations for better UX
- **Responsive Design**: Mobile-first approach

## 📦 Key Dependencies

### Client

- `vue` - Vue 3 framework
- `better-auth` - Authentication client
- `vee-validate` + `zod` - Form validation
- `reka-ui` - Headless UI components
- `tailwindcss` - CSS framework
- `vue-router` - Routing
- `pinia` - State management

### Server

- `hono` - Web framework
- `better-auth` - Authentication server
- `@prisma/client` - Database client
- `prisma` - Database toolkit

## 🚀 Deployment

### Single Server Deployment (Recommended)

The server can serve both the API and the built Vue client:

```bash
# 1. Build the client
cd client
bun run build    # Creates client/dist/ with static files

# 2. Deploy the server (which serves both API and client)
cd server
bun run start    # Or deploy to Railway, Render, etc.
```

The server serves:

- **API routes**: `/api/*` (authentication, data)
- **Static files**: JS, CSS, images from `client/dist/`
- **SPA fallback**: All other routes serve `index.html` for Vue Router

### Separate Deployment (Alternative)

Deploy client and server separately:

**Client (Static Site)**:

```bash
cd client
bun build
# Deploy dist/ folder to Vercel, Netlify, etc.
```

**Server (API Only)**:

```bash
cd server
# Deploy to Railway, Render, etc.
# Update CORS settings for your client domain
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

