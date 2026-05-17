exports.validateProduct = (req,res, next)=>{
    const { name, price, quantity, description } = req.body;
    if (!name || !price || !quantity || !description) {
        return res.status(400).json({message: 'All fields are required'})
    }
    next()
}