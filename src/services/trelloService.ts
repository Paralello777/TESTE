import axios from 'axios';
import { SearchResult } from './searchService';

const TRELLO_API_BASE_URL = 'https://api.trello.com/1';
const BOARD_ID = '67a14905e98721cd0ac0f2b6';

// Custom field IDs for the Trello board
const CUSTOM_FIELDS = {
  ORGAO: 'ORGAO_FIELD_ID',
  VALOR_EMPENHADO: 'VALOR_EMPENHADO_FIELD_ID',
  TRANSPORTADORA: 'TRANSPORTADORA_FIELD_ID',
  PREVISAO_ENTREGA: 'PREVISAO_ENTREGA_FIELD_ID'
};

const trelloConfig = {
  key: 'dff2c4e4f336c487ccd11a905d0f70f7',
  token: 'ATTA0f684467b9426590d103253c2b9f35615258bd34469dc9e401b7ec564f752f1006949639'
};

export const searchTrelloCard = async (cardId: string): Promise<SearchResult> => {
  console.log('Searching Trello card:', cardId);
  
  try {
    // First, search for cards in the board that match our ID pattern
    const cardsResponse = await axios.get(`${TRELLO_API_BASE_URL}/boards/${BOARD_ID}/cards`, {
      params: {
        key: trelloConfig.key,
        token: trelloConfig.token,
        customFieldItems: true
      }
    });

    // Find the card that matches our ID
    const card = cardsResponse.data.find((c: any) => c.name.includes(cardId));
    
    if (!card) {
      throw new Error('Cartão não encontrado');
    }

    // Get custom field items for the card
    const customFieldsResponse = await axios.get(`${TRELLO_API_BASE_URL}/cards/${card.id}/customFieldItems`, {
      params: {
        key: trelloConfig.key,
        token: trelloConfig.token
      }
    });

    const customFields = customFieldsResponse.data;
    console.log('Custom fields data:', customFields);

    // Helper function to get custom field value
    const getCustomFieldValue = (fieldId: string): string => {
      const field = customFields.find((f: any) => f.idCustomField === fieldId);
      return field?.value?.text || field?.value?.number?.toString() || '';
    };

    // Construct the result object
    const result: SearchResult = {
      orgao: getCustomFieldValue(CUSTOM_FIELDS.ORGAO),
      valorEmpenhado: Number(getCustomFieldValue(CUSTOM_FIELDS.VALOR_EMPENHADO)) || 0,
      transportadora: getCustomFieldValue(CUSTOM_FIELDS.TRANSPORTADORA),
      previsaoEntrega: getCustomFieldValue(CUSTOM_FIELDS.PREVISAO_ENTREGA)
    };

    console.log('Processed result:', result);
    return result;
  } catch (error) {
    console.error('Error fetching Trello card:', error);
    throw new Error('Erro ao buscar dados do cartão no Trello');
  }
};