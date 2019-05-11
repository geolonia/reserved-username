const fs = require('fs')
const { promisify } = require('util')
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const main = async () => {
  const dirs = (await readdir('./src')).map(dir => `src/${dir}`)
  const names = [
    ...new Set(
      (await Promise.all(dirs.map(dir => readFile(dir)))).flatMap(x =>
        JSON.parse(x.toString())
      )
    )
  ]
  names.sort()
  await writeFile('./dest.json', JSON.stringify(names, null, 2))
}

main()
