@echo off
title Vo Lam Chibi 3D - Khoi Dong Game 3D
cd /d "%~dp0"

echo ========================================================
echo   VO LAM CHIBI 3D - THU MUC GAME 3D DOC LAP
echo ========================================================
echo.
echo Dang khoi dong may chu noi bo cho Game 3D...
node server.js
if %errorlevel% neq 0 (
    echo.
    echo [THONG BAO] Khong the chay server Node.js.
    echo Dang mo truc tiep bang trinh duyet...
    start "" "index.html"
)
pause
