# AI Resume Screener Frontend

Angular frontend for an AI-powered resume analysis and screening application. The app lets users sign up, log in, upload resumes, view analysis results, manage profile details, and use dashboard views for resume screening workflows.

## Tech Stack

- Angular 15
- TypeScript
- RxJS
- Tailwind CSS
- Flowbite
- ngx-toastr
- Karma and Jasmine for unit testing
- Nginx for containerized production serving

## Features

- User login and signup
- OAuth success and failure handling
- Role-based routing for admin and authenticated users
- Resume upload and analysis workflow
- Admin dashboard for resume screening
- User dashboard for candidate-facing views
- Resume listing and profile pages
- Chatbot and resume finder components
- Global loading spinner and toast notifications
- HTTP auth and loading interceptors

## Prerequisites

Install the following before running the project:

- Node.js 18 or later
- npm
- Angular CLI 15

Install Angular CLI globally if needed:

```bash
npm install -g @angular/cli@15
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open the app in your browser:

```text
http://localhost:4200
```

The app will automatically reload when source files change.

## Environment Configuration

Backend API URLs are configured in the Angular environment files:

- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

Development configuration:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/',
  appName: 'AI Resume Screener (Dev)'
};
```

Production configuration:

```ts
export const environment = {
  production: true,
  apiUrl: 'http://13.204.215.154:8080/',
  appName: 'AI Resume Screener (Prod)'
};
```

Update `apiUrl` if your backend runs on a different host or port.

## Available Scripts

Run the local development server:

```bash
npm start
```

Build the application:

```bash
npm run build
```

Build continuously in development mode:

```bash
npm run watch
```

Run unit tests:

```bash
npm test
```

## Application Routes

| Route | Component | Access |
| --- | --- | --- |
| `/login` | Login | Public |
| `/signupForm` | Signup | Public |
| `/oauth-success` | OAuth success | Public |
| `/oauth-failure` | OAuth failure | Public |
| `/dashboard` | Admin dashboard | Authenticated admin |
| `/userdashboard` | User dashboard | Authenticated user |
| `/show-resumes` | Resume list | Authenticated user |
| `/profile` | Profile | Authenticated user |

The root route redirects to `/login`.

## Project Structure

```text
src/
  app/
    components/       UI pages and reusable components
    guards/           Route guards for auth and admin access
    helperclass/      Shared helper components and services
    Interceptor/      HTTP interceptors for auth and loading state
    models/           TypeScript interfaces and DTO models
    pipes/            Custom display pipes
    services/         API and application services
  environments/       Angular environment configuration
  styles.scss         Global styles
```

## Important Components

- `LoginComponent`: Handles user login.
- `SignupComponent`: Handles user registration.
- `DashboardComponent`: Admin dashboard for resume screening.
- `UserdashboardComponent`: User-facing dashboard.
- `UploadresumeComponent`: Resume upload flow.
- `ShowAllResumesComponent`: Displays uploaded resumes.
- `AnalyzeComponent`: Resume analysis workflow.
- `ProfileComponent`: User profile page.
- `ChatbotComponent` and `ChatbotfinderComponent`: Chatbot-assisted interactions.
- `SpinnerComponent`: Global loading indicator.

## Services and API Layer

The application keeps API communication in Angular services under `src/app/services`.

Common service responsibilities include:

- Authentication and login
- Resume upload and analysis
- Dashboard data loading
- Resume editing
- Email actions
- Chatbot requests
- Search suggestions
- Polling long-running analysis status
- Toast queue handling

Auth tokens and loading state are handled through HTTP interceptors:

- `AuthInterceptor`
- `LoadingInterceptor`

## Styling

Global styles are defined in:

- `src/styles.scss`
- `src/styles.css`

The project also includes Tailwind CSS and Flowbite configuration:

- `tailwind.config.js`
- `postcss.config.js`

## Build

Create a production-ready build:

```bash
npm run build
```

Build output is generated in:

```text
dist/airesume-screener
```

## Docker

The project includes a multi-stage `Dockerfile`:

1. Builds the Angular app with Node.js 18.
2. Serves the generated files with Nginx.

Build the Docker image:

```bash
docker build -t ai-resume-screener-frontend .
```

Run the container:

```bash
docker run -p 80:80 ai-resume-screener-frontend
```

Open:

```text
http://localhost
```

Nginx is configured in `nginx.conf` to support Angular client-side routing by falling back to `index.html`.

## Testing

Run unit tests:

```bash
npm test
```

Tests are written with Jasmine and executed through Karma.

## Development Notes

- Keep API calls inside services.
- Use route guards for protected pages.
- Keep environment-specific backend URLs in Angular environment files.
- Use models from `src/app/models` for API request and response shapes.
- Run tests before merging frontend changes.

