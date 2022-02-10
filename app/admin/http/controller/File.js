const File = require('../../models/Files')

class FileController {
  async create(req, res) {
    const file = new File({
      image: req.file.path.slice(7),
    })

    file
      .save()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }

  async update(req, res) {
    const filename = req.params.filename
    console.log(filename)

    File.findOneAndUpdate(
      { image: filename },
      {
        image: req.file.path,
      },
      { new: true }
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }

  async remove(req, res) {
    const filename = req.params.filename

    File.remove({ image: filename })
      .then(() => {
        res.status(200).json(true)
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        })
      })
  }
}

module.exports = new FileController()
