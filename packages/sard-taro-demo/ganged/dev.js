const child_process = require('child_process')

const cp = child_process.exec('npm run dev:h5')

cp.stdout.pipe(process.stdout)
cp.stderr.pipe(process.stderr)

cp.stdout.on('data', (data) => {
  const ret = /Listening at (http:\/\/[0-9.]+:([0-9]+))/.exec(data)
  if (ret) {
    process.send({
      type: 'url',
      data: `http://localhost:${ret[2]}`,
    })
  }
})
