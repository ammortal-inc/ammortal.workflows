const repoAssets = process.env.REPO_ASSETS;
const branchName = process.env.BRANCH_NAME;

let tagFormat;
let nextReleaseVersion;

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
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE'],
          mergePattern: /^Merge pull request #(\d+) from (.*)$/,
          mergeCorrespondence: ['id', 'source'],
        },
        releaseRules: [
          { type: 'fix', release: 'patch' },  // bugfix branch
          { type: 'feat', release: 'minor' }, // feature branch
          { type: 'hot', release: 'patch' },  // hotfix branch
        ],
      },
    ],
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
        assets: repoAssets, 
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
