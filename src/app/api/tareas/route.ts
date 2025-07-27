// ⚠️ VERSIÓN SIMPLE - SOLO PARA DESARROLLO LOCAL
// NO USAR EN PRODUCCIÓN - Sin validación ni seguridad
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Sin validación de seguridad - directo al grano
    const datos = await request.json();
    
    // Ruta del README
    const readmePath = path.join(process.cwd(), 'docs', 'README.md');
    
    // Verificar que el archivo existe
    try {
      await fs.access(readmePath);
    } catch {
      return NextResponse.json(
        { error: 'README.md no encontrado' },
        { status: 404 }
      );
    }
    
    // Leer archivo
    let contenido = await fs.readFile(readmePath, 'utf-8');
    
    // Formatear la nueva tarea
    const nuevaTarea = `- [ ] ${datos.titulo}${datos.ruta ? ` (\`${datos.ruta}\`)` : ''}`;
    
    // Buscar dónde insertar la tarea
    if (datos.categoria) {
      // Buscar la categoría
      const regex = new RegExp(`### ${datos.categoria}[\\s\\S]*?(?=###|##|$)`);
      const match = contenido.match(regex);
      
      if (match) {
        // Categoría existe, agregar tarea al final de esa sección
        contenido = contenido.replace(regex, (sectionMatch) => {
          return sectionMatch.trimEnd() + `\n${nuevaTarea}\n`;
        });
      } else {
        // Crear nueva categoría después de "Tareas Pendientes"
        const insertPoint = contenido.indexOf('## 🚧 Tareas Pendientes');
        if (insertPoint !== -1) {
          const endOfTitle = contenido.indexOf('\n', insertPoint) + 1;
          const beforeInsert = contenido.substring(0, endOfTitle);
          const afterInsert = contenido.substring(endOfTitle);
          contenido = beforeInsert + `\n### ${datos.categoria}\n${nuevaTarea}\n` + afterInsert;
        }
      }
    } else {
      // Sin categoría, agregar después de "Tareas Pendientes"
      contenido = contenido.replace(
        '## 🚧 Tareas Pendientes',
        `## 🚧 Tareas Pendientes\n\n${nuevaTarea}`
      );
    }
    
    // Actualizar fecha de modificación
    const fechaActual = new Date().toLocaleString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(' de ', ' ');
    
    contenido = contenido.replace(
      /\*\*Fecha última actualización\*\*: .+/,
      `**Fecha última actualización**: ${fechaActual}`
    );
    
    // Guardar archivo
    await fs.writeFile(readmePath, contenido, 'utf-8');
    
    // Log simple para desarrollo
    console.log('✅ Tarea registrada:', {
      titulo: datos.titulo,
      categoria: datos.categoria || 'Sin categoría',
      ruta: datos.ruta || 'Sin ruta especificada',
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Tarea registrada exitosamente',
      tarea: {
        titulo: datos.titulo,
        categoria: datos.categoria,
        ruta: datos.ruta
      }
    });
    
  } catch (error) {
    console.error('❌ Error al registrar tarea:', error);
    return NextResponse.json(
      { 
        error: 'Error al registrar la tarea',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// GET para verificar que la API funciona
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'API de tareas funcionando',
    uso: 'POST /api/tareas con { titulo, categoria?, ruta? }'
  });
}