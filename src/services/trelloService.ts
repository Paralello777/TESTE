import axios from 'axios';
import { SearchResult } from './searchService';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  customFieldItems: {
    idCustomField: string;
    value: {
      number?: string;
      text?: string;
    };
  }[];
}

export const searchTrelloCard = async (cardId: string): Promise<SearchResult> => {
  console.log('Searching Trello card:', cardId);
  
  try {
    const response = await axios.get(`${TRELLO_API_BASE_URL}/cards/${cardId}`, {
      params: {
        key: process.env.TRELLO_API_KEY,
        token: process.env.TRELLO_TOKEN,
        customFieldItems: true
      }
    });

    const card: TrelloCard = response.data;
    console.log('Trello card data:', card);

    // Extrair valores dos campos customizados
    const getCustomFieldValue = (fieldId: string): number => {
      const field = card.customFieldItems.find(item => item.idCustomField === fieldId);
      return field ? Number(field.value.number || field.value.text || 0) : 0;
    };

    // Substitua estes IDs pelos IDs reais dos campos customizados do seu quadro Trello
    const result: SearchResult = {
      faturamento: getCustomFieldValue('FATURAMENTO_FIELD_ID'),
      quantidadeItens: getCustomFieldValue('QUANTIDADE_ITENS_FIELD_ID'),
      quantidadeVendas: getCustomFieldValue('QUANTIDADE_VENDAS_FIELD_ID'),
      despesas: getCustomFieldValue('DESPESAS_FIELD_ID')
    };

    console.log('Processed result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Trello card:', error);
    throw new Error('Erro ao buscar dados do cartão no Trello');
  }
};