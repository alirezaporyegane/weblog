const express = require('express'),
router = express.Router(),
fileControllre = require('../http/controller/File'),
upload  = require('../http/middleware/upload')

router.post('/', upload.single('image'), fileControllre.create)
router.delete('/:filename', fileControllre.remove)
router.put('/:filename', upload.single('image'), fileControllre.update)

module.exports = router
