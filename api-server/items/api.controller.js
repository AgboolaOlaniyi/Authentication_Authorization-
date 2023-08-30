const fs = require('fs')

const Createitems = (req, res) => {
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const itemCreate = req.body

    const postWithId = { ...itemCreate, id: Math.floor(Math.random() * 500).toString() }
    items.push(postWithId)
    fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
        if (err) {
            res.status(500)
        }
        res.status(200).json(postWithId)
    })
}

const Getitems = (req, res) => {
    const items = fs.readFileSync("./db/items.json")
    return res.status(200).send(items)
}

const getOneitem = (req, res) => {
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const id = req.params.id
    const founditem = items.find((item) => {
        return item.id == parseInt(id)
    })
    if (!founditem) {
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(founditem)
}

const updateitem = (req, res) => {
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const id = req.params.id
    const update = req.body
    const foundIndex = items.findIndex(item => item.id == parseInt(id))
    if (foundIndex == -1) {
        res.end(`item with id ${id} is not found`)
        return
    }
    items[foundIndex] = { ...items[foundIndex], ...update }
    res.status(200).json(items[foundIndex])
}

const deleteitem = (req, res) => {
    const itemsDB = fs.readFileSync("./db/items.json")
    const items = JSON.parse(itemsDB)

    const id = req.params.id
    const foundIndex = items.findIndex(item => item.id == parseInt(id))
    if (foundIndex == -1) {
        res.end(`item with id:${id} is not found`)
        return
    }
    items.splice(foundIndex, 1)
    res.end(`item with id:${id}, deleted successfully`)
}

module.exports = {
    Getitems,
    Createitems,
    updateitem,
    getOneitem,
    deleteitem
}








