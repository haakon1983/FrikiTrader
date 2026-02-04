# FrikiTrader Web - AI Agent Instructions

## Project Overview

**FrikiTrader Web** is an Angular 21 standalone components application for buying/selling collectible items (trading cards, figures, comics, merchandise). It integrates Firebase Storage for image uploads and connects to a C# backend API (HTTPS on port 44319).

## Architecture

### Layered Structure (by feature directory)
- **`src/app/features/`** - Feature modules (auth, home, products)
  - Each feature is a lazy-loadable component (login, register, create-product)
  - Components use standalone pattern with direct imports
- **`src/app/shared/`** - Cross-feature utilities
  - `services/auth/` - Authentication state, login/register, JWT token management
  - `guards/` - Route protection via token validation
  - `interceptors/` - HTTP auth interceptor (ready for implementation)
  - `components/` - Reusable UI (header, navbar, footer)
- **`src/app/core/`** - Core services
  - `services/product/` - Product API operations (create, upload to Firebase)
  - `services/storage/` - Firebase Cloud Storage wrapper for image uploads

### Data Flow
1. **Authentication**: `Login` → `AuthService.login()` → JWT token → localStorage → `currentUser` signal
2. **Product Creation**: Form submission → `ProductService.crearProducto()` → `StorageService.uploadImage()` to Firebase → API POST
3. **Route Protection**: All routes except `/login` and `/register` require `ft_token` in localStorage (via `authGuard`)

## Key Patterns & Conventions

### Angular 21 Standalone Components
- **All components are standalone** with explicit `imports: [...]` (no NgModules)
- Use `inject()` for dependency injection: `private http = inject(HttpClient);`
- Prefer signal-based state: `currentUser = signal<any>(null);`

### Services & Dependency Injection
- Services marked with `@Injectable({ providedIn: 'root' })` for singleton pattern
- HTTP calls use `HttpClient` with `environment.apiUrl` base URL (see [src/app/environments/environment.ts](src/app/environments/environment.ts))
- Firebase operations use Angular Fire library: `inject(Storage)` for Cloud Storage

### Forms
- **Reactive Forms** pattern: `FormBuilder`, `FormGroup`, `Validators` (see [create-product.ts](src/app/features/products/create-product/create-product.ts))
- Validators include required, email, minLength patterns
- File uploads handled separately; preview via `FileReader` API

### Styling
- **SCSS** exclusively (configured in `angular.json`)
- Global styles in [src/styles.scss](src/styles.scss)
- Variables in [src/assets/styles/_variables.scss](src/assets/styles/_variables.scss)
- Bootstrap 5 & Bootstrap Icons pre-configured

## Critical Workflows

### Development
```bash
npm start          # ng serve on http://localhost:4200
npm test           # Run Vitest suite
npm run build      # Production build (budgets: 500kB initial, 1MB error)
npm run watch      # Watch mode for development
```

### Testing
- Test runner: **Vitest** (not Jasmine)
- Test files co-located: `*.spec.ts` next to component/service
- Example: [login.spec.ts](src/app/features/auth/login/login.spec.ts)

### Backend Integration
- API Base: `https://localhost:44319/api`
- Endpoints:
  - `POST /auth/register` - User registration with FormData (includes avatar)
  - `POST /auth/login` - Credentials → returns `{ token: "JWT..." }`
  - `POST /products` - Create product (requires imageUrl from Firebase)
- Token claim mapping: JWT "name" claim → `currentUser.userName`, "ProfilePictureUrl" → `avatar`

### Image Storage
- Uses **Firebase Cloud Storage** (initialized in [app.config.ts](src/app/app.config.ts))
- Upload workflow: `StorageService.uploadImage(file, 'productos')` returns public URL
- Files stored with timestamp: `${folder}/${Date.now()}_${filename}`

## File Organization & Naming

- Components: `PascalCase.ts` (e.g., `Login`, `CreateProduct`)
- Services: `kebab-case.ts` (e.g., `product-service.ts`, `storage.ts`)
- Guards/Interceptors: `kebab-case.ts` (e.g., `auth-guard.ts`)
- Templates: `component.html` in same directory
- Styles: `component.scss` (SCSS preferred)
- Tests: `component.spec.ts` co-located

## Common Tasks for Agents

### Add a New Feature Component
1. Create in `src/app/features/[feature-name]/[component-name]/`
2. Use standalone: `@Component({ standalone: true, imports: [...] })`
3. Add route to [app.routes.ts](src/app/app.routes.ts)
4. Protect route with `canActivate: [authGuard]` if user-only

### Create a New Service
1. Place in `src/app/shared/services/` or `src/app/core/services/` based on scope
2. Mark `@Injectable({ providedIn: 'root' })`
3. Use `environment.apiUrl` for backend calls
4. Return `Observable<T>` or Promise via `firstValueFrom()`

### Add HTTP Interceptor
- Already scaffolded: [auth-interceptor-interceptor.ts](src/app/shared/interceptors/auth-interceptor-interceptor.ts)
- Should inject `AuthService.getToken()` and append to Authorization header

### Styling
- Import SCSS variables: `@import 'variables';` (path already configured)
- Use Bootstrap utilities (Bootstrap 5 classes available)
- Component styles scoped via Angular ViewEncapsulation

## Integration Points

- **Firebase**: Init config in [app.config.ts](src/app/app.config.ts); auth & storage pre-configured
- **C# Backend**: HTTPS endpoint; expects FormData for multipart (avatar), JSON for others
- **JWT Tokens**: Stored in `localStorage` with key `ft_token` (note: code uses both `token` and `ft_token` inconsistently—standardize on `ft_token`)

## Known Inconsistencies to Watch
- Token storage key: Code uses `token` in AuthService but `ft_token` in authGuard—standardize on one
- Dummy data: `categoriasoDummy`, `estadosDummy` in create-product (replace with API calls)
- Auth interceptor not yet implemented despite being scaffolded

---

**Last updated**: February 3, 2026 | Angular 21 | Vitest | Firebase
