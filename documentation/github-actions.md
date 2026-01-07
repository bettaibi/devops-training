# GitHub Actions Documentation

## Overview

GitHub Actions is a continuous integration and continuous deployment (CI/CD) platform that automates workflows directly in your GitHub repository. It enables you to build, test, and deploy code automatically when you push commits, create pull requests, or perform other repository events.

### Role and Purpose

GitHub Actions serves as an automation platform that:
- **Automates software workflows** directly in your GitHub repository
- **Builds, tests, and deploys** code automatically based on repository events
- **Orchestrates complex CI/CD pipelines** using YAML configuration files
- **Integrates seamlessly** with GitHub's ecosystem and third-party services
- **Provides hosted runners** or supports self-hosted runners for execution

## Continuous Integration and Continuous Deployment (CI/CD)

### What is CI/CD?

**Continuous Integration (CI)** is a practice where developers frequently integrate code changes into a shared repository, with automated builds and tests detecting integration errors quickly.

**Continuous Deployment/Delivery (CD)** extends CI by automatically deploying code changes to production or staging environments after passing tests and quality checks.

### Development Workflow Before CI/CD

Before CI/CD, teams worked differently:

**Typical Workflow:**

1. **Long Development Cycles**
   - Developers worked in isolation for days or weeks
   - Code stayed on individual machines without integration

2. **Manual Testing**
   - Tests run manually on local machines
   - Testing often skipped due to time constraints

3. **Manual Builds**
   - Build steps required manual execution
   - Failures discovered late

4. **Manual Deployments**
   - Manual deployment package preparation
   - Pushing a lot of changes to live all at once, making releases stressful and risky
   - Difficult rollbacks

#### Common Problems Without CI/CD

1. **Integration Conflicts**: Conflicting changes required hours of manual resolution. "It works on my machine" was common.

2. **Delayed Bug Detection**: Bugs found only during integration sessions, making debugging difficult.

3. **Inconsistent Environments**: Different configurations across machines and environments caused frequent issues.

4. **Lack of Quality Assurance**: No automated checks for code quality, style, or security vulnerabilities.

5. **Slower Release Cycles**: Manual integration, testing, and deployment phases added weeks to releases.

6. **High Risk Deployments**: Large batches of changes deployed manually with limited testing, making rollbacks difficult.

### Solution

- **Automated workflows** triggered by repository events (push, pull request, release)
- **Consistent testing environments** using containerized or pre-configured runners
- **Reusable actions** from the GitHub Marketplace or custom actions
- **Native GitHub integration** without external service configuration
- **Parallel job execution** for faster CI/CD pipelines
- **Secrets management** for secure credential handling

## Key Concepts

### 1. Workflows

A workflow is an automated process defined by a YAML file in the `.github/workflows/` directory. A repository can have multiple workflows, each performing different sets of tasks.

**Characteristics:**
- Defined in YAML files (`.yml` or `.yaml`)
- Stored in `.github/workflows/` directory
- Triggered by events (push, pull_request, schedule, manual, etc.)
- Can be enabled or disabled per repository

### 2. Jobs

A job is a set of steps that execute on the same runner. Jobs run in parallel by default but can depend on other jobs using the `needs` keyword.

**Characteristics:**
- Run in parallel by default
- Can have dependencies on other jobs
- Can run on different operating systems (Ubuntu, Windows, macOS)

### 3. Steps

Steps are individual tasks that run commands or actions. Steps execute sequentially within a job.

**Types of steps:**
- **Run commands**: Execute shell commands or scripts
- **Use actions**: Reusable units of code from the marketplace or custom actions

### 4. Actions

Actions are reusable units of code that can be shared across workflows. They can be:
- **Pre-built actions** from GitHub Marketplace
- **Custom actions** created by your organization

### 5. Runners

Runners are machines that execute workflows. GitHub provides hosted runners, or you can host your own.

**GitHub-hosted runners:**
- Ubuntu Linux, Windows, macOS
- Pre-installed software (Git, Node.js, Docker, etc.)
- Free tier limits apply

**Self-hosted runners:**
- Your own machines
- Full control over environment
- No usage limits

### 6. Events

