import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, StoreSettings, SectionVisibility, CategoryItem } from '../types';
import { STORE_INFO } from '../data/storeData';

interface StoreContextType {
  products: ProductItem[];
  categories: CategoryItem[];
  settings: StoreSettings;
  sectionVisibility: SectionVisibility;
  loading: boolean;
  refreshProducts: () => Promise<void>;
  updateSettings: (updatedSettings: Partial<StoreSettings>) => void;
  updateSectionVisibility: (updatedVisibility: Partial<SectionVisibility>) => void;
  resetToDefaults: () => void;
  checkout: (items: any[], total: number, paymentMethod: string, couponCode?: string) => Promise<{success: boolean; orderId?: number}>;
  myOrders: any[];
  refreshOrders: () => Promise<void>;
  updateCategory: (id: string, updated: Partial<CategoryItem>) => void;
  addCategory: (newCat: CategoryItem) => void;
  deleteCategory: (id: string) => void;
  reorderCategories: (newOrder: CategoryItem[]) => void;
  toggleCategoryHidden: (id: string) => void;
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { 
    id: 'principal_records', 
    name: 'مدير المدرسة', 
    subCategories: ['حقيبة مدير المدرسة', 'سجل الصلاحيات', 'سجل التكليفات والمهام', 'الصادر والوارد', 'متابعة منصة مدرستي'], 
    desc: 'سجلات ونماذج إدارية مدرسية شاملة معتمدة للقيادة المدرسية',
    icon: 'ShieldCheck',
    orderIndex: 1,
    seoKeywords: 'سجل مدير المدرسة, صلاحيات المدير, سجل التكليفات'
  },
  { 
    id: 'vice_principal', 
    name: 'وكيل المدرسة', 
    subCategories: ['حقيبة وكيل المدرسة', 'وكيل الشؤون التعليمية', 'وكيل شؤون الطلاب', 'وكيل الشؤون المدرسية', 'لجنة الانضباط'], 
    desc: 'ملفات متابعة وإدارة متكاملة لوكلاء المدارس',
    icon: 'Users',
    orderIndex: 2,
    seoKeywords: 'وكيل المدرسة, شؤون الطلاب, الشؤون التعليمية, الشؤون المدرسية'
  },
  { 
    id: 'student_counselor', 
    name: 'الموجه الطلابي', 
    subCategories: ['خطة عمل الموجه الطلابي', 'حقيبة الموجه الطلابي', 'سجل رعاية السلوك', 'سجل المخالفات', 'التقرير الفصلي للتوجيه'], 
    desc: 'نماذج وتقارير إرشادية وخطط علاجية وتعديل السلوك وتشكيلات المدرسة',
    icon: 'UserCheck',
    orderIndex: 3,
    seoKeywords: 'الموجه الطلابي, المرشد الطلابي, رعاية السلوك, التوجيه والإرشاد'
  },
  { 
    id: 'portfolios_guides', 
    name: 'ملفات الإنجاز', 
    subCategories: ['ملف إنجاز المعلم والمعلمة', 'ملف الإدارة المدرسية', 'شواهد تقويم الأداء بنظام فارس'], 
    desc: 'ملفات إنجاز جاهزة وقابلة للتعديل بصيغتي Word و PDF',
    icon: 'FolderArchive',
    orderIndex: 4,
    seoKeywords: 'ملف إنجاز المعلم, ملف إنجاز المعلمة, شواهد الأداء, نظام فارس'
  },
  { 
    id: 'operational_plans', 
    name: 'الخطة التشغيلية', 
    subCategories: ['المرحلة الابتدائية', 'المرحلة المتوسطة', 'المرحلة الثانوية', 'الخطة الإجرائية للتهيئة والاستعداد'], 
    desc: 'نماذج وخطط تشغيلية واستعدادية شاملة لجميع المراحل الدراسية',
    icon: 'Target',
    orderIndex: 5,
    seoKeywords: 'الخطة التشغيلية, خطة الاستعداد, خطة التهيئة المدرسية'
  },
  { 
    id: 'self_evaluation', 
    name: 'التقويم الذاتي والاعتماد', 
    subCategories: ['تحليل منصة تميز', 'خطة التحسين والتطوير', 'أداة تحسين V3', 'معايير الاعتماد المدرسي'], 
    desc: 'نماذج وأدوات تقييم وتحسين معتمدة مطابقة لمجالات هيئة التقويم',
    icon: 'BarChart3',
    orderIndex: 6,
    seoKeywords: 'التقويم الذاتي, خطة التحسين, منصة تميز, هيئة تقويم التعليم'
  },
  { 
    id: 'certificates', 
    name: 'شهادات Word', 
    subCategories: ['شهادات الانضباط المدرسي السريعة', 'شكر وتقدير وتفوق', 'مناسبات وطنية ويوم المعلم'], 
    desc: 'شهادات وتهاني قابلة للتعديل والطباعة المباشرة بصيغة Word',
    icon: 'Award',
    orderIndex: 7,
    seoKeywords: 'شهادات وورد, شهادات انضباط مدرسي, شهادة شكر وتقدير'
  },
  { 
    id: 'tracking_sheets', 
    name: 'كشوفات المتابعة', 
    subCategories: ['كشوفات متابعة ورصد الدرجات', 'رصد الغياب اليومي', 'كشف الانضباط', 'متابعة الفاقد التعليمي'], 
    desc: 'ملفات متابعة بصيغ Word و Excel مبرمجة وجاهزة للتعبئة',
    icon: 'Table2',
    orderIndex: 8,
    seoKeywords: 'كشوفات متابعة, كشف رصد الغياب, كشوف الدرجات'
  },
  { 
    id: 'student_activity', 
    name: 'النشاط الطلابي', 
    subCategories: ['خطة النشاط المدرسي', 'سجل المسابقات', 'تقارير البرامج والفعاليات', 'سجل المنسق الإعلامي'], 
    desc: 'خطط وسجلات الأنشطة المدرسية والبرامج الطلابية',
    icon: 'Sparkles',
    orderIndex: 9,
    seoKeywords: 'النشاط الطلابي, خطة النشاط, سجل الفعاليات'
  },
  { 
    id: 'smart_tools', 
    name: 'الأدوات الذكية', 
    subCategories: ['أداة تحسين لتقويم الأداء', 'مولد شهادات الانضباط', 'سجل معلومات وتشكيلات المدرسة', 'مولد أغلفة 1448هـ'], 
    desc: 'أدوات برمجية ذكية تولّد مستندات وتقارير آلياً في ثوانٍ بصيغتي Word و PDF',
    icon: 'Cpu',
    orderIndex: 10,
    seoKeywords: 'أدوات ذكية, توليد المستندات, تقارير آلية, تحسين'
  }
];

