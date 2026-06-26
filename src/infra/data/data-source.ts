import fs from "fs";
import path from "path";

export type Estado = {
  sigla: string;
  nome: string;
  cidades?: string[];
  regioesAdministrativas?: string[];
  observacao?: string;
};

export type Data = {
  metadata?: {
    fonte: string;
    divisaoTerritorial: string;
    totalEstados: number;
    totalMunicipios: number;
    dataAtualizacao: string;
    observacoes: string[];
  };
  estados: Estado[];
};

const dataPath = path.join(__dirname, "estados-cidades.json");

let cachedData: Data | null = null;

export const getCidadesDoEstado = (estado: Estado): string[] => {
  return estado.cidades || estado.regioesAdministrativas || [];
};

export const loadData = (): Data => {
  if (cachedData) {
    return cachedData;
  }

  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const data: Data = JSON.parse(rawData);
    cachedData = data;
    return data;
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    return { estados: [] };
  }
};

export const reload = (): Data => {
  cachedData = null;
  return loadData();
};