Events are specific activities that trigger workflows, such as:
- `push`: Code pushed to a branch
- `pull_request`: Pull request opened, synchronized, or closed
- `workflow_dispatch`: Manual workflow trigger
- `schedule`: Cron-based scheduled execution
- `release`: Release published
- `workflow_call`: Workflow triggered by another workflow

### 7. Secrets and Variables

**Secrets:**
- Encrypted variables for sensitive data (API keys, passwords, tokens)
- Stored in repository settings
- Masked in logs

**Variables:**
- Non-sensitive configuration values
- Can be set at organization, repository, or environment level

## YAML File Composition

A typical GitHub Actions workflow file structure:

```yaml
name: Workflow Name

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

env:
  NODE_VERSION: '20'

jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
```

### Workflow File Structure Breakdown

```yaml
name:                    # Workflow name displayed in GitHub UI
on:                      # Events that trigger the workflow
  event-type:
    conditions:          # Event-specific conditions
env:                     # Environment variables (global)
jobs:                    # Collection of jobs
  job-id:                # Unique job identifier
    runs-on:             # Runner OS
    needs:               # Job dependencies
    env:                 # Job-specific environment variables
    steps:               # Collection of steps
      - name:            # Step name
        uses:            # Action to use
        with:            # Action inputs
        run:             # Command to execute
        env:             # Step-specific environment variables
```

## Example Workflows

### Example 1: CI Workflow for Node.js Application

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '20'

jobs:
  lint-and-test-api:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./components/api
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  lint-and-test-core:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./components/core
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: components/core/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  lint-and-test-web:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./components/web
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: components/web/package-lock.json
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
```

### Example 2: Docker Build and Push Workflow

Building and pushing Docker images to a container registry:

```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [ main ]
    paths:
      - 'components/**'
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_PREFIX: ${{ github.repository_owner }}

jobs:
  build-and-push-api:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    defaults:
      run:
        working-directory: ./components/api
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/api
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./components/api
          file: ./components/api/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  build-and-push-core:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    defaults:
      run:
        working-directory: ./components/core
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_PREFIX }}/core
          tags: |
            type=ref,event=branch
            type=sha,prefix={{branch}}-
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./components/core
          file: ./components/core/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## Common Workflow Patterns

### 1. Job Dependencies

