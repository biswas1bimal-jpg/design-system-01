# Figma-driven design system (browser-only)

A starter design system where **Figma Variables are the source of truth** and code is
generated automatically. No desktop apps required — everything runs in the browser and in
GitHub's cloud.

## The mental model: two pipelines

- **Pipeline 1 — tokens (design decisions).** Figma Variables -> export as DTCG JSON ->
  Style Dictionary (runs in GitHub Actions) -> `build/tokens.css` + `build/tokens.ts`.
  This does **not** need MCP or any AI. It is the backbone.
- **Pipeline 2 — components (structure & code).** Figma components -> Figma remote MCP ->
  Claude Code reads them and generates React that reuses your real tokens/components.

They meet in your React app, which imports the generated tokens and the components.

## What's in here

```
tokens/                     # <- the ONLY files you edit (via Figma export)
  primitives.tokens.json    #   raw palette, spacing, radii, type (mode-agnostic)
  semantic.base.tokens.json #   semantic aliases that don't change per mode
  semantic.light.tokens.json#   light-mode color aliases
  semantic.dark.tokens.json #   dark-mode color aliases
build/                      # <- AUTO-GENERATED, do not hand-edit
  tokens.css                #   :root (light) + [data-theme="dark"] (dark)
  tokens.ts                 #   typed map: tokens.colorTextDefault -> "var(--color-text-default)"
src/components/Button.tsx   # reference component (semantic tokens only)
examples/demo.html          # open to see light/dark flip
build.mjs                   # Style Dictionary build (light + dark -> one CSS)
.github/workflows/build-tokens.yml  # rebuilds tokens in the cloud on every change
CLAUDE.md                   # rules Claude Code reads automatically
```

---

# One-time setup (do once)

## Step 1 - Structure your Figma variables into 3 tiers

In Figma (browser), reorganize your existing variables into three collections so the export
maps cleanly onto this repo:

- **Primitives** - raw values only: a color ramp (blue 50..700), a gray ramp, spacing
  (space 1..7), radii, font sizes. No meaning attached.
- **Semantic** - aliases that point at primitives: bg/default, text/default, action/primary,
  border/default. **Put your light/dark modes on THIS collection** - the same semantic
  variable resolves to a different primitive per mode.
- (Optional later) **Component** - button/bg/primary -> action/primary.

Rule of thumb: buttons/cards/inputs reference **semantic** variables, never primitives.

Also, for Pipeline 2 to work well: use Auto Layout everywhere, make every reused element a
component with variants/properties, and name layers semantically (CardContainer, not Group 5).

## Step 2 - Create the GitHub repo and upload this folder

1. Go to https://github.com/new , create a repo (e.g. `design-system`). Private is fine.
2. On the repo page: **Add file -> Upload files**. Unzip this starter and **drag the whole
   folder in** (GitHub's web uploader preserves subfolders, including `.github/workflows/`).
   Commit to `main`.
   - Alternative: let Claude Code (Step 3) scaffold these files straight into the repo.
3. Open the **Actions** tab. You should see the *Build design tokens* workflow. If it didn't
   auto-run, click it -> **Run workflow**. When it finishes, `build/tokens.css` and
   `build/tokens.ts` are committed and always current - the build runs in GitHub's cloud, so
   you never install anything locally.

---

# Recurring workflow: change a token (100% browser)

1. In Figma, edit the variable (e.g. change action/primary), or add a new one.
2. Run your DTCG export plugin in Figma (browser). Good options from the Figma Community:
   **Token Exporter**, **Design Tokens (W3C) Export**, or **Design System Sync** /
   **styleframe** (these can push a Pull Request to GitHub for you automatically).
3. Put the exported JSON into `tokens/` on GitHub:
   - Manual: open the matching file on GitHub -> pencil (Edit) -> paste -> Commit. Or
     **Add file -> Upload files** to replace it.
   - Automated: if you used a GitHub-sync plugin, just review and **merge the PR** it opened.
4. The **Action reruns automatically**, rebuilds `build/tokens.css` + `tokens.ts`, and commits
   them. Your app picks up the new values on next build/deploy. Done - no local machine.

> Keep the file names/paths matching what `build.mjs` expects
> (primitives, semantic.base, semantic.light, semantic.dark). If your plugin exports a single
> combined file or different names, either configure the plugin's output, or ask Claude Code to
> adjust `build.mjs`'s `source` arrays to match.

---

# Connect Claude (browser)

## Step 3 - Claude Code on the web <-> your GitHub repo

1. Open Claude Code on the web (from claude.ai) and connect it to your GitHub account/repo.
   The GitHub connection is native here, so Claude can read the repo, edit files, run the
   build, and open PRs - all in the browser.
2. Because `CLAUDE.md` sits at the repo root, Claude Code reads it automatically and follows
   the token rules (semantic-only, light/dark via data-theme, components in src/components/).

## Step 4 - Add the Figma remote MCP to Claude Code

The remote Figma MCP is **link-based and needs no desktop app**, on any Figma plan/seat.
Add it to Claude Code:

```
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Then in a session run `/mcp`, select **figma**, choose **Authenticate**, and approve in the
browser (OAuth). To use it: in Figma, right-click a frame/component -> **Copy link to
selection**, paste that link into your prompt, and ask Claude to implement it. The server
extracts the node and returns variables, components, and layout.

**Honest caveats (verify against current behavior):**
- Figma only allows clients from its **MCP Catalog** (Claude Code, VS Code, Cursor, Codex...).
  Plain Claude.ai web chat is not a guaranteed client for Figma's *official* MCP - prefer
  Claude Code for the Figma connection.
- Claude Code *on the web* has at times surfaced only the GitHub connector in interactive
  sessions. If the Figma MCP doesn't appear there, reliable fallbacks are: (a) use Claude Code
  on a device where it does, or (b) skip MCP and paste the **Figma frame link + a screenshot**
  into your prompt - still strong context, just less structured.
- Your token pipeline (Steps 1-2) does **not** depend on any of this, so the design system is
  fully functional even if MCP is flaky.

## Step 5 - Claude Design

Claude Design works on a canvas rather than reading your repo. Give it your system as context:
paste the contents of `build/tokens.css` (or the tokens/ JSON) plus a short components guide
(what exists, which variants, when to use each). Then its mockups use your real colors, sizes,
and light/dark modes instead of defaults. (Exact import mechanics may change - check the
in-product docs.)

---

# Build apps with it

Point Claude Code at this repo and describe a screen. It will:
- import `build/tokens.css` at the app root,
- reuse `src/components/*` where possible,
- style everything with semantic var(--...) tokens, so light/dark works for free.

To preview tokens right now, open `examples/demo.html` and click the toggle.

## Extending later
- New component knobs -> add a `component.*` group in Figma, re-export, reference in code.
- New theme (e.g. high-contrast) -> add `semantic.hc.tokens.json`, add a third build in
  `build.mjs` under [data-theme="hc"].
- New platform (iOS/Android) -> add a Style Dictionary platform in `build.mjs`; the same tokens
  feed all of them.
