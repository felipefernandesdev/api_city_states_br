import { Request, Response } from "express";
import { loadData, getCidadesDoEstado } from "../../infra/data/data-source";

type PaginatedResponse<T> = {
  dados: T[];
  paginacao: {
    paginaAtual: number;
    totalPaginas: number;
    totalItens: number;
    limite: number;
  };
};

export class CidadesEstadosController {
  getEstados = (req: Request, res: Response): void => {
    const data = loadData();
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = Math.min(parseInt(req.query.limite as string) || 27, 27);

    const todosEstados = data.estados.map(({ sigla, nome }) => ({ sigla, nome }));
    const totalItens = todosEstados.length;
    const totalPaginas = Math.ceil(totalItens / limite);
    const inicio = (pagina - 1) * limite;
    const dados = todosEstados.slice(inicio, inicio + limite);

    const response: PaginatedResponse<{ sigla: string; nome: string }> = {
      dados,
      paginacao: {
        paginaAtual: pagina,
        totalPaginas,
        totalItens,
        limite,
      },
    };

    res.json(response);
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

    const todasCidades = getCidadesDoEstado(estado);
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = Math.min(parseInt(req.query.limite as string) || 50, 500);

    const totalItens = todasCidades.length;
    const totalPaginas = Math.ceil(totalItens / limite);
    const inicio = (pagina - 1) * limite;
    const dados = todasCidades.slice(inicio, inicio + limite);

    res.json({
      dados,
      paginacao: {
        paginaAtual: pagina,
        totalPaginas,
        totalItens,
        limite,
      },
    });
  };

  getCidadesPorNome = (req: Request, res: Response): void => {
    const data = loadData();
    const nomeBusca = req.params.nome.toLowerCase();

    const resultados = data.estados.flatMap((e) => {
      const cidades = getCidadesDoEstado(e);
      return cidades
        .filter((cidade) => cidade.toLowerCase().includes(nomeBusca))
        .map((cidade) => ({ cidade, estado: e.sigla }));
    });

    if (resultados.length === 0) {
      res.status(404).json({ error: "Nenhuma cidade encontrada" });
      return;
    }

    res.json(resultados);
  };

  getContagemCidades = (_req: Request, res: Response): void => {
    const data = loadData();

    const contagem = data.estados
      .map((e) => ({
        sigla: e.sigla,
        nome: e.nome,
        totalCidades: getCidadesDoEstado(e).length,
      }))
      .sort((a, b) => b.totalCidades - a.totalCidades);

    res.json({
      dados: contagem,
      total: contagem.reduce((acc, e) => acc + e.totalCidades, 0),
    });
  };

  buscaAvancada = (req: Request, res: Response): void => {
    const data = loadData();
    const nome = (req.query.nome as string)?.toLowerCase();
    const estado = (req.query.estado as string)?.toUpperCase();
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = Math.min(parseInt(req.query.limite as string) || 50, 500);

    let estadosFiltrados = data.estados;

    if (estado) {
      estadosFiltrados = estadosFiltrados.filter((e) => e.sigla === estado);
    }

    const resultados = estadosFiltrados.flatMap((e) => {
      const cidades = getCidadesDoEstado(e);
      return cidades
        .filter((cidade) => !nome || cidade.toLowerCase().includes(nome))
        .map((cidade) => ({ cidade, estado: e.sigla, nomeEstado: e.nome }));
    });

    const totalItens = resultados.length;
    const totalPaginas = Math.ceil(totalItens / limite);
    const inicio = (pagina - 1) * limite;
    const dados = resultados.slice(inicio, inicio + limite);

    res.json({
      dados,
      paginacao: {
        paginaAtual: pagina,
        totalPaginas,
        totalItens,
        limite,
      },
    });
  };
}

export default new CidadesEstadosController();
