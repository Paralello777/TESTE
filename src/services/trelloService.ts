import axios from 'axios';
import { SearchResult } from './searchService';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const BOARD_ID = '67a14905e98721cd0ac0f2b6';

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

    const getCustomFieldValue = (fieldId: string): string => {
      const field = card.customFieldItems.find(item => item.idCustomField === fieldId);
      return field?.value.text || field?.value.number || '';
    };

    const result: SearchResult = {
      orgao: getCustomFieldValue('ORGAO_FIELD_ID'),
      valorEmpenhado: Number(getCustomFieldValue('VALOR_EMPENHADO_FIELD_ID')) || 0,
      transportadora: getCustomFieldValue('TRANSPORTADORA_FIELD_ID'),
      previsaoEntrega: getCustomFieldValue('PREVISAO_ENTREGA_FIELD_ID')
    };

    console.log('Processed result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Trello card:', error);
    throw new Error('Erro ao buscar dados do cartão no Trello');
  }
};