const DEFAULT_SETTINGS: StoreSettings = {
  name: 'متجر احتياجك التعليمي',
  subtitle: 'الحل الأمثل لسجلاتكم المدرسية والأدوات الذكية',
  logoText: 'احتياجك التعليمي | منصة الخدمات المدرسية الرقمية',
  logoImage: '/assets/aistudio/image_082663d6.png',
  whatsapp: STORE_INFO.contact.whatsapp,
  whatsappFormatted: STORE_INFO.contact.whatsappFormatted,
  email: STORE_INFO.contact.email,
  telegram: STORE_INFO.contact.telegram,
  vatNumber: '312890988700003',
  freelanceDoc: 'FL-199700808',
  heroTitle: 'أكبر متجر للمنتجات المدرسية والسجلات الرقمية 1448هـ',
  heroSubtitle: 'سجلات ونماذج إدارية، خطط تشغيلية، وأدوات ذكية لتوليد التقارير والشهادات جاهزة للتعديل والطباعة الفورية بصيغتي Word و PDF',
  heroButtonText: 'تصفح كافة السجلات المدرسية',
  welcomeDiscountPercent: 25,
  copyrightText: 'جميع الحقوق محفوظة لمتجر احتياجك التعليمي للمنتجات الرقمية والمدرسية © 1448هـ',
  copyrightPhone: '0508095912',
  bannerNotice: '🎉 خصم 25% بمناسبة العام الدراسي الجديد 1448هـ على جميع السجلات والحقائب المدرسية عند شراء 5 منتجات فأكثر!',
  currency: 'ريال سعودي (SAR)',
  domain: 'sultan-magfory.com',
  zatcaEnabled: true,
  zatcaQrEnabled: true,
  paymentGateways: {
    mada: true,
    visaMastercard: true,
    applePay: true,
    tamara: true,
    tabby: false
  },
  refundPolicyDays: 3,
  refundPolicyText: 'ضمان استرجاع كامل المبلغ إذا تعذر استخدام المنتج الرقمي أو وجود مشكلة تقنية لم يتم حلها خلال 3 أيام عمل وفق سياسة المتجر المنشورة.',
  exchangePolicyText: 'إمكانية استبدال المنتج بمنتج آخر من الفئة نفسها أو بالقيمة نفسها خلال 24 ساعة عمل من استلام الطلب.',
  privacyPolicyText: 'يلتزم المتجر بحماية خصوصية بيانات المعلمين والمدارس والعملاء، ولا يتم مشاركة أي ملفات أو تقارير مرفوعة مع أي طرف ثالث إطلاقاً.',
  termsText: 'المنتجات الرقمية مخصصة للاستخدام الشخصي والمدرسي للمشتري، ولا يجوز إعادة بيعها أو نشرها تجارياً دون إذن مسبق من المتجر.',
  emailNotifications: {
    orderConfirmation: true,
    deliveryLinks: true,
    refundNotice: true,
    adminNewOrderAlert: true,
    adminAlertEmail: 'info@sultan-magfory.com'
  },
  whatsappAutomation: {
    enabled: true,
    sendInstantDelivery: true,
    messageTemplate: 'مرحباً {customer_name}، شكراً لطلبك من متجر احتياجك التعليمي رقم {order_number}. يمكنك تنزيل ملفاتك التعليمية فوراً عبر الرابط التالي: {download_url}'
  },
  sallaIntegration: {
    connected: true,
    merchantId: 'SALLA-MERCHANT-89211',
    appStoreStatus: 'نشط ومتصل بالمتجر',
    webhookSecret: 'whsec_salla_sultan_2026_live',
    lastSyncAt: new Date().toISOString()
  },
  seoSettings: {
    metaTitle: 'متجر احتياجك التعليمي | سجلات مدرسية، خطط تشغيلية، وأدوات ذكية 1448هـ',
    metaDescription: 'المتجر التعليمي الرائد لتوفير السجلات المدرسية، ملفات الإنجاز، الخطة التشغيلية، وأداة تحسين المعتمدة لمنصة تميز ونافس في المملكة العربية السعودية.',
    keywords: 'سجلات مدرسية, ملف إنجاز, أداة تحسين, خطة تشغيلية, منصة تميز, اختبارات نافس, احتياجك التعليمي',
    ogImageUrl: '/assets/aistudio/og-preview.png'
  },
  securityAndBackups: {
    autoBackupDaily: true,
    twoFactorAdmin: true,
    ipRestriction: false,
    lastBackupAt: new Date().toISOString()
  },
  categoriesTitle: 'أقسام وتصنيفات السجلات المدرسية',
  categoriesSubtitle: 'تصفح كافة السجلات الإدارية وملفات الإنجاز والخطط المأتمتة المعتمدة',
  productsTitle: 'المنتجات والسجلات المدرسية الأكثر طلباً للعام 1448هـ',
  productsSubtitle: 'تسليم آلي فوري وروابط تحميل سحابية مباشرة متوافقة مع متطلبات وزارة التعليم (Word + PDF)',
  statsTitle: 'أرقام وإنجازات المتجر في خدمة الميدان التعليمي',
  featuresTitle: 'لماذا يختار المدراء والمعلمون متجر احتياجك التعليمي؟',
  featuresSubtitle: 'جودة استثنائية، تسليم آلي فوري، وضمان ذهبي حقيقي للرضا التام',
  faqTitle: 'الأسئلة الشائعة والإجابات المعتمدة',
  faqSubtitle: 'كل ما تحتاج معرفته عن طريقة الشراء، التسليم، والتوافق مع الأنظمة',
  contactTitle: 'مركز الدعم الفني والتواصل المباشر',
  contactSubtitle: 'فريقنا التعليمي بخدمتكم على مدار الساعة عبر الواتساب والبريد الرسمي',
  guaranteeBadgeText: 'الضمان الذهبي 3 أيام',
  deliverySpeedText: 'تسليم فوري 100%',
  phone: STORE_INFO.contact.whatsapp,
  taxNumber: '312890988700003',
  crNumber: 'FL-199700808',
  backgroundImage: '',
  backgroundOverlay: 'none',
  backgroundPattern: 'education',
  
  // Default Official School Cover & Signatures (Matching Images 1, 2, WA0007, متجر احتياجك)
  defaultSchoolName: 'مدرسة رواد المستقبل الابتدائية',
  defaultEducationRegion: 'الرياض',
  defaultAcademicYear: '1448هـ',
  defaultRecordSupervisor: 'أ. فاطمة بن خالد العتيبي',
  defaultSchoolPrincipal: 'أ. مريم بن عبدالله الغامدي',
  defaultCooperativeCoordinator: 'أ. نورة بن فهد الشمري',
  defaultCounselorName: 'أ. سارة بن سعد القحطاني',

  // Automatic Date & Time Control
  autoDateUpdates: true,
  autoTimeUpdates: true,
  currentHijriDateText: '21 جمادى الأولى 1448هـ',
  currentGregorianDateText: '10 نوفمبر 2026م',
  officialBorderBackground: '/assets/aistudio/_____________b1c4c42d.jpg'
};

