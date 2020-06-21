const { Octokit } = require('@octokit/rest');
const { Base64 } = require('js-base64');
const fs = require('fs');

if (process.env.MODE !== 'production') {
  require('dotenv').config();
}

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const main = async () => {
  try {
    const content = fs.readFileSync('./input.txt', 'utf-8');
    const contentEncoded = Base64.encode(content);

    const data = await octokit.repos.createOrUpdateFile({
      owner: `Dennis O'Keeffe`,
      repo: 'okeeffed/octokit-create-file-example',
      path: 'OUTPUT.md',
      message: 'feat: Added OUTPUT.md programatically',
      content: contentEncoded,
    });

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

main();
