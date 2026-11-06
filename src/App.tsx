import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StorefrontView } from './components/StorefrontView';
import { OverviewAudit } from './components/OverviewAudit';
import { CatalogExplorer } from './components/CatalogExplorer';
import { SmartToolsSimulator } from './components/SmartToolsSimulator';
import { WorkflowMatrix } from './components/WorkflowMatrix';
import { StoreReportExport } from './components/StoreReportExport';
import { STORE_INFO } from './data/storeData';
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
  ArrowLeft 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'tools' | 'overview' | 'catalog' | 'workflows'>('storefront');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
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
    <div className="min-h-screen bg-stone-100/80 lg:bg-stone-200/60 text-stone-900 flex flex-col font-sans" dir="rtl">
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
      {activeTab !== 'storefront' && (
        <div className="bg-white border-b border-stone-200 px-4 py-3 sticky top-0 z-50 shadow-2xs">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveTab('storefront')}
              className="inline-flex items-center gap-2 text-[#008489] hover:text-[#007478] font-bold text-xs sm:text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>العودة لمتجر احتياجك التعليمي</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExportOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors"
              >
                تصدير تقرير الفحص
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Render Container - Centered Vertical Orientation Column for Desktop */}
      <main className="flex-1 max-w-4xl lg:max-w-5xl mx-auto w-full bg-white shadow-2xl border-x border-stone-200/80 my-0 lg:my-3 rounded-none lg:rounded-3xl overflow-hidden min-h-screen">
        {activeTab === 'storefront' && (
          <StorefrontView
            onOpenProductModal={(prod) => setSelectedProduct(prod)}
            onOpenTool={handleOpenTool}
            onOpenAudit={() => setActiveTab('overview')}
          />
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-start justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                  <span className="font-bold text-emerald-800">{selectedProduct.subCategory}</span>
                  <span>·</span>
                  <span>موجه إلى: {selectedProduct.targetRole}</span>
                  <span>·</span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded text-stone-800 font-semibold">{selectedProduct.format}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-stone-900">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs sm:text-sm">
              {/* Description */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">الوصف التفصيلي والهدف:</h4>
                <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Tasks Solved */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">المهام الميدانية والإدارية المنجزة:</h4>
                <div className="space-y-2">
                  {selectedProduct.tasksAccomplished.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-stone-800 font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Features & File Contents */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">المواصفات ومكونات الحزمة الرقمية:</h4>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {selectedProduct.features.map((feat, idx) => (
                    <li key={idx} className="leading-relaxed">{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Instant Delivery Mechanism Box */}
              <div className="bg-stone-900 text-stone-200 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span>آلية التسليم الفوري التلقائي:</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  بمجرد إتمام الدفع، يتم تفعيل الرابط وإرساله فوراً إلى واتساب العميل المسجل مع ظهوره الدائم في خانة "طلباتي" بالمتجر، ولا يتطلب أي انتظار لموافقة يدوية.
                </p>
              </div>

              {/* Pricing & Guarantee Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-stone-900">{selectedProduct.price} ر.س</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">{selectedProduct.originalPrice} ر.س</span>
                    )}
                  </div>
                  <span className="text-xs text-amber-800 font-medium block mt-1">
                    يشمله الضمان الذهبي والاسترجاع خلال 3 أيام
                  </span>
                </div>

                {selectedProduct.tamaraAvailable && (
                  <div className="text-xs text-stone-600 sm:text-left">
                    <span className="font-semibold text-stone-800 block">متاح التقسيط عبر تمارا وتابي:</span>
                    <span>على 4 دفعات بدون أي فوائد</span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-stone-200 bg-stone-50 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleShareProduct(selectedProduct)}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 rounded-lg border border-stone-200 flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'تم نسخ تفاصيل المنتج' : 'مشاركة / نسخ التفاصيل'}</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedProduct.category === 'smart_tools' && (
                  <button
                    onClick={() => {
                      const id = selectedProduct.id;
                      setSelectedProduct(null);
                      handleOpenTool(id);
                    }}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تجربة الأداة التفاعلية</span>
                  </button>
                )}

                <a
                  href={STORE_INFO.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>شراء المنتج من المتجر الأصلي</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Report Modal */}
      <StoreReportExport
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
