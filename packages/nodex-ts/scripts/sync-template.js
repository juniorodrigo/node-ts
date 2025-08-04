#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

async function syncTemplate() {
	console.log('🔄 Sincronizando template desde el proyecto padre...');

	// Rutas
	const packageDir = path.join(__dirname, '..'); // packages/nodets-template/
	const projectRoot = path.join(packageDir, '..', '..'); // node-ts/
	const templateDir = path.join(packageDir, 'template', 'base'); // template/base/

	// Directorios y archivos a excluir
	const excludeItems = [
		'packages', // No incluir la carpeta packages (evita recursión)
		'node_modules', // No incluir dependencias
		'.git', // No incluir historial de git
		'logs', // No incluir logs específicos del proyecto
		'.claude', // No incluir archivos de desarrollo
		'.husky', // Los hooks de git se configurarán en el nuevo proyecto
		'dist', // No incluir archivos compilados
		'build', // No incluir archivos de build
		'.env', // No incluir variables de entorno específicas
		'.DS_Store', // No incluir archivos del sistema
		'.github', // No incluir workflows de GitHub
		'.vscode', // No incluir configuraciones de VSCode
	];

	try {
		// Limpiar directorio template/base/ si existe
		if (await fs.pathExists(templateDir)) {
			console.log('🗑️  Limpiando template anterior...');
			await fs.remove(templateDir);
		}

		// Crear directorio template/base/
		await fs.ensureDir(templateDir);

		console.log('📁 Copiando archivos desde node-ts/...');
		console.log(`   Origen: ${projectRoot}`);
		console.log(`   Destino: ${templateDir}`);

		// Obtener lista de archivos y directorios en el directorio raíz
		const items = await fs.readdir(projectRoot);

		// Copiar cada item individualmente, excluyendo los especificados
		for (const item of items) {
			if (excludeItems.includes(item)) {
				console.log(`   ⏭️  Excluyendo: ${item}`);
				continue;
			}

			const srcPath = path.join(projectRoot, item);
			const destPath = path.join(templateDir, item);

			console.log(`   📁 Copiando: ${item}`);
			await fs.copy(srcPath, destPath);
		}

		console.log('✅ Template sincronizado exitosamente!');
		console.log(`📦 Contenido copiado a: template/base/`);
	} catch (error) {
		console.error('❌ Error al sincronizar template:', error.message);
		process.exit(1);
	}
}

// Ejecutar si se llama directamente
if (require.main === module) {
	syncTemplate().catch(console.error);
}

module.exports = syncTemplate;
