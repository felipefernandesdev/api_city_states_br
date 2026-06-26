import { Request, Response, NextFunction } from "express";
import { AppError } from "./error-handler";

const UF_REGEX = /^[A-Z]{2}$/;

export const validateUF = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const uf = req.params.uf;

  if (!uf || !UF_REGEX.test(uf.toUpperCase())) {
    throw new AppError("UF inválida. Use a sigla do estado (ex: SP, RJ)", 400);
  }

  next();
};

export const validateNome = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const nome = req.params.nome;

  if (!nome || nome.trim().length === 0) {
    throw new AppError("Nome não pode ser vazio", 400);
  }

  if (nome.length > 100) {
    throw new AppError("Nome muito longo (máximo 100 caracteres)", 400);
  }

  next();
};
