const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
const welcomeMail = require("./welcomeGmail");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CALLBACK_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleProfilePic =
          profile.photos?.[0]?.value || profile._json?.picture;

        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            username: profile.displayName,
            email,
            googleId: profile.id,
            profilePic: googleProfilePic,
            isVerified: true,
            lastLogin: new Date(),
            isFirstLoggedIn: true,
          });
        }

        user.lastLogin = new Date();

        if (!user.profilePic && googleProfilePic) {
          user.profilePic = googleProfilePic;
        }

        if (user.isFirstLoggedIn) {
          await welcomeMail(user.email, user.username);
          user.isFirstLoggedIn = false;
        }

        await user.save();

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
