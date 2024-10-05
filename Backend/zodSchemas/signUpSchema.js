const { z } = require('zod');
const signupSchema = z.object({
    
    username: z.string().min(6,{message:"Username must be at least 3 charachters long "}),
    email: z.string().email({message:"Please enter a valid email"}),
    password:z.string().min(8,{message:"Password must be at least 8 charachters long"}).max(20,{message:"Password must be at most 20 charachters long"}),

});

module.exports = signupSchema;