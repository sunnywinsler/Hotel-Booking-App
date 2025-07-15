import User from "../models/User.js"; // ✅ Make sure this path is correct for your project

// Middleware to check if user is authenticated and exists in DB
export const protect = async (req, res, next) => {
  try {
    const auth = await req.auth(); // Clerk authentication
    console.log("🔐 Clerk Auth Result:", auth);

    const { userId, sessionClaims } = auth;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    let user = await User.findById(userId);

    if (!user) {
      console.log("❌ No user found in DB. Creating...");

      // Fallbacks for required fields
      const email = sessionClaims?.email || "noemail@example.com";
      const username = email.split("@")[0] || "user";
      const image = "https://api.dicebear.com/7.x/identicon/svg?seed=" + username;

      user = await User.create({
        _id: userId,
        username,
        email,
        image
      });

      console.log("✅ User created:", user);
    } else {
      console.log("✅ User already exists:", user.email);
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
