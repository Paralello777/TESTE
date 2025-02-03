import { searchTrelloCard } from './trelloService';

export interface SearchResult {
  orgao: string;
  valorEmpenhado: number;
  transportadora: string;
  previsaoEntrega: string;
}

export const searchById = async (id: string): Promise<SearchResult> => {
  console.log("Searching for ID:", id);
  
  try {
    const cardId = id.split('/')[0];
    return await searchTrelloCard(cardId);
  } catch (error) {
    console.error("Error in searchById:", error);
    throw error;
  }
};