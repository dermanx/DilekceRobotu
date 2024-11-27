const AI_API_URL = 'https://free.v36.cm';
const API_KEY = 'sk-0BUQHCxdzm3xYY4c49585dBcBa6a479f96Ab4dB270Be9b57';

interface AIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class AIServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'AIServiceError';
  }
}

const CONFIG = {
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 1500,
  TEMPERATURE: 0.7,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAIContent(message: string, institution: string): Promise<string> {
  if (!message.trim()) {
    throw new AIServiceError('Dilekçe konusu boş olamaz');
  }

  if (!institution.trim()) {
    throw new AIServiceError('Kurum bilgisi boş olamaz');
  }

  const systemPrompt = `Sen profesyonel bir hukuk dilekçesi hazırlama uzmanısın. 
    Dilekçeyi ${institution.toUpperCase()} kurumuna hitaben hazırla. 
    Yalnızca resmi dilekçe formatında, hukuki bir dil kullan. 
    Ek bilgi, gereksiz açıklama veya bağlam ekleme. 
    Sadece gerekli yasal unsurları içeren bir dilekçe hazırla.`;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(`${AI_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: CONFIG.MODEL,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: `Dilekçe konusu: ${message.trim()}`,
            },
          ],
          temperature: CONFIG.TEMPERATURE,
          max_tokens: CONFIG.MAX_TOKENS,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new AIServiceError(
          `AI API yanıtı başarısız: ${errorData.error?.message || response.statusText}`,
          response.status
        );
      }

      const data = await response.json() as AIResponse;
      
      if (!data.choices?.[0]?.message?.content) {
        throw new AIServiceError('AI yanıtı geçersiz format içeriyor');
      }

      return data.choices[0].message.content;
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < CONFIG.RETRY_ATTEMPTS) {
        await delay(CONFIG.RETRY_DELAY * attempt);
        continue;
      }
    }
  }

  throw new AIServiceError(
    `AI servisi ile iletişim hatası: ${lastError?.message || 'Bilinmeyen hata'}`
  );
}