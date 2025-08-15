# Template Node.js + Express + TypeScript

Un template profesional y listo para producción de Node.js con Express y TypeScript, diseñado con las mejores prácticas y herramientas modernas de desarrollo.

## 🚀 Características Principales

### Tecnologías Base

- **Node.js** con **Express.js** como framework web
- **TypeScript** con configuración estricta y moderna
- **ESModules** nativos (no CommonJS)
- **Prisma ORM** con generador de tipos Zod integrado
- **PostgreSQL** como base de datos por defecto

### Seguridad y Middlewares

- **Helmet** - Headers de seguridad HTTP
- **CORS** - Control de acceso entre orígenes configurado
- **Rate Limiting** - Protección contra ataques DDoS (100 req/15min)
- **Compression** - Compresión gzip/brotli con filtros personalizados
- **Body Parser** - Parsing seguro de JSON y URL-encoded

### Validación y Manejo de Errores

- **Zod** para validación de esquemas con mensajes amigables
- **Sistema robusto de manejo de errores** con clases personalizadas
- **Validación automática** de variables de entorno
- **Middleware de respuesta estandarizada** con logging automático

### Logging y Monitoreo

- **Winston** para logging profesional con rotación diaria
- **Logs estructurados** separados por nivel (error, combined)
- **Archivos de log rotativos** con compresión automática
- **Health check endpoint** incluido

### Documentación API

- **Swagger/OpenAPI 3.0** completamente configurado
- **Interface web** para documentación interactiva en `/api-docs`
- **Endpoint JSON** de la especificación en `/api-docs.json`
- **Configuración personalizada** con CSS y opciones avanzadas

### Gestión de Cookies

- **Sistema avanzado de cookies** con opciones de seguridad
- **Métodos de conveniencia** para manejo seguro de cookies
- **Configuración automática** basada en entorno (dev/prod)
- **Soporte para cookies httpOnly y secure**

### Arquitectura y Organización

- **Estructura modular** por dominio/funcionalidad
- **Separación clara** de responsabilidades (Controller-Service-Schema)
- **Path aliases** configurados para imports limpios (`@/*`)
- **Tipos TypeScript** personalizados y organizados

### DevOps y Despliegue

- **Docker** preparado con Dockerfile
- **Nginx** con configuraciones HTTP/HTTPS
- **Scripts de desarrollo y producción** optimizados
- **Hot reload** con tsx para desarrollo

## 📦 Instalación

### Prerrequisitos

- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm
- PostgreSQL (local o remoto)
- Docker (opcional, para containerización)

### Configuración Inicial

1. **Clonar e instalar dependencias:**

```bash
git clone <tu-repositorio>
cd node-ts
pnpm install
```

2. **Configurar variables de entorno:**

```bash
# Crear archivo .env en la raíz del proyecto
cp .env.example .env
```

Configurar las siguientes variables en `.env`:

```env
# Puerto del servidor
PORT=3000

# Entorno de ejecución
NODE_ENV=development

# URL de conexión a PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_base_datos"

# Orígenes permitidos para CORS (separados por coma)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

3. **Configurar la base de datos:**

```bash
# Generar el cliente de Prisma
pnpm run prisma:generate

# Ejecutar migraciones (crear tablas)
pnpm run prisma:migrate
```

4. **Iniciar el servidor de desarrollo:**

```bash
pnpm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

| Script                     | Descripción                                          |
| -------------------------- | ---------------------------------------------------- |
| `pnpm run dev`             | Inicia el servidor en modo desarrollo con hot reload |
| `pnpm run build`           | Compila TypeScript a JavaScript                      |
| `pnpm run start`           | Inicia el servidor en modo producción                |
| `pnpm run lint`            | Ejecuta ESLint en el código fuente                   |
| `pnpm run test`            | Ejecuta las pruebas con Jest                         |
| `pnpm run typecheck`       | Verifica tipos sin compilar                          |
| `pnpm run prisma:generate` | Genera el cliente de Prisma y tipos Zod              |
| `pnpm run prisma:migrate`  | Ejecuta migraciones de base de datos                 |
| `pnpm run prisma:studio`   | Abre Prisma Studio para administrar la BD            |

## 📁 Estructura del Proyecto

