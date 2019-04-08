module.exports = {
  name: "hrd",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/hrd/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
