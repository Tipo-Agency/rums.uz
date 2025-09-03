export const useMetaPixel = (pixelId?: string) => {
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      if (pixelId) {
        // Если указан конкретный Pixel ID, используем его
        (window as any).fbq('track', eventName, parameters, { eventID: pixelId });
      } else {
        // Иначе используем стандартный способ
        (window as any).fbq('track', eventName, parameters);
      }
    }
  };

  const trackLead = (value?: number, currency?: string) => {
    trackEvent('Lead', {
      value: value,
      currency: currency || 'USD'
    });
  };

  const trackPurchase = (value?: number, currency?: string) => {
    trackEvent('Purchase', {
      value: value,
      currency: currency || 'USD'
    });
  };

  const trackCustomEvent = (eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  };

  const trackModalOpen = (modalType: string, source: string) => {
    trackEvent('ModalOpen', {
      modal_type: modalType,
      source: source
    });
  };

  return {
    trackEvent,
    trackLead,
    trackPurchase,
    trackCustomEvent,
    trackModalOpen
  };
};
