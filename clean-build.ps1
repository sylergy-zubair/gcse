# Clean Next.js build cache
Write-Host "Cleaning Next.js build cache..."

if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Removed .next directory"
}

if (Test-Path node_modules/.cache) {
    Remove-Item -Recurse -Force node_modules/.cache
    Write-Host "✓ Removed node_modules/.cache"
}

Write-Host "Build cache cleaned! Now run: npm run dev"

