import { describe, it, expect, beforeEach } from "vitest";
import { loadData, reload, getCidadesDoEstado } from "./data-source";

describe("data-source", () => {
  beforeEach(() => {
    reload();
  });

  it("deve carregar dados dos estados", () => {
    const data = loadData();
    expect(data.estados).toBeDefined();
    expect(Array.isArray(data.estados)).toBe(true);
    expect(data.estados.length).toBeGreaterThan(0);
  });

  it("deve ter 27 estados (26 + DF)", () => {
    const data = loadData();
    expect(data.estados.length).toBe(27);
  });

  it("cada estado deve ter sigla, nome e cidades ou regioesAdministrativas", () => {
    const data = loadData();
    data.estados.forEach((estado) => {
      expect(estado.sigla).toBeDefined();
      expect(estado.nome).toBeDefined();
      const cidades = getCidadesDoEstado(estado);
      expect(Array.isArray(cidades)).toBe(true);
      expect(cidades.length).toBeGreaterThan(0);
    });
  });

  it("deve retornar os mesmos dados no cache", () => {
    const data1 = loadData();
    const data2 = loadData();
    expect(data1).toBe(data2);
  });

  it("deve recarregar dados após reload", () => {
    const data1 = loadData();
    reload();
    const data2 = loadData();
    expect(data1).not.toBe(data2);
    expect(data1).toEqual(data2);
  });
});
