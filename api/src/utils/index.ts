import jwt from "jsonwebtoken";

export function generateTokens(userId: string, email: string) {
  const payload = { sub: userId, email };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET ?? "secret", {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "7d") as any,
  });

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET ?? "refresh_secret",
    {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? "30d") as any,
    },
  );

  return { accessToken, refreshToken };
}
