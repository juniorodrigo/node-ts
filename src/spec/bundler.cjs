const fs = require('fs');
const path = require('path');

/**
 * Bundler para combinar módulos OpenAPI en un archivo único
 */
class OpenAPIBundler {
	constructor() {
		this.specDir = __dirname;
		this.modulesDir = path.join(this.specDir, 'modules');
		this.outputFile = path.join(this.specDir, 'openapi.json');
		this.modules = [
			{ file: 'admin.json', name: 'admin' },
			{ file: 'analitica.json', name: 'analitica' },
			{ file: 'auth.json', name: 'auth' },
			{ file: 'comercial.json', name: 'comercial' },
			{ file: 'general.json', name: 'general' },
		];
	}

	/**
	 * Lee un archivo JSON de manera síncrona
	 */
	readJsonFile(filePath) {
		try {
			const content = fs.readFileSync(filePath, 'utf8');
			return JSON.parse(content);
		} catch (error) {
			logger.error(`Error leyendo archivo ${filePath}:`, error.message);
			process.exit(1);
		}
	}

	/**
	 * Combina objetos evitando duplicados
	 */
	mergeObjects(target, source, allowDuplicates = false) {
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				if (target[key] && typeof target[key] === 'object' && typeof source[key] === 'object') {
					if (Array.isArray(target[key]) && Array.isArray(source[key])) {
						// Para arrays, concatenamos y removemos duplicados si es necesario
						target[key] = target[key].concat(source[key]);
						if (!allowDuplicates) {
							target[key] = target[key].filter(
								(item, index, self) => index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
							);
						}
					} else {
						// Para objetos, recursivamente combinamos
						this.mergeObjects(target[key], source[key], allowDuplicates);
					}
				} else {
					// Para valores primitivos o cuando target[key] no existe
					if (!target[key] || allowDuplicates) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	}

	/**
	 * Crea la especificación base
	 */
	createBaseSpec() {
		return {
			openapi: '3.0.3',
			info: {
				title: 'Auth Management API',
				description: 'API para gestión de autenticación y accesos de usuarios internos y externos',
				version: '1.0.0',
				contact: {
					name: 'Auth Management Team',
					email: 'admin@authmanagement.com',
				},
			},
			servers: [
				{
					url: 'http://127.0.0.1:3053',
					description: 'Servidor de desarrollo',
				},
			],
			tags: [],
			paths: {},
			components: {
				schemas: {},
				responses: {},
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
						description: 'JWT Bearer token para autenticación',
					},
				},
			},
		};
	}

	/**
	 * Valida que todos los módulos existan
	 */
	validateModules() {
		const missingFiles = [];

		for (const module of this.modules) {
			const filePath = path.join(this.modulesDir, module.file);
			if (!fs.existsSync(filePath)) {
				missingFiles.push(module.file);
			}
		}

		if (missingFiles.length > 0) {
			logger.error('❌ Archivos faltantes:', missingFiles.join(', '));
			logger.error('Por favor, asegúrate de que todos los módulos existan en:', this.modulesDir);
			process.exit(1);
		}
	}

	/**
	 * Construye la especificación completa
	 */
	bundle() {
		logger.log('🔄 Iniciando bundling de especificaciones OpenAPI...');

		// Validar que todos los módulos existan
		this.validateModules();

		// Crear especificación base
		const combinedSpec = this.createBaseSpec();

		// Procesar cada módulo
		for (const module of this.modules) {
			logger.log(`📁 Procesando módulo: ${module.name}`);

			const filePath = path.join(this.modulesDir, module.file);
			const moduleSpec = this.readJsonFile(filePath);

			// Combinar tags
			if (moduleSpec.tags) {
				combinedSpec.tags = combinedSpec.tags.concat(moduleSpec.tags);
			}

			// Combinar paths
			if (moduleSpec.paths) {
				this.mergeObjects(combinedSpec.paths, moduleSpec.paths);
			}

			// Combinar components/schemas
			if (moduleSpec.components?.schemas) {
				this.mergeObjects(combinedSpec.components.schemas, moduleSpec.components.schemas);
			}

			// Combinar components/responses
			if (moduleSpec.components?.responses) {
				this.mergeObjects(combinedSpec.components.responses, moduleSpec.components.responses);
			}
		}

		// Eliminar duplicados en tags
		combinedSpec.tags = combinedSpec.tags.filter(
			(tag, index, self) => index === self.findIndex((t) => t.name === tag.name)
		);

		return combinedSpec;
	}

	/**
	 * Escribe la especificación combinada al archivo de salida
	 */
	writeOutput(spec) {
		try {
			const content = JSON.stringify(spec, null, '\t');
			fs.writeFileSync(this.outputFile, content, 'utf8');
			logger.log(`✅ Especificación combinada guardada en: ${this.outputFile}`);
		} catch (error) {
			logger.error('❌ Error escribiendo archivo de salida:', error.message);
			process.exit(1);
		}
	}

	/**
	 * Ejecuta el proceso completo de bundling
	 */
	run() {
		const startTime = Date.now();

		try {
			const combinedSpec = this.bundle();
			this.writeOutput(combinedSpec);

			const endTime = Date.now();
			const duration = endTime - startTime;

			logger.log(`\n🎉 Bundling completado exitosamente en ${duration}ms`);
			logger.log(`📊 Resumen:`);
			logger.log(`   - Tags: ${combinedSpec.tags.length}`);
			logger.log(`   - Paths: ${Object.keys(combinedSpec.paths).length}`);
			logger.log(`   - Schemas: ${Object.keys(combinedSpec.components.schemas).length}`);
			logger.log(`   - Responses: ${Object.keys(combinedSpec.components.responses).length}`);
		} catch (error) {
			logger.error('❌ Error durante el bundling:', error.message);
			process.exit(1);
		}
	}
}

// Ejecutar el bundler si se ejecuta directamente
if (require.main === module) {
	const bundler = new OpenAPIBundler();
	bundler.run();
}

module.exports = OpenAPIBundler;
