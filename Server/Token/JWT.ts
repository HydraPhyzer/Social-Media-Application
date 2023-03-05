// var JWT = require("jsonwebtoken");

// export const VerifyToken:any = async (Req: any, Res: any, next: any) => {
//   try {
//     let Token: string = Req.header("Authorization");
//     if (!Token) {
//       Res.status(403).json({ Error: "Access Denied" });
//     }
//     if (Token.startsWith("Bearer ")) {
//       Token = Token.slice(7, Token.length).trimLeft();
//     }
//     const Verify = JWT.verify(Token, "HelloWorld");
//     // Req.User = Verify;
//     if (Verify) {
//       next();
//       Res.status(200).json({ Message: "Access Granteds" });
//     }
//   } catch (err) {
//     Res.status(500).json({ Error: "Unable to Verify Token" });
//   }
// };

var JWT = require("jsonwebtoken");

export const VerifyToken: any = async (Req: any, Res: any, next: any) => {
  let Token: string = Req.header("Authorization");

  if (Token != undefined) {
    Token = Token.slice(7, Token.length).trimLeft();
    await JWT.verify(Token, "HelloWorld", (Err: any, Done: any) => {
      if (!Err) {
        next();
      } else {
        Res.status(500).json({ Error: "User Not Authorized" });
      }
    });
  }
};
