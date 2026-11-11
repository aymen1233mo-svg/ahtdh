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
  Download
} from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'storefront' | 'study' | 'admin' | 'tools' | 'overview' | 'catalog' | 'workflows'>('storefront');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
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
                  {(selectedProduct.tasksAccomplished || []).map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-stone-800 font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive School Cover Signature Customizer (Matching Uploaded Images 1 & 2) */}
              <div className="bg-gradient-to-br from-[#f4fafb] to-[#e8f6f7] p-5 rounded-2xl border-2 border-[#008489]/40 space-y-4">
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

                {/* Editable Inputs for Supervisor & Principal */}
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

                {/* Visual Cover Preview Box matching Image 1 & 2 */}
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

                  {/* Calendar 1448h Header */}
                  <div className="py-2 space-y-1">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-[#008489] mx-auto flex items-center justify-center font-bold text-sm">
                      📅
                    </div>
                    <div className="text-xs font-black text-stone-800">العام الدراسي</div>
                    <div className="text-base font-black text-[#008489] font-mono">1448هـ</div>
                  </div>

                  {/* Two Rounded Blue Signature Boxes matching Image 2 */}
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

              {/* Exact Features & File Contents */}
              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-2">المواصفات ومكونات الحزمة الرقمية:</h4>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-100">
                  {(selectedProduct.features || []).map((feat, idx) => (
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

              {/* Real Reviews Section */}
              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-bold text-stone-900 text-sm mb-4 flex items-center gap-2">
                  <span>تقييمات العملاء</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-stone-900">{selectedProduct.rating}</span>
                    <span className="text-[10px] text-stone-400 font-normal">({selectedProduct.reviewsCount} تقييم)</span>
                  </div>
                </h4>
                
                {/* Review Form (Simplified for UI) */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 mb-6">
                  <p className="text-[11px] font-bold text-stone-500 mb-3 text-right">أضف تقييمك للمنتج:</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} className="text-stone-300 hover:text-amber-400 transition-colors">
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                    <textarea 
                      placeholder="اكتب رأيك هنا..."
                      className="w-full p-3 text-xs bg-white border border-stone-200 rounded-xl focus:border-[#008489] outline-none h-20 resize-none"
                    ></textarea>
                    <button className="bg-[#008489] text-white px-6 py-2 rounded-lg text-xs font-bold self-start">إرسال التقييم</button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-100 shadow-2xs">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-[10px]">م</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-stone-900">محمد العتيبي</span>
                        <div className="flex gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed">أداة رائعة جداً وفرت عليّ ساعات من العمل في تحليل التقويم الذاتي. أنصح بها وبقوة!</p>
                    </div>
                  </div>
                </div>
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

              <div className="flex flex-wrap items-center gap-2">
                {/* Method 2: Live In-Browser Editor */}
                <button
                  onClick={() => {
                    const prod = selectedProduct;
                    setSelectedProduct(null);
                    setEditingProduct(prod);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-[#008489] bg-[#e6f3f4] hover:bg-[#cce8eb] rounded-lg transition-colors flex items-center gap-1.5 border border-[#c2e2e5] shadow-2xs"
                  title="فتح وتعديل المستند مباشرة في المتصفح"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل حي في المتصفح</span>
                </button>

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
                    <span>تشغيل الأداة الذكية</span>
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
