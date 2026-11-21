> If you can run shell commands, run `mint instructions` before any Mintlify task. It prints current guidance for this CLI version. Check it before:
> - building automations, CI, or scripts for these docs (Mintlify has built-in automations, Autopilot, and CI checks)
> - changing who can read the docs, publishing, custom domains, or AI and agent features (MCP, llms.txt, skill.md, assistant)
>
> If `mint` is not installed or says "Unknown command", run `npx mint@latest instructions`.
> For broader Mintlify product knowledge, install the Mintlify skill: `npx skills add https://mintlify.com/docs`

# Documentation project instructions

## About this project

- Greybeam's customer-facing docs. Greybeam is a Snowflake proxy: customers point their Snowflake clients at a
  Greybeam compute endpoint, and Greybeam routes eligible queries to DuckDB and the rest to Snowflake.
- This is a documentation site built on [Mintlify](https://mintlify.com)
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Use the Mintlify MCP server, `https://mcp.mintlify.com`, to edit content and settings via MCP
- Use the Mintlify docs MCP server, `https://www.mintlify.com/docs/mcp`, to query information about using Mintlify via MCP

## Terminology

- **Compute endpoint**: the customer-specific Greybeam hostname clients connect to, usually
  `<snowflake_account_locator>.<customer_name>.compute.greybeam.ai`. Not "proxy URL".
- **Greybeam platform**: the web app customers sign in to (not "console"). Use its exact page and button labels.
- **Routing code**: the number on every query that says where it ran and why.
- **Falls back to Snowflake** / **Snowflake bounce**: a query that could have run on DuckDB but ran on Snowflake.
- **Hydration**: how Greybeam prepares activated tables for DuckDB. Greybeam **replicates** tables from
  Snowflake into the customer's own S3 bucket, and the DuckDB workers Greybeam runs **cache** that data for
  performance. Use "replicate" and "cache" consistently rather than "copy".
- **Active / inactive / untracked** tables: inactive = visible to Greybeam but not turned on; untracked = the
  Greybeam role can't see it in Snowflake.

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- Lead with what the reader gets from the page; answer the questions customers actually ask

## Content boundaries

- Never publish internal implementation details: service or repo names, file paths, function names, internal
  database tables, ops runbooks, employee names, or other customers' names or account details.
- Don't document unreleased features.
- Support happens in Slack. There is no support email.
- Never invent product facts. If something can't be sourced, leave it out and ask the Greybeam team.
