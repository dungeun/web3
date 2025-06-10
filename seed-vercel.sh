#!/bin/bash

echo "Seeding Vercel PostgreSQL database..."

curl -X POST https://home-omega-bay.vercel.app/api/admin/seed-database \
  -H "Content-Type: application/json" \
  -d '{"secretKey": "seed-database-2024"}'

echo ""
echo "Done!"