const DEFAULT_VISIBILITY: SectionVisibility = {
  showHeroBanner: true,
  showCategoriesSection: true,
  showProductsSection: true,
  showStatsSection: true,
  showFeaturesSection: true,
  showFaqSection: true,
  showContactBox: true,
  showWelcomeGiftTab: true,
  showTopInspectionRibbon: true,
  showTopAnnouncementBanner: true,
  showPersonaCards: true,
  showSmartToolsSection: true,
  showFooterSection: true,
  showWorkflowsTab: true,
  showOperationalStudyTab: true,
  showSmartToolsTab: true,
  showCatalogTab: true,
  showOverviewTab: true,
  showPrincipalRecordsSection: true,
  showVicePrincipalSection: true,
  showCounselorSection: true,
  showOperationalPlansSection: true,
  showSelfEvaluationSection: true,
  showCertificatesSection: true,
  showTrackingSheetsSection: true,
  showActivitySection: true
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [myOrders, setMyOrders] = useState<any[]>([]);

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('ahtdh_store_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_CATEGORIES;
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

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = async () => {
    try {
      // Refresh orders handler
    } catch (err) {}
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'ahtdh_store_settings' && e.newValue) {
        setSettings(JSON.parse(e.newValue));
      } else if (e.key === 'ahtdh_store_visibility' && e.newValue) {
        setSectionVisibility(JSON.parse(e.newValue));
      } else if (e.key === 'ahtdh_store_categories' && e.newValue) {
        setCategories(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    localStorage.setItem('ahtdh_store_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('ahtdh_store_visibility', JSON.stringify(sectionVisibility));
  }, [sectionVisibility]);

  useEffect(() => {
    localStorage.setItem('ahtdh_store_categories', JSON.stringify(categories));
  }, [categories]);

  const updateSettings = (updatedSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...updatedSettings }));
  };

  const updateSectionVisibility = (updatedVisibility: Partial<SectionVisibility>) => {
    setSectionVisibility((prev) => ({ ...prev, ...updatedVisibility }));
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setCategories((prev) => prev.map((cat) => cat.id === id ? { ...cat, ...updated } : cat));
  };

  const addCategory = (newCat: CategoryItem) => {
    setCategories((prev) => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const reorderCategories = (newOrder: CategoryItem[]) => {
    setCategories(newOrder);
  };

  const toggleCategoryHidden = (id: string) => {
    setCategories((prev) => prev.map((cat) => cat.id === id ? { ...cat, isHidden: !cat.isHidden } : cat));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setSectionVisibility(DEFAULT_VISIBILITY);
    setCategories(DEFAULT_CATEGORIES);
    localStorage.removeItem('ahtdh_store_settings');
    localStorage.removeItem('ahtdh_store_visibility');
    localStorage.removeItem('ahtdh_store_categories');
  };

  const checkout = async (items: any[], total: number, paymentMethod: string, couponCode?: string) => {
    return { success: false };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        sectionVisibility,
        loading,
        refreshProducts,
        updateSettings,
        updateSectionVisibility,
        resetToDefaults,
        checkout,
        myOrders,
        refreshOrders,
        updateCategory,
        addCategory,
        deleteCategory,
        reorderCategories,
        toggleCategoryHidden
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
