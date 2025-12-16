# GitHub Actions Exercises

This folder contains exercise files for learning GitHub Actions.

## Structure

```
.github/workflows/
├── deploy-web-workflow.yml      # Original (reference)
├── test-workflow.yml            # Original (reference)
└── exercises/
    ├── exercise-01-*.yml        # Exercise 1: Optimize deploy workflow
    ├── exercise-02-*.yml        # Exercise 2: (future)
    └── ...
```

## Rules

1. **Never modify original files** - They serve as reference
2. **Create exercise files** - Practice in this folder
3. **Naming convention** - `exercise-XX-description.yml`

## Note

Exercise workflows won't run automatically because:
- They're in a subfolder (GitHub only runs workflows in `.github/workflows/` root)
- They have incomplete configurations until solved

To test a solution, you can temporarily copy it to the parent folder.
