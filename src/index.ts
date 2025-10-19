import express from "express";
import "express-async-errors";
import cors from "cors";

import { PORT } from "./env";
import { handleError } from "./middleware/handleError";

import { router as routerAuth } from "./router/auth";
import { router as routerClient } from "./router/client";
import { router as routerSeller } from "./router/seller";
import { router as routerOrders } from "./router/order";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(routerAuth);
app.use(routerClient);
app.use(routerSeller);
app.use(routerOrders);
app.use("/images", express.static("uploads"));
app.use(handleError);

app.get("/vasco", (req, res) => {
  res.send(req.hostname);
});

const port = PORT || 3000;

app.listen(port, () => console.log(`Application running in port ${port}`));