```
node-ts/
├── docker/
│   └── Dockerfile              # Configuración de Docker
├── logs/                       # Archivos de log (generados automáticamente)
│   ├── combined/              # Logs de información general
│   └── error/                 # Logs de errores únicamente
├── nginx/
│   ├── http.config            # Configuración Nginx HTTP
│   └── https.config           # Configuración Nginx HTTPS
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── public/                    # Archivos estáticos (si es necesario)
├── source/
│   ├── config/
│   │   ├── env.ts            # Configuración de variables de entorno
│   │   ├── errors.ts         # Clases de error personalizadas
│   │   └── swagger.ts        # Configuración de Swagger/OpenAPI
│   ├── lib/
│   │   ├── clients/
│   │   │   └── prisma.ts     # Cliente de Prisma configurado
│   │   └── zod.ts            # Utilidades de validación Zod
│   ├── middlewares/
│   │   ├── error.ts          # Middleware de manejo de errores
│   │   ├── index.ts          # Configuración de middlewares
│   │   └── response.ts       # Middleware de respuesta + logging
│   ├── modules/
│   │   └── test/             # Ejemplo de módulo
│   │       ├── controller.ts # Controlador del módulo
│   │       ├── router.ts     # Rutas del módulo
│   │       ├── schemas.ts    # Esquemas Zod del módulo
│   │       └── service.ts    # Lógica de negocio del módulo
│   ├── spec/
│   │   └── openapi.json      # Especificación OpenAPI completa
│   ├── types/
│   │   ├── cookies.ts        # Tipos para manejo de cookies
│   │   ├── express.d.ts      # Extensiones de tipos de Express
│   │   ├── global.d.ts       # Tipos globales
│   │   └── service.ts        # Tipos para servicios
│   ├── utils/                # Utilidades generales
│   ├── routes.ts             # Configuración principal de rutas
│   └── index.ts              # Punto de entrada de la aplicación
├── test/                     # Archivos de pruebas
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración TypeScript
└── pnpm-lock.yaml           # Lock file de pnpm
```

## 🏗️ Arquitectura por Módulos

Cada funcionalidad se organiza en módulos independientes dentro de `source/modules/`. Cada módulo contiene:

### Estructura de un Módulo

```
módulo/
├── controller.ts    # Manejo de requests/responses
├── router.ts        # Definición de rutas
├── schemas.ts       # Validaciones Zod y tipos TypeScript
└── service.ts       # Lógica de negocio
```

### Ejemplo de Implementación

**Schema (schemas.ts):**

```typescript
import z from 'zod';

export const CreateUserSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;
```

**Controller (controller.ts):**

```typescript
import type { Request, Response } from 'express';
import { UserService } from './service.js';
import { customParse } from '@/lib/zod.js';
import { ValidationError } from '@/config/errors.js';
import { CreateUserSchema } from './schemas.js';

export async function createUser(req: Request, res: Response) {
	const validation = customParse(CreateUserSchema, req.body);
	if (!validation.success) throw new ValidationError(validation.message);

	const { data, message } = await UserService.createUser(validation.data);
	res.success(data, message);
}
```

**Service (service.ts):**

```typescript
import type { ServiceResponse } from '@/types/service.js';
import type { CreateUser } from './schemas.js';

async function createUser(userData: CreateUser): Promise<ServiceResponse<User>> {
	// Lógica de negocio aquí
	const user = await prisma.user.create({ data: userData });
	return { message: 'Usuario creado exitosamente', data: user };
}

export const UserService = { createUser };
```

// Error con contexto completo
logger.error('Error al procesar pago', {
userId: 123,
orderId: 456,
error: error.message,
stack: error.stack,
});

````

**5. Errores Críticos (`fatal`)**

```typescript
// Para errores que requieren intervención inmediata
logger.fatal('Conexión a base de datos perdida');

// Con información de sistema
logger.fatal('Error crítico del servidor', {
	memory: process.memoryUsage(),
	uptime: process.uptime(),
	error: error.message,
});
````

**6. Trazas Detalladas (`trace`)**

```typescript
// Para debugging muy detallado
logger.trace('Entrada a función calculatePrice');

// Con parámetros de función
logger.trace('Ejecutando validación', {
	function: 'validateUserInput',
	params: { email, password: '[REDACTED]' },
});
```

#### Métodos Personalizados

**Log de Éxito (`success`)**

```typescript
// Para operaciones exitosas importantes
logger.success('Usuario registrado correctamente');

