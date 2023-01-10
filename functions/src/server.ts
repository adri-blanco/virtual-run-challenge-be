import * as express from "express";
import Controllers, { ControllersType } from "./controllers";
import { AppErrorType } from "./utils/AppError";

const app = express();

function getData(req: express.Request) {
  return {
    ...req.query,
    ...req.body,
    ...req.params,
  };
}

function getOperation(req: express.Request) {
  switch (req.method) {
    case "GET":
      if (req.params.id) {
        return "get";
      }
      return "list";

    case "POST":
      if (req.params.id) {
        return "update";
      }
      return "create";

    case "PUT":
      return "update";

    case "DELETE":
    default:
      return "delete";
  }
}

app.all("/:controller/:id*?", (req, res) => {
  const controller = req.params.controller as ControllersType;
  const operation = getOperation(req);

  if (Controllers[controller] && Controllers[controller][operation]) {
    return (
      Controllers[controller][operation]?.(getData(req))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((result: any) => {
          res.status(200).json(result);
        })
        .catch((err: AppErrorType | Error) => {
          res.status("status" in err ? err.status : 500).send(err);
        })
    );
  }

  return res.status(400).json({
    message: "Operation not valid",
  });
});

export default app;
