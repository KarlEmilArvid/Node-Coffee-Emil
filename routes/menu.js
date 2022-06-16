const {Router} = require('express');
const router = Router();
const {getMenu} = require('../model/menudb');
const {auth} = require('../auth');
const {addItem, deleteItem} = require('../model/menudb')

router.get('/', async (request, response) => {
    const menu = await getMenu();
    const resObj = {success: false};

    if (menu) {
        resObj.success = true;
        resObj.menu = menu;
    } else {
        resObj.success = false;
    };
    response.json(resObj);
});

router.post('/', auth, async (request, response) => {
    const credentials = request.body;
    const resObj = {};
    if (credentials.hasOwnProperty('id') && credentials.hasOwnProperty('title') && credentials.hasOwnProperty('desc') && credentials.hasOwnProperty('price')) { 
        const result = await addItem(credentials);
        if (result) {
            resObj.message = 'Item added to menu'
            resObj.menu = result;
        } else {
            resObj.message = 'Item already exists'
        };
    } else {
        resObj.message = 'Failed to add item'
    }
    response.json(resObj);
});

router.delete('/', auth, async(request, response) => {
    const credentials = request.body;
    const resObj = {};
    if (credentials.hasOwnProperty('id')) {       
        const result = await deleteItem(credentials)
        if (result == 1 ) {
            resObj.message = 'Item deleted from menu'
        } else {
            resObj.message = 'Item does not exist'
        };
    } else {
        resObj.message = 'No ID found, please Input ID'
    }
    response.json(resObj);
});

module.exports = router;