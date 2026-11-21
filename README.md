# Greybeam docs

Customer-facing documentation for Greybeam, built with [Mintlify](https://mintlify.com).

## Layout

| Path | Contents |
| - | - |
| `docs.json` | Site config and navigation |
| `index.mdx`, `quickstart.mdx`, `get-started/` | Get started |
| `platform/` | Greybeam platform (console walkthrough) |
| `connect/` | Connecting dbt, BI tools, and drivers |
| `how-it-works/` | Query routing and hydration |
| `reference/` | Routing codes, SQL support, external tables, limitations |
| `troubleshooting/` | Troubleshooting guides |
| `images/`, `videos/` | Screenshots and the explainer video |
| `motion/` | Hyperframes source for the explainer video (not published; see `motion/README.md`) |
| `style.css` | Brand styling |

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) and run it from the repo root:

```bash
npm i -g mint
mint dev
```

Preview at `http://localhost:3000`. Before you push:

```bash
mint validate
mint broken-links
```

## Writing

Follow `AGENTS.md` for style. Never publish internal implementation details (service names, file paths,
internal tables) or unreleased features.

## Publishing

Pushes to the default branch deploy through the Mintlify GitHub app.
