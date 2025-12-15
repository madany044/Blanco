import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const TOKEN_EXPIRY = "2h";

export const register = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        contactNumber,
        role: "CANDIDATE",
      },
      select: { id: true, name: true, email: true, role: true },
    });
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      expiresIn: TOKEN_EXPIRY,
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export const logout = async (_req, res) => {
  return res.json({ message: "Logged out" });
};

