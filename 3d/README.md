# 3D Portfolio Files

This directory contains all files related to the 3D portfolio view that have been moved from the main codebase.

## Structure

```
3d/
├── components/
│   ├── galaxy/          # All 3D galaxy components
│   │   ├── Galaxy.tsx
│   │   ├── Spaceship.tsx
│   │   ├── Planet.tsx
│   │   ├── CameraControls.tsx
│   │   ├── PlanetVehicle.tsx
│   │   └── ISS.tsx
│   └── ui/              # 3D-related UI components
│       ├── Mobile3DWarning.tsx
│       └── Preloader.tsx
└── public/              # 3D assets
    ├── spaceship.png
    ├── 3dportfolio.png
    └── models/
        ├── spaceship.glb
        └── iss.glb
```

## How to Restore the 3D Portfolio

To reactivate the 3D portfolio view, follow these steps:

1. **Move components back:**
   ```bash
   # Move galaxy components
   mv 3d/components/galaxy/* components/galaxy/
   
   # Move UI components
   mv 3d/components/ui/Mobile3DWarning.tsx components/ui/
   mv 3d/components/ui/Preloader.tsx components/ui/
   ```

2. **Move assets back:**
   ```bash
   # Move 3D assets
   mv 3d/public/spaceship.png public/
   mv 3d/public/3dportfolio.png public/
   mv 3d/public/models/* public/models/
   ```

3. **Restore code in main files:**
   - Restore the Galaxy import and 3D mode logic in `app/page.tsx`
   - Restore the 3D mode switching button in `components/ui/TopBar.tsx`
   - Restore 3D mode references in `app/academics/page.tsx`

4. **Update imports:**
   - Ensure all imports point to the correct paths (e.g., `@/components/galaxy/Galaxy`)
   - Update any asset paths if needed

## Notes

- The 3D portfolio was disabled to simplify the codebase
- All files maintain their original structure for easy restoration
- The main app now only uses the BoxesView (2D portfolio view)

