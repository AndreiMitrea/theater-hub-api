import { container }                       from "../config/inversify.config";
import { TYPES }                           from "../types/custom-types";
import { IApplicationDataController }      from "../contracts";
import { authorizationMiddleware }         from "../middlewares";
import { Request, Response }               from "express";

export default (app: any) => {

    const applicationDataController: IApplicationDataController = container.get<IApplicationDataController>(TYPES.ApplicationDataController);

    app.get("/api/applicationdata/skills",
                (req: Request, res: Response) => applicationDataController.getSkills(req, res));

    app.get("/api/applicationdata/locales",
                (req: Request, res: Response) => applicationDataController.getLocales(req, res));

    app.get("/api/applicationdata/currencies",
                (req: Request, res: Response) => applicationDataController.getCurrencies(req, res));

    app.get("/api/applicationdata/tags",
                (req: Request, res: Response) => applicationDataController.getTags(req, res));

    app.get("/api/applicationdata/general",
                (req: Request, res: Response) => applicationDataController.getGeneralApplicationInformation(req, res));

};
