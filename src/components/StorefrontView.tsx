import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag,
  ShoppingCart, 
  Menu, 
  X, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Clock, 
  CreditCard, 
  ExternalLink, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Phone, 
  Send, 
  Mail, 
  Share2, 
  Plus, 
  Minus, 
  Trash2,
  FileText,
  User,
  Users,
  Store,
  Heart,
  RefreshCw,
  Gift,
  ArrowUp,
  MessageCircle,
  HelpCircle,
  Check
} from 'lucide-react';
import { STORE_INFO, STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storeData';
import { ProductItem } from '../types';

interface StorefrontViewProps {
  onOpenProductModal: (prod: ProductItem) => void;
  onOpenTool: (toolId: string) => void;
  onOpenAudit: () => void;
}

export const StorefrontView: React.FC<StorefrontViewProps> = ({ 
  onOpenProductModal, 
  onOpenTool,
  onOpenAudit
}) => {
  // Navigation & Drawers State
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter Tabs & Accordions
  const [activeTab, setActiveTab] = useState<string>('الأكثر مبيعاً');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [expandedNavCategory, setExpandedNavCategory] = useState<string | null>(null);

  // Cart & Feedback State
  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([
    { product: STORE_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-nafs-analysis']);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showWelcomeGift, setShowWelcomeGift] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Email popup state
  const [popupEmail, setPopupEmail] = useState<string>('');
  const [popupSubmitted, setPopupSubmitted] = useState<boolean>(false);

  // Auth Modal State (Exact Image Login)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authSubmitted, setAuthSubmitted] = useState<boolean>(false);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`تمت إضافة "${product.name}" إلى السلة`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => 
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
  };

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Exact Persona Categories from Image 10 & Video
  const personaCards = [
    {
      id: 'director',
      title: 'مدير مدرسة',
      icon: '👨‍💼',
      label: 'مكتب القيادة',
      role: 'مدير مدرسة'
    },
    {
      id: 'activity',
      title: 'رائد نشاط',
      icon: '🏃‍♂️',
      label: 'الأنشطة والفعاليات',
      role: 'رائد نشاط'
    },
    {
      id: 'counselor',
      title: 'موجه طلابي',
      icon: '🤝',
      label: 'التوجيه والإرشاد',
      role: 'موجه طلابي'
    },
    {
      id: 'deputy',
      title: 'وكيل مدرسة',
      icon: '📋',
      label: 'الشؤون المدرسية',
      role: 'وكيل مدرسة'
    },
    {
      id: 'teacher',
      title: 'معلم ومعلمة',
      icon: '👩‍🏫',
      label: 'ملفات الإنجاز',
      role: 'معلم / معلمة'
    }
  ];

  // Exact Filter Pills from Image 4 & Image 7
  const serviceTabs = [
    'الأكثر مبيعاً',
    'المنتجات الجديدة',
    'ملفات الإنجاز',
    'التقويم الذاتي',
    'كشوفات المتابعة',
    'روابط شهادات ذك...'
  ];

  // Smart Tools cards inside the Solid Teal Section (Image 8)
  const smartToolsList = [
    {
      id: 'prod-student-tracking-tool',
      title: 'أداة سجل متابعة الطلاب',
      badge: 'أداة ذكية',
      price: 119.07,
      workflowText: 'طريقة الاستخدام بعد الشراء: 1. انسخ رقم الطلب 2. الصق وقفل الأداة 3. انشئ كشف المتابعة 4. اطبع كشف المتابعة'
    },
    {
      id: 'prod-tahseen-v3',
      title: 'تحسين — تحليل نتيجة التقويم الذاتي وخطة التحسين',
      badge: 'أداة ذكية',
      price: 113.85,
      originalPrice: 343.85,
      workflowText: 'حلل نتيجة التقويم الذاتي وابن خطة التحسين والتطوير في دقائق معدودة'
    },
    {
      id: 'prod-nafs-analysis',
      title: 'أداة تحليل نتائج اختبارات نافس',
      badge: 'أداة ذكية',
      price: 69.00,
      originalPrice: 138.00,
      workflowText: 'استخراج تقارير تشخيصية لمستويات طلاب المدرسة في اختبار نافس الوطني'
    }
  ];

  // Exact FAQs from Image 6
  const faqItems = [
    {
      question: 'هل المنتجات قابلة للتعديل ؟',
      answer: 'نعم، جميع النماذج والسجلات المدرسية بصيغتي Word و Excel مفتوحة المصدر وقابلة للتعديل الكامل والإضافة والطباعة وفق متطلبات مدرستك.'
    },
    {
      question: 'هل إذا اشتريت منتج وما كان مناسب، أقدر استرجعه ؟',
      answer: 'نعم بكل تأكيد! نحن نقدم الضمان الذهبي الذي يتيح لك الاسترجاع الآمن خلال 3 أيام لتعزيز ثقتك في جودة منتجاتنا.'
    },
    {
      question: 'كيف يوصلني مبلغ الاسترجاع ؟',
      answer: 'يتم إعادة المبلغ إلى نفس وسيلة الدفع التي استخدمتها (مدى، البطاقة الائتمانية، أو المحفظة) في أسرع وقت وفق الإجراءات البنكية المعتمدة.'
    },
    {
      question: 'متى يوصل المنتج بعد الطلب ؟',
      answer: 'يصل فوراً وتلقائياً بعد إتمام الدفع بثوانٍ معدودة عبر رسائل الواتساب على رقمك المسجل، ويظهر كذلك بشكل دائم في خانة "طلباتي" بحسابك في المتجر.'
    }
  ];

  // Filter products by selected service tab
  const filteredProducts = STORE_PRODUCTS.filter((prod) => {
    if (searchQuery.trim() !== '') {
      return prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (activeTab === 'الأكثر مبيعاً') return prod.isBestseller || prod.rating >= 4.9;
    if (activeTab === 'التقويم الذاتي') return prod.subCategory.includes('التقويم') || prod.category === 'operational_plans';
    if (activeTab === 'كشوفات المتابعة') return prod.category === 'tracking_sheets';
    if (activeTab === 'ملفات الإنجاز') return prod.category === 'portfolios_guides';
    if (activeTab === 'روابط شهادات ذك...') return prod.category === 'certificates';
    return true;
  });

  return (
    <div className="bg-white min-h-screen text-stone-900 font-sans selection:bg-[#008489] selection:text-white" dir="rtl">
      
      {/* ============================================================== */}
      {/* 1. TOP STICKY HEADER (Exact Image 2: Hamburger | Logo | Medal Search Bag) */}
      {/* ============================================================== */}
      {/* 1. TOP STICKY HEADER (Exact Image 2: Hamburger + Logo on Right | Account, Search, Bag on Left) */}
      {/* ============================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200/90 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        {/* Right side: Hamburger Menu (☰) + Typographic Logo with Orange Dot */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1 text-stone-800 hover:text-[#008489] transition-colors"
            aria-label="القائمة الرئيسية"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          <div className="cursor-pointer flex items-center" onClick={scrollToTop}>
            {/* SVG Logo: exact representation of vertical rounded bars in teal with orange dot on top left */}
            <svg className="h-7 w-auto" viewBox="0 0 135 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Orange circle dot */}
              <circle cx="28" cy="8" r="4" fill="#f59e0b" />
              {/* Vertical teal bars */}
              <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
              <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
              <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
              <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
              <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
              <rect x="88" y="23" width="9" height="16" rx="4.5" fill="#008489" />
              <rect x="101" y="15" width="9" height="24" rx="4.5" fill="#008489" />
            </svg>
          </div>
        </div>

        {/* Left side: Avatar/Medal Badge, Search Icon, Cart with Badge 0 */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="p-1 text-stone-700 hover:text-[#008489] transition-colors"
            title="تسجيل الدخول / حسابي"
          >
            <div className="w-6 h-6 rounded-full border-2 border-stone-800 flex items-center justify-center">
              <User className="w-3.5 h-3.5 stroke-[2.2] text-stone-800" />
            </div>
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-1 text-stone-700 hover:text-[#008489] transition-colors"
            title="بحث في المتجر"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-1 text-stone-700 hover:text-[#008489] transition-colors relative"
            title="سلة المشتريات"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-1.5 -left-1.5 bg-[#ef4444] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* 2. HERO CARD BANNER: "تحسين" (Exact VideoCapture_٢٠٢٦١١٠٦-٠١٥٧٣٧.jpg) */}
      {/* ============================================================== */}
      <section className="px-4 pt-4 sm:pt-6 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
        <div className="text-center">
          {/* Dark Teal Hero Card Sitting directly on clean page background */}
          <div className="bg-[#0b444b] text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-[#14565f] overflow-hidden">
            {/* Top subtitle */}
            <span className="text-[11px] sm:text-xs text-stone-300 font-medium block mb-3 opacity-90">
              وزارة التعليم • التقويم الذاتي والاعتماد المدرسي
            </span>

            {/* Squircle App Icon in Mint Gradient */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md mx-auto mb-3">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="10" width="3.5" height="10" rx="1.75" />
                <rect x="10.25" y="4" width="3.5" height="16" rx="1.75" />
                <rect x="16.5" y="8" width="3.5" height="12" rx="1.75" />
              </svg>
            </div>

            {/* Brand Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-1.5">
              تحسين
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-sm mx-auto mb-3.5 opacity-95">
              حلّل نتيجة التقويم الذاتي و ابن خطة التحسين والتطوير في دقائق
            </p>

            {/* Three Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] mb-5">
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15 font-semibold backdrop-blur-xs">
                خطة PDF جاهزة
              </span>
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15 font-semibold backdrop-blur-xs">
                52 مؤشراً
              </span>
              <span className="bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/15 font-semibold backdrop-blur-xs">
                الإصدار الثالث 1447هـ
              </span>
            </div>

            {/* Realistic Dashboard Mockup Card (Exact Image in Image 3) */}
            <div className="bg-white text-stone-800 rounded-xl p-3 sm:p-4 text-right shadow-2xl border border-stone-200/60 max-w-lg mx-auto">
              {/* Header inside report */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2 text-[8px] sm:text-[9px] text-stone-500 font-bold">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>المملكة العربية السعودية • وزارة التعليم</span>
                </div>
                <span className="text-[7px] text-stone-400">لوحة نتائج التقويم الذاتي</span>
              </div>

              {/* 4 Metric Chips Row */}
              <div className="grid grid-cols-4 gap-1.5 mb-2.5 text-center text-[7.5px] sm:text-[8.5px]">
                <div className="bg-orange-50 border border-orange-200 rounded p-1">
                  <span className="block font-black text-orange-600 text-[10px] sm:text-xs">66.6%</span>
                  <span className="text-stone-500 text-[6.5px] sm:text-[7.5px]">الأداء العام</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-1">
                  <span className="block font-black text-emerald-700 text-[10px] sm:text-xs">39</span>
                  <span className="text-stone-500 text-[6.5px] sm:text-[7.5px]">مؤشرات متمكنة</span>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded p-1">
                  <span className="block font-black text-teal-700 text-[10px] sm:text-xs">37</span>
                  <span className="text-stone-500 text-[6.5px] sm:text-[7.5px]">مؤشرات منجزة</span>
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded p-1">
                  <span className="block font-black text-rose-600 text-[10px] sm:text-xs">10</span>
                  <span className="text-stone-500 text-[6.5px] sm:text-[7.5px]">فرص تحسين</span>
                </div>
              </div>

              {/* Visual Bars Section */}
              <div className="grid grid-cols-2 gap-2 text-[8px] bg-stone-50/70 p-2 rounded-lg border border-stone-100">
                {/* Horizontal Progress Bars */}
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[7px] font-semibold text-stone-600 mb-0.5">
                      <span>مجال الإدارة المدرسية</span>
                      <span className="text-emerald-700 font-bold">88%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-[88%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[7px] font-semibold text-stone-600 mb-0.5">
                      <span>مجال التعليم والتعلّم</span>
                      <span className="text-teal-700 font-bold">78%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#008489] h-full w-[78%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[7px] font-semibold text-stone-600 mb-0.5">
                      <span>مجال نواتج التعلّم</span>
                      <span className="text-orange-600 font-bold">74%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-[74%]"></div>
                    </div>
                  </div>
                </div>

                {/* Vertical Column Bars */}
                <div className="flex items-end justify-around h-16 pt-2 border-r border-stone-200/80 pr-1">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[6.5px] font-bold text-orange-600">88%</span>
                    <div className="w-3.5 bg-orange-400 rounded-t-sm h-12"></div>
                    <span className="text-[6px] text-stone-400">الإدارة</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[6.5px] font-bold text-orange-600">78%</span>
                    <div className="w-3.5 bg-orange-400 rounded-t-sm h-10"></div>
                    <span className="text-[6px] text-stone-400">التعليم</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[6.5px] font-bold text-orange-600">74%</span>
                    <div className="w-3.5 bg-orange-400 rounded-t-sm h-9"></div>
                    <span className="text-[6px] text-stone-400">النواتج</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[6.5px] font-bold text-orange-600">82%</span>
                    <div className="w-3.5 bg-orange-400 rounded-t-sm h-11"></div>
                    <span className="text-[6px] text-stone-400">البيئة</span>
                  </div>
                </div>
              </div>

              {/* Bottom Priority Bar */}
              <div className="mt-2 bg-rose-50 border border-rose-200/80 rounded px-2 py-1 flex items-center justify-between text-[7px] text-rose-800">
                <span className="font-bold">أولويات التحسين (الفرص):</span>
                <span className="truncate">تطوير استراتيجيات القياس والتقويم المستمر لرفع نواتج التعلم</span>
              </div>
            </div>
          </div>

          {/* Heading below Card (Exact Image 3) */}
          <h2 className="text-lg sm:text-2xl font-black text-[#0e3b43] tracking-tight leading-snug mt-5 mb-2">
            حوّل نتيجة التقويم الذاتي إلى خطة تحسين في دقائق
          </h2>

          {/* Description below Heading */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-4">
            ارفع تقرير الأداء المدرسي من منصة تميز، وتبني لك أداة «تحسين» خطة التحسين...
          </p>

          {/* Action Button: White pill with green border and arrow (Exact Image 3) */}
          <button
            onClick={() => onOpenTool('prod-tahseen-v3')}
            className="w-full sm:w-auto px-8 py-3 bg-white text-[#008489] hover:bg-stone-50 border-2 border-[#008489] font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 mx-auto"
          >
            <span>جرّب أداة تحسين</span>
            <ArrowLeft className="w-4 h-4 text-[#008489]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SECTION "أقسامنا" (Exact Image 10 & Video) */}
      {/* ============================================================== */}
      <section className="pt-8 px-4 max-w-md mx-auto">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#008489] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#008489]"></span>
            <span>أقسامنا</span>
          </div>
          <h3 className="text-base font-black text-stone-900">
            اكتشف مجموعاتنا المتنوعة
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            أفضل وأجود المنتجات المدرسية المميزة
          </p>
        </div>

        {/* Carousel with cards matching Image 8 & Video */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
          {personaCards.map((persona) => (
            <motion.div
              key={persona.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('الأكثر مبيعاً')}
              className="bg-white border border-stone-200 rounded-2xl p-3 min-w-[150px] max-w-[160px] shrink-0 text-center shadow-2xs hover:border-[#008489] transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div className="h-32 bg-[#f4f7f9] rounded-xl flex items-center justify-center p-1.5 mb-2 relative overflow-hidden border border-[#e2edf1]">
                {persona.id === 'activity' ? (
                  <svg className="w-full h-full" viewBox="0 0 160 110" fill="none">
                    <rect x="62" y="10" width="36" height="26" rx="3" stroke="#94a3b8" strokeWidth="1.5" fill="#ffffff" />
                    <rect x="71" y="16" width="18" height="13" stroke="#f97316" strokeWidth="1.2" fill="none" />
                    <circle cx="80" cy="44" r="7" fill="#1e293b" />
                    <path d="M73 53 C73 51 76 50 80 50 C84 50 87 51 87 53 L89 74 L71 74 Z" fill="#0284c7" />
                    <path d="M73 54 L64 45 L67 42 L74 51" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                    <path d="M87 54 L96 45 L93 42 L86 51" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
                    <rect x="74" y="74" width="4.5" height="22" fill="#0f172a" rx="2" />
                    <rect x="81.5" y="74" width="4.5" height="22" fill="#0f172a" rx="2" />
                    <circle cx="46" cy="50" r="6" fill="#1e293b" />
                    <path d="M40 58 C40 56 43 55 46 55 C49 55 52 56 52 58 L53 76 L39 76 Z" fill="#38bdf8" />
                    <rect x="42" y="76" width="3.5" height="18" fill="#1e293b" rx="1.5" />
                    <rect x="47" y="76" width="3.5" height="18" fill="#1e293b" rx="1.5" />
                    <circle cx="114" cy="50" r="6" fill="#1e293b" />
                    <path d="M108 58 C108 56 111 55 114 55 C117 55 120 56 120 58 L121 76 L107 76 Z" fill="#38bdf8" />
                    <rect x="109.5" y="76" width="3.5" height="18" fill="#1e293b" rx="1.5" />
                    <rect x="114.5" y="76" width="3.5" height="18" fill="#1e293b" rx="1.5" />
                  </svg>
                ) : persona.id === 'counselor' ? (
                  <svg className="w-full h-full" viewBox="0 0 160 110" fill="none">
                    <rect x="25" y="15" width="55" height="40" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                    <path d="M32 44 L42 35 L50 39 L62 28 L70 32" stroke="#008489" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <circle cx="106" cy="36" r="7" fill="#1e293b" />
                    <path d="M99 45 C99 43 102 42 106 42 C110 42 113 43 113 45 L115 68 L97 68 Z" fill="#008489" />
                    <path d="M99 48 L88 40 L86 43 L97 51" stroke="#008489" strokeWidth="2.5" strokeLinecap="round" />
                    <rect x="100" y="68" width="4" height="24" fill="#1e293b" rx="1.5" />
                    <rect x="107" y="68" width="4" height="24" fill="#1e293b" rx="1.5" />
                    <circle cx="48" cy="74" r="5" fill="#334155" />
                    <path d="M43 81 L53 81 L53 96 L43 96 Z" fill="#64748b" />
                    <circle cx="68" cy="74" r="5" fill="#334155" />
                    <path d="M63 81 L73 81 L73 96 L63 96 Z" fill="#64748b" />
                  </svg>
                ) : persona.id === 'director' ? (
                  <svg className="w-full h-full" viewBox="0 0 160 110" fill="none">
                    <circle cx="80" cy="36" r="7" fill="#1e293b" />
                    <path d="M73 45 C73 43 76 42 80 42 C84 42 87 43 87 45 L89 70 L71 70 Z" fill="#0f464c" />
                    <rect x="35" y="68" width="90" height="8" rx="2" fill="#cbd5e1" />
                    <rect x="42" y="76" width="6" height="18" fill="#94a3b8" />
                    <rect x="112" y="76" width="6" height="18" fill="#94a3b8" />
                    <rect x="58" y="58" width="16" height="10" rx="1" fill="#f59e0b" />
                  </svg>
                ) : persona.id === 'deputy' ? (
                  <svg className="w-full h-full" viewBox="0 0 160 110" fill="none">
                    <circle cx="80" cy="36" r="7" fill="#1e293b" />
                    <path d="M73 45 C73 43 76 42 80 42 C84 42 87 43 87 45 L89 70 L71 70 Z" fill="#0369a1" />
                    <rect x="35" y="70" width="90" height="8" rx="2" fill="#cbd5e1" />
                    <rect x="52" y="56" width="6" height="14" rx="1" fill="#f59e0b" />
                    <rect x="60" y="58" width="6" height="12" rx="1" fill="#008489" />
                    <rect x="68" y="55" width="6" height="15" rx="1" fill="#ef4444" />
                  </svg>
                ) : (
                  <svg className="w-full h-full" viewBox="0 0 160 110" fill="none">
                    <circle cx="80" cy="36" r="7" fill="#1e293b" />
                    <path d="M73 45 C73 43 76 42 80 42 C84 42 87 43 87 45 L89 72 L71 72 Z" fill="#059669" />
                    <rect x="74" y="72" width="4.5" height="22" fill="#1e293b" rx="2" />
                    <rect x="81.5" y="72" width="4.5" height="22" fill="#1e293b" rx="2" />
                    <rect x="71" y="52" width="18" height="13" rx="1.5" fill="#f59e0b" />
                  </svg>
                )}
              </div>
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="w-3.5 h-3.5 rounded-full border border-stone-300 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                </span>
                <h4 className="text-xs font-bold text-stone-900">{persona.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SOLID TEAL BANNER: "الأدوات الذكية" + CARDS (Exact Image 8) */}
      {/* ============================================================== */}
      <section className="mt-8 bg-[#008b9b] text-white py-8 px-4 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="text-xl font-black tracking-tight">
            الأدوات الذكية
          </h3>
          <p className="text-xs text-emerald-100 leading-relaxed font-normal">
            ارفع ملفك أو أدخل بياناتك، وتطلع لك تقاريرك وخططك الرسمية بصيغتي PDF وورد — من الجوال أو الكمبيوتر بدون برامج.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenTool('prod-tahseen-v3')}
              className="px-6 py-2.5 bg-white text-[#008b9b] hover:bg-stone-50 font-bold rounded-xl text-xs transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>تصفح كل الأدوات</span>
              <ArrowLeft className="w-4 h-4 text-[#008b9b]" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll of Smart Tools cards inside teal banner (Image 8) */}
        <div className="max-w-md mx-auto mt-6 flex items-center gap-3 overflow-x-auto no-scrollbar py-2 text-right">
          {smartToolsList.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              onClick={() => onOpenTool(tool.id)}
              className="bg-white text-stone-900 rounded-2xl p-3.5 min-w-[210px] max-w-[220px] shrink-0 shadow-md border border-stone-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual mockup thumbnail */}
                <div className="h-28 bg-[#f5fbfb] rounded-xl p-2.5 mb-2 border border-[#dcf0f1] flex flex-col justify-between text-center">
                  <div className="text-[10px] font-bold text-[#008b9b]">طريقة الاستخدام بعد الشراء</div>
                  <div className="text-[9px] text-stone-500 line-clamp-3 leading-relaxed">
                    {tool.workflowText}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-semibold">جاهز للاستخدام الفوري</div>
                </div>

                <div className="inline-block bg-[#f59e0b] text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-1.5">
                  {tool.badge}
                </div>

                <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-2">
                  {tool.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[#008b9b] font-mono">{tool.price} ر.س</span>
                  {tool.originalPrice && (
                    <span className="text-[9px] text-stone-400 line-through mr-1 font-mono">{tool.originalPrice} ر.س</span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const prod = STORE_PRODUCTS.find(p => p.id === tool.id);
                    if (prod) handleAddToCart(prod, e);
                  }}
                  className="px-2.5 py-1 bg-[#008b9b] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 shadow-2xs"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>أضف</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. "خدمة رقمية متكاملة" & 2-COLUMN PRODUCTS (Exact Image 4 & 7) */}
      {/* ============================================================== */}
      <section className="pt-8 px-4 max-w-md mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-base font-black text-stone-900">
            خدمة رقمية متكاملة
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            اكتشف خدماتنا الرقمية المميزة
          </p>
        </div>

        {/* Filter Pills from Image 4 & Image 7 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {serviceTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#008489] text-white shadow-2xs'
                  : 'bg-white text-[#008489] border border-[#008489] hover:bg-stone-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2-COLUMNS PRODUCT GRID (Exact Image 4 & 7 on Mobile) */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {filteredProducts.map((prod) => {
            const isWish = wishlist.includes(prod.id);
            const isPdf = prod.format === 'PDF';
            const isSmartTool = prod.category === 'smart_tools';

            return (
              <motion.div
                key={prod.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={() => onOpenProductModal(prod)}
                className="bg-white border border-stone-200 rounded-2xl p-2.5 shadow-2xs hover:border-[#008489] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Card Thumbnail Box with Ministry of Education Emblem Mockup (Exact Image 10 & 1) */}
                  <div className="relative h-40 bg-[#f7fbfc] rounded-xl border border-stone-200 overflow-hidden flex flex-col justify-between text-center mb-2 shadow-2xs">
                    {/* Top Ministry Header Bar */}
                    <div className="bg-[#0e3b43] text-white px-2 py-1 flex items-center justify-between text-[7.5px] font-bold">
                      <div className="flex items-center gap-1">
                        <span>وزارة التعليم</span>
                        <span className="text-[6px] opacity-75 hidden sm:inline">Ministry of Education</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                        <span className="w-1 h-1 rounded-full bg-teal-300"></span>
                        <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                      </div>
                    </div>

                    {/* Top Badges & Wishlist Overlay */}
                    <div className="px-2 pt-1 flex items-center justify-between">
                      {isPdf ? (
                        <span className="bg-[#ef4444] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                          ملف PDF
                        </span>
                      ) : (
                        <span></span>
                      )}

                      <button
                        onClick={(e) => handleToggleWishlist(prod.id, e)}
                        className="text-stone-400 hover:text-rose-500 transition-colors bg-white/80 p-1 rounded-full shadow-2xs"
                      >
                        <Heart className={`w-3 h-3 ${isWish ? 'text-rose-500 fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Document Preview Artwork matching Screenshots */}
                    <div className="my-auto px-2 py-1 space-y-1">
                      {prod.id === 'prod-weeks-1448' ? (
                        <div className="bg-white border border-stone-200 rounded p-1.5 shadow-2xs text-[8px]">
                          <div className="bg-emerald-700 text-white font-bold py-0.5 px-1 rounded-xs text-[7px] mb-1">
                            توزيع الأسابيع الدراسية 1448هـ
                          </div>
                          <div className="grid grid-cols-4 gap-0.5 text-[6.5px] text-stone-600 font-mono">
                            <span className="bg-stone-50 border p-0.5">الأسبوع 1</span>
                            <span className="bg-stone-50 border p-0.5">الأسبوع 2</span>
                            <span className="bg-stone-50 border p-0.5">الأسبوع 3</span>
                            <span className="bg-stone-50 border p-0.5">الأسبوع 4</span>
                          </div>
                        </div>
                      ) : prod.id === 'prod-nafs-analysis' ? (
                        <div className="bg-white border border-stone-200 rounded p-1.5 shadow-2xs text-center space-y-0.5">
                          <div className="inline-block px-1.5 py-0.5 bg-amber-50 text-amber-700 font-black rounded text-[8px]">
                            نافس NAFS
                          </div>
                          <div className="text-[7.5px] font-bold text-stone-700">تحليل نتائج الاختبارات الوطنية</div>
                          <div className="flex justify-center gap-1 pt-0.5">
                            <span className="w-2 h-3 bg-emerald-600 rounded-xs"></span>
                            <span className="w-2 h-5 bg-[#008489] rounded-xs"></span>
                            <span className="w-2 h-2 bg-amber-500 rounded-xs"></span>
                          </div>
                        </div>
                      ) : prod.id === 'prod-tahseen-v3' ? (
                        <div className="bg-[#0f464c] text-white rounded p-1.5 shadow-2xs text-[7.5px] space-y-0.5">
                          <div className="font-black text-emerald-300">تحسين V3</div>
                          <div className="text-[6.5px] text-stone-200">52 مؤشراً • خطة PDF جاهزة</div>
                        </div>
                      ) : prod.id === 'prod-pisa-record' ? (
                        <div className="bg-white border border-stone-200 rounded p-1.5 shadow-2xs text-center space-y-0.5">
                          <div className="font-black text-rose-600 text-[9px] tracking-wider">PISA 2025</div>
                          <div className="text-[7px] text-stone-600 font-medium">سجل الاختبار الدولي</div>
                        </div>
                      ) : (
                        <div className="bg-white border border-stone-200 rounded p-1.5 shadow-2xs text-[7.5px] space-y-0.5">
                          <div className="font-bold text-stone-800 line-clamp-1">{prod.name.split('(')[0]}</div>
                          <div className="flex items-center justify-center gap-1 text-[6.5px] text-stone-500">
                            <span className="bg-blue-50 text-blue-700 px-1 rounded-xs font-semibold">Word</span>
                            <span>+</span>
                            <span className="bg-rose-50 text-rose-700 px-1 rounded-xs font-semibold">PDF</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Store Brand Band */}
                    <div className="bg-[#0e3b43] text-stone-200 text-[7px] py-1 px-1 font-semibold border-t border-[#1a535c]">
                      متجر احتياجك التعليمي للمنتجات المدرسية
                    </div>
                  </div>

                  {/* Badge: أداة ذكية or قابل للتعديل (Orange pill as in Image 4 & 7) */}
                  <div className="inline-block bg-[#f59e0b] text-white text-[9px] font-bold px-2 py-0.5 rounded-md mb-1.5">
                    {isSmartTool ? 'أداة ذكية' : 'قابل للتعديل'}
                  </div>

                  {/* Product Title */}
                  <h4 className="text-xs font-bold text-stone-900 leading-snug line-clamp-2 mb-2">
                    {prod.name}
                  </h4>
                </div>

                {/* Price and Cart button */}
                <div className="pt-2 border-t border-stone-100 space-y-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-black text-stone-900 font-mono text-sm">
                      {prod.price} ر.س
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[10px] text-stone-400 line-through font-mono">
                        {prod.originalPrice} ر.س
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(prod, e)}
                    className="w-full py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>أضف للسلة</span>
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. "إحصائيات المتجر" - 2x2 STATS GRID (Exact Image 9) */}
      {/* ============================================================== */}
      <section className="pt-10 px-4 max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#008489] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#008489]"></span>
            <span>إحصائيات المتجر</span>
          </div>
          <h3 className="text-base font-black text-stone-900">
            بفضل الله تحققت
          </h3>
        </div>

        {/* 2x2 Grid of Stat Cards from Image 9 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Orders (+53000) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-2xs flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#e6f3f4] text-[#008489] flex items-center justify-center mb-2">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 stroke-[1.8]" />
                <span className="absolute -top-1 -right-1 text-xs font-bold leading-none">+</span>
              </div>
            </div>
            <span className="text-xl font-black text-stone-900 font-mono" dir="ltr">+53000</span>
            <span className="text-xs text-stone-500 mt-0.5">طلب قدمناه</span>
          </div>

          {/* Card 2: Clients (+30000) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-2xs flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#e6f3f4] text-[#008489] flex items-center justify-center mb-2">
              <Users className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xl font-black text-stone-900 font-mono" dir="ltr">+30000</span>
            <span className="text-xs text-stone-500 mt-0.5">عميل مميز لدينا</span>
          </div>

          {/* Card 3: Ratings (+6000) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-2xs flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#e6f3f4] text-[#008489] flex items-center justify-center mb-2">
              <Star className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xl font-black text-stone-900 font-mono" dir="ltr">+6000</span>
            <span className="text-xs text-stone-500 mt-0.5">تقييم من عملائنا</span>
          </div>

          {/* Card 4: Products (+400) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center shadow-2xs flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#e6f3f4] text-[#008489] flex items-center justify-center mb-2">
              <Store className="w-6 h-6 stroke-[1.8]" />
            </div>
            <span className="text-xl font-black text-stone-900 font-mono" dir="ltr">+400</span>
            <span className="text-xs text-stone-500 mt-0.5">منتج وأداة مدرسية</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. "عن المتجر / مميزات المتجر" - 2x2 FEATURES (Exact Image 3) */}
      {/* ============================================================== */}
      <section className="pt-10 px-4 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8f6f7] text-[#008489] text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#008489]"></span>
            <span>عن المتجر</span>
          </div>
          <h3 className="text-xl font-black text-[#093c42]">
            مميزات المتجر
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            نقدم لكم منتجات مدرسية فريدة ومبتكرة
          </p>
        </div>

        {/* 2x2 Features Grid with circular teal icons from Image 3 */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          {/* Feature 1: 100% Original Products (Top Right in RTL) */}
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#008489] text-white flex items-center justify-center mb-3 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
                <path d="M12 14a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z" />
                <path d="M2 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
                <path d="M14 12a4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#093c42] mb-1">منتجات أصلية</h4>
            <span className="text-base font-black text-[#093c42] mb-1.5 font-sans">%100</span>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-[150px]">
              أفكار و محتوى منتجات المتجر بتصميم حصري لمتجرنا
            </p>
          </div>

          {/* Feature 2: Customer Service (Top Left in RTL) */}
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#008489] text-white flex items-center justify-center mb-3 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                <path d="M19 16v2a4 4 0 0 1-4 4h-2" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#093c42] mb-2">خدمة عملاء</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-[150px]">
              فريق دعم محترف جاهز لخدمتك في أي وقت والرد على استفساراتك.
            </p>
          </div>

          {/* Feature 3: Safe Return (Bottom Right in RTL) */}
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#008489] text-white flex items-center justify-center mb-3 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#093c42] mb-2">استرجاع آمن</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-[150px]">
              نوفر ضمان ذهبي لتعزيز ثقة العميل واسترجاع آمن لمدة ٣ أيام
            </p>
          </div>

          {/* Feature 4: Discounts (Bottom Left in RTL) */}
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#008489] text-white flex items-center justify-center mb-3 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <circle cx="9.5" cy="9.5" r="0.75" fill="currentColor" />
                <circle cx="14.5" cy="14.5" r="0.75" fill="currentColor" />
              </svg>
            </div>
            <h4 className="text-sm font-bold text-[#093c42] mb-2">عروض وخصومات</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-[150px]">
              استمتع بعروض حصرية وخصومات دورية على أفضل المنتجات.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. "الأسئلة الشائعة" - ACCORDION (Exact Image 6) */}
      {/* ============================================================== */}
      <section className="pt-10 px-4 max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#008489] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#008489]"></span>
            <span>الأسئلة الشائعة</span>
          </div>
          <h3 className="text-base font-black text-stone-900">
            عندك سؤال؟
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            وعندنا إجابات وافية على أبرز استفساراتك
          </p>
        </div>

        {/* 4 Accordions from Image 6 */}
        <div className="space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div 
                key={index}
                className="bg-white border-b border-stone-200 pb-3"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full text-right flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-stone-900 hover:text-[#008489] transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#008489] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-2 text-xs text-stone-600 leading-relaxed pt-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. "هل لا تزال لديك أي تساؤلات؟" (Exact Image 6) */}
      {/* ============================================================== */}
      <section className="pt-8 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-5 text-center space-y-2">
          <h4 className="text-base font-black text-stone-900">
            هل لا تزال لديك أي تساؤلات؟
          </h4>
          <p className="text-xs text-stone-500 leading-relaxed pb-2">
            نحن هنا لمساعدتك وتقديم الدعم الذي تحتاجه، لا تتردد بالتواصل عبر الواتس اب!
          </p>
          <a
            href={`https://wa.me/${STORE_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent('السلام عليكم، لدي استفسار بخصوص منتجات المتجر')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#008489] hover:bg-[#007478] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>تواصل الآن</span>
          </a>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. QUICK NUMBERS STRIP (+3 طرق دفع, +100 الطلبات...) */}
      {/* ============================================================== */}
      <section className="mt-6 bg-gradient-to-l from-[#d8f0f2] to-[#ecf8f9] py-4 px-4 text-stone-800 border-y border-[#c6e6e8]">
        <div className="max-w-md mx-auto grid grid-cols-3 text-center divide-x divide-x-reverse divide-stone-300/60">
          <div>
            <span className="text-lg font-black text-[#008489] block font-mono" dir="ltr">+3</span>
            <span className="text-[10px] text-stone-600 font-medium">طرق دفع</span>
          </div>
          <div>
            <span className="text-lg font-black text-[#008489] block font-mono" dir="ltr">+100</span>
            <span className="text-[10px] text-stone-600 font-medium">الطلبات اليومية</span>
          </div>
          <div>
            <span className="text-lg font-black text-[#008489] block font-mono" dir="ltr">+1000</span>
            <span className="text-[10px] text-stone-600 font-medium">المنتجات المتوفرة</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. SALLA OFFICIAL FOOTER (Exact Image 11) */}
      {/* ============================================================== */}
      <footer className="bg-white pt-8 pb-16 px-4 text-center max-w-md mx-auto space-y-6">
        {/* Accordion: روابط تهمك */}
        <div className="border border-stone-200 rounded-xl overflow-hidden text-right">
          <button 
            onClick={() => setExpandedNavCategory(expandedNavCategory === 'links' ? null : 'links')}
            className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-stone-800 bg-stone-50"
          >
            <span>روابط تهمك</span>
            <ChevronDown className="w-4 h-4 text-stone-400" />
          </button>
          {expandedNavCategory === 'links' && (
            <div className="p-3 text-xs space-y-2 text-stone-600 bg-white">
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('الأكثر مبيعاً'); }} className="block hover:text-[#008489]">الأدوات الذكية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('كشوفات المتابعة'); }} className="block hover:text-[#008489]">كشوفات الحضور والغياب</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('التقويم الذاتي'); }} className="block hover:text-[#008489]">الخطط التشغيلية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenAudit(); }} className="block hover:text-[#008489]">وثيقة العمل الحر والسجل التجاري</a>
            </div>
          )}
        </div>

        {/* Big Center Logo from Image 11 */}
        <div className="flex flex-col items-center justify-center pt-2">
          <svg className="h-10 w-auto" viewBox="0 0 135 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="8" r="4" fill="#f59e0b" />
            <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
            <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
            <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
            <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
            <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
            <rect x="88" y="23" width="9" height="16" rx="4.5" fill="#008489" />
            <rect x="101" y="15" width="9" height="24" rx="4.5" fill="#008489" />
          </svg>
          <span className="text-xs text-stone-500 font-medium mt-1">
            الحل الأمثل لسجلاتكم المدرسية
          </span>
        </div>

        {/* Social Media Circles (Exact Image 11) */}
        <div className="flex items-center justify-center gap-3">
          <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#008489] hover:border-[#008489] transition-colors">
            <span className="text-xs font-bold">TikTok</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#008489] hover:border-[#008489] transition-colors">
            <span className="text-xs font-bold">Snap</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#008489] hover:border-[#008489] transition-colors">
            <span className="text-xs font-bold">𝕏</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#008489] hover:border-[#008489] transition-colors">
            <span className="text-xs font-bold">IG</span>
          </a>
        </div>

        {/* Contact List: "تواصل معنا" (Exact Image 11) */}
        <div className="space-y-3 text-right pt-2 text-xs text-stone-800">
          <h5 className="font-black text-sm text-stone-900 mb-3 text-center">تواصل معنا</h5>
          
          <a 
            href={`https://wa.me/${STORE_INFO.contact.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-end gap-3 p-1.5 hover:bg-stone-50 rounded-lg transition-colors"
          >
            <span className="font-mono text-stone-900" dir="ltr">{STORE_INFO.contact.whatsappFormatted}</span>
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </a>

          <a 
            href={`tel:${STORE_INFO.contact.whatsapp}`}
            className="flex items-center justify-end gap-3 p-1.5 hover:bg-stone-50 rounded-lg transition-colors"
          >
            <span className="font-mono text-stone-900" dir="ltr">{STORE_INFO.contact.whatsappFormatted}</span>
            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </a>

          <a 
            href={`tel:${STORE_INFO.contact.whatsapp}`}
            className="flex items-center justify-end gap-3 p-1.5 hover:bg-stone-50 rounded-lg transition-colors"
          >
            <span className="font-mono text-stone-900" dir="ltr">{STORE_INFO.contact.whatsappFormatted}</span>
            <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
          </a>

          <a 
            href={`mailto:${STORE_INFO.contact.email}`}
            className="flex items-center justify-end gap-3 p-1.5 hover:bg-stone-50 rounded-lg transition-colors"
          >
            <span className="font-mono text-stone-900">{STORE_INFO.contact.email}</span>
            <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </a>

          <a 
            href={STORE_INFO.contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-end gap-3 p-1.5 hover:bg-stone-50 rounded-lg transition-colors"
          >
            <span className="font-mono text-stone-900">{STORE_INFO.contact.telegram}</span>
            <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Official Verification Badges (Exact Image 11):
            - وثيقة العمل الحر FL-199700808
            - ضريبة القيمة المضافة VAT 312890988700003 */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200">
          {/* Tax VAT */}
          <div className="bg-[#f8fbfc] p-3 rounded-xl border border-stone-200 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] text-stone-500 font-semibold block">الرقم الضريبي VAT</span>
            <span className="text-xs font-mono font-bold text-stone-900 mt-1 block">312890988700003</span>
            <span className="text-[9px] text-emerald-700 font-medium mt-1">هيئة الزكاة والضريبة والجمارك</span>
          </div>

          {/* Freelance doc */}
          <div className="bg-[#f8fbfc] p-3 rounded-xl border border-stone-200 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] text-stone-500 font-semibold block">وثيقة العمل الحر</span>
            <span className="text-xs font-mono font-bold text-stone-900 mt-1 block">FL-199700808</span>
            <span className="text-[9px] text-[#008489] font-medium mt-1">وزارة الموارد البشرية</span>
          </div>
        </div>

        {/* Copyright (Exact Image 11): "صُنع بإتقان على | 2026 منصة سلة" */}
        <div className="pt-2 text-stone-500 text-xs">
          صُنع بإتقان على | 2026 منصة سلة
        </div>

        {/* Payment Methods Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-stone-600">
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">مدى mada</span>
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">Visa</span>
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">MasterCard</span>
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">PayPal</span>
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">STC Bank</span>
          <span className="px-2 py-0.5 bg-stone-100 rounded text-[9px] font-bold border border-stone-200">Apple Pay</span>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 12. FLOATING CONTROLS (Exact from Screenshots & Video) */}
      {/* ============================================================== */}
      {/* WhatsApp Button (Bottom-Right, exact Image 1, 2, 3, 4) */}
      <a
        href={`https://wa.me/${STORE_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent('السلام عليكم، استفسار بخصوص منتجات المتجر')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3 sm:p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center cursor-pointer"
        title="تواصل معنا عبر واتساب"
        aria-label="تواصل عبر واتساب"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>

      {/* Scroll to top button (Bottom-Left teal button, exact Image 2, 4) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 left-5 z-40 bg-[#008489] hover:bg-[#007478] text-white p-2.5 rounded-full shadow-lg transition-all"
          title="العودة للأعلى"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* Dark Teal "الهدية الترحيبية" tab on the far left edge (Exact Image 2, 3, 4) */}
      <div 
        onClick={() => setShowWelcomeGift(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 bg-[#093c42] hover:bg-[#072d32] text-white px-2 py-3.5 rounded-r-xl shadow-xl cursor-pointer flex flex-col items-center gap-1.5 select-none transition-transform hover:translate-x-0.5 text-[10px] font-bold border-y border-r border-[#155d67]"
      >
        <span className="[writing-mode:vertical-rl] tracking-wider text-[11px]">الهدية الترحيبية</span>
        <span className="text-sm">🎁</span>
      </div>

      {/* ============================================================== */}
      {/* 13. WELCOME 15% DISCOUNT POPUP MODAL (Exact Image 5) */}
      {/* ============================================================== */}
      {showWelcomeGift && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button X in black circle on top left */}
            <button
              onClick={() => setShowWelcomeGift(false)}
              className="absolute top-4 left-4 w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Circular Logo Card in Center from Image 5 */}
            <div className="w-32 h-32 rounded-full border-4 border-[#008489] mx-auto p-2 flex flex-col items-center justify-center bg-white shadow-xs">
              <svg className="h-6 w-auto mb-1" viewBox="0 0 135 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="8" r="4" fill="#f59e0b" />
                <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
                <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
                <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
                <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
                <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
                <rect x="88" y="23" width="9" height="16" rx="4.5" fill="#008489" />
                <rect x="101" y="15" width="9" height="24" rx="4.5" fill="#008489" />
              </svg>
              <span className="text-[9px] font-bold text-stone-800">متجر احتياجك التعليمي</span>
              <span className="text-[8px] text-stone-500">للمنتجات المدرسية</span>
            </div>

            <div className="inline-block bg-[#0f464c] text-white text-xs font-bold px-3 py-1 rounded-md">
              الحل الأمثل لسجلاتكم المدرسية
            </div>

            {/* Texts from Image 5 */}
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-stone-900">سجّل إيميلك يوصلك كود خصم</h3>
              <div className="text-3xl font-black text-[#d97706] font-mono">%15</div>
              <p className="text-xs text-stone-700 font-semibold">
                وملف منظّم مهام مجاني للأسابيع الدراسية 1448هـ
              </p>
            </div>

            {/* Form */}
            {popupSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl text-xs font-bold">
                تم إرسال كود الخصم 15% ورابط الملف إلى بريدك بنجاح!
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (popupEmail) setPopupSubmitted(true);
                }} 
                className="space-y-2.5 pt-1"
              >
                <input
                  type="email"
                  required
                  value={popupEmail}
                  onChange={(e) => setPopupEmail(e.target.value)}
                  placeholder="E-mail"
                  className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#008489] text-left"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  أرسل لي منظّم المهام والخصم
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* AUTH / LOGIN MODAL (Exact Image: تسجسل حساب.jpg) */}
      {/* ============================================================== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-5 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button X on top left */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 left-4 w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center hover:bg-stone-200 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title with User Icon */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-base font-black text-stone-900">تسجيل الدخول</span>
              <div className="w-9 h-9 rounded-full bg-[#e6f3f4] text-[#008489] flex items-center justify-center">
                <User className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>

            {authSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl text-xs font-bold">
                تم إرسال رابط الدخول إلى بريدك الإلكتروني بنجاح!
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (authEmail) setAuthSubmitted(true);
                }} 
                className="space-y-3.5 text-right"
              >
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#008489] text-left font-mono"
                    dir="ltr"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  دخول
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-3 text-[11px] text-stone-400 font-medium">أو سجل دخولك من خلال</span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            {/* Social Logins */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <button 
                onClick={() => { alert('تم تسجيل الدخول بنجاح عبر Apple'); setIsAuthModalOpen(false); }}
                className="w-11 h-11 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs hover:bg-stone-800 transition-transform hover:scale-105 cursor-pointer"
                title="تسجيل الدخول عبر Apple"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.8 6.55c.57-.69 0.96-1.65.85-2.61-.84.03-1.87.56-2.45 1.25-.52.61-.98 1.58-.85 2.52.95.07 1.88-.47 2.45-1.16z"/>
                </svg>
              </button>
              <button 
                onClick={() => { alert('تم تسجيل الدخول بنجاح عبر Google'); setIsAuthModalOpen(false); }}
                className="w-11 h-11 rounded-full bg-white border border-stone-200 text-stone-800 flex items-center justify-center shadow-xs hover:bg-stone-50 transition-transform hover:scale-105 cursor-pointer"
                title="تسجيل الدخول عبر Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.2v3.15C3.16 21.32 7.23 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.2C.44 8.1 0 9.98 0 12s.44 3.9 1.2 5.42l4.08-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.16 2.68 1.2 6.58l4.08 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </button>
              <button 
                onClick={() => { alert('تم تسجيل الدخول بنجاح عبر Facebook'); setIsAuthModalOpen(false); }}
                className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs hover:opacity-95 transition-transform hover:scale-105 cursor-pointer"
                title="تسجيل الدخول عبر Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <a 
                href={`https://wa.me/${STORE_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent('السلام عليكم، أود تسجيل الدخول أو الاستفسار')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs hover:opacity-95 transition-transform hover:scale-105"
                title="تسجيل عبر واتساب"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 14. SLIDING HAMBURGER MENU DRAWER (Exact Image 1) */}
      {/* ============================================================== */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-start"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[85vw] max-w-xs h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 text-right"
          >
            <div>
              {/* Header inside drawer from Image 1: logo on right, close button on left */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="h-7 w-auto" viewBox="0 0 135 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="28" cy="8" r="4" fill="#f59e0b" />
                    <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
                    <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
                    <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
                    <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
                    <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
                    <rect x="88" y="23" width="9" height="16" rx="4.5" fill="#008489" />
                    <rect x="101" y="15" width="9" height="24" rx="4.5" fill="#008489" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-stone-900 leading-tight">احتياجك التعليمي</span>
                    <span className="text-[7.5px] text-stone-400 font-semibold leading-none">الحل الأمثل لسجلاتكم</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X className="w-6 h-6 stroke-[2]" />
                </button>
              </div>

              {/* Exact Menu Items from Image 1:
                  - الأدوات الذكية
                  - السجلات المدرسية (v)
                  - شهادات وتهنئة (v)
                  - كشوفات متابعة (v)
                  - توثيق شواهد الأداء */}
              <nav className="space-y-4 text-sm font-bold text-stone-900 pt-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); onOpenTool('prod-tahseen-v3'); }}
                  className="block py-1 hover:text-[#008489]"
                >
                  الأدوات الذكية
                </a>

                <div>
                  <button 
                    onClick={() => setExpandedNavCategory(expandedNavCategory === 'records' ? null : 'records')}
                    className="w-full flex items-center justify-between py-1 text-stone-900 hover:text-[#008489]"
                  >
                    <span>السجلات المدرسية</span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>
                  {expandedNavCategory === 'records' && (
                    <div className="pr-4 py-2 space-y-2 text-xs font-normal text-stone-600">
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('التقويم الذاتي'); }} className="block">سجلات مدير المدرسة</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('التقويم الذاتي'); }} className="block">سجلات وكيل المدرسة</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('التقويم الذاتي'); }} className="block">سجلات الموجه الطلابي</a>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setExpandedNavCategory(expandedNavCategory === 'certs' ? null : 'certs')}
                    className="w-full flex items-center justify-between py-1 text-stone-900 hover:text-[#008489]"
                  >
                    <span>شهادات وتهنئة</span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>
                  {expandedNavCategory === 'certs' && (
                    <div className="pr-4 py-2 space-y-2 text-xs font-normal text-stone-600">
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('روابط شهادات ذك...'); }} className="block">شهادات تفوق الطلاب</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('روابط شهادات ذك...'); }} className="block">شهادات شكر المعلم</a>
                    </div>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => setExpandedNavCategory(expandedNavCategory === 'tracking' ? null : 'tracking')}
                    className="w-full flex items-center justify-between py-1 text-stone-900 hover:text-[#008489]"
                  >
                    <span>كشوفات متابعة</span>
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  </button>
                  {expandedNavCategory === 'tracking' && (
                    <div className="pr-4 py-2 space-y-2 text-xs font-normal text-stone-600">
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('كشوفات المتابعة'); }} className="block">كشوفات إكسل الذكية</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('كشوفات المتابعة'); }} className="block">رصد الغياب والانضباط</a>
                    </div>
                  )}
                </div>

                <div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setActiveTab('ملفات الإنجاز'); }}
                    className="block py-1 hover:text-[#008489]"
                  >
                    توثيق شواهد الأداء
                  </a>
                </div>
              </nav>
            </div>

            {/* Bottom Gray Links from Image 1 */}
            <div className="pt-6 border-t border-stone-100 space-y-2.5 text-xs text-stone-400">
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenAudit(); }} className="block hover:text-stone-700">سياسة الخصوصية</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenAudit(); }} className="block hover:text-stone-700">سياسة الاستبدال والاسترجاع</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenAudit(); }} className="block hover:text-stone-700">المدونة</a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 15. SLIDING CART DRAWER */}
      {/* ============================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-start">
          <div className="bg-white w-full max-w-xs h-full shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-left duration-200 text-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg"
                >
                  <X className="w-5 h-5 stroke-[2.2]" />
                </button>
                <h3 className="font-bold text-stone-900 text-sm">السلة</h3>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-stone-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 stroke-[1.5]" />
                  <p className="text-xs">سلة مشترياتك فارغة حالياً</p>
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto max-h-[50vh]">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-stone-900 leading-snug line-clamp-1">{item.product.name}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.product.id, -item.quantity)}
                          className="text-stone-400 hover:text-rose-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="font-bold text-[#008489] font-mono">{(item.product.price * item.quantity).toFixed(2)} ر.س</span>
                        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded px-1.5 py-0.5">
                          <button onClick={() => handleUpdateQuantity(item.product.id, -1)} className="text-stone-600">-</button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.product.id, 1)} className="text-stone-600">+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>مجموع المنتجات</span>
                <span className="font-mono font-bold text-stone-800">{cartTotal.toFixed(2)} ر.س</span>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                <div>
                  <span>الإجمالي</span>
                  <span className="block text-[9px] text-stone-400 font-normal">*السعر شامل الضريبة</span>
                </div>
                <span className="text-sm font-black text-[#008489] font-mono">{cartTotal.toFixed(2)} ر.س</span>
              </div>

              <a
                href={STORE_INFO.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold text-center block transition-colors shadow-xs"
              >
                الذهاب لعربة التسوق
              </a>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-800 transition-colors"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 16. SEARCH OVERLAY DRAWER */}
      {/* ============================================================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white p-5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 max-w-md mx-auto">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-900"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="font-bold text-stone-900 text-sm">ما الذي تبحث عنه؟</h3>
            <div className="w-6"></div>
          </div>

          <div className="max-w-md mx-auto mt-6">
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                className="w-full pr-4 pl-10 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#008489] focus:bg-white"
              />
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {searchQuery && (
              <div className="mt-4 text-left">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-4 py-2 bg-[#008489] text-white rounded-lg text-xs font-bold"
                >
                  عرض النتائج ({filteredProducts.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
