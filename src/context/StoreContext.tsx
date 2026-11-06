import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, StoreSettings, SectionVisibility } from '../types';
import { STORE_PRODUCTS, STORE_INFO } from '../data/storeData';

interface StoreContextType {
  products: ProductItem[];
  settings: StoreSettings;
  sectionVisibility: SectionVisibility;
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, updatedProduct: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  toggleProductVisibility: (id: string) => void;
  updateSettings: (updatedSettings: Partial<StoreSettings>) => void;
  updateSectionVisibility: (updatedVisibility: Partial<SectionVisibility>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: StoreSettings = {
  name: 'متجر احتياجك التعليمي',
  subtitle: 'الحل الأمثل لسجلاتكم المدرسية',
  logoText: 'احتياجك التعليمي',
  whatsapp: STORE_INFO.contact.whatsapp,
  whatsappFormatted: STORE_INFO.contact.whatsappFormatted,
  email: STORE_INFO.contact.email,
  telegram: STORE_INFO.contact.telegram,
  vatNumber: '312890988700003',
  freelanceDoc: 'FL-199700808',
  heroTitle: 'حوّل نتيجة التقويم الذاتي إلى خطة تحسين في دقائق',
  heroSubtitle: 'ارفع تقرير الأداء المدرسي من منصة تميز، وتبني لك أداة «تحسين» خطة التحسين والتطوير كاملة بترقيم الإصدار الثالث — ملف وورد قابل للتعديل مع نسخة PDF.',
  heroButtonText: 'جرّب أداة تحسين',
  welcomeDiscountPercent: 15,
  copyrightText: 'شركة اتقان سوفت',
  copyrightPhone: '+967777146387',
  bannerNotice: '🚨 لا تنس استخدام كود الخصم SAD'
};

const DEFAULT_VISIBILITY: SectionVisibility = {
  showHeroBanner: true,
  showCategoriesSection: true,
  showProductsSection: true,
  showStatsSection: true,
  showFeaturesSection: true,
  showFaqSection: true,
  showContactBox: true,
  showWelcomeGiftTab: true
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('ahtdh_store_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return STORE_PRODUCTS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('ahtdh_store_settings');
    if (saved) {
      try { return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    return DEFAULT_SETTINGS;
  });

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(() => {
    const saved = localStorage.getItem('ahtdh_store_visibility');
    if (saved) {
      try { return { ...DEFAULT_VISIBILITY, ...JSON.parse(saved) }; } catch (e) { console.error(e); }
    }
    return DEFAULT_VISIBILITY;
  });

  // Save to LocalStorage whenever state changes for persistence
  useEffect(() => {
    localStorage.setItem('ahtdh_store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ahtdh_store_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ahtdh_store_visibility', JSON.stringify(sectionVisibility));
  }, [sectionVisibility]);

  const addProduct = (newProd: Omit<ProductItem, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: ProductItem = { ...newProd, id, hidden: false };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleProductVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hidden: !p.hidden } : p))
    );
  };

  const updateSettings = (updatedSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

  const updateSectionVisibility = (updatedVisibility: Partial<SectionVisibility>) => {
    setSectionVisibility((prev) => ({ ...prev, ...updatedVisibility }));
  };

  const resetToDefaults = () => {
    setProducts(STORE_PRODUCTS);
    setSettings(DEFAULT_SETTINGS);
    setSectionVisibility(DEFAULT_VISIBILITY);
    localStorage.removeItem('ahtdh_store_products');
    localStorage.removeItem('ahtdh_store_settings');
    localStorage.removeItem('ahtdh_store_visibility');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        sectionVisibility,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductVisibility,
        updateSettings,
        updateSectionVisibility,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
