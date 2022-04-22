import userModels from '../databsase/models/userModels.js';
import passportGoogle from 'passport-google-oauth20';
import { GOOGLE } from './loadSecrate.js';

var GoogleStrategy = passportGoogle.Strategy;
export const googleLogin = (passport) => {

    passport.use(new GoogleStrategy({
        clientID: GOOGLE.clientID,
        clientSecret: GOOGLE.clientSecret,
        callbackURL: GOOGLE.callbackURL
    },
        async function (accessToken, refreshToken, profile, done) {
              const userData = await userModels.find({providerid:profile.id})
              if(userData.length === 0){
                  await userModels.create({
                      firstName : profile?.name?.givenName,
                      lastName: profile?.name?.familyName,
                      email:profile?.emails[0]?.value,
                      providerId:profile.id,
                      providerType:profile.provider
                    })
                }
            const userProfile = profile;
            console.log(userProfile)
            return done(null, userProfile)
        }
    ));
    passport.serializeUser(function (user, cb) {
        console.log("here i think ganerate token")
        cb(null, user)
    })
    passport.deserializeUser(function (obj, cb) {
        cb(null, obj)
    })
}