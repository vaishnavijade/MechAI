const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    verified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
    },
}, { timestamps: true });

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

// Method to generate authentication token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Adding expiration to the token
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
        throw new Error('Token generation failed');
    }
};

// Method to clean up expired tokens
userSchema.methods.cleanExpiredTokens = function () {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const validTokens = this.tokens.filter(tokenObj => {
        const tokenTime = new Date(tokenObj.createdAt).getTime();
        const currentTime = Date.now();
        return currentTime - tokenTime < oneDayInMs; // Keep tokens valid for 1 day
    });

    this.tokens = validTokens;
    return this.save();
};

// Static method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
