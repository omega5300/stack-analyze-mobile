// modules
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Wappalyzer = require('wappalyzer')

// port variable
const port = 4000 || process.env.port

// initial
const app = express()

app.use(morgan('short'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use('/', require('./routes'))

app.get('/', async (req, res) => {
  const wappalyzer = await new Wappalyzer()

  const { url } = req.query

  try {
    await wappalyzer.init()

    const results = await wappalyzer.open(url).analyze()

    await res.status(200).json(results.technologies)
  } catch (error) {
    await res.status(500).json({ msg: 'error' })
  }

  await wappalyzer.destroy()
})

app.listen(port, () => console.log('api on port', port))
