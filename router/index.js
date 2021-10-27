const router = require('express').Router();
const auth = require('./auth');
const { readRow, addRow, updateRow, deleteRow } = require('./news');


const { isAuthorized } = require('../middleware');
router.use('/auth', auth);
router.get('/news', readRow)
router.post('/news', addRow);
router.put('/news/update/:rowId', isAuthorized, updateRow);
router.delete('/news/:rowId', isAuthorized, deleteRow);

module.exports = router