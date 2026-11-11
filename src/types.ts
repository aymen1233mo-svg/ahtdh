export type StoreCategory = 
  | 'smart_tools'
  | 'school_records'
  | 'principal_records'
  | 'vice_principal'
  | 'student_counselor'
  | 'operational_plans'
  | 'self_evaluation'
  | 'certificates'
  | 'tracking_sheets'
  | 'portfolios_guides'
  | 'student_activity'
  | 'kindergarten';

export type ProductType = 
  | 'ready_file'             // 1. ملفات Word قابلة للتعديل
  | 'pdf_document'           // 2. ملفات PDF جاهزة
  | 'excel_sheet'            // 3. ملفات Excel مبرمجة ومؤتمتة
  | 'file_bundle'            // 4. حزم ملفات متعددة (حقائب كاملة)
  | 'digital_download'       // 5. منتجات رقمية قابلة للتحميل
  | 'subscription_service'   // 6. اشتراكات شهرية وسنوية
  | 'smart_tool'             // 7. أدوات ذكية تعمل عبر الإنترنت
  | 'data_entry_service'     // 8. خدمات إلكترونية تعتمد على إدخال البيانات
  | 'web_link' 
  | 'live_editable';

export interface ProductItem {
  id: string;
  name: string;
  category: StoreCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  format: 'Word (.docx)' | 'Excel (.xlsx)' | 'PDF' | 'أداة ويب ذكية' | 'رابط تفاعلي' | 'Photoshop (PSD)';
  targetRole: 'مدير مدرسة' | 'وكيل مدرسة' | 'معلم / معلمة' | 'موجه طلابي' | 'رائد نشاط' | 'لجان الاختبارات' | 'رياض الأطفال' | 'الجميع';
  description: string;
  features: string[];
  tasksAccomplished: string[];
  instantDelivery: boolean;
  tamaraAvailable: boolean;
  downloadsCount?: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  image?: string;
  hidden?: boolean;
  productType?: ProductType;
  keywords?: string;
  downloadUrl?: string;
  wordDownloadUrl?: string;
  pdfDownloadUrl?: string;
  excelDownloadUrl?: string;
  schoolName?: string;
  educationRegion?: string;
  academicYear?: string;
  recordSupervisor?: string;
  schoolPrincipal?: string;
  cooperativeCoordinator?: string;
  isEditableCover?: boolean;
  supportsLiveEditor?: boolean;
  supportsAutoGenerate?: boolean;
  toolType?: 'tahseen' | 'school_general_info' | 'discipline_cert' | 'record_cover' | 'absence';
  backgroundStyle?: 'ministry_official' | 'gold_academic' | 'modern_clean';
}

export interface CategoryItem {
  id: string;
  name: string;
  subCategories: string[];
  count?: number;
  icon?: string;
  desc: string;
  image?: string;
  isHidden?: boolean;
  seoKeywords?: string;
  orderIndex?: number;
}

export type OrderLifecycleStep = 
  | 'new_order'        // 1. طلب جديد
  | 'payment_verified' // 2. التحقق من الدفع
  | 'product_prepared' // 3. تجهيز المنتج الرقمي
  | 'product_delivered'// 4. تسليم المنتج
  | 'completed'        // 5. اكتمال الطلب
  | 'after_sales';     // 6. خدمة ما بعد البيع


export interface StoreSettings {
  name: string;
  subtitle: string;
  logoText: string;
  logoImage?: string;
  whatsapp: string;
  whatsappFormatted: string;
  email: string;
  telegram: string;
  vatNumber: string;
  freelanceDoc: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  welcomeDiscountPercent: number;
  copyrightText: string;
  copyrightPhone: string;
  bannerNotice: string;
  
  // Settings & Integrations: Modules 16 - 20
  currency?: string;
  domain?: string;
  zatcaEnabled?: boolean;
  zatcaQrEnabled?: boolean;
  paymentGateways?: {
    mada: boolean;
    visaMastercard: boolean;
    applePay: boolean;
    tamara: boolean;
    tabby: boolean;
  };
  refundPolicyDays?: number;
  refundPolicyText?: string;
  exchangePolicyText?: string;
  privacyPolicyText?: string;
  termsText?: string;
  emailNotifications?: {
    orderConfirmation: boolean;
    deliveryLinks: boolean;
    refundNotice: boolean;
    adminNewOrderAlert: boolean;
    adminAlertEmail: string;
  };
  whatsappAutomation?: {
    enabled: boolean;
    sendInstantDelivery: boolean;
    messageTemplate: string;
  };
  sallaIntegration?: {
    connected: boolean;
    merchantId: string;
    appStoreStatus: string;
    webhookSecret: string;
    lastSyncAt: string;
  };
  seoSettings?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImageUrl: string;
  };
  securityAndBackups?: {
    autoBackupDaily: boolean;
    twoFactorAdmin: boolean;
    ipRestriction: boolean;
    lastBackupAt: string;
  };

  // Dynamic Section Titles, Subtitles & Badges Customization
  categoriesTitle?: string;
  categoriesSubtitle?: string;
  productsTitle?: string;
  productsSubtitle?: string;
  statsTitle?: string;
  featuresTitle?: string;
  featuresSubtitle?: string;
  faqTitle?: string;
  faqSubtitle?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  guaranteeBadgeText?: string;
  deliverySpeedText?: string;
  phone?: string;
  taxNumber?: string;
  crNumber?: string;

  // Background Control Settings
  backgroundImage?: string;
  backgroundOverlay?: 'none' | 'light' | 'dark' | 'glass';
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'education';

  // Default Official School Cover & Signatures (Matching Images 1 & 2)
  defaultSchoolName?: string;
  defaultEducationRegion?: string;
  defaultAcademicYear?: string;
  defaultRecordSupervisor?: string;
  defaultSchoolPrincipal?: string;
  defaultCooperativeCoordinator?: string;
  defaultCounselorName?: string;

  // Auto Date & Time Settings
  autoDateUpdates?: boolean;
  autoTimeUpdates?: boolean;
  currentHijriDateText?: string;
  currentGregorianDateText?: string;
  officialBorderBackground?: string;
}

