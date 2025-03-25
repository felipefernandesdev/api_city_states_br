import fs from "fs";
import path from "path";
import { Request, Response } from "express";

type Estado = {
  sigla: string;
  nome: string;
  cidades: string[];
};

type Data = {
  estados: Estado[];
};

const dataPath = path.join(__dirname, "../../infra/data/estados-cidades.json");

// Função para carregar os dados do JSON
const loadData = (): Data => {
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    return { estados: [] };
  }
};

class CidadesEstadosController {
  getEstados = (req: Request, res: Response): void => {
    const data = loadData();
    res.json(data.estados.map(({ sigla, nome }) => ({ sigla, nome })));
  };

  getEstadoPorUF = (req: Request, res: Response): void => {
    const data = loadData();
    const estado = data.estados.find(
      (e) => e.sigla.toLowerCase() === req.params.uf.toLowerCase()
    );
    if (!estado) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }
    res.json(estado);
  };

  getEstadoPorNome = (req: Request, res: Response): void => {
    const data = loadData();
    const nomeBusca = req.params.nome.toLowerCase();
    const estado = data.estados.find((e) =>
      e.nome.toLowerCase().includes(nomeBusca)
    );
    if (!estado) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }
    res.json(estado);
  };

  getCidadesPorEstado = (req: Request, res: Response): void => {
    const data = loadData();
    const estado = data.estados.find(
      (e) => e.sigla.toLowerCase() === req.params.uf.toLowerCase()
    );
    if (!estado) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }
    res.json(estado.cidades);
  };

  getCidadesPorNome = (req: Request, res: Response): void => {
    const data = loadData();
    const nomeBusca = req.params.nome.toLowerCase();
    const cidades = data.estados.flatMap((e) =>
      e.cidades.filter((cidade) => cidade.toLowerCase().includes(nomeBusca))
    );
    if (cidades.length === 0) {
      res.status(404).json({ error: "Nenhuma cidade encontrada" });
      return;
    }
    res.json(cidades);
  };
}

export default new CidadesEstadosController();
