export const addProtectedRoutes = (roles)=>{
    return (req,res,next)=>{
        const userRole = req.user?.role;
        if(roles.includes(userRole)){
            next()
        }else{
            res.status(400).json({error:`${req.user.role} Unauthorised`})
        }
    }
}