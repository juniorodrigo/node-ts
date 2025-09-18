#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Función para pedir input al usuario
function askQuestion(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			rl.close();
			resolve(answer.trim());
		});
	});
}

async function createApp() {
	const args = process.argv.slice(2);
	let projectName = args[0];

	// Si no se proporciona nombre como argumento, pedirlo interactivamente
	if (!projectName) {
		console.log('🚀 ¡Bienvenido al generador de proyectos NodeTS Express!');
		console.log('');
		projectName = await askQuestion('📝 Ingresa el nombre del proyecto: ');

		if (!projectName) {
			console.error('❌ Error: Debes proporcionar un nombre para el proyecto');
			process.exit(1);
		}
	}

	// Validar nombre del proyecto
	if (!/^[a-z0-9-_]+$/i.test(projectName)) {
		console.error('❌ Error: El nombre del proyecto solo puede contener letras, números, guiones y guiones bajos');
		process.exit(1);
	}

	const targetDir = path.resolve(process.cwd(), projectName);
	const sourceDir = path.join(__dirname, '..', 'template', 'base');

	// Verificar que el template existe
	if (!fs.existsSync(sourceDir)) {
		console.error('❌ Error: Template no encontrado. Ejecuta "npm run sync-template" primero.');
		process.exit(1);
	}

	// Verificar si el directorio ya existe
	if (fs.existsSync(targetDir)) {
		console.error(`❌ Error: El directorio "${projectName}" ya existe`);
		process.exit(1);
	}

	try {
		console.log(`🚀 Creando proyecto "${projectName}"...`);

		// Copiar archivos del template
		console.log('📁 Copiando archivos del template...');
		await fs.copy(sourceDir, targetDir, {
			// Incluir archivos ocultos (que comienzan con punto)
			filter: (src, dest) => {
				return true;
			},
			preserveTimestamps: true,
		});

		// Actualizar package.json con el nuevo nombre
		const packageJsonPath = path.join(targetDir, 'package.json');
		if (fs.existsSync(packageJsonPath)) {
			const packageJson = await fs.readJson(packageJsonPath);
			packageJson.name = projectName;
			await fs.writeJson(packageJsonPath, packageJson, { spaces: '\t' });
		}

		// Crear .env desde .env.example si existe
		const envExamplePath = path.join(targetDir, '.env.example');
		const envPath = path.join(targetDir, '.env');
		if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
			await fs.copy(envExamplePath, envPath);
			console.log('🔧 Archivo .env creado desde .env.example');
		}

		// Instalar dependencias automáticamente
		console.log('📦 Instalando dependencias...');

		// Mostrar indicador de progreso
		const progressChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
		let progressIndex = 0;
		const progressInterval = setInterval(() => {
			process.stdout.write(`\r${progressChars[progressIndex]} Instalando dependencias...`);
			progressIndex = (progressIndex + 1) % progressChars.length;
		}, 100);

		try {
			// Cambiar al directorio del proyecto e instalar dependencias
			execSync('pnpm install', {
				cwd: targetDir,
				stdio: 'pipe',
			});

			clearInterval(progressInterval);
			process.stdout.write('\r✅ Dependencias instaladas correctamente!           \n');

			// Ejecutar prisma generate
			console.log('🔧 Generando cliente de Prisma...');
			try {
				execSync('npx prisma generate', {
					cwd: targetDir,
					stdio: 'pipe', // Modo headless/oculto
				});
				console.log('✅ Cliente de Prisma generado correctamente!');
			} catch (prismaError) {
				console.log('⚠️  No se pudo generar el cliente de Prisma automáticamente.');
				console.log('   Puedes generarlo manualmente ejecutando:');
				console.log(`   cd ${projectName} && npx prisma generate`);
			}
		} catch (installError) {
			clearInterval(progressInterval);
			process.stdout.write('\r⚠️  No se pudieron instalar las dependencias automáticamente.\n');
			console.log('   Puedes instalarlas manualmente ejecutando:');
			console.log(`   cd ${projectName} && pnpm install`);
		}

		console.log('✅ Proyecto creado exitosamente!');
		console.log('');
		console.log('📋 Próximos pasos:');
		console.log(`   cd ${projectName}`);
		console.log('   pnpm dev      (para iniciar el servidor de desarrollo)');
		console.log('');
		console.log('¡Feliz programación!');
	} catch (error) {
		console.error('❌ Error al crear el proyecto:', error.message);

		// Limpiar directorio si se creó parcialmente
		if (fs.existsSync(targetDir)) {
			try {
				await fs.remove(targetDir);
			} catch (cleanupError) {
				console.error('⚠️  No se pudo limpiar el directorio parcial:', cleanupError.message);
			}
		}

		process.exit(1);
	}
}

createApp().catch(console.error);
