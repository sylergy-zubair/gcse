# Troubleshooting Guide

## Module Resolution Errors

If you're seeing errors like:
```
Module not found: Error: Can't resolve './C:/Users/.../npm/node_modules/next/...'
```

This means Next.js is trying to use a global installation instead of the local one.

### Solution:

1. **Stop the dev server** (Ctrl+C in the terminal)

2. **Clean the build cache:**
   ```powershell
   Remove-Item -Recurse -Force .next
   Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
   ```

3. **Verify Next.js is installed locally:**
   ```powershell
   npm list next
   ```
   This should show `next@14.2.x` installed in your project.

4. **Reinstall if needed:**
   ```powershell
   npm install
   ```

5. **Restart the dev server:**
   ```powershell
   npm run dev
   ```

## Missing Build Manifest Errors

If you see:
```
ENOENT: no such file or directory, open 'E:\gcse\.next\fallback-build-manifest.json'
```

### Solution:

1. Delete the `.next` folder:
   ```powershell
   Remove-Item -Recurse -Force .next
   ```

2. Restart the dev server - Next.js will regenerate the build files.

## Windows Path Issues

If you're on Windows and having path resolution issues:

1. Make sure you're using the project's local `node_modules`
2. Use PowerShell (not CMD) for better path handling
3. Ensure no global Next.js installation is conflicting

## Still Having Issues?

1. **Delete node_modules and reinstall:**
   ```powershell
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   npm install
   ```

2. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   ```

3. **Check Node.js version:**
   ```powershell
   node --version
   ```
   Should be Node.js 18.17 or later.

