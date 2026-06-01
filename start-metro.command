#!/bin/bash
# Double-clickable Metro launcher — always runs from the project root.
cd /Users/moon/Documents/underdawg/underdawg-app || exit 1
echo "Starting Metro from: $(pwd)"
exec npx react-native start --reset-cache
