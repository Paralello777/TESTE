export interface SearchResult {
  faturamento: number;
  quantidadeItens: number;
  quantidadeVendas: number;
  despesas: number;
}

const mockData: Record<string, SearchResult> = {
  "ABC/2024": {
    faturamento: 150000.50,
    quantidadeItens: 1250,
    quantidadeVendas: 450,
    despesas: 45000.75
  },
  "XYZ/2024": {
    faturamento: 89500.25,
    quantidadeItens: 780,
    quantidadeVendas: 290,
    despesas: 28900.60
  }
};

export const searchById = async (id: string): Promise<SearchResult> => {
  console.log("Searching for ID:", id);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const result = mockData[id];
  if (!result) {
    throw new Error("ID não encontrado");
  }
  
  return result;
};