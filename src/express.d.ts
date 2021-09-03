import { UserInterface } from "./interfaces/userInterface";

declare global {
    namespace Express {
      interface Request {
        user?: UserInterface,
        userChat?: UserInterface
      }
    }
}