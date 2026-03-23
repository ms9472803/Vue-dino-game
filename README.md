# Vue-dino-game

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup


### Installation
```sh
yarn install
```

### Hot-Reload for Development

```sh
yarn dev
```

### Compile

```sh
yarn build
```

## CI/CD

This project uses GitHub Actions for CI/CD:

- `CI` runs `yarn build` on every push and pull request
- `Deploy to GitHub Pages` is triggered manually from GitHub Actions and requires a release version such as `0.0.1`

### GitHub Pages setup

Before the first deployment, enable Pages for the repository:

1. Go to `Settings > Pages`
2. In `Build and deployment`, set `Source` to `GitHub Actions`
3. Save the change

After this one-time setup, deployments are started manually from the `Deploy to GitHub Pages` workflow.

### Manual deployment

1. Open `Actions > Deploy to GitHub Pages`
2. Click `Run workflow`
3. Enter `release_version` such as `0.0.1`
4. Run the workflow to deploy the current `main` commit

Each manual deployment also creates a GitHub tag and GitHub Release named exactly as `<release_version>`.

### Optional automatic enablement

If you want the workflow to enable Pages automatically on the first run, add a repository secret named `GH_PAGES_TOKEN`:

- With a classic PAT, use the `repo` scope
- With a fine-grained token, grant `Administration: Read and write` and `Pages: Read and write`

Without that secret, the deploy workflow will stop early with a clear message if Pages has not been enabled yet.

### Troubleshooting

If the deploy workflow fails with `Get Pages site failed` or `HttpError: Not Found`, the repository has not finished GitHub Pages setup yet, or Pages is not configured to build with `GitHub Actions`.

Because GitHub Pages is static hosting, the deployed app uses hash-based routes such as `/#/a` so page refreshes do not return a 404.
