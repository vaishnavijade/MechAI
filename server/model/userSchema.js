const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    tokens:[
        {
            token: {
                type:String,
                required:true,
            }
        }
    ],
    verified:{
        type:Boolean, 
        default:false,
    },
    verificationCode:{
        type:String,
    }
},{timestamps:true})

// Hashing password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    // Generate and set a random verification code if the user is not verified
    if (!this.verified && !this.verificationCode) {
        this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit random code
    }

    next();
});

//to generate token
userSchema.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    }catch(err){
        console.log(err);
        throw new Error('Token generation failed'); // Throw error for better error handling
    }
    
}

const User=mongoose.model('User',userSchema);

module.exports = User;