import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import responseMiddleware from "./middlewares/responseMiddleware.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import sequelize from "./config/database.js";
import router from "@routes/routes.js";

const app = express();

app.use(responseMiddleware as express.RequestHandler);
app.use(corsMiddleware);
app.use(express.json());

// TODO: Middleware to introduce a 100ms delay before processing
app.use((req: Request, res: Response, next: NextFunction) => {
  setTimeout(next, 100);
});

app.use("/api/v1/wms", router);

(async () => {
  await sequelize.sync();
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
})();
