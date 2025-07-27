@echo off
echo 🚀 Iniciando sistema completo de Orquestación de Agentes...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado o no está en el PATH
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo.

REM Cambiar al directorio del proyecto
cd /d "%~dp0"

echo 📍 Directorio actual: %cd%
echo.

echo 🔧 Iniciando servidor de agentes IA en puerto 3001...
start "Agentes IA" cmd /k "node mi-agencia-ia/src/simple-server.js"

timeout /t 3 /nobreak >nul

echo 🌐 Iniciando interfaz web Next.js...
start "Next.js Web" cmd /k "npm run dev"

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎉 Sistema iniciado exitosamente
echo.
echo 📊 Servicios disponibles:
echo    🤖 Agentes IA: http://localhost:3001
echo    🌐 Interfaz Web: http://localhost:3000 (o 3002)
echo    💊 Health Check: http://localhost:3001/health
echo.
echo 💡 Tip: Ambos servicios se abrieron en ventanas separadas
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
pause
