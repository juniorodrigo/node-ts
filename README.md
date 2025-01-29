# Proyecto Base de Node.js con TypeScript, Express, PNPM y Nodemon

Este es un proyecto base de Node.js que utiliza TypeScript, Express, PNPM y Nodemon para el desarrollo de aplicaciones backend.

## Requisitos

- Node.js
- PNPM

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd backend-ts
   ```
3. Instala las dependencias:
   ```bash
   pnpm install
   ```

## Uso

Para iniciar el servidor en modo desarrollo, ejecuta:

```bash
pnpm dev
```

Esto iniciará el servidor y observará los cambios en los archivos TypeScript, recompilando automáticamente cuando sea necesario.

## Estructura del Proyecto

```
backend-ts/
├── src/
│   ├── index.ts
│   └── ...
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

- **src/**: Contiene el código fuente de la aplicación.
- **nodemon.json**: Configuración de Nodemon para observar cambios en los archivos.
- **package.json**: Archivo de configuración de PNPM y dependencias del proyecto.
- **tsconfig.json**: Configuración de TypeScript.
- **README.md**: Este archivo.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
