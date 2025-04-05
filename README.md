# Multiplatform Web/Electron app example

Example Electron app built using TypeScript, Vite and React.  
It can be built both as an Electron desktop app as well as SPA for web deployment (limited functionality).

The project is a monorepo of several `yarn` workspaces for clear separation of web-only, desktop-only and common code:
- [app](packages/app)
- [web](packages/web)
- [desktop-ui](packages/desktop-ui)
- [desktop](packages/desktop)
- [types](packages/types)
- [components](packages/components)

## Setup
```
yarn i
```

## Run dev server
```
yarn run dev:web
yarn run dev:desktop
```

## Build
```
yarn run build:web
yarn run build:desktop
```
