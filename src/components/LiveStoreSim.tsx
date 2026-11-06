import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  ShoppingBag, 
  User, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Phone,
  Send,
  Heart
} from 'lucide-react';
import { STORE_INFO, STORE_PRODUCTS, STORE_CATEGORIES } from '../data/storeData';
import { ProductItem } from '../types';

export const LiveStoreSim: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [selectedSubCat, setSelectedSubCat] = useState<string>('الكل');
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const bestsellers = STORE_PRODUCTS.filter((p) => p.isBestseller || p.price > 100);

  const handleAddToCart = (item: ProductItem) => {
    setCartCount((prev) => prev + 1);
    setAddedItemName(item.name);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Simulation Info Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <Store className="w-4 h-4 text-emerald-600" />
          <span className="font-bold">المحاكي المباشر لواجهة وتجربة متجر احتياجك التعليمي (Salla v4 Engine)</span>
          <span className="text-stone-300">·</span>
          <span className="text-stone-500">مظهر مطابق وتجربة تفاعلية حيّة</span>
        </div>
        <a
          href={STORE_INFO.fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors self-start sm:self-auto"
        >
          <span>فتح الرابط الأصلي بالمتصفح</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Added to cart toast */}
      {addedItemName && (
        <div className="fixed bottom-6 left-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>تمت إضافة "{addedItemName}" إلى سلة المشتريات التجريبية!</span>
        </div>
      )}

      {/* Simulated Storefront Container */}
      <div className="bg-white rounded-2xl border border-stone-300 shadow-xl overflow-hidden max-w-5xl mx-auto">
        {/* Top Store Notification Bar */}
        <div className="bg-emerald-900 text-emerald-100 text-[11px] font-medium py-1.5 px-4 text-center border-b border-emerald-800 flex items-center justify-center gap-3">
          <span>🌟 الضمان الذهبي: استرجاع واستبدال آمن خلال 3 أيام</span>
          <span>·</span>
          <span>⚡ تسليم فوري وتلقائي لكافة الملفات عبر الواتساب وخانة طلباتي</span>
          <span>·</span>
          <span className="hidden sm:inline">📞 خدمة العملاء: {STORE_INFO.contact.whatsappFormatted}</span>
        </div>

        {/* Store Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between gap-4">
            {/* Store Brand / Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black text-sm shadow-sm">
                اح
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black text-stone-900 leading-tight">
                  متجر احتياجك التعليمي للمنتجات المدرسية
                </h1>
                <span className="text-[11px] text-stone-500">سجلات · أدوات ذكية · خطط تشغيلية</span>
              </div>
            </div>

            {/* Search Bar (Simulation) */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث عن سجل، أداة، أو خطة تشغيلية..."
                  className="w-full pr-9 pl-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-xs text-stone-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-stone-50">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">تسجيل الدخول</span>
              </button>

              <div className="relative">
                <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  <span>السلة</span>
                  <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Nav Strip */}
          <nav className="flex items-center gap-1 mt-4 pt-3 border-t border-stone-100 overflow-x-auto text-xs text-stone-700 font-medium no-scrollbar">
            <span className="font-bold text-emerald-800 px-2 py-1">الأقسام:</span>
            {STORE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedSubCat(c.name)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition-colors ${
                  selectedSubCat === c.name
                    ? 'bg-stone-100 text-stone-900 font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Hero Banner (Salla style) */}
        <div className="bg-gradient-to-l from-emerald-800 via-teal-800 to-emerald-950 text-white p-6 sm:p-10 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>العام الدراسي 1447 - 1448 هـ</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black leading-tight tracking-tight">
              أدوات وسجلات الإدارة المدرسية المحدثة وفق معايير هيئة التقويم
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
              وفّر ساعات العمل الطويلة في إعداد الخطط التشغيلية وسجلات اللجان وحساب نسب الانضباط المدرسي بنماذج جاهزة قابلة للتعديل والطباعة.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href={STORE_INFO.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold rounded-lg text-xs shadow-sm transition-colors flex items-center gap-1"
              >
                <span>تصفح العروض الحصرية بالمتجر</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={STORE_INFO.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg text-xs transition-colors border border-white/20 flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>قناة التليجرام التعليمية</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bestseller Products Section */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">الأكثر طلباً ومبيعاً بالمتجر</h3>
              <p className="text-xs text-stone-500">سجلات وأدوات معتمدة تحظى بثقة مديري ومعلمي المدارس</p>
            </div>
            <span className="text-xs text-stone-400 font-medium">تسليم فوري عبر واتساب</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bestsellers.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col justify-between hover:border-emerald-300 transition-all hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                    <span className="text-emerald-800 font-semibold">{item.subCategory}</span>
                    <span className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      {item.format}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                    {item.name}
                  </h4>

                  <p className="text-[11px] text-stone-500 mt-1.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-emerald-800">{item.price} ر.س</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-stone-400 line-through">{item.originalPrice} ر.س</span>
                      )}
                    </div>
                    <span className="text-[9px] text-stone-400 block">شامل الضريبة</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>أضف للسلة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-stone-50 p-6 border-t border-stone-200">
          <div className="text-center max-w-md mx-auto mb-6">
            <h3 className="text-sm font-bold text-stone-900">آراء وتقييمات القيادات المدرسية</h3>
            <div className="flex items-center justify-center gap-1 text-amber-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-bold text-stone-700 mr-2">4.95 من 5 (أكثر من 3,500 تقييم)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed italic">
                "أداة تحسين اختصرت علينا أسابيع في بناء خطة التحسين المدرسية لمراجعة هيئة التقويم. عمل احترافي جداً والملف وورد سهل التعديل."
              </p>
              <span className="text-stone-500 font-semibold block mt-3">— أ. محمد الشهري (مدير مدرسة)</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed italic">
                "كشف إكسل الحضور والغياب رائع للغاية، التنبيهات اللونية مريحة جداً ووفرت علي مجهود التدقيق اليومي. والتسليم بالواتساب كان بثانية!"
              </p>
              <span className="text-stone-500 font-semibold block mt-3">— أ. فهد المطيري (وكيل شؤون طلاب)</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-stone-700 leading-relaxed italic">
                "ملف إنجاز المعلم تفاعلي بتصميم راقٍ جداً، ومولد الشهادات فادنا كثيراً في حفل تكريم الطلاب المتفوقين. شكراً لمتجر احتياجك التعليمي."
              </p>
              <span className="text-stone-500 font-semibold block mt-3">— أ. نورة الغامدي (معلمة)</span>
            </div>
          </div>
        </div>

        {/* Footer (Salla Verified Style) */}
        <div className="bg-stone-900 text-stone-300 p-6 sm:p-8 text-xs border-t border-stone-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                {STORE_INFO.name}
              </h4>
              <p className="text-stone-400 text-xs max-w-md leading-relaxed">
                المتجر الرقمي المعتمد للنماذج والسجلات والأدوات التعليمية بالمملكة العربية السعودية.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{STORE_INFO.verification.freelanceDoc}</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{STORE_INFO.verification.businessCenter}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-stone-500 text-[11px]">
            <div>
              جميع الحقوق محفوظة لـ متجر احتياجك التعليمي © 2026 · مشغل بواسطة منصة سلة Salla
            </div>
            <div className="flex items-center gap-3 text-stone-400">
              <span>مدى</span>
              <span>·</span>
              <span>Apple Pay</span>
              <span>·</span>
              <span>Visa</span>
              <span>·</span>
              <span>تمارا</span>
              <span>·</span>
              <span>تابي</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
