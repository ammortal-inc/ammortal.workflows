const repoName = process.env.REPO_NAME;
const branchName = process.env.BRANCH_NAME;

let assets;
let tagFormat;

switch (repoName) {
  case 'repo1':
    assets = ['CHANGELOG.md', 'file1.txt'];
    break;
  case 'repo2':
    assets = ['CHANGELOG.md', 'file2.txt'];
    break;
  case 'repo3':
    assets = ['CHANGELOG.md', 'file3.txt'];
    break;
  default:
    assets = ['CHANGELOG.md'];
}

switch (branchName) {
  case 'main':
    tagFormat = '${version}-rc';
    break;
  case 'prod':
    tagFormat = '${version}';
    break;
  default:
    tagFormat = '${version}';
}

module.exports = {
  branches: ['main', 'prod'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: assets, 
      },
    ],
  ],
  tagFormat: tagFormat
};
