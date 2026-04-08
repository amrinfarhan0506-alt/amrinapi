const express = require("express")
const router = express.Router()
const schemesController = require("../controller/schemes.controller")

// Routes for schemes
router.get('/', schemesController.getSchemeAll)
router.get('/:id', schemesController.getSchemeById)
router.post('/', schemesController.insertScheme)
router.put('/:id', schemesController.updateScheme)
router.patch('/:id', schemesController.removeScheme)

module.exports = router