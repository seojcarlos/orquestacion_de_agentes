# 🔒 SCRIPT DE VERIFICACIÓN PRE-COMMIT PARA WINDOWS
# Protege archivos críticos de eliminación accidental

Write-Host "🔍 Verificando archivos protegidos..." -ForegroundColor Cyan

# Lista de archivos protegidos (críticos)
$PROTECTED_FILES = @(
    "src/components/MenuLateral.tsx",
    "src/components/layout/NavBar.tsx", 
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/tutoriales/page.tsx",
    "src/app/tutoriales/layout.tsx",
    "mi-agencia-ia/src/simple-server.js",
    "mi-agencia-ia/src/server.js",
    "mi-agencia-ia/package.json",
    "package.json",
    "README.md",
    "PLAN_48_SEMANAS.md"
)

# Verificar archivos que se van a eliminar
$DELETED_FILES = git diff --cached --name-only --diff-filter=D

if ($DELETED_FILES) {
    Write-Host "⚠️  ARCHIVOS QUE SE VAN A ELIMINAR:" -ForegroundColor Yellow
    $DELETED_FILES | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Write-Host ""
    
    # Verificar si algún archivo protegido está siendo eliminado
    foreach ($protected_file in $PROTECTED_FILES) {
        if ($DELETED_FILES -contains $protected_file) {
            Write-Host "🚨 ERROR: Intentando eliminar archivo protegido: $protected_file" -ForegroundColor Red
            Write-Host ""
            Write-Host "Este archivo está en la lista de protección (.protected-files)" -ForegroundColor Yellow
            Write-Host "Para eliminarlo necesitas:" -ForegroundColor Yellow
            Write-Host "1. Confirmar explícitamente con el usuario"
            Write-Host "2. Hacer backup del archivo"
            Write-Host "3. Documentar por qué es necesario eliminarlo"
            Write-Host "4. Usar: git commit --no-verify (solo con autorización)"
            Write-Host ""
            exit 1
        }
    }
    
    # Si hay muchos archivos eliminados, advertir
    $NUM_DELETED = $DELETED_FILES.Count
    if ($NUM_DELETED -gt 5) {
        Write-Host "⚠️  ADVERTENCIA: Se van a eliminar $NUM_DELETED archivos" -ForegroundColor Yellow
        Write-Host "Esto es un commit de eliminación masiva."
        Write-Host "¿Estás seguro de que esto es correcto?"
        Write-Host ""
        Write-Host "Para continuar: git commit --no-verify"
        Write-Host "Para cancelar: Ctrl+C"
        Write-Host ""
        Read-Host "Presiona Enter para continuar o Ctrl+C para cancelar"
    }
}

# Verificar tamaño del commit
$CHANGES = git diff --cached --numstat
$ADDED_LINES = ($CHANGES | ForEach-Object { ($_ -split "`t")[0] } | Measure-Object -Sum).Sum
$DELETED_LINES = ($CHANGES | ForEach-Object { ($_ -split "`t")[1] } | Measure-Object -Sum).Sum

Write-Host "📊 Estadísticas del commit: Added: $ADDED_LINES, Deleted: $DELETED_LINES" -ForegroundColor Green

# Si es un commit muy grande, advertir
if ($DELETED_LINES -gt 1000) {
    Write-Host "🚨 ADVERTENCIA: Este commit elimina $DELETED_LINES líneas" -ForegroundColor Red
    Write-Host "Esto es un cambio masivo. Considera dividirlo en commits más pequeños."
    Write-Host ""
}

Write-Host "✅ Verificación completada. Procediendo con el commit..." -ForegroundColor Green