export interface SectionVisibility {
  showHeroBanner: boolean;
  showCategoriesSection: boolean;
  showProductsSection: boolean;
  showStatsSection: boolean;
  showFeaturesSection: boolean;
  showFaqSection: boolean;
  showContactBox: boolean;
  showWelcomeGiftTab: boolean;
  showTopInspectionRibbon?: boolean;
  showTopAnnouncementBanner?: boolean;
  showPersonaCards?: boolean;
  showSmartToolsSection?: boolean;
  showFooterSection?: boolean;
  showWorkflowsTab?: boolean;
  showOperationalStudyTab?: boolean;
  showSmartToolsTab?: boolean;
  showCatalogTab?: boolean;
  showOverviewTab?: boolean;
  showPrincipalRecordsSection?: boolean;
  showVicePrincipalSection?: boolean;
  showCounselorSection?: boolean;
  showOperationalPlansSection?: boolean;
  showSelfEvaluationSection?: boolean;
  showCertificatesSection?: boolean;
  showTrackingSheetsSection?: boolean;
  showActivitySection?: boolean;
}

export interface StoreAuditMetric {
  id: string;
  title: string;
  score: number; // out of 100
  status: 'ممتاز' | 'جيد جداً' | 'جيد';
  summary: string;
  details: string[];
  recommendations: string[];
}

export interface TargetPersona {
  role: string;
  titleAr: string;
  icon: string;
  painPoints: string[];
  storeSolutions: string[];
  recommendedProducts: string[];
}

export interface SubscriptionItem {
  id: string;
  clientName: string;
  clientUsername: string;
  clientEmail: string;
  clientPhone: string;
  serviceName: string;
  serviceType: 'greetings_cards' | 'tahseen_pro' | 'records_suite';
  licenseKey: string;
  status: 'active' | 'expired' | 'pending';
  startDate: string;
  expiresAt: string;
  pricePaid: number;
  maxTemplates: number;
  portalUrl?: string;
  notes?: string;
}

export interface SmartToolTemplateConfig {
  id: string;
  toolKey: 'tahseen' | 'school_info' | 'discipline_cert' | 'record_cover' | 'absence';
  name: string;
  description: string;
  wordTemplateFile: string;
  pdfExportEnabled: boolean;
  variables: Array<{ key: string; label: string; defaultValue: string; isRequired: boolean }>;
  isActive: boolean;
  requiresSubscription: boolean;
}

// 5 Main Groups of Smart Tools
export type SmartToolGroup = 
  | 'school_admin'        // 1. أدوات الإدارة المدرسية
  | 'plans_development'   // 2. أدوات الخطط والتطوير
  | 'portfolios_guides'   // 3. أدوات ملفات الإنجاز
  | 'certificates_cards'  // 4. أدوات الشهادات والبطاقات
  | 'excel_tracking';     // 5. أدوات Excel والمتابعة

// Form Builder Dynamic Field Schema
export interface SmartToolField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox' | 'image_upload' | 'file_upload' | 'dynamic_table' | 'calculated';
  required?: boolean;
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string }>;
  tableColumns?: Array<{ key: string; label: string; type: string }>;
  helpText?: string;
  condition?: { field: string; equals: any };
}

// Smart Tool Definition
export interface SmartToolDefinition {
  id: string;
  name: string;
  group: SmartToolGroup;
  category: string;
  version: string;
  icon: string;
  description: string;
  inputDescription: string;
  outputDescription: string;
  outputFormats: string[];
  allowedPlans: string[];
  fields?: SmartToolField[];
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  avgProcessingTimeSec: number;
  status: 'active' | 'maintenance';
  lastUpdated: string;
}

// Client Generated Document in Customer Library
export interface ClientDocumentItem {
  id: string;
  userId: string;
  customerName: string;
  customerPhone?: string;
  toolId: string;
  toolName: string;
  group: SmartToolGroup;
  title: string;
  templateId: string;
  data: Record<string, any>;
  wordUrl?: string;
  pdfUrl?: string;
  status: 'completed' | 'draft';
  createdAt: string;
  updatedAt: string;
  version: number;
  folder?: string;
}

// Subscription Plans
export interface SubscriptionPlanItem {
  id: string;
  name: string;
  billingCycle: 'free' | 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'custom';
  price: number;
  durationDays: number;
  maxDocuments: number;
  maxExports: number;
  storageMb: number;
  allowedTools: string[];
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
}

// RBAC Roles & Permissions
export interface UserRoleItem {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: {
    dashboard: boolean;
    products: { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean };
    orders: { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean };
    customers: { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean };
    subscriptions: { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean };
    smartTools: { view: boolean; create: boolean; edit: boolean; delete: boolean; export: boolean };
    reports: { view: boolean; export: boolean };
    finance: { view: boolean; edit: boolean; export: boolean };
    settings: { view: boolean; edit: boolean };
  };
}

// CMS Pages Management
export interface CMSPageItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  lastModified: string;
  isPublished: boolean;
}

// Financial Transactions & Webhooks
export interface FinancialTransactionItem {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  gateway: string;
  status: 'successful' | 'pending' | 'failed' | 'refunded';
  referenceId: string;
  customerName: string;
  createdAt: string;
  webhookVerified: boolean;
}


