import { Request, Response } from "express";

const CEP_REGEX = /^\d{8}$/;

type ViaCEPResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

const cache = new Map<string, { data: ViaCEPResponse; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

export class CepController {
  buscarPorCep = async (req: Request, res: Response): Promise<void> => {
    const { cep } = req.params;
    const cepLimpo = cep.replace(/\D/g, "");

    if (!CEP_REGEX.test(cepLimpo)) {
      res.status(400).json({
        error: "CEP inválido. Use apenas 8 dígitos (ex: 01001000)",
      });
      return;
    }

    const cached = cache.get(cepLimpo);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      res.json(cached.data);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (!response.ok) {
        res.status(502).json({ error: "Erro ao consultar ViaCEP" });
        return;
      }

      const data: ViaCEPResponse = await response.json() as ViaCEPResponse;

      if (data.erro) {
        res.status(404).json({ error: "CEP não encontrado" });
        return;
      }

      cache.set(cepLimpo, { data, timestamp: Date.now() });

      res.json(data);
    } catch {
      res.status(502).json({ error: "Erro ao conectar com ViaCEP" });
    }
  };

  buscarPorEndereco = async (req: Request, res: Response): Promise<void> => {
    const { uf, cidade, logradouro } = req.params;

    if (!uf || uf.length !== 2) {
      res.status(400).json({ error: "UF inválida (2 letras)" });
      return;
    }

    if (!cidade || cidade.length < 3) {
      res.status(400).json({ error: "Cidade deve ter pelo menos 3 caracteres" });
      return;
    }

    if (!logradouro || logradouro.length < 3) {
      res.status(400).json({ error: "Logradouro deve ter pelo menos 3 caracteres" });
      return;
    }

    try {
      const url = `https://viacep.com.br/ws/${uf.toUpperCase()}/${encodeURIComponent(cidade)}/${encodeURIComponent(logradouro)}/json/`;
      const response = await fetch(url);

      if (!response.ok) {
        res.status(502).json({ error: "Erro ao consultar ViaCEP" });
        return;
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        res.status(404).json({ error: "Nenhum CEP encontrado para este endereço" });
        return;
      }

      res.json({ dados: data, total: data.length });
    } catch {
      res.status(502).json({ error: "Erro ao conectar com ViaCEP" });
    }
  };
}

export default new CepController();
