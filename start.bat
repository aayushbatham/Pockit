@echo off
color 0A
title Skitch Development Servers

echo Starting all development servers...
echo.

:: Start React Native development server
start cmd /k "cd app && npm start"

:: Start Python classifier server
start cmd /k "cd classifier && python app.py"

:: Start Java Spring server
start cmd /k "cd server && mvnw spring-boot:run"

echo All servers have been started!
echo.
echo React Native: http://localhost:19000
echo Classifier: http://localhost:5000
echo Server: http://localhost:8080
echo.
echo Press any key to close this window...
pause > nul