// Con datos de la operación
logger.success('Pago procesado', {
	transactionId: 'txn_123',
	amount: 99.99,
	currency: 'USD',
});
```

**Log de Desarrollo (`log`)**

```typescript
// Solo visible en modo desarrollo
logger.log('Debug temporal', variable1, variable2, objeto);
```

**Log de Requests (`request`)**

```typescript
// Para logging automático de requests HTTP
logger.request('GET', '/api/users', {
	userAgent: req.get('User-Agent'),
	ip: req.ip,
});
```

**Log de Responses (`response`)**

```typescript
// Para logging automático de responses HTTP
logger.response('GET', '/api/users', 200, {
	responseTime: Date.now() - startTime,
	dataLength: data.length,
});
```

#### Casos de Uso Prácticos

**1. En Controladores**

```typescript
// src/modules/user/controller.ts
export async function createUser(req: Request, res: Response) {
	try {
		logger.info('Iniciando creación de usuario', {
			ip: req.ip,
			userAgent: req.get('User-Agent'),
		});

		const validation = customParse(CreateUserSchema, req.body);
		if (!validation.success) {
			logger.warn('Datos de entrada inválidos', {
				errors: validation.message,
				body: req.body,
			});
			throw new ValidationError(validation.message);
		}

		const { data, message } = await UserService.createUser(validation.data);

		logger.success('Usuario creado exitosamente', {
			userId: data.id,
			email: data.email,
		});

		res.success(data, message);
	} catch (error) {
		logger.error('Error al crear usuario', {
			error: error.message,
			stack: error.stack,
			requestBody: req.body,
		});
		throw error;
	}
}
```

**2. En Servicios**

```typescript
// src/modules/user/service.ts
async function createUser(userData: CreateUser): Promise<ServiceResponse<User>> {
	logger.debug('Iniciando proceso de creación de usuario', {
		email: userData.email,
	});

	try {
		// Verificar si el usuario ya existe
		const existingUser = await prisma.user.findUnique({
			where: { email: userData.email },
		});

		if (existingUser) {
			logger.warn('Intento de crear usuario duplicado', {
				email: userData.email,
			});
			throw new ValidationError('El email ya está registrado');
		}

		const user = await prisma.user.create({ data: userData });

		logger.info('Usuario creado en base de datos', {
			userId: user.id,
			email: user.email,
		});

		return {
			message: 'Usuario creado exitosamente',
			data: user,
		};
	} catch (error) {
		logger.error('Error en servicio de creación de usuario', {
			error: error.message,
			userData: { ...userData, password: '[REDACTED]' },
		});
		throw error;
	}
}
```

**3. En Middlewares**

```typescript
// Middleware personalizado con logging
export const requestLogger: RequestHandler = (req, res, next) => {
	const startTime = Date.now();

	logger.request(req.method, req.url, {
		ip: req.ip,
		userAgent: req.get('User-Agent'),
		contentType: req.get('Content-Type'),
	});

	res.on('finish', () => {
		const duration = Date.now() - startTime;
		logger.response(req.method, req.url, res.statusCode, {
			duration: `${duration}ms`,
			contentLength: res.get('Content-Length'),
		});
	});

	next();
};
```

**4. Para Procesos de Background**

```typescript
// Tareas programadas o workers
async function processEmailQueue() {
	logger.info('Iniciando procesamiento de cola de emails');

	try {
		const pendingEmails = await getEmailQueue();
		logger.debug('Emails pendientes encontrados', {
			count: pendingEmails.length,
		});

		for (const email of pendingEmails) {
			try {
				await sendEmail(email);
				logger.success('Email enviado', {
					to: email.to,
					subject: email.subject,
				});
			} catch (error) {
				logger.error('Error enviando email', {
					emailId: email.id,
					to: email.to,
					error: error.message,
				});
			}
		}

		logger.info('Procesamiento de cola completado', {
			processed: pendingEmails.length,
		});
	} catch (error) {
		logger.fatal('Error crítico en procesamiento de emails', {
			error: error.message,
			stack: error.stack,
		});
	}
}
```

#### Configuración de Niveles

En variables de entorno (`.env`):

```env
# Niveles disponibles: trace, debug, info, warn, error, fatal
LOG_LEVEL=info
```

En desarrollo: Los logs se muestran en consola con colores.
En producción: Los logs se guardan en archivos estructurados JSON.

### Health Check

Endpoint disponible en `GET /health` para monitoreo:

```json
{
	"success": true,
	"data": {
		"status": "ok",
		"timestamp": "2024-01-15T10:30:00.000Z"
	}
}
```

## 📚 Documentación API

### Swagger UI

- **URL:** `http://localhost:3000/api-docs`
- **Características:**
  - Interface interactiva para probar endpoints
  - Documentación generada automáticamente
  - Ejemplos de request/response
  - Esquemas de validación visibles

