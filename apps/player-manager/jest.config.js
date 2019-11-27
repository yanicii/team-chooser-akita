module.exports = {
  name: 'player-manager',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/player-manager',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
