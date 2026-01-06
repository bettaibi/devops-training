# GitHub Actions Exercises

This folder contains exercise files for learning GitHub Actions.

## Structure

```
.github/workflows/
├── deploy-web-workflow.yml      # Original (reference)
├── test-workflow.yml            # Original (reference)
└── exercises/
    ├── exercise-01-optimize-deploy-workflow.yml    # Exercise template (clean)
    ├── exercise-02-matrix-and-artifacts.yml        # Exercise template (clean)
    ├── exercise-03-caller.yml                      # Exercise template (clean)
    ├── reusable-build.yml                          # Exercise template (clean)
    ├── README.md                                   # This file
    └── solutions/
        ├── solution-01-optimize-deploy-workflow.yml  # Completed solution
        ├── solution-02-matrix-and-artifacts.yml      # Completed solution
        ├── solution-03-caller.yml                    # Completed solution
        └── reusable-build.yml                        # Completed solution
```

## How It Works

### Exercise Templates (`exercises/` root)
- **Clean templates** with instructions, requirements, hints, and TODOs
- **Never modified** - kept pristine for future practice
- Use `push` trigger on `test-workflows` branch for easy testing

### Your Solutions (`exercises/solutions/`)
- **Your completed work** goes here
- Copy/create your solution file when you complete an exercise
- These files preserve your learning progress
- Use `workflow_dispatch` trigger to prevent auto-running

## Workflow

1. **Read the exercise template** in `exercises/` root
2. **Create your solution** - either:
   - Edit a copy in `solutions/` folder, OR
   - Edit in exercises root, then move to solutions when done
3. **Test your solution** - push to `test-workflows` branch
4. **Keep template clean** - exercise files stay unchanged for future re-practice

## Rules

1. ✅ **Exercise templates** in `exercises/` root - kept clean with TODOs
2. ✅ **Completed solutions** in `exercises/solutions/` - your actual work
3. ✅ **Original workflows** in `workflows/` root - reference only, never modify
4. ✅ **Naming convention**:
   - Templates: `exercise-XX-description.yml`
   - Solutions: `solution-XX-description.yml`

## Testing

**Exercise workflows in root** will run automatically on push to `test-workflows` branch.

**To test a solution from solutions/ folder:**
- Temporarily copy it to `exercises/` root (overwriting the template), OR
- Use `workflow_dispatch` trigger and run manually from Actions tab

**After testing:** Reset the template file if you overwrote it.

## Benefits

- 🔄 Can redo exercises anytime with clean templates
- 📚 Solutions preserved as reference
- 🎯 Clear separation between templates and completed work
- 🧹 Easy to reset and start fresh
