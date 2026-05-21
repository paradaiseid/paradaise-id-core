@echo off
cd /d "C:\Users\pacos\Code\paradaise-id-core"
echo ============================================================
echo  AUTO PUSH paradaise-id-core
echo ============================================================
echo.
echo --- git status ---
git status --short
echo.
echo --- git add . ---
git add .
echo.
echo --- git commit ---
git commit -m "ui(demo+landing): step1 helper text + step4 reset al regresar + step7 duplicate fix + manifesto->inicio + CTAs en seccion funciona + ancho expandido + btn azul logo con pulse"
echo.
echo --- git push origin main ---
git push origin main
echo.
echo ============================================================
echo  DONE
echo ============================================================
echo.
pause
