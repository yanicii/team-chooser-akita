module.exports = {
  name: 'team-chooser',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/team-chooser',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
