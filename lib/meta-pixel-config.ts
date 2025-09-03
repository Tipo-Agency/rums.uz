// Конфигурация Meta Pixel ID для разных страниц
export const META_PIXEL_IDS = {
  // Замените на ваши реальные Pixel ID
  BABYJOY: '1987881548717998', // Замените на реальный ID
  ECOPALMA: '1427935124995647', // Замените на реальный ID  
  WOODLYWORLD: '1112607253696294', // Замените на реальный ID
  // Общий Pixel ID (если нужен)
  DEFAULT: '1112607253696294'
} as const;

export type PixelIdKey = keyof typeof META_PIXEL_IDS;
