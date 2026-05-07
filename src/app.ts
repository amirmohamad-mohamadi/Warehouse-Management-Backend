import "dotenv/config";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import responseMiddleware from "./middlewares/responseMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";
import sequelize from "./config/database";
import router from "@routes/routes";
import "./models";

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
  await sequelize.sync({ force: true });
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
})();
