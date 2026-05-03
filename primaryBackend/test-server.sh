#!/bin/bash
npm run dev > /tmp/server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

sleep 4

echo "=== Server Output ==="
cat /tmp/server.log

echo ""
echo "=== Testing Port 3001 ==="
netstat -an | grep 3001 || echo "Port not listening"

echo ""
echo "=== Sending test request ==="
curl -s http://localhost:3001/api/v1/user || echo "Request failed"

echo ""
echo "Killing server..."
kill $SERVER_PID 2>/dev/null
