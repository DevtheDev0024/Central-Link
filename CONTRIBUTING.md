# Contributing

This project is the Central Link Toastmasters Member Dashboard. Keep changes focused, reviewable, and consistent with the existing React, TypeScript, Vite, Tailwind, and Toastmasters design conventions.

## Branch Naming

Use short, descriptive branch names with a type prefix:

- `feature/<short-description>` for new functionality
- `fix/<short-description>` for bug fixes
- `style/<short-description>` for visual/UI-only changes
- `refactor/<short-description>` for internal restructuring without behavior changes
- `docs/<short-description>` for documentation-only changes
- `chore/<short-description>` for maintenance work

Examples:

- `feature/admin-member-import`
- `fix/dashboard-sort-order`
- `style/member-table-controls`
- `docs/contribution-guide`

## Commit Messages

Use Conventional Commits:

```text
type(scope): short summary
```

Common types:

- `feat`: new user-facing functionality
- `fix`: bug fix
- `style`: visual styling or layout changes
- `refactor`: code restructuring without intended behavior changes
- `docs`: documentation changes
- `test`: test additions or updates
- `chore`: dependency, config, or maintenance work

Examples:

```text
feat(admin): add member deactivation flow
fix(dashboard): stabilize leaderboard animation
style(landing): refine closing slideshow transition
docs(repo): add contribution guidelines
```

For non-trivial commits, add detail bullets in the commit body:

```text
style(dashboard): refine member table controls

- stretch the member performance table across desktop viewport
- add a scoped thin grey scrollbar
- redesign search controls with a pill input and expanding help button
```

## Pull Requests

Open PRs into `main`. Keep each PR scoped to one clear goal. Avoid mixing unrelated UI, logic, dependency, and documentation changes unless they are required for the same outcome.

Before opening a PR:

- Run `npm run build`.
- Confirm the worktree only contains intended changes.
- Verify responsive layouts when changing UI.
- Do not commit secrets, `.env` values, credentials, or private Google Sheet details.

## PR Description Template

Use this structure:

```md
## Summary
- What changed?
- What user-facing behavior or workflow is affected?

## Why
- What problem does this solve?
- What was confusing, broken, or missing before?

## Notable Changes
- Key implementation details.
- Important UI or data behavior changes.

## Validation
- `npm run build`
- Manual checks performed, if any.

## Screenshots / Notes
- Add screenshots for visual changes.
- Mention known limitations or follow-up work.
```

## Review Expectations

Reviewers should prioritize:

- Broken behavior, regressions, and accessibility issues.
- Data loading and Google Sheets CSV integration behavior.
- Responsive layout issues across mobile, tablet, and desktop.
- Unnecessary dependencies or large assets.
- Consistency with the project style guide and Toastmasters branding.

Visual feedback should be specific. Reference the component, screen size, and expected outcome when possible.

## Code Style

- Prefer existing project patterns over introducing new abstractions.
- Keep components focused and readable.
- Use TypeScript types for shared data shapes.
- Keep Tailwind classes intentional and consistent with the design system.
- Use semantic buttons and links for interactive UI.
- Maintain visible focus states and readable color contrast.
- Avoid changing navigation state names or data-fetching contracts unless necessary.

## Assets

- Store public images under `public/`.
- Optimize large images before adding them.
- Use descriptive filenames where possible.
- Do not remove or replace brand assets without confirming the impact across landing and dashboard views.

## Deployment

Production builds use `npm run build` and publish the `dist` folder as a static site.
