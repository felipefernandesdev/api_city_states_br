import { Request, Response } from "express";
import { loadData } from "../../infra/data/data-source";

export class CidadesEstadosController {
  getEstados = (_req: Request, res: Response): void => {
    const data = loadData();
    res.json(data.estados.map(({ sigla, nome }) => ({ sigla, nome })));
  };

  getEstadoPorUF = (req: Request, res: Response): void => {
    const data = loadData();
    const uf = req.params.uf.toUpperCase();
    const estado = data.estados.find((e) => e.sigla === uf);

    if (!estado) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }

    res.json(estado);
  };

  getEstadoPorNome = (req: Request, res: Response): void => {
    const data = loadData();
    const nomeBusca = req.params.nome.toLowerCase();
    const estados = data.estados.filter((e) =>
      e.nome.toLowerCase().includes(nomeBusca)
    );

    if (estados.length === 0) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }

    res.json(estados.length === 1 ? estados[0] : estados);
  };

  getCidadesPorEstado = (req: Request, res: Response): void => {
    const data = loadData();
    const uf = req.params.uf.toUpperCase();
    const estado = data.estados.find((e) => e.sigla === uf);

    if (!estado) {
      res.status(404).json({ error: "Estado não encontrado" });
      return;
    }

    res.json(estado.cidades);
  };

  getCidadesPorNome = (req: Request, res: Response): void => {
    const data = loadData();
    const nomeBusca = req.params.nome.toLowerCase();

    const resultados = data.estados.flatMap((e) =>
      e.cidades
        .filter((cidade) => cidade.toLowerCase().includes(nomeBusca))
        .map((cidade) => ({ cidade, estado: e.sigla }))
    );

    if (resultados.length === 0) {
      res.status(404).json({ error: "Nenhuma cidade encontrada" });
      return;
    }

    res.json(resultados);
  };
}

export default new CidadesEstadosController();
