import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Verificar si las variables de Google OAuth están configuradas
const hasGoogleConfig = 
  process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET && 
  process.env.GOOGLE_CALLBACK_URL;

if (hasGoogleConfig) {
  console.log('✅ Google OAuth configurado correctamente');
  
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['profile', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(`🔐 Usuario de Google autenticado: ${profile.displayName}`);
      return done(null, profile);
    }
  ));
} else {
  console.warn('⚠️  Google OAuth no configurado. Las rutas /auth/google no funcionarán.');
  console.warn('   Variables faltantes:');
  if (!process.env.GOOGLE_CLIENT_ID) console.warn('   - GOOGLE_CLIENT_ID');
  if (!process.env.GOOGLE_CLIENT_SECRET) console.warn('   - GOOGLE_CLIENT_SECRET');
  if (!process.env.GOOGLE_CALLBACK_URL) console.warn('   - GOOGLE_CALLBACK_URL');
}

// Serialización simple (siempre necesaria)
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;