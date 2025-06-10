#!/bin/bash

echo "🌱 Seeding database via Vercel deployment..."

# 여러 API 엔드포인트 시도
ENDPOINTS=(
  "https://home-omega-bay.vercel.app/api/admin/seed-database"
  "https://home-omega-bay.vercel.app/api/seed"
  "https://home-omega-bay.vercel.app/api/admin/seed"
)

for endpoint in "${ENDPOINTS[@]}"; do
  echo "Trying: $endpoint"
  
  response=$(curl -s -w "%{http_code}" -X POST "$endpoint" \
    -H "Content-Type: application/json" \
    -d '{"secretKey": "seed-database-2024"}')
  
  http_code="${response: -3}"
  body="${response%???}"
  
  echo "HTTP Code: $http_code"
  
  if [ "$http_code" = "200" ]; then
    echo "✅ Success! Response:"
    echo "$body" | head -10
    break
  elif [ "$http_code" = "404" ]; then
    echo "❌ Endpoint not found"
  elif [ "$http_code" = "405" ]; then
    echo "❌ Method not allowed"
  else
    echo "❌ Error: $body"
  fi
  
  echo "---"
done

echo "Done!" 