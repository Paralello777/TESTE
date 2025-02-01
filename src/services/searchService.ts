import { searchTrelloCard } from './trelloService';

export interface SearchResult {
  faturamento: number;
  quantidadeItens: number;
  quantidadeVendas: number;
  despesas: number;
}

export const searchById = async (id: string): Promise<SearchResult> => {
  console.log("Searching for ID:", id);
  
  try {
    // Extrair o ID do cartão do Trello do formato XXX/2024
    const cardId = id.split('/')[0];
    return await searchTrelloCard(cardId);
  } catch (error) {
    console.error("Error in searchById:", error);
    throw error;
  }
};