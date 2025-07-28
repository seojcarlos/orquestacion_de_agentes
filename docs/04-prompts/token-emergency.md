# 🚨 **COMANDO DE EMERGENCIA - PROBARLO AHORA**

> **Para probar inmediatamente que la nueva estrategia funciona**

---

## 🎯 **COMANDO PARA PROBAR AHORA (F1-M1-S1-D1 PARTE 1)**

Copia y pega exactamente este comando:

```bash
claude-code "CREAR ESTRUCTURA BASE F1-M1-S1-D1

TAREA: 'Setup inicial del proyecto + Principios Clean Code'
ARCHIVO: src/app/agencia/mes-1/semana-1/dia-1/page.tsx

CREAR SOLAMENTE:
1. Imports necesarios (React, Next.js, componentes UI)
2. Header dinámico con task info y progreso  
3. Navegación entre secciones
4. Progress tracker
5. Estructura de componentes (sin contenido interno)

COMPONENTES A CREAR (estructura vacía):
- TaskHeader con info F1-M1-S1-D1
- TheorySection (solo estructura)
- ExamplesSection (solo estructura) 
- PracticeSection (solo estructura)
- EvaluationSection (solo estructura)

TECNOLOGÍAS: Next.js 14, React, TypeScript, shadcn/ui
LÍMITE: 4000 tokens máximo

NO INCLUIR: Contenido de teoría, ejemplos, o evaluación (viene en siguientes llamadas)"
```

---

## ✅ **QUÉ ESPERAR:**

1. **Se creará**: `src/app/agencia/mes-1/semana-1/dia-1/page.tsx`
2. **Contendrá**: Estructura básica sin contenido pesado
3. **Tokens usados**: ~4000 (muy por debajo del límite)
4. **No habrá error** de 32k tokens

---

## 🔄 **DESPUÉS DE QUE FUNCIONE:**

Si este comando funciona sin error, entonces:

1. ✅ **La estrategia funciona**
2. ✅ **Puedes continuar con PARTE 2, 3, 4**
3. ✅ **Aplicar lo mismo a D2, D4, D5**

---

## 📝 **SI SIGUE DANDO ERROR:**

Verifica que la configuración esté bien:
```powershell
echo $env:CLAUDE_CODE_MAX_OUTPUT_TOKENS
```

Si no sale 30000, ejecutar:
```powershell
setx CLAUDE_CODE_MAX_OUTPUT_TOKENS "15000"
```

**¡Prueba este comando ahora para verificar que la estrategia funciona!** 🚀
