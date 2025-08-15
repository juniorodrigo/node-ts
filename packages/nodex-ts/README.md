# Create NodeTS Template CLI

Scaffold production-ready Node.js + TypeScript + Express backends in seconds with modern development best practices.

## ✨ What You Get

A complete, production-ready backend template featuring:

- **Node.js** + **Express** + **TypeScript** with ESModules
- **Prisma ORM** with PostgreSQL and integrated Zod types
- **Swagger/OpenAPI** for automatic API documentation
- **Pino** for structured logging with rotation
- **Zod** for schema and environment variables validation
- **Docker** + **Nginx** for deployment
- **Security middlewares**: Helmet, CORS, Rate Limiting
- **Hot-reload** support via tsx
- **Testing environment** pre-configured

## 🚀 Installation & Usage

### Quick Start

```bash
# Generate a new project by name:
npx nodex-ts@latest <project-name>
```

Or run interactively:

```bash
npx nodex-ts@latest
```

This command creates a new directory pre-configured with the complete template structure.

### After Generation

```bash
cd <project-name>
pnpm install    # or npm install

# Configure your environment variables
cp .env.example .env

# Set up your database
pnpm run prisma:generate
pnpm run prisma:migrate

# Start development
pnpm dev        # or npm run dev
```

Your server will be running at http://localhost:3000  
API Documentation available at http://localhost:3000/api-docs

## � Generated Project Structure

```
src/
├── config/          # Configuration (env, logger, swagger)
├── lib/             # Clients and utilities (Prisma, Zod)
├── middlewares/     # Custom middlewares
├── modules/         # Business modules
│   └── test/        # Example: controller, service, schemas, router
├── spec/            # OpenAPI documentation
├── types/           # TypeScript types
├── utils/           # General utilities
├── index.ts         # Entry point
└── routes.ts        # Main routes configuration
```

## 🏗️ Module Architecture

Each module follows a clean architecture pattern:

```
modules/my-module/
├── controller.ts    # HTTP handling
├── service.ts       # Business logic
├── schemas.ts       # Zod validation
└── router.ts        # Route definitions
```

## � Available Scripts

The generated project includes these scripts:

| Command             | Description                 |
| ------------------- | --------------------------- |
| `pnpm run dev`      | Development with hot reload |
| `pnpm run build`    | Compile TypeScript          |
| `pnpm run start`    | Production                  |
| `pnpm run test`     | Run tests                   |
| `pnpm run lint`     | Linting                     |
| `pnpm run prisma:*` | Prisma commands             |

## 🛡️ Built-in Security

- **Rate limiting**: 100 requests per 15 minutes
- **CORS**: Configurable origins
- **Helmet**: Security headers
- **Input validation**: Zod schemas with friendly error messages
- **Environment validation**: Type-safe configuration

## 🐳 Docker Ready

The generated project includes:

- Optimized Dockerfile
- Nginx configuration for production
- Docker Compose setup
- Multi-stage builds for smaller images

## 📝 Logging

Structured logging with Pino:

- Daily log rotation
- Level separation (error, combined)
- Custom methods: `logger.success()`, `logger.request()`, `logger.response()`
- JSON format for production

## 🔧 Environment Configuration

Smart environment handling:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/database"
ALLOWED_ORIGINS=http://localhost:3000
```

## 🤝 Contributing

Found an issue or want to contribute? Check out the [main repository](https://github.com/juniorodrigo/node-ts) for contribution guidelines.

## 📄 License

MIT License
