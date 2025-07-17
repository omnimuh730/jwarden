# jwarden

A monorepo project using Yarn Berry workspaces.

## Project Structure

```
jwarden/
├── package.json          # Root package.json with workspace configuration
├── yarn.lock             # Yarn Berry lockfile
├── .gitignore            # Root gitignore for monorepo
└── jmanager/             # React + TypeScript + Vite application
    ├── package.json      # jmanager project dependencies
    ├── .gitignore        # Project-specific gitignore
    ├── vite.config.ts    # Vite configuration
    ├── tsconfig.json     # TypeScript configuration
    ├── eslint.config.js  # ESLint configuration
    ├── index.html        # Main HTML file
    ├── src/              # Source code
    │   ├── App.tsx       # Main React component
    │   ├── main.tsx      # Application entry point
    │   └── assets/       # Static assets
    └── public/           # Public assets
```

## Prerequisites

- Node.js (version 18 or higher)
- Yarn Berry (automatically managed via `packageManager` field)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd jwarden
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

   This will install dependencies for all workspaces in the monorepo.

## Available Commands

### Root Level Commands

- `yarn install` - Install dependencies for all workspaces
- `yarn workspace jmanager <command>` - Run commands in the jmanager workspace

### jmanager Workspace Commands

- `yarn workspace jmanager dev` - Start development server
- `yarn workspace jmanager build` - Build for production
- `yarn workspace jmanager preview` - Preview production build
- `yarn workspace jmanager lint` - Run ESLint

## Development

### Starting the Development Server

To start the jmanager development server:

```bash
yarn workspace jmanager dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To build the jmanager application for production:

```bash
yarn workspace jmanager build
```

### Linting

To run ESLint on the jmanager project:

```bash
yarn workspace jmanager lint
```

## Technologies Used

### jmanager
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **SWC** - Fast TypeScript/JavaScript compiler

## Package Manager

This project uses **Yarn Berry** (version 4.9.2) with `node-modules` linker for better compatibility with Vite and other build tools. The configuration is set in `.yarnrc.yml` for optimal development experience.

## Adding New Workspaces

To add a new workspace to the monorepo:

1. Create a new directory in the root
2. Add the directory name to the `workspaces` array in the root `package.json`
3. Create a `package.json` file in the new workspace directory
4. Run `yarn install` to update the workspace configuration

## Git Workflow

- The root `.gitignore` handles monorepo-wide ignores (Yarn Berry files, node_modules, etc.)
- Each workspace has its own `.gitignore` for project-specific artifacts
- Use standard Git workflow for version control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

[Add your license information here]
