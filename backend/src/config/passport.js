const passport = require("passport");

const GoogleStrategy =
  require("passport-google-oauth20").Strategy;

const jwt = require("jsonwebtoken");

const { PrismaClient } =
  require("@prisma/client");

const prisma = new PrismaClient();

passport.use(

  new GoogleStrategy(

    {
      clientID:
        process.env.GOOGLE_CLIENT_ID,

      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        process.env.GOOGLE_CALLBACK_URL
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        let user =
          await prisma.user.findUnique({
            where: {
              email:
                profile.emails[0].value
            }
          });

        if (!user) {

          user =
            await prisma.user.create({
              data: {
                name: profile.displayName,
                email:
                  profile.emails[0].value,
                password: "google-oauth",
                role: "USER"
              }
            });

        }

        const token = jwt.sign(

          {
            id: user.id,
            email: user.email,
            role: user.role
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d"
          }

        );

        done(null, {
          user,
          token
        });

      } catch (error) {

        done(error, null);

      }

    }

  )

);

module.exports = passport;
