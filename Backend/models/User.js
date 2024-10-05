const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
         type: String,
         required:true,
         unique:true,
    },
    password:{
        type:String,
        required:true
    },
},{ timestamps: true });


// Hash password before saving
 

userSchema.pre('save', async (next)=>{
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.comparePassword = async (password)=>{
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;