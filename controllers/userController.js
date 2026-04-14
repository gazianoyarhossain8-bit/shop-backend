import express from 'express'
import User from '../models/userModel.js'

const fetchUser = async(req, res) =>{
    try{
         await User.find()
        .then(data => res.json(data))

    }catch(err){
        res.status(401).json({
            message: err.message
        })
    }
}
export {fetchUser}