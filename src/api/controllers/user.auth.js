import passport from "passport"

const loginAction = async (req,res)=>{
    return passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/search',
        failureFlash: true,
    })(req, res)
}
const loginWithGoogle = async (req,res,next)=>{
    passport.authenticate('google', { scope: ['profile', 'email'] })
    (req, res);
}


const authController={
    loginWithGoogle,
    loginAction,
}
export default authController