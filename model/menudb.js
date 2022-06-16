const nedb = require('nedb-promise');
const database = new nedb({filename: 'menu.db', autoload: true});

async function getMenu() {
    let result = await database.find({});
    result.sort((a, b) => a.id - b.id);
    return result;
};

async function addItem (credentials) {
    const findItem = await database.find({id: credentials.id})
    
    if (findItem.length === 0) {
        const result = database.insert({id: credentials.id, title: credentials.title, desc: credentials.desc, price: credentials.price})
        return result;
    } else {
        console.log('Item already exists')
    }
};

async function deleteItem (credentials) {
    const findItem = await database.find({id: credentials.id})    
    if (findItem.length >= 0) {
        const result = database.remove({id: credentials.id})
        return result;
    }   
    return findItem;
};

module.exports = {getMenu, addItem, deleteItem};