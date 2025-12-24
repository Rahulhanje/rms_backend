import { Request, Response } from "express";

export const getHealth = (req: Request, res: Response) => {
  res.json({
    status: "UP",
    service: "RTO Backend",
    timestamp: new Date().toISOString(),
  });
};
