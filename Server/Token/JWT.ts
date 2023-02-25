var JWT = require("jsonwebtoken");

export const VerifyToken = async (Req: any, Res: any, next: any) => {
  try {
    let Token: string = Req.header("Authorization");
    if (!Token) {
      return Res.status(403).send("Access Denied");
    }
    if (Token.startsWith("Bearer ")) {
      Token = Token.slice(7, Token.length).trimLeft();
    }
    const Verify=JWT.verify(Token,"HelloWorld");
    Req.User=Verify;
    next();
  } catch (err) {
    Res.status(500).json({ Error: "Unable to Verify Token" });
  }
};
