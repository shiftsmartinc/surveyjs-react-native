const { spawn, exec } = require('child_process');

const tsc = spawn('tsc', ['-w', '--inlineSourceMap', '--inlineSources', '--pretty']);

tsc.stdout.on('data', (data) => {
  exec('cp -rf ./dist/* ./example/node_modules/surveyjs-react-native/dist');
  console.log(`${data}`);
});

tsc.stderr.on('data', (data) => {
  console.log(`${data}`);
});
