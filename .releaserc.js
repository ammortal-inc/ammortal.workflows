const repoName = process.env.REPO_NAME;
const branchName = process.env.BRANCH_NAME;

let assets;
let tagFormat;
let nextReleaseVersion;

switch (repoName) {
  case 'chamber.a4.backend.test.semantic.release':
    assets = ['CHANGELOG.md', 'src/**/*.{py}'];
    break;
  case 'chamber.a4.assets.test.semantic.release':
    assets = [
      'sessions/**/*',
      'pre_sessions/**/*',
      'music/**/*',
      'guides/**/*'
    ];
    break;
  case 'chamber.a4.frontend.test.semantic.release':
    assets = ['static/**/*.{js,html,css}'];
    break;
  default:
    assets = [];
}

switch (branchName) {
  case 'main':
    tagFormat = '${version}-rc';
    nextReleaseVersion = "echo '{\"nextReleaseVersion\": \"${nextRelease.version}-rc\"}' > version.json"
    break;
  case 'prod':
    tagFormat = '${version}';
    nextReleaseVersion = "echo '{\"nextReleaseVersion\": \"${nextRelease.version}\"}' > version.json"
    break;
  default:
    tagFormat = '${version}';
    nextReleaseVersion = "echo '{\"nextReleaseVersion\": \"${nextRelease.version}\"}' > version.json"
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
        publishCmd: nextReleaseVersion
      }
    ]
  ],
  tagFormat: tagFormat
};
