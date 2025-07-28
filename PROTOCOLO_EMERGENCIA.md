# 🚨 PROTOCOLO DE EMERGENCIA - ELIMINACIONES ACCIDENTALES

## 🆘 QUÉ HACER SI SE ELIMINA ALGO IMPORTANTE

### 1. **NO ENTRAR EN PÁNICO**
```bash
# El historial de Git mantiene TODO
git log --oneline -20  # Ver commits recientes
```

### 2. **LOCALIZAR EL ARCHIVO PERDIDO**
```bash
# Buscar en qué commit se eliminó
git log --oneline --follow -- ruta/al/archivo.tsx

# Ver el contenido del archivo en un commit anterior
git show commit_hash:ruta/al/archivo.tsx
```

### 3. **RESTAURAR ARCHIVO ESPECÍFICO**
```bash
# Restaurar un archivo desde un commit específico
git checkout commit_hash -- ruta/al/archivo.tsx

# Ejemplo real de este proyecto:
git checkout ba234c7 -- src/components/MenuLateral.tsx
```

### 4. **RESTAURAR MÚLTIPLES ARCHIVOS**
```bash
# Restaurar toda una carpeta
git checkout commit_hash -- src/components/

# Restaurar con patrón
git checkout commit_hash -- "src/app/tutoriales/*.tsx"
```

### 5. **CREAR RAMA DE RECUPERACIÓN**
```bash
# Crear rama desde commit anterior (más seguro)
git checkout -b recovery-branch commit_hash

# Copiar archivos necesarios
cp -r src/components/* ../backup/

# Volver a main y aplicar cambios
git checkout main
cp -r ../backup/* src/components/
```

---

## 🔧 COMANDOS DE INVESTIGACIÓN

### A. **Ver qué se eliminó en un commit**
```bash
git show --name-status commit_hash
git show --stat commit_hash
```

### B. **Ver diferencias específicas**
```bash
# Ver qué cambió en un archivo específico
git show commit_hash -- ruta/archivo.tsx

# Ver todos los cambios de eliminación
git diff --name-only --diff-filter=D commit_hash~1 commit_hash
```

### C. **Buscar contenido perdido**
```bash
# Buscar texto en todo el historial
git log -S "texto_a_buscar" --source --all

# Buscar en nombres de archivo
git log --oneline --name-only | grep "MenuLateral"
```

---

## 📋 CHECKLIST DE RECUPERACIÓN

### Antes de Restaurar:
- [ ] Identificar commit donde existía el archivo
- [ ] Verificar que el archivo funciona en ese commit
- [ ] Revisar dependencias que podrían haberse perdido
- [ ] Hacer backup del estado actual

### Durante la Restauración:
- [ ] Crear rama temporal para pruebas
- [ ] Restaurar archivo paso a paso
- [ ] Verificar que compila sin errores
- [ ] Comprobar que la funcionalidad sigue funcionando

### Después de Restaurar:
- [ ] Agregar archivo a `.protected-files`
- [ ] Documentar qué se recuperó y por qué
- [ ] Hacer commit con mensaje descriptivo
- [ ] Actualizar este protocolo si es necesario

---

## 🎯 CASOS ESPECÍFICOS DE ESTE PROYECTO

### MenuLateral.tsx (YA RESUELTO)
```bash
# Lo que hicimos:
git checkout ba234c7 -- src/components/MenuLateral.tsx
```

### Si se pierde mi-agencia-ia/
```bash
# Restaurar desde commit inicial
git checkout ba234c7 -- mi-agencia-ia/
```

### Si se pierden tutoriales
```bash
# Restaurar tutoriales específicos
git checkout HEAD~2 -- src/app/tutoriales/
```

---

**RECUERDA:** Git nunca pierde nada permanentemente. Solo necesitas saber dónde buscar.
