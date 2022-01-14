import { number } from 'joi'
import mongoose, { Schema } from 'mongoose'



const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An ingredient should have a name']
    },
    price: {
        type: number,
        required: [true, 'An ingredient should have a price']
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: [true, 'recipe must be provided']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'a user must be provided']
    }
})