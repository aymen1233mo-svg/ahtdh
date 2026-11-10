import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  FileText, 
  CheckCircle2, 
  Star, 
  Zap, 
  CreditCard, 
  Tag, 
  Layers, 
  X, 
  Share2, 
  Check, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { ProductItem, StoreCategory } from '../types';
import { STORE_PRODUCTS, STORE_CATEGORIES, STORE_INFO } from '../data/storeData';

interface CatalogExplorerProps {
  onOpenTool: (toolId: string) => void;
}

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({ onOpenTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const roles = [
    { id: 'all', label: 'كافة الأدوار' },
    { id: 'مدير مدرسة', label: 'مدير مدرسة' },
    { id: 'وكيل مدرسة', label: 'وكيل مدرسة' },
    { id: 'معلم / معلمة', label: 'معلم / معلمة' },
    { id: 'موجه طلابي', label: 'موجه طلابي' },
    { id: 'رائد نشاط', label: 'رائد نشاط' },
    { id: 'لجان الاختبارات', label: 'لجان الاختبارات' },
    { id: 'رياض الأطفال', label: 'رياض الأطفال' }
  ];

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((prod) => {
      const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchRole = selectedRole === 'all' || prod.targetRole === selectedRole || prod.targetRole === 'الجميع';
      const matchQuery = 
        searchQuery.trim() === '' ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.format.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchRole && matchQuery;
    });
  }, [selectedCategory, selectedRole, searchQuery]);

  const handleShareProduct = (prod: ProductItem) => {
    const text = `فحص منتج من متجر احتياجك التعليمي للمنتجات المدرسية:\n${prod.name}\nالسعر: ${prod.price} ر.س\nالصيغة: ${prod.format}\nرابط المتجر: ${STORE_INFO.fullUrl}`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Catalog Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-stone-200">
        <div>
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>كتالوج المنتجات والسجلات والأدوات المفحوصة</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            استعراض دقيق لكافة ملفات وأدوات المتجر مع توضيح الصيغة، السعر، المهام المنجزة، والتسليم الفوري
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-500">
          <span>المعروض حالياً: <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> منتج</span>
          <span className="text-stone-300">·</span>
          <span>إجمالي الكتالوج بالمتجر: <strong className="text-stone-900 font-bold">+150</strong> ملف</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المنتج، السجل، نوع الملف (Word, Excel, PDF)، أو الكلمة المفتاحية..."
            className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-stone-900"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              مسح
            </button>
          )}
        </div>

        {/* Categories segmented buttons */}
        <div>
          <div className="text-xs font-semibold text-stone-600 mb-2">تصفية حسب الأقسام الرئيسية:</div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              الكل ({STORE_PRODUCTS.length})
            </button>
            {STORE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Filter */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">تصفية حسب الفئة المستفيدة:</span>
          <div className="flex flex-wrap gap-1">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedRole === r.id
                    ? 'bg-stone-800 text-white font-semibold'
                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-8">
          <Info className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-stone-800">لا توجد نتائج تطابق بحثك</h3>
          <p className="text-xs text-stone-500 mt-1">جرّب البحث بكلمات أخرى أو اختر قسماً آخر</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedRole('all'); setSearchQuery(''); }}
            className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => {
            const discountPct = prod.originalPrice 
              ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100) 
              : 0;

            return (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 flex-1">
                  {/* Category and format meta row */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-medium text-emerald-800">{prod.subCategory}</span>
                    <span className="text-stone-300">·</span>
                    <span className="font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {prod.format}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-sm font-bold text-stone-900 leading-snug line-clamp-2 hover:text-emerald-800 cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                    {prod.name}
                  </h3>

                  {/* Description snippet */}
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Key Tasks Solved Highlights */}
                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 block mb-1.5">
                      أهم المهام التي ينجزها هذا المنتج:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-700">
                      {prod.tasksAccomplished.slice(0, 2).map((task, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer and Price Section */}
                <div className="bg-stone-50/80 p-4 border-t border-stone-100 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-emerald-800">{prod.price} ر.س</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            {prod.originalPrice} ر.س
                          </span>
                        )}
                        {discountPct > 0 && (
                          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                            خصم {discountPct}%
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 block mt-0.5">شامل الضريبة المضافة</span>
                    </div>

                    <div className="text-left text-xs text-stone-500">
                      <div className="flex items-center gap-1 font-semibold text-stone-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{prod.rating}</span>
                        <span className="text-stone-400 font-normal">({prod.reviewsCount})</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">تسليم فوري</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors text-center"
                    >
                      فحص التفاصيل والمهام
                    </button>

                    {prod.category === 'smart_tools' ? (
                      <button
                        onClick={() => onOpenTool(prod.id)}
                        className="px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
                        title="تجربة الأداة التفاعلية في المحاكي"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>تجربة الأداة</span>
                      </button>
                    ) : (
                      <a
                        href={STORE_INFO.fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1"
                        title="فتح المنتج بالمتجر"
                      >
                        <span>شراء بالمتجر</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Deep-Inspection Modal */}
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
                      onOpenTool(id);
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
    </div>
  );
};
