const { spawn, exec } = require('child_process');

const tsc = spawn('tsc', ['-w', '--inlineSourceMap', '--inlineSources', '--pretty']);

tsc.stdout.on('data', (data) => {
  if (`${data}`.includes('complete')) {
    exec('cp -r ./dist/* ./example/node_modules/surveyjs-react-native');
  }
  console.log(`${data}`);
});

tsc.stderr.on('data', (data) => {
  console.log(`${data}`);
});
