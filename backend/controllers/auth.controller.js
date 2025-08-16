export const signup=async(req,res)=>
{
    try
    {
        res.send("Signup successful")
    }
    catch (error)
    {
        console.log(`\nError in signup controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}

export const login=async(req,res)=>
{
    try
    {
        res.send("Login successful")
    }
    catch (error)
    {
        console.log(`\nError in login controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout=async(req,res)=>
{
    try
    {
        res.send("Logout successful")
    }
    catch (error)
    {
        console.log(`\nError in logout controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}