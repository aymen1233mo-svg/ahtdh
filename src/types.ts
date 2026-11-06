export type StoreCategory = 
  | 'smart_tools'
  | 'school_records'
  | 'operational_plans'
  | 'certificates'
  | 'tracking_sheets'
  | 'portfolios_guides';

export interface ProductItem {
  id: string;
  name: string;
  category: StoreCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  format: 'Word (.docx)' | 'Excel (.xlsx)' | 'PDF' | 'أداة ويب ذكية' | 'رابط تفاعلي' | 'Photoshop (PSD)';
  targetRole: 'مدير مدرسة' | 'وكيل مدرسة' | 'معلم / معلمة' | 'موجه طلابي' | 'رائد نشاط' | 'لجان الاختبارات' | 'الجميع';
  description: string;
  features: string[];
  tasksAccomplished: string[];
  instantDelivery: boolean;
  tamaraAvailable: boolean;
  downloadsCount?: string;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
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
