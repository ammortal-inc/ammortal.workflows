const repoName = process.env.REPO_NAME;
const branchName = process.env.BRANCH_NAME;

let assets;
let tagFormat;

switch (repoName) {
  case 'chamber.a4.backend.test.semantic.release':
    assets = ['CHANGELOG.md', 'src/**/*.{py}'];
    break;
  case 'chamber.a4.assets.test.semantic.release':
    assets = [
      'CHANGELOG.md', 
      'sessions/**/*',
      'pre_sessions/**/*',
      'music/**/*',
      'guides/**/*'
    ];
    break;
  case 'chamber.a4.frontend.test.semantic.release':
    assets = ['CHANGELOG.md', 'static/**/*.{js,html,css}'];
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
    [
      "@semantic-release/exec",
      {
        publishCmd: "echo 'Next release version: ${nextRelease.version}'"
      }
    ]
  ],
  tagFormat: tagFormat
};
