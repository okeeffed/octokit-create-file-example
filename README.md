# Using Octokit

## Resource

1. [Octokit - GitHub](https://github.com/octokit/rest.js/)
2. [Octokit - Documentation](https://octokit.github.io/rest.js/)

## Adding a file to a repo

```bash
npm install @octokit/rest
```

## Usage

```javascript
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos
  .listForOrg({
    org: 'octokit',
    type: 'public',
  })
  .then(({ data }) => {
    // handle data
  });
```

## Adding a file to a repo using Octokit

```javascript
const { Octokit } = require('@octokit/rest');
const { Base64 } = require('js-base64');
const fs = require('fs');

if (process.env.MODE !== 'production') {
  require('dotenv').config();
}

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const content = fs.readFileSync('file/to/path', 'utf-8');
const fileOutput = Base64.encode(content);

const data = await octokit.repos.createOrUpdateFile({
  owner: `Dennis O'Keeffe`,
  repo: 'okeeffed/repo-name',
  path: 'output.md',
  message: 'Action file output',
  content: fileOutput,
});
```
