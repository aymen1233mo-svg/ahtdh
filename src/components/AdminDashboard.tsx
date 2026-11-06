import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { ProductItem, StoreCategory } from '../types';
import { 
  Store, 
  Package, 
  Settings, 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  RefreshCw, 
  Save, 
  Search, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Layout, 
  Tag, 
  Info,
  DollarSign,
  X,
  Bell,
  Wallet,
  Globe,
  ChevronDown,
  User,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStorefront }) => {
  const { 
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
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'sections' | 'settings' | 'banners'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Form state for adding/editing product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<StoreCategory>('smart_tools');
  const [formSubCategory, setFormSubCategory] = useState('لوحات مدرسية');
  const [formPrice, setFormPrice] = useState(99);
  const [formOriginalPrice, setFormOriginalPrice] = useState(149);
  const [formFormat, setFormFormat] = useState<'Word (.docx)' | 'Excel (.xlsx)' | 'PDF' | 'أداة ويب ذكية' | 'رابط تفاعلي' | 'Photoshop (PSD)'>('Word (.docx)');
  const [formTargetRole, setFormTargetRole] = useState<'مدير مدرسة' | 'وكيل مدرسة' | 'معلم / معلمة' | 'موجه طلابي' | 'رائد نشاط' | 'لجان الاختبارات' | 'الجميع'>('مدير مدرسة');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');

  // Settings local state
  const [localSettings, setLocalSettings] = useState(settings);

  // Sync local settings with context settings
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === '1' && adminPass === '123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('smart_tools');
    setFormSubCategory('أداة ذكية');
    setFormPrice(99);
    setFormOriginalPrice(149);
    setFormFormat('Word (.docx)');
    setFormTargetRole('مدير مدرسة');
    setFormDescription('');
    setFormFeatures('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (prod: ProductItem) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormSubCategory(prod.subCategory);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice || prod.price * 1.3);
    setFormFormat(prod.format);
    setFormTargetRole(prod.targetRole);
    setFormDescription(prod.description);
    setFormFeatures(prod.features.join('\n'));
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = formFeatures.split('\n').filter((f) => f.trim() !== '');

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        category: formCategory,
        subCategory: formSubCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        format: formFormat,
        targetRole: formTargetRole,
        description: formDescription,
        features: featuresList.length ? featuresList : ['منتج احترافي عالي الجودة']
      });
      showToast('تم تعديل المنتج بنجاح وتحديث المتجر فورياً!');
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        subCategory: formSubCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        format: formFormat,
        targetRole: formTargetRole,
        description: formDescription || 'منتج تعليمي متميز لمتجر احتياجك التعليمي',
        features: featuresList.length ? featuresList : ['منتج جاهز ومطابق للتعليمات'],
        tasksAccomplished: ['تنظيم العمل وإدارة السجلات بمهنية عالية'],
        instantDelivery: true,
        tamaraAvailable: true,
        rating: 4.9,
        reviewsCount: 42,
        isBestseller: true
      });
      showToast('تمت إضافة المنتج الجديد بنجاح للمتجر!');
    }
    setIsAddModalOpen(false);
  };

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    showToast('تم حفظ إعدادات المتجر وتطبيق التغييرات فورياً!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <form onSubmit={handleAdminLogin} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-4 text-right">
          <h2 className="text-xl font-black text-stone-900 text-center">دخول لوحة التحكم</h2>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">اسم المستخدم</label>
            <input type="text" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">كلمة المرور</label>
            <input type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs" />
          </div>
          {authError && <p className="text-xs text-rose-600 font-bold">{authError}</p>}
          <button type="submit" className="w-full p-3 bg-[#008489] text-white rounded-xl text-xs font-bold">دخول</button>
          <button type="button" onClick={onBackToStorefront} className="w-full p-3 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold">العودة للمتجر</button>
        </form>
      </div>
    );
  }

  const filteredProductsList = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.subCategory.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 font-sans flex" dir="rtl">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-l border-stone-200 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center font-bold shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-stone-900">لوحة التحكم</h1>
              <p className="text-[10px] text-stone-400">متجر احتياجك التعليمي</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'products', label: 'إدارة المنتجات', icon: Package },
            { id: 'sections', label: 'إدارة الأقسام', icon: Layout },
            { id: 'settings', label: 'بيانات المتجر', icon: Settings },
            { id: 'banners', label: 'البنرات والنصوص', icon: Tag },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-[#008489]'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-100">
           <button
              onClick={onBackToStorefront}
              className="w-full px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>معاينة المتجر</span>
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl font-black text-stone-900">
              {activeTab === 'products' ? 'إدارة المنتجات' : 
               activeTab === 'sections' ? 'إدارة الأقسام' :
               activeTab === 'settings' ? 'بيانات المتجر الأساسية' : 'البنرات والأزرار'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">التحكم الكامل في محتوى المتجر وتحديثه لحظياً</p>
          </div>
          
          <button
            onClick={() => {
              if (confirm('هل أنت متأكد من إرجاع جميع البيانات لضبط المصنع الأصلي؟')) {
                resetToDefaults();
                showToast('تمت إعادة الضبط للوضع الافتراضي بنجاح');
              }
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-stone-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>إعادة ضبط المصنع</span>
          </button>
        </header>

        {/* Dynamic Content Based on Active Tab */}
        <div className="space-y-6">
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="relative flex-1 w-full sm:w-auto">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="ابحث عن منتج بالاسم أو القسم..."
                    className="w-full pr-10 pl-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#008489]"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={handleOpenAddModal}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#008489] hover:bg-[#007478] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة منتج جديد</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                      <tr>
                        <th className="p-4">اسم المنتج والهدف</th>
                        <th className="p-4">القسم الفرعي</th>
                        <th className="p-4">السعر الحقيقي / الأصلي</th>
                        <th className="p-4">الصيغة</th>
                        <th className="p-4">الحالة والظهور</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProductsList.map((prod) => (
                        <tr key={prod.id} className={`hover:bg-stone-50/80 transition-colors ${prod.hidden ? 'opacity-60 bg-stone-50/50' : ''}`}>
                          <td className="p-4 font-bold text-stone-900">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-lg bg-[#eef7f8] text-[#008489] flex items-center justify-center shrink-0 font-mono font-bold">
                                {prod.format.charAt(0)}
                              </div>
                              <div>
                                <span className="block font-bold leading-snug">{prod.name}</span>
                                <span className="text-[10px] text-stone-400 font-normal">{prod.targetRole}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-4 font-medium text-stone-700">
                            <span className="bg-stone-100 px-2.5 py-1 rounded-md text-[11px] font-bold">
                              {prod.subCategory}
                            </span>
                          </td>

                          <td className="p-4 font-mono font-bold text-stone-900">
                            <span className="text-[#008489] text-sm">{prod.price} ر.س</span>
                            {prod.originalPrice && (
                              <span className="block text-[10px] text-stone-400 line-through font-normal">
                                {prod.originalPrice} ر.س
                              </span>
                            )}
                          </td>

                          <td className="p-4 font-semibold text-stone-600">
                            {prod.format}
                          </td>

                          <td className="p-4">
                            {prod.hidden ? (
                              <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full text-[10px] font-bold border border-rose-200">
                                <EyeOff className="w-3 h-3" />
                                <span>مخفي من المتجر</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-200">
                                <Eye className="w-3 h-3" />
                                <span>ظاهر بالمتجر</span>
                              </span>
                            )}
                          </td>

                          <td className="p-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  toggleProductVisibility(prod.id);
                                  showToast(prod.hidden ? `تم إظهار "${prod.name}" بالمتجر` : `تم إخفاء "${prod.name}" من المتجر`);
                                }}
                                className="p-1.5 text-stone-500 hover:text-[#008489] hover:bg-stone-100 rounded-lg transition-colors"
                                title={prod.hidden ? 'إظهار المنتج' : 'إخفاء المنتج'}
                              >
                                {prod.hidden ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                              </button>

                              <button
                                onClick={() => handleOpenEditModal(prod)}
                                className="p-1.5 text-stone-500 hover:text-blue-600 hover:bg-stone-100 rounded-lg transition-colors"
                                title="تعديل المنتج"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`هل أنت متأكد من حذف المنتج "${prod.name}"؟`)) {
                                    deleteProduct(prod.id);
                                    showToast('تم حذف المنتج بنجاح');
                                  }
                                }}
                                className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors"
                                title="حذف المنتج"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sections' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-2xs text-right">
              <h3 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3">إدارة ظهور الأقسام في المتجر</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(sectionVisibility).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-stone-700">
                      {key === 'showHeroBanner' ? 'بنر الترحيب الرئيسي' :
                       key === 'showCategoriesSection' ? 'أقسام الفئات (الدائرية)' :
                       key === 'showProductsSection' ? 'قسم المنتجات الرئيسي' :
                       key === 'showStatsSection' ? 'إحصائيات المتجر' :
                       key === 'showFeaturesSection' ? 'مميزات المتجر' :
                       key === 'showFaqSection' ? 'الأسئلة الشائعة' :
                       key === 'showContactBox' ? 'صندوق التواصل' : 'زر الهدية الترحيبية'}
                    </span>
                    <button
                      onClick={() => updateSectionVisibility({ [key]: !value })}
                      className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-[#008489]' : 'bg-stone-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${value ? 'left-1' : 'left-7'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-2xs text-right">
              <h3 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3">بيانات المتجر الرسمية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">اسم المتجر</label>
                  <input
                    type="text"
                    value={localSettings.name}
                    onChange={(e) => setLocalSettings({...localSettings, name: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">رقم الواتساب</label>
                  <input
                    type="text"
                    value={localSettings.whatsapp}
                    onChange={(e) => setLocalSettings({...localSettings, whatsapp: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">الرقم الضريبي VAT</label>
                  <input
                    type="text"
                    value={localSettings.vatNumber}
                    onChange={(e) => setLocalSettings({...localSettings, vatNumber: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">وثيقة العمل الحر</label>
                  <input
                    type="text"
                    value={localSettings.freelanceDoc}
                    onChange={(e) => setLocalSettings({...localSettings, freelanceDoc: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-8 py-3 bg-[#008489] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#007478] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>حفظ البيانات</span>
              </button>
            </div>
          )}

          {activeTab === 'banners' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-2xs text-right">
              <h3 className="text-sm font-black text-stone-900 border-b border-stone-100 pb-3">البنرات والنصوص الترويجية</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">نص شريط الإعلان العلوي (🚨)</label>
                  <input
                    type="text"
                    value={localSettings.bannerNotice}
                    onChange={(e) => setLocalSettings({...localSettings, bannerNotice: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">عنوان البنر الرئيسي (Hero Title)</label>
                  <input
                    type="text"
                    value={localSettings.heroTitle}
                    onChange={(e) => setLocalSettings({...localSettings, heroTitle: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1.5">النص الفرعي للبنر (Hero Subtitle)</label>
                  <textarea
                    rows={3}
                    value={localSettings.heroSubtitle}
                    onChange={(e) => setLocalSettings({...localSettings, heroSubtitle: e.target.value})}
                    className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none resize-none"
                  ></textarea>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-8 py-3 bg-[#008489] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#007478] transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>تحديث البنرات</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-base font-black text-stone-900">
                  {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-5 text-right">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">اسم المنتج</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="مثال: سجل متابعة الطلاب - الإصدار الثالث"
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">الفئة الرئيسية</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as StoreCategory)}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none appearance-none"
                    >
                      <option value="smart_tools">أدوات ذكية</option>
                      <option value="school_records">سجلات مدرسية</option>
                      <option value="certificates">شهادات وتهنئة</option>
                      <option value="tracking_sheets">كشوفات متابعة</option>
                      <option value="portfolios_guides">ملفات إنجاز وأدلة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">القسم الفرعي</label>
                    <input
                      type="text"
                      required
                      value={formSubCategory}
                      onChange={(e) => setFormSubCategory(e.target.value)}
                      placeholder="مثال: لوحات مدرسية"
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">السعر الحالي (ر.س)</label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">السعر قبل الخصم (ر.س)</label>
                    <input
                      type="number"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">صيغة الملف</label>
                    <select
                      value={formFormat}
                      onChange={(e) => setFormFormat(e.target.value as any)}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none appearance-none"
                    >
                      <option value="Word (.docx)">Word (.docx)</option>
                      <option value="Excel (.xlsx)">Excel (.xlsx)</option>
                      <option value="PDF">PDF</option>
                      <option value="أداة ويب ذكية">أداة ويب ذكية</option>
                      <option value="رابط تفاعلي">رابط تفاعلي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">الفئة المستهدفة</label>
                    <select
                      value={formTargetRole}
                      onChange={(e) => setFormTargetRole(e.target.value as any)}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none appearance-none"
                    >
                      <option value="مدير مدرسة">مدير مدرسة</option>
                      <option value="وكيل مدرسة">وكيل مدرسة</option>
                      <option value="معلم / معلمة">معلم / معلمة</option>
                      <option value="موجه طلابي">موجه طلابي</option>
                      <option value="رائد نشاط">رائد نشاط</option>
                      <option value="لجان الاختبارات">لجان الاختبارات</option>
                      <option value="الجميع">الجميع</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">وصف المنتج</label>
                    <textarea
                      required
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none resize-none"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-500 mb-1.5">المميزات (كل ميزة في سطر)</label>
                    <textarea
                      rows={4}
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      placeholder="مثال: قابل للتعديل بالكامل\nطباعة فورية\nدعم فني مباشر"
                      className="w-full px-4 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:border-[#008489] outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#008489] text-white rounded-xl text-xs font-bold shadow-lg hover:bg-[#007478] transition-colors"
                  >
                    {editingProduct ? 'حفظ التعديلات' : 'إضافة المنتج للمتجر'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-8 py-3 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold hover:bg-stone-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Admin Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-800"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
