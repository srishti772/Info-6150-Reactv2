// controller.js
const User = require("../model/user");

var emailPattern = /([\w\.-]+)@northeastern\.edu$/;
var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
var namePattern = /^[a-zA-Z\s]+$/;

// ... (other imports)

module.exports = {
    create: async (req, res) => {
       
        try {
            const { fullName, email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
     

            const errors = [];

            if (!emailPattern.test(email)) {
                errors.push('Use a valid northeastern email address');
            }

            if (fullName.length < 2) {
                errors.push('First name must be at least 2 characters long');
            }

            if (!namePattern.test(fullName)) {
                errors.push('Invalid characters in name');
            }

            if (!passwordPattern.test(password)) {
                errors.push('Password must be 8 to 10 characters long with 1 uppercase letter, number, and special character');
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }

            

            // Create a new user
            const newUser = new User({
                fullName,
                email,
                password,
            });

            // Save the user in the database
            const val = await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } 
         catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    edit: async (req, res) => {
        let update_email=req.params.email;
        let update_name=req.body.fullName;
        let update_password=req.body.password;
        
        console.log('inside put');

                    
        const errors = [];

        //validate fullname and email address
        if (update_name.length < 2) {
            errors.push('First name must be at least 2 characters long');
        }

        if (!namePattern.test(update_name)) {
            errors.push('Invalid characters in name');
        }

        if (!passwordPattern.test(update_password)) {
            errors.push('Password must be 8 to 10 characters long with 1 uppercase letter, number, and special character');
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

       

       try{ const updatedUser = await User.findOneAndUpdate(
            { email: update_email },
            { $set: { fullName: update_name, password: update_password} },
            { new: true }
        );
    
        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found' });}

            res.status(201).json({message: 'User updated successfully'});
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    delete: async (req, res) => {
        let deleteEmail=req.params.email;

            try{ const deletedUser=await User.findOneAndDelete(
                ({ email: deleteEmail }));
         
                if(!deletedUser){
                 return res.status(404).send({message:"User not found"});
                }
                else return res.status(200).send({message:"User deleted successfully : "+deletedUser.fullName});}
         catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }


    },

    getAll: async (req, res) => {
        try{
            const users=await User.find().exec();
            if(!users || users.length===0){
                return res.status(404).json({ message:"No users found in the database"});
            }
            const formattedUsers = users.map((user) => ({
                fullName: user.fullName,
                email: user.email,
                password: user.password,
            }));
    
            res.json(formattedUsers);
        }
        catch(err){
            console.log(err);
            res.status(404).json({ message:"Internal Server error"});
        }
    },
  
    login: async (req, res) => {
        try {
            const{email,password}=req.body;
            const errors = [];
            if (!emailPattern.test(email)) {
                errors.push('Use a valid northeastern email address');
            }
            if (!passwordPattern.test(password)) {
                errors.push('Password must be 8 to 10 characters long with 1 uppercase letter, number, and special character');
            }

            if (errors.length > 0) {
                return res.status(400).json({ errors });
            }
            const user=await User.findOne({email});
    
            if(!user){
                
                return res.status(404).json({message:"Invalid Username"});
            }
    
            if(user.password!==password){
                return res.status(404).json({message:"Password is incorrect!"});
            }
    
            return res.status(200).json({message:"Logged in Successfully"});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // You can add other controller methods as needed
};
