import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StorefrontView } from './components/StorefrontView';
import { AdminDashboard } from './components/AdminDashboard';
import { OverviewAudit } from './components/OverviewAudit';
import { CatalogExplorer } from './components/CatalogExplorer';
import { SmartToolsSimulator } from './components/SmartToolsSimulator';
import { WorkflowMatrix } from './components/WorkflowMatrix';
import { StoreReportExport } from './components/StoreReportExport';
import { InBrowserDocumentEditor } from './components/InBrowserDocumentEditor';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider } from './context/AuthContext';
import { STORE_INFO } from './data/storeData';
import { OperationalStudyHub } from './components/OperationalStudyHub';
import { ProductItem } from './types';
import { 
  ExternalLink, 
  ShieldCheck, 
  Store, 
  X, 
  CheckCircle2, 
  Zap, 
  Share2, 
  Check, 
  Sparkles,
  ArrowLeft,
  Settings,
  Star,
  BookOpen,
  Layers,
  Cpu,
  Edit3,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Lock,
  Eye,
  ShieldAlert
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'study' | 'admin' | 'tools' | 'overview' | 'catalog' | 'workflows'>('storefront');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [fullScreenProductPreview, setFullScreenProductPreview] = useState<ProductItem | null>(null);
  const [previewZoom, setPreviewZoom] = useState<number>(100);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenTool = (toolId: string) => {
    setActiveTab('tools');
  };

  const handleShareProduct = (prod: ProductItem) => {
    const text = `منتج من متجر احتياجك التعليمي:\n${prod.name}\nالسعر: ${prod.price} ر.س\nالصيغة: ${prod.format}\nرابط المتجر: ${STORE_INFO.fullUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans w-full" dir="rtl">
      {/* Splash Screen (Exact Image: سبلاش سكرين.jpg) */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4 text-center select-none"
          >
            <div className="flex flex-col items-center space-y-4">
              <svg className="h-14 w-auto" viewBox="0 0 135 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="8" r="4" fill="#f59e0b" />
                <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
                <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
                <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
                <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
                <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
                <rect x="88" y="23" width="9" height="16" rx="4.5" fill="#008489" />
                <rect x="101" y="15" width="9" height="24" rx="4.5" fill="#008489" />
              </svg>
              <span className="text-sm sm:text-base font-black text-[#093c42] tracking-wide">متجر احتياجك التعليمي</span>
            </div>
            <div className="mt-8 w-8 h-8 border-3 border-[#008489] border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation header only shown when navigating inside sub-views like smart tools or audit report */}
      {activeTab !== 'storefront' && activeTab !== 'admin' && (
        <div className="bg-white border-b border-stone-200 px-4 py-2.5 sticky top-0 z-50 shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('storefront')}
                className="inline-flex items-center gap-1.5 text-[#008489] hover:text-[#007478] font-bold text-xs sm:text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 rotate-180" />
                <span>العودة للمتجر</span>
              </button>

              <div className="hidden sm:flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveTab('study')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeTab === 'study' ? 'bg-[#008489] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  الدراسة والتحليل التشغيلي
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeTab === 'tools' ? 'bg-[#008489] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  الأدوات الذكية
                </button>
                <button
                  onClick={() => setActiveTab('workflows')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeTab === 'workflows' ? 'bg-[#008489] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  مصفوفة المهام
                </button>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeTab === 'catalog' ? 'bg-[#008489] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  الكتالوج
                </button>
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                    activeTab === 'overview' ? 'bg-[#008489] text-white' : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  تقرير الفحص
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('admin')}
                className="px-3 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>لوحة التحكم</span>
              </button>

              <button
                onClick={() => setIsExportOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors"
              >
                تصدير التقرير الكامل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Render Container - Full Width Responsive for Desktop and Mobile */}
      <main className="flex-1 w-full bg-white min-h-screen">
        {activeTab === 'storefront' && (
          <StorefrontView
            onOpenProductModal={(prod) => setSelectedProduct(prod)}
            onOpenTool={handleOpenTool}
            onOpenAudit={() => setActiveTab('study')}
            onOpenAdmin={() => setActiveTab('admin')}
            onOpenStudy={() => setActiveTab('study')}
            onOpenCatalog={() => setActiveTab('catalog')}
            onOpenWorkflows={() => setActiveTab('workflows')}
            onOpenLiveEditor={(prod) => setEditingProduct(prod)}
          />
        )}

        {activeTab === 'study' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12">
            <OperationalStudyHub
              onBackToStorefront={() => setActiveTab('storefront')}
              onOpenTool={handleOpenTool}
              onOpenCatalog={() => setActiveTab('catalog')}
            />
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onBackToStorefront={() => setActiveTab('storefront')} />
        )}

        {activeTab === 'tools' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
            <SmartToolsSimulator />
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
            <OverviewAudit
              onSwitchToCatalog={() => setActiveTab('catalog')}
              onSwitchToTools={() => setActiveTab('tools')}
            />
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
            <WorkflowMatrix />
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12">
            <CatalogExplorer onOpenTool={handleOpenTool} />
          </div>
        )}
      </main>

      {/* Dedicated Full-Page Product View (Matching Salla product page screenshot: واجهة عرض المنتجات او الادوات عند النقر.jpg) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-40 bg-[#f8fafb] overflow-y-auto flex flex-col text-right pb-28 select-text" dir="rtl">
          {/* Top Salla Bar */}
          <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
            {/* Promo ribbon */}
            <div className="bg-[#008489] text-white text-[11px] font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2">
              <span>⏰ لا تنسَ استخدام كود الخصم S15 للحصول على خصم إضافي</span>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 text-[#008489] hover:bg-teal-100 font-bold text-xs flex items-center gap-1.5 transition-colors border border-teal-200 shadow-2xs cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  <span>← العودة لمتجر المنتجات</span>
                </button>
              </div>

              {/* Salla Store Brand Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setSelectedProduct(null)}
              >
                <span className="font-black text-xl tracking-tight text-[#008489]">سلطان</span>
                <div className="w-8 h-8 rounded-xl bg-[#008489] text-white flex items-center justify-center font-black text-sm shadow-2xs">
                  S
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleShareProduct(selectedProduct)}
                  className="p-2 text-stone-600 hover:text-[#008489] rounded-lg hover:bg-stone-100 transition-colors"
                  title="مشاركة المنتج"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Salla Breadcrumb Navigation Bar */}
          <div className="bg-stone-100/80 border-b border-stone-200 py-2.5 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedProduct(null)} className="hover:text-[#008489] transition-colors">الرئيسية</button>
                <span>›</span>
                <span className="text-stone-500">
                  {selectedProduct.category === 'smart_tools' ? 'الأدوات الذكية' : 'السجلات المدرسية'}
                </span>
                <span>›</span>
                <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-md">{selectedProduct.name}</span>
              </div>
            </div>
          </div>

          {/* Main Full Page Body Content Container */}
          <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 w-full flex-1">
            {/* Top Product Showcase Card matching Screenshot (واجهة عرض المنتجات او الادوات عند النقر.jpg) */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#0b444b] text-white flex flex-col justify-between p-6 sm:p-10 select-none">
                {/* Header info bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] sm:text-xs text-amber-300 font-bold block">وزارة التعليم • المملكة العربية السعودية</span>
                    <h1 className="text-xl sm:text-3xl font-black text-white">{selectedProduct.name}</h1>
                  </div>
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 text-teal-200">
                    {(selectedProduct as any).badge || 'أداة معتمدة 1448هـ'}
                  </span>
                </div>

                {/* Body Banner content */}
                <div className="my-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-3 max-w-xl text-right">
                    <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-xs">
                      <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>توليد آلي ومعتمد بدقة 100%</span>
                      </span>
                      <span className="bg-amber-500/20 text-amber-200 border border-amber-400/30 px-3 py-1 rounded-lg font-medium flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>تسليم آلي ورابط فوري للواتساب</span>
                      </span>
                    </div>
                  </div>

                  {/* Document Thumbnail Preview Graphic */}
                  <div className="w-36 sm:w-44 aspect-[3/4] bg-white rounded-xl shadow-2xl p-3 border-2 border-amber-400 flex flex-col justify-between shrink-0 text-stone-900 text-center">
                    <div className="border-b border-stone-200 pb-1 text-[8px] font-bold text-stone-500">
                      المملكة العربية السعودية • وزارة التعليم
                    </div>
                    <div className="my-auto space-y-1">
                      <div className="w-8 h-8 rounded-lg bg-[#008489] text-white mx-auto flex items-center justify-center font-bold text-xs">
                        📄
                      </div>
                      <div className="text-[10px] font-black text-stone-900 line-clamp-2">{selectedProduct.name}</div>
                      <div className="text-[8px] text-[#008489] font-bold">إصدار 1448هـ المعتمد</div>
                    </div>
                    <div className="border-t border-stone-200 pt-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 rounded">
                      جاهز للطباعة والتحميل
                    </div>
                  </div>
                </div>

                {/* Bottom-Right Thumbnail Switcher Selector matching screenshot */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 bg-stone-950/70 backdrop-blur-md p-2 rounded-xl border border-white/20 z-20">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg bg-white/10 border-2 border-amber-400 overflow-hidden cursor-pointer p-1 text-center text-[9px] flex flex-col justify-center text-white font-bold shadow-sm">
                    <span>الغلاف الرسمي</span>
                  </div>
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg bg-white/10 border border-white/20 hover:border-amber-400 transition-all overflow-hidden cursor-pointer p-1 text-center text-[9px] flex flex-col justify-center text-white">
                    <span>محتوى الخطة</span>
                  </div>
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-lg bg-white/10 border border-white/20 hover:border-amber-400 transition-all overflow-hidden cursor-pointer p-1 text-center text-[9px] flex flex-col justify-center text-white">
                    <span>المعاينة الميدانية</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Tahseen Hero Block if applicable */}
            {(selectedProduct.id === 'prod-tahseen-v3' || selectedProduct.name.includes('تحسين')) && (
              <div className="space-y-4">
                <div className="bg-[#0b444b] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#14565f] overflow-hidden text-center relative">
                  <span className="text-xs text-stone-300 font-medium block mb-3 opacity-90">
                    وزارة التعليم • التقويم الذاتي والاعتماد المدرسي
                  </span>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md mx-auto mb-3">
                    <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="10" width="3.5" height="10" rx="1.75" />
                      <rect x="10.25" y="4" width="3.5" height="16" rx="1.75" />
                      <rect x="16.5" y="8" width="3.5" height="12" rx="1.75" />
                    </svg>
                  </div>

                  <h3 className="text-3xl font-black text-white tracking-wide mb-2">
                    تحسين
                  </h3>

                  <p className="text-sm text-stone-200 leading-relaxed max-w-md mx-auto mb-4 opacity-95">
                    حلّل نتيجة التقويم الذاتي واين خطة التحسين والتطوير في دقائق
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs mb-6">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20 font-semibold">
                      الإصدار الثالث 1447هـ / 1448هـ
                    </span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20 font-semibold">
                      52 مؤشراً
                    </span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20 font-semibold">
                      خطة PDF جاهزة
                    </span>
                  </div>

                  {/* Dashboard Evaluation Mockup Card */}
                  <div className="bg-white text-stone-800 rounded-2xl p-4 text-right shadow-2xl border border-stone-200 max-w-lg mx-auto">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-3 text-xs text-stone-500 font-bold">
                      <span>المملكة العربية السعودية • وزارة التعليم</span>
                      <span className="text-[#008489]">لوحة نتائج التقويم الذاتي</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-3 text-center text-xs">
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-2">
                        <span className="block font-black text-orange-600 text-sm">66.6%</span>
                        <span className="text-stone-500 text-[10px]">الأداء العام</span>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2">
                        <span className="block font-black text-emerald-700 text-sm">39</span>
                        <span className="text-stone-500 text-[10px]">مؤشرات متمكنة</span>
                      </div>
                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-2">
                        <span className="block font-black text-teal-700 text-sm">37</span>
                        <span className="text-stone-500 text-[10px]">مؤشرات منجزة</span>
                      </div>
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-2">
                        <span className="block font-black text-rose-600 text-sm">10</span>
                        <span className="text-stone-500 text-[10px]">فرص تحسين</span>
                      </div>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 text-xs text-rose-800 font-bold">
                      أولويات التحسين: تطوير استراتيجيات القياس والتقويم المستمر لرفع نواتج التعلم
                    </div>
                  </div>
                </div>

                {/* Workflow steps */}
                <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">كيف تعمل الأداة؟</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-right">
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#008489] text-white font-mono font-bold flex items-center justify-center text-xs">1</span>
                      <div className="font-bold text-stone-800">ارفع تقرير الأداء المدرسي</div>
                      <div className="text-[10px] text-stone-500">من ملف إكسل أو أدخل درجات المحاور فوراً</div>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#008489] text-white font-mono font-bold flex items-center justify-center text-xs">2</span>
                      <div className="font-bold text-stone-800">الأداة تحلل وتبني الخطة</div>
                      <div className="text-[10px] text-stone-500">احتساب النسب ومؤشرات التميز آلياً</div>
                    </div>
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-[#008489] text-white font-mono font-bold flex items-center justify-center text-xs">3</span>
                      <div className="font-bold text-stone-800">تصدير خطتك PDF و Word</div>
                      <div className="text-[10px] text-stone-500">جاهزة للاعتماد والطباعة الفورية</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Description & Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
                <h4 className="font-bold text-stone-900 text-sm">الوصف التفصيلي والهدف:</h4>
                <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
                <h4 className="font-bold text-stone-900 text-sm">المهام الميدانية والإدارية المنجزة:</h4>
                <div className="space-y-2">
                  {(selectedProduct.tasksAccomplished || []).map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-stone-800 font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Editable School Cover Signature Customizer */}
            <div className="bg-gradient-to-br from-[#f4fafb] to-[#e8f6f7] p-6 rounded-2xl border-2 border-[#008489]/40 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#008489]/20 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#008489] text-white flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-sm">تخصيص غلاف السجل المدرسي والتوقيعات الرسمية</h4>
                    <p className="text-[11px] text-stone-600">اكتب اسم مسؤولة السجل والمديرة لتنفيذ الطباعة بالشعار الرسمي</p>
                  </div>
                </div>

                <span className="text-[10px] bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-full shadow-2xs">
                  جاهز للطباعة 1448هـ
                </span>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">الإدارة العامة للتعليم بمنطقة:</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.educationRegion || 'الرياض'}
                    id="customRegionInput"
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">مدرسة:</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.schoolName || 'المدرسة الأولى الابتدائية'}
                    id="customSchoolInput"
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#008489] mb-1">منسق/ة العمل التعاوني / مسؤولة السجل:</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.recordSupervisor || 'أ. فاطمة العتيبي'}
                    id="customSupervisorInput"
                    className="w-full p-2.5 bg-white border-2 border-[#008489]/50 rounded-xl font-bold text-stone-900 focus:border-[#008489]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#008489] mb-1">مدير/ة المدرسة:</label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.schoolPrincipal || 'أ. مريم الغامدي'}
                    id="customPrincipalInput"
                    className="w-full p-2.5 bg-white border-2 border-[#008489]/50 rounded-xl font-bold text-stone-900 focus:border-[#008489]"
                  />
                </div>
              </div>

              {/* Visual Cover Signature Box */}
              <div className="bg-white border border-stone-300 rounded-xl p-4 shadow-sm text-center relative space-y-4" dir="rtl">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div className="text-right text-[9px] space-y-0.5">
                    <div className="font-bold text-stone-800">المملكة العربية السعودية</div>
                    <div className="font-bold text-[#008489]">وزارة التعليم</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="/assets/aistudio/_____________b1c4c42d.jpg"
                      alt="Ministry Logo"
                      className="h-9 w-auto object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="text-right text-[9px] space-y-0.5">
                    <div className="text-stone-500">الإدارة العامة للتعليم بمنطقة : ..............</div>
                    <div className="text-stone-500">مدرسة : ..............</div>
                  </div>
                </div>

                <div className="py-2 space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#008489] mx-auto flex items-center justify-center font-bold text-sm">
                    📅
                  </div>
                  <div className="text-xs font-black text-stone-800">العام الدراسي</div>
                  <div className="text-base font-black text-[#008489] font-mono">1448هـ</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200">
                  <div className="border-2 border-[#008489] bg-white rounded-full py-1.5 px-2 text-center shadow-2xs">
                    <span className="text-[9px] font-bold text-[#008489] block">منسق/ة العمل التعاوني / مسؤولة السجل :</span>
                    <span className="text-[11px] font-black text-stone-900 truncate block">أ. فاطمة العتيبي</span>
                  </div>

                  <div className="border-2 border-[#008489] bg-white rounded-full py-1.5 px-2 text-center shadow-2xs">
                    <span className="text-[9px] font-bold text-[#008489] block">مدير/ة المدرسة :</span>
                    <span className="text-[11px] font-black text-stone-900 truncate block">أ. مريم الغامدي</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications & Delivery Mechanism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-bold text-stone-900 text-sm">المواصفات ومكونات الحزمة الرقمية:</h4>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {(selectedProduct.features || []).map((feat, idx) => (
                    <li key={idx} className="leading-relaxed">{feat}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-900 text-stone-200 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span>آلية التسليم الفوري التلقائي:</span>
                </div>
                <p className="text-stone-300 leading-relaxed text-xs">
                  بمجرد إتمام الدفع، يتم تفعيل الرابط وإرساله فوراً إلى واتساب العميل المسجل مع ظهوره الدائم في خانة "طلباتي" بالمتجر، ولا يتطلب أي انتظار لموافقة يدوية.
                </p>
                <div className="pt-3 border-t border-stone-800 text-xs text-amber-300 font-bold">
                  🛡️ يشمله الضمان الذهبي والاسترجاع خلال 3 أيام
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
              <h4 className="font-bold text-stone-900 text-sm flex items-center justify-between">
                <span>تقييمات وآراء العملاء</span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-stone-900">{selectedProduct.rating}</span>
                  <span className="text-stone-400 font-normal">({selectedProduct.reviewsCount} تقييم)</span>
                </div>
              </h4>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                <p className="text-xs font-bold text-stone-700">أضف تقييمك ورأيك في المنتج:</p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} className="hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="اكتب تعليقك وانطباعك الميداني..."
                  className="w-full p-3 text-xs bg-white border border-stone-200 rounded-xl focus:border-[#008489] outline-none h-20 resize-none"
                ></textarea>
                <button className="bg-[#008489] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-2xs hover:bg-[#007478]">
                  إرسال التقييم
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-stone-900">أ. محمد العتيبي</span>
                    <div className="flex gap-0.5 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">أداة فائقة الدقة وفرت عليّ ساعات من العمل التوثيقي والإداري، التنسيق ممتاز والتوقيعات مجهزة بطريقة احترافية جداً.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Sticky Bottom Action Bar for Purchase & Features (Matching Salla product page) */}
          <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 z-40 shadow-2xl">
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-stone-900">{selectedProduct.price} ر.س</span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-stone-400 line-through font-semibold">{selectedProduct.originalPrice} ر.س</span>
                )}
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Protected Full-Screen Preview Button */}
                <button
                  onClick={() => setFullScreenProductPreview(selectedProduct)}
                  className="px-4 py-2.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors flex items-center gap-1.5 border border-amber-300 shadow-2xs cursor-pointer"
                  title="فتح الشاشة الكاملة المحمية للعرض بدون إمكانية التحميل أو التصدير"
                >
                  <Maximize2 className="w-4 h-4 text-amber-700" />
                  <span>معاينة بشاشة كاملة (محمية)</span>
                </button>

                {/* Method 2: Live In-Browser Editor */}
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setEditingProduct(prod);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-[#008489] bg-[#e6f3f4] hover:bg-[#cce8eb] rounded-xl transition-colors flex items-center gap-1.5 border border-[#c2e2e5] shadow-2xs cursor-pointer"
                  title="فتح وتعديل المستند مباشرة في المتصفح"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>تعديل حي في المتصفح</span>
                </button>

                {selectedProduct.category === 'smart_tools' && (
                  <button
                    onClick={() => {
                      const id = selectedProduct.id;
                      setSelectedProduct(null);
                      handleOpenTool(id);
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>تشغيل الأداة الذكية</span>
                  </button>
                )}

                <a
                  href={STORE_INFO.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#008489] hover:bg-[#007478] rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>أضف إلى السلة</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROTECTED FULL SCREEN PREVIEW MODAL FOR CUSTOMERS */}
      {fullScreenProductPreview && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col text-right overflow-hidden select-none" 
          dir="rtl"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Header Bar */}
          <div className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-white shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white">
                    وضع المعاينة الفائقة المحمية — التحميل والتصدير محظور
                  </span>
                  <span className="text-xs text-stone-400 font-mono">{(fullScreenProductPreview as any).badge || 'معاينة عادية'}</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white">{fullScreenProductPreview.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl border border-stone-700">
                <button 
                  onClick={() => setPreviewZoom(z => Math.max(60, z - 15))}
                  className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300"
                  title="تصغير الحجم"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 font-mono font-bold text-amber-400">{previewZoom}%</span>
                <button 
                  onClick={() => setPreviewZoom(z => Math.min(180, z + 15))}
                  className="p-1.5 hover:bg-stone-700 rounded-lg text-stone-300"
                  title="تكبير الحجم"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Close Full Screen Button */}
              <button
                onClick={() => setFullScreenProductPreview(null)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>إغلاق المعاينة</span>
              </button>
            </div>
          </div>

          {/* Protected Document Canvas with Repeating Diagonal Watermark */}
          <div className="flex-1 overflow-auto p-6 flex justify-center items-center relative bg-stone-900/60">
            {/* Diagonal Repeating Watermark Pattern */}
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-wrap items-center justify-center gap-16 opacity-20 rotate-[-18deg] select-none overflow-hidden">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="text-white text-xs sm:text-sm font-black tracking-widest whitespace-nowrap bg-black/50 px-3 py-1 rounded-md border border-white/10">
                  🔒 معاينة للعرض فقط — متجر سلطان للمنتجات المدرسية (يمنع التحميل والتصدير)
                </div>
              ))}
            </div>

            {/* Document Card */}
            <div 
              className="bg-white rounded-2xl shadow-2xl border border-stone-700 max-w-3xl w-full p-8 text-stone-900 relative transition-transform duration-200"
              style={{ transform: `scale(${previewZoom / 100})`, transformOrigin: 'top center' }}
            >
              <div className="border-2 border-stone-200 rounded-xl p-6 space-y-4">
                <div className="bg-[#093c42] text-white p-4 rounded-xl text-center space-y-1">
                  <div className="text-xs text-amber-300 font-bold">وزارة التعليم — المملكة العربية السعودية</div>
                  <h2 className="text-lg font-black">{fullScreenProductPreview.name}</h2>
                  <div className="text-[10px] text-teal-200">معاينة التقييم والتصميم الرقمي لمنتج سلطان 1448هـ</div>
                </div>

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
                  <img 
                    src={fullScreenProductPreview.image} 
                    alt={fullScreenProductPreview.name} 
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable={false}
                  />
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                  <h4 className="font-bold text-stone-800">تفاصيل ومكونات هذا المستند:</h4>
                  <ul className="list-disc list-inside space-y-1 text-stone-600">
                    {(fullScreenProductPreview.features || []).map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Browser Document Editor Modal (Live Word & PDF) */}
      <InBrowserDocumentEditor
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
      />

      {/* Export Report Modal */}
      <StoreReportExport
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}