### Especificación OpenAPI

- **JSON completo:** `http://localhost:3000/api-docs.json`
- **Versión:** OpenAPI 3.0
- **Personalizable:** Editar `source/spec/openapi.json`

## 🐳 Docker y Despliegue

### Construcción de la imagen:

```bash
docker build -f docker/Dockerfile -t mi-app .
```

### Ejecución con Docker:

```bash
docker run -p 3000:3000 --env-file .env mi-app
```

### Nginx (Proxy Reverso)

Configuraciones preparadas en `nginx/` para HTTP y HTTPS.

## 🔧 Configuración Avanzada

### Variables de Entorno

Todas las variables se validan automáticamente usando Zod en `source/config/env.ts`:

```typescript
const envSchema = z.object({
	PORT: z.string().default('3000'),
	NODE_ENV: z.enum(['development', 'production', 'test']),
	DATABASE_URL: z.string(),
});
```

### Middlewares de Seguridad

- **Rate Limiting:** 100 requests por IP cada 15 minutos
- **CORS:** Configurado para orígenes específicos
- **Helmet:** Headers de seguridad HTTP estándar
- **Compression:** Compresión inteligente con filtros

### Path Aliases

Configurados en `tsconfig.json` para imports limpios:

```typescript
import { prisma } from '@/lib/clients/prisma.js';
import { ValidationError } from '@/config/errors.js';
```

## 🧪 Testing

El template está preparado para Jest. Para agregar pruebas:

1. Crear archivos `.test.ts` o `.spec.ts` en `test/`
2. Ejecutar: `pnpm run test`

## 🤝 Flujo de Desarrollo

1. **Crear nuevo módulo:**

   - Crear carpeta en `source/modules/`
   - Implementar controller, service, schemas, router
   - Registrar router en `source/routes.ts`

2. **Agregar endpoints:**

   - Definir esquemas Zod en `schemas.ts`
   - Implementar lógica en `service.ts`
   - Crear controlador en `controller.ts`
   - Configurar rutas en `router.ts`

3. **Documentar API:**

   - Actualizar `source/spec/openapi.json`
   - Verificar en Swagger UI

## 📝 Contribución

1. Fork del repositorio
2. Crear branch para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit de cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## � Estándar de Commits (Commitlint + Husky)

El proyecto aplica el estándar **Conventional Commits** para asegurar un historial consistente y permitir automatizaciones (versionado semántico, changelogs, etc.).

### Formato Básico

```
tipo(opcional-alcance): descripción breve en minúsculas

Cuerpo opcional (motivo, contexto)

Footer opcional (BREAKING CHANGE, referencias a issues)
```

### Tipos Permitidos

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

### Reglas Principales Enforzadas

- Tipo obligatorio y en minúsculas
- Scope (si se usa) en minúsculas
- Asunto sin punto final y no vacío
- Longitud máxima del encabezado: 72 caracteres
- Línea en blanco antes de cuerpo / footer si existen

### Ejemplos Válidos

```
feat(auth): agregar endpoint de refresco de tokens
fix(logger): corregir serialización circular en objetos de error
refactor(router): simplificar registro dinámico de rutas
docs: actualizar pasos de despliegue en README
perf(db): reducir N+1 queries en listado de usuarios
```

### Hook Automático

Se usa **Husky** para ejecutar `commitlint` en el hook `commit-msg`. Si el mensaje no cumple reglas, el commit se bloquea.

Archivo de config: `commitlint.config.js`

Hook: `.husky/commit-msg`

Contenido del hook:

```
npx --no -- commitlint --edit $1
```

### Uso Manual (Opcional)

Validar el último commit (después de hacer un commit en amend / rebase):

```bash
pnpm run commitlint
```

### Instalación / Setup (ya incluido)

Si clonas el repo y las dependencias no están instaladas aún:

```bash
pnpm install
```

El script `prepare` activa Husky automáticamente (`husky install`).

### Convenciones para Breaking Changes

Usar el footer:

```
feat(api): unificar endpoints de usuarios

BREAKING CHANGE: se elimina /v1/users/list, usar /v1/users
```

### Buenas Prácticas

- Usa `feat!:` o agrega `BREAKING CHANGE:` cuando rompas compatibilidad
- Prefiere scopes específicos: `auth`, `user`, `db`, `config`, `logger`
- Commits pequeños y atómicos
- Evita mezclar refactors con nuevas features

## 🀽� Licencia

Este template está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
