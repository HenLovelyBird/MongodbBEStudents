const express = require("express")
const { ObjectId } = require ('mongodb')
const userSchema = require('./schema')
const bookSchema = require('../schema/bookschema')
const router = express.Router()

router.get("/:id/calculate-cart-total", async (req, res, next) => {
    try {
        const { cart } = await userSchema.findById(req.params.id)

        const total = cart.reduce( 
            (prev, curr) => prev.price * prev.quantity + curr.price * curr.quantity
            );

        res.send( {total} );
    } catch (err) {
        res.send(err);
    }
});

router.get("/", async (req, res, next) => {})

router.post("/", async (req, res, next) => {})

router.put("/:id", async (req, res, next) => {})

router.delete("/:id/remove-from-cart/:bookId", async (req, res, next) => {
    try {
        await userSchema.findByIdAndUpdate(req.params.id, {
            $pull: { cart: { _id: req.params.bookId }}
        });
        res.send("ok")
    } catch(err) {
    res.send(err)
}
})

router.post("/:id/add-tocart:bookId", async (req, res, next) => {
    const book = await bookSchema.findById(req.params.bookId)
    const newBook = {...book.toObject(), quantity: 1}
    const response =  await userSchema.find({ _id: req.params.id, 
        cart: { $elemMatch: { _id: new ObjectId(req.params.bookId) }} 
    })
    if(response.length > 0) {
        await userSchema.updateOne({_id: req.params.id, "cart._id": new ObjectId(req.params.bookId)}, 
        { $inc: { "cart.$.quantity": 1 }}
        );
        res.send("Quantity incremented")
    } else {
        await userSchema.updataeOne({ _id: req.params.id}, { $addToSet: { cart: newBook}}
        ); b   
        res.send("new book added")
    }
    res.send(response)
});

module.exports = router;