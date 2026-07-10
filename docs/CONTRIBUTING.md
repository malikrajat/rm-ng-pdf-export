# Contributing to rm-ng-pdf-export

Thank you for your interest in contributing to `rm-ng-pdf-export`! We welcome contributions from the community and are grateful for your help in making this library better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm
- Git
- Angular CLI (version 14 or higher)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rm-ng-pdf-export.git
   cd rm-ng-pdf-export
   ```

3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/malikrajat/rm-ng-pdf-export.git
   ```

## Development Setup

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install example dependencies
cd examples/basic-usage && npm install
cd ../invoice-generator && npm install
cd ../dashboard-export && npm install
```

### Build the Library

```bash
# Build the library
npm run build

# Watch for changes during development
npm run watch
```

### Run Examples

```bash
# Start the main application
npm start

# Or run specific examples
cd examples/basic-usage && npm start
```

## Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

- **Bug fixes**
- **New features**
- **Documentation improvements**
- **Code style improvements**
- **Performance improvements**
- **Test improvements**
- **Example additions**

### Coding Standards

#### TypeScript/Angular Guidelines

- Use **TypeScript strict mode**
- Follow **Angular style guide**
- Use **meaningful variable and function names**
- Add **JSDoc comments** for public APIs
- Maintain **backward compatibility** when possible

#### Code Style

```typescript
// Good
export interface PdfExportConfig {
  pageSize?: PageSize;
  orientation?: PageOrientation;
  filename?: string;
}

// Good - Clear function naming
async exportHtmlToPdf(element: HTMLElement, config?: PdfExportConfig): Promise<void> {
  // Implementation
}

// Avoid - Unclear naming
async export(el: any, cfg?: any): Promise<any> {
  // Implementation
}
```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Examples

```bash
feat(service): add support for custom page margins
fix(directive): resolve memory leak in PDF export
docs(readme): update installation instructions
test(service): add unit tests for page size validation
```

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 2. Make Your Changes

- Write clean, well-documented code
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Test Your Changes

```bash
# Run unit tests
npm run test

# Run linting
npm run lint

# Build the library
npm run build
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat(service): add new PDF export feature"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

## Issue Reporting

### Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, browser, Angular version, etc.)
- **Code sample** that demonstrates the issue
- **Error messages** from console (if any)

### Feature Requests

For feature requests, please include:

- **Problem description** - what problem does this solve?
- **Proposed solution** - how should it work?
- **Use cases** - when would this be used?
- **API design** - how should the API look?

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

## Documentation

### Types of Documentation

1. **API Documentation** - JSDoc comments in code
2. **Usage Examples** - In `/examples` folder
3. **README** - Main project documentation
4. **Guides** - In `/docs` folder

### Adding Examples

When adding new examples:

1. Create a new folder in `/examples`
2. Include a comprehensive README.md
3. Provide working Angular application
4. Document the specific use case
5. Update the main examples README

## Tips for Contributors

### First-Time Contributors

- Start with documentation improvements
- Look for issues labeled `good first issue`
- Ask questions in issues or discussions
- Don't hesitate to reach out for help

### Experienced Contributors

- Help review other PRs
- Mentor new contributors
- Suggest architectural improvements
- Help with release planning

## Getting Help

If you need help:

- **GitHub Discussions** - For questions and community support
- **GitHub Issues** - For bug reports and feature requests
- **Email** - [mr.rajatmalik@gmail.com](mailto:mr.rajatmalik@gmail.com) for direct contact

## Project Structure

```
rm-ng-pdf-export/
├── src/
│   ├── lib/
│   │   ├── services/          # Core services
│   │   ├── directives/        # Angular directives
│   │   ├── components/        # Angular components
│   │   ├── interfaces/        # TypeScript interfaces
│   │   ├── tokens/           # Injection tokens
│   │   └── utils/            # Utility functions
│   ├── public-api.ts         # Public API exports
│   └── test.ts              # Test setup
├── examples/                 # Usage examples
├── docs/                    # Documentation
├── .github/                 # GitHub templates
├── package.json
├── README.md
└── LICENSE
```

Thank you for contributing to `rm-ng-pdf-export`! 
