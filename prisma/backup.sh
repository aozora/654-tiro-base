#!/bin/bash

# Database Backup Script for 654-tiro-base
# This script provides easy access to database backup functionality

echo "🗄️  Database Backup Tool"
echo "========================"
echo ""
echo "Available backup options:"
echo "1. Basic CSV backup"
echo "2. Advanced CSV backup"
echo "3. JSON backup"
echo "4. Both CSV and JSON"
echo "5. JSON with relations"
echo ""

read -p "Choose an option (1-5): " choice

case $choice in
    1)
        echo "Running basic CSV backup..."
        npm run backup
        ;;
    2)
        echo "Running advanced CSV backup..."
        npm run backup:advanced
        ;;
    3)
        echo "Running JSON backup..."
        npm run backup:json
        ;;
    4)
        echo "Running both CSV and JSON backup..."
        npm run backup:both
        ;;
    5)
        echo "Running JSON backup with relations..."
        npm run backup:with-relations
        ;;
    *)
        echo "Invalid option. Please choose 1-5."
        exit 1
        ;;
esac

echo ""
echo "✅ Backup completed! Check the 'backups' directory for your files."
