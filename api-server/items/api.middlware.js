const ValidateItem = (req, res, next) => {
    const validitems = ['name', 'price', 'size'];

    if (validitems.includes(req.body.program)) {
        return res.status(422).json({
            data: null,
            error: 'Invlid program, use name, price and size'
        })
    }

    next()
}

module.exports = {
    ValidateItem
}