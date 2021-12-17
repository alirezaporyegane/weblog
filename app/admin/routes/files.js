const express = require('express'),
router = express.Router(),
{create, remove, update } = require('../http/controller/File'),
upload  = require('../http/middleware/upload')

router.post('/', upload.single('image'), create)
router.delete('/:filename', remove)
router.put('/:filename', upload.single('image'), update)

module.exports = router