Run jobs sequentially based on dependencies:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: dist/

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: build-artifacts
          path: dist/
      - run: npm test

  deploy:
    needs: [build, test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy
        run: echo "Deploying..."
```

### 2. Conditional Execution

Run steps or jobs based on conditions:

```yaml
jobs:
  conditional-job:
    runs-on: ubuntu-latest
    steps:
      - name: Always runs
        run: echo "This always runs"
      
      - name: Only on main branch
        if: github.ref == 'refs/heads/main'
        run: echo "Only on main"
      
      - name: Only on pull requests
        if: github.event_name == 'pull_request'
        run: echo "PR check"
      
      - name: Only if previous step succeeded
        if: success()
        run: echo "Previous step succeeded"
```

### 3. Environment Secrets

Using secrets in workflows:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Use secret
        run: |
          echo "Deploying with secret"
          # Secrets are automatically available as environment variables
          echo "${{ secrets.DATABASE_URL }}" | docker login ...
      
      - name: Use multiple secrets
        env:
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
        run: |
          echo "Connecting to $DB_HOST"
```

### 4. Workflow Reusability

Calling reusable workflows:

```yaml
# .github/workflows/reusable-build.yml
name: Reusable Build

on:
  workflow_call:
    inputs:
      component:
        required: true
        type: string
      node-version:
        required: false
        type: string
        default: '20'

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./components/${{ inputs.component }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm run build

# .github/workflows/main.yml
name: Main Workflow

on:
  push:
    branches: [ main ]

jobs:
  build-api:
    uses: ./.github/workflows/reusable-build.yml
    with:
      component: api
      node-version: '20'
  
  build-core:
    uses: ./.github/workflows/reusable-build.yml
    with:
      component: core
  
  build-web:
    uses: ./.github/workflows/reusable-build.yml
    with:
      component: web
```

## Common Commands and Operations

### Manual Workflow Execution

Workflows with `workflow_dispatch` can be triggered manually from the GitHub UI:

1. Go to **Actions** tab in your repository
2. Select the workflow
3. Click **Run workflow**
4. Choose branch and inputs (if any)
5. Click **Run workflow**

### Viewing Workflow Runs

- **GitHub UI**: Navigate to Actions tab to see all workflow runs
- **CLI**: Use GitHub CLI (`gh run list`, `gh run view`, `gh run watch`)

### Checking Workflow Status

```bash
# List recent workflow runs
gh run list

# View specific workflow run
gh run view <run-id>

# Watch a running workflow
gh run watch <run-id>

# View workflow logs
gh run view <run-id> --log
```

### Re-running Workflows

- **GitHub UI**: Click "Re-run all jobs" or "Re-run failed jobs" in the Actions tab
- **CLI**: `gh run rerun <run-id>`

## Best Practices

### 1. Use Specific Action Versions

Always pin actions to specific versions or SHA commits:

```yaml
# ✅ Good - specific version
- uses: actions/checkout@v4

# ✅ Better - specific SHA
- uses: actions/checkout@8f4b7f84864484a7bf31766abe9204da3cbe65b3

# ❌ Bad - branch or tag
- uses: actions/checkout@main
```

### 2. Minimize Workflow Permissions

Use the least privilege principle:

```yaml
permissions:
  contents: read      # Only read repository contents
  packages: write     # Only write to packages
  actions: read       # Only read actions
```

### 3. Cache Dependencies

Cache npm, pip, or other package manager dependencies to speed up workflows:

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 4. Use Matrix Strategies

Test across multiple versions and configurations:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

### 5. Handle Failures Gracefully

Use `if: always()` to run cleanup steps regardless of success or failure:

```yaml
- name: Cleanup
  if: always()
  run: |
    docker compose down -v
    # Cleanup commands
```

### 6. Separate Secrets from Variables

- **Secrets**: Sensitive data (API keys, passwords, tokens)
- **Variables**: Non-sensitive configuration (URLs, version numbers)

### 7. Use Environment Protection Rules

Protect production deployments with required reviewers and environment-specific secrets.

### 8. Optimize Workflow Speed

- Run independent jobs in parallel
- Use job dependencies for sequential requirements
- Cache dependencies and build artifacts
- Use matrix strategies efficiently

### 9. Document Workflows

Add comments and clear step names:

```yaml
- name: Build Docker image for API component
  # This step builds the API Docker image with multi-stage build
  # The context is set to components/api directory
  run: docker build -t api:latest ./components/api
```

### 10. Test Workflows Locally

Use `act` or similar tools to test workflows locally before pushing:

```bash
# Install act
brew install act  # macOS
# or download from GitHub releases

# Run workflow locally
act -j build
```

## Workflow Status Badges

Add workflow status badges to your README:

```markdown
![CI](https://github.com/username/repo/workflows/CI/badge.svg)
![Deploy](https://github.com/username/repo/workflows/Deploy/badge.svg)
```

## Troubleshooting Common Issues

### 1. Workflow Not Triggering

- Check event syntax in `on:` section
- Verify file is in `.github/workflows/` directory
- Ensure file has `.yml` or `.yaml` extension
- Check branch names match exactly

### 2. Permissions Denied

- Review workflow permissions
- Check repository secrets and variables
- Verify GitHub token permissions

### 3. Jobs Timing Out

- Increase timeout: `timeout-minutes: 30`
- Optimize slow steps
- Check for hanging processes

### 4. Caching Not Working

- Verify cache key uniqueness
- Check cache path matches restore path
- Ensure cache key changes when dependencies change

### 5. Secrets Not Available

- Verify secrets are set in repository settings
- Check secret names match exactly (case-sensitive)
- Ensure secrets are not masked in logs incorrectly

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions) - Complete GitHub Actions documentation
- [GitHub Actions Reference](https://docs.github.com/en/actions/reference) - Workflow syntax and API reference
- [GitHub Marketplace](https://github.com/marketplace?type=actions) - Browse and discover reusable actions
- [GitHub Actions Examples](https://docs.github.com/en/actions/examples) - Example workflows and use cases

