# Issue Tracker

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `webapp`: [Next.js](https://nextjs.org/) app
- `api`: [Express.js](https://expressjs.com/) api
- `@repo/data-commons`: a shared library to share code between the workspaces

---

### Build

To build all apps and packages, run the following command:

```bash
$ yarn build
```

---

### Develop

`Docker Compose`:

```bash
$ docker compose down -v && docker compose build && docker compose up
```

To develop all apps and packages, run the following command:

```bash
$ yarn dev
```

---
