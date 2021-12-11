const User = require("../models/userModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;

  passport.use(new JwtStrategy(opts, async(jwt_payload, done)=> {
      const user = await User.findOne({id: jwt_payload.sub});
      try {
          if (user) {
              return done(null, user)
          } else {
              return done(null, false)
          }
      } catch (err) {
          return done(err, false)
      }
}));
};
