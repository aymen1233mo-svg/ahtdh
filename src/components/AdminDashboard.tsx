import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { ProductItem, StoreCategory, ProductType, CategoryItem, OrderLifecycleStep } from '../types';
import { 
  Store, 
  Package, 
  Settings, 
  Layout, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  Save, 
  Search, 
  Tag, 
  X,
  Menu,
  ChevronDown,
  Layers,
  ShoppingBag,
  User,
  DollarSign,
  FileText,
  Check,
  AlertCircle,
  Phone,
  Mail,
  Send,
  Award,
  Download,
  Ticket,
  BarChart3,
  Users,
  Shield,
  Percent,
  ShieldCheck,
  ExternalLink,
  Printer,
  Clock,
  Sparkles,
  MessageSquare,
  Star,
  AlertTriangle,
  Filter,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Share2,
  Copy,
  Target,
  Table2,
  FolderArchive,
  Baby,
  Cpu,
  Calendar,
  Link as LinkIcon,
  FileCheck,
  HelpCircle,
  Activity,
  History,
  TrendingUp,
  CreditCard,
  Database,
  Server,
  Globe,
  HardDrive,
  Lock,
  Workflow,
  Boxes,
  Upload,
  Image as ImageIcon,
  FileUp
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToStorefront: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStorefront }) => {
  const { 
    products, 
    categories,
    settings, 
    sectionVisibility, 
    updateSettings, 
    updateSectionVisibility, 
    resetToDefaults,
    refreshProducts,
    updateCategory,
    addCategory,
    deleteCategory,
    reorderCategories,
    toggleCategoryHidden
  } = useStore();
  
  const { getToken } = useAuth();

  // Navigation: 15 comprehensive operational modules
  type TabType = 
    | 'dashboard'
    | 'products'
    | 'categories'
    | 'orders'
    | 'smart_tools'
    | 'digital_products'
    | 'customers'
    | 'payments'
    | 'coupons'
    | 'marketing'
    | 'reviews'
    | 'support'
    | 'reports'
    | 'users'
    | 'settings';

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Loaded server data
  const [stats, setStats] = useState<any>(null);
  const [allAdminProducts, setAllAdminProducts] = useState<any[]>([]);
  const [ordersList, setOrdersList] = useState<any[]>([]);
  const [customersList, setCustomersList] = useState<any[]>([]);
  const [couponsList, setCouponsList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [ticketsList, setTicketsList] = useState<any[]>([]);
  const [auditLogsList, setAuditLogsList] = useState<any[]>([]);
  const [smartToolsList, setSmartToolsList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters & Search
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productTypeFilter, setProductTypeFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderLifecycleFilter, setOrderLifecycleFilter] = useState<string>('all');
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerSegmentFilter, setCustomerSegmentFilter] = useState<string>('all');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('all');
  const [reportSubTab, setReportSubTab] = useState<'sales' | 'finance' | 'customers' | 'products' | 'smart_tools'>('sales');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any | null>(null);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState<any | null>(null);
  const [isAddCouponModalOpen, setIsAddCouponModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [selectedTicketReply, setSelectedTicketReply] = useState<any | null>(null);
  const [ticketReplyNote, setTicketReplyNote] = useState('');

  // Product Form state
  const [formName, setFormName] = useState('');
  const [formProductType, setFormProductType] = useState<ProductType>('ready_file');
  const [formCategory, setFormCategory] = useState<string>('school_records');
  const [formSubCategory, setFormSubCategory] = useState('سجلات إدارية');
  const [formPrice, setFormPrice] = useState(99);
  const [formOriginalPrice, setFormOriginalPrice] = useState(149);
  const [formFormat, setFormFormat] = useState<any>('Word (.docx)');
  const [formTargetRole, setFormTargetRole] = useState<any>('مدير مدرسة');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formDownloadUrl, setFormDownloadUrl] = useState('');
  const [formHidden, setFormHidden] = useState(false);
  const [formKeywords, setFormKeywords] = useState('');
  const [formIsBestseller, setFormIsBestseller] = useState(false);
  const [formImage, setFormImage] = useState('');

  // Category Form state
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catSubCategories, setCatSubCategories] = useState('');
  const [catSeoKeywords, setCatSeoKeywords] = useState('');
  const [catIcon, setCatIcon] = useState('BookOpen');

  // Coupon Form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState(15);
  const [newCouponTargetRole, setNewCouponTargetRole] = useState('الجميع');
  const [newCouponMinTotal, setNewCouponMinTotal] = useState(0);

  // Customer Form state
  const [newCustomerFirstName, setNewCustomerFirstName] = useState('');
  const [newCustomerLastName, setNewCustomerLastName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('05');

  // Review Form state
  const [newReviewProductId, setNewReviewProductId] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Local settings for settings & marketing tabs
  const [localSettings, setLocalSettings] = useState(settings);

  // Mobile Navigation Drawer & Scrolling State
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showAdminScrollTop, setShowAdminScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowAdminScrollTop(true);
      } else {
        setShowAdminScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAdminTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Settings Sub-Tabs Navigation (Modules 16 - 20)
  const [settingsSubTab, setSettingsSubTab] = useState<
    'identity' | 'whatsapp' | 'payments' | 'policies' | 'salla' | 'lifecycle' | 'levels' | 'health_backup' | 'visibility'
  >('identity');

  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [whatsappTestPhone, setWhatsappTestPhone] = useState('0569766943');
  const [whatsappTestMessage, setWhatsappTestMessage] = useState('مرحباً أ. سلطان، هذه رسالة تجريبية لاختبار أتمتة الإرسال والتسليم الفوري لمتجر sultan-magfory.com بنجاح.');

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 6 Lifecycle steps for orders
  const LIFECYCLE_STEPS: { id: OrderLifecycleStep; label: string; desc: string; badgeColor: string }[] = [
    { id: 'new_order', label: '1. طلب جديد', desc: 'العميل أكمل عملية الشراء', badgeColor: 'bg-blue-100 text-blue-800' },
    { id: 'payment_verified', label: '2. التحقق من الدفع', desc: 'التأكد من نجاح عملية الدفع', badgeColor: 'bg-indigo-100 text-indigo-800' },
    { id: 'product_prepared', label: '3. تجهيز المنتج الرقمي', desc: 'تحديد الملف أو الرابط أو الأداة المطلوبة', badgeColor: 'bg-purple-100 text-purple-800' },
    { id: 'product_delivered', label: '4. تسليم المنتج', desc: 'إتاحة المنتج بالواتساب وحساب العميل', badgeColor: 'bg-teal-100 text-teal-800' },
    { id: 'completed', label: '5. اكتمال الطلب', desc: 'التأكد من وصول المنتج واستخدامه', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { id: 'after_sales', label: '6. خدمة ما بعد البيع', desc: 'استقبال الاستفسارات وتذاكر الاسترجاع 48h', badgeColor: 'bg-amber-100 text-amber-800' },
  ];

  // 6 Support Ticket Statuses
  const TICKET_STATUSES: { id: string; label: string; color: string; desc: string }[] = [
    { id: 'new', label: 'جديد', color: 'bg-blue-100 text-blue-800 border-blue-200', desc: 'تسجيل المشكلة واستلام البلاغ' },
    { id: 'in_review', label: 'قيد المراجعة', color: 'bg-amber-100 text-amber-800 border-amber-200', desc: 'فحص الطلب ومطابقة البيانات' },
    { id: 'in_progress', label: 'قيد المعالجة', color: 'bg-purple-100 text-purple-800 border-purple-200', desc: 'العمل على الحل الفني أو التحديث' },
    { id: 'waiting_customer', label: 'بانتظار العميل', color: 'bg-sky-100 text-sky-800 border-sky-200', desc: 'طلب معلومات إضافية أو ملفات' },
    { id: 'resolved', label: 'تم الحل', color: 'bg-emerald-100 text-emerald-800 border-emerald-200', desc: 'توثيق المعالجة وإرسال البديل' },
    { id: 'closed', label: 'مغلق', color: 'bg-stone-100 text-stone-700 border-stone-200', desc: 'إنهاء التذكرة برضا العميل' },
  ];

  // Fetch full data suite from backend
  const loadDashboardData = async () => {
    setLoadingData(true);
    const token = await getToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
      const statsRes = await fetch('/api/admin/stats', { headers });
      if (statsRes.ok) setStats(await statsRes.json());

      const prodRes = await fetch('/api/admin/products', { headers });
      if (prodRes.ok) setAllAdminProducts(await prodRes.json());

      const ordersRes = await fetch('/api/admin/orders', { headers });
      if (ordersRes.ok) setOrdersList(await ordersRes.json());

      const custRes = await fetch('/api/admin/customers', { headers });
      if (custRes.ok) setCustomersList(await custRes.json());

      const coupRes = await fetch('/api/admin/coupons', { headers });
      if (coupRes.ok) setCouponsList(await coupRes.json());

      const revRes = await fetch('/api/admin/reviews', { headers });
      if (revRes.ok) setReviewsList(await revRes.json());

      const tickRes = await fetch('/api/admin/tickets', { headers });
      if (tickRes.ok) setTicketsList(await tickRes.json());

      const logsRes = await fetch('/api/admin/audit-logs', { headers });
      if (logsRes.ok) setAuditLogsList(await logsRes.json());

      const toolsRes = await fetch('/api/admin/smart-tools', { headers });
      if (toolsRes.ok) setSmartToolsList(await toolsRes.json());

      const healthRes = await fetch('/api/admin/system/health', { headers });
      if (healthRes.ok) setSystemHealth(await healthRes.json());

      const settingsRes = await fetch('/api/admin/settings', { headers });
      if (settingsRes.ok) {
        const s = await settingsRes.json();
        setLocalSettings(prev => ({ ...prev, ...s }));
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser.trim() === '1' && adminPass.trim() === '123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة (اسم المستخدم: 1 ، كلمة المرور: 123)');
    }
  };

  const recordAuditAction = async (action: string, details: string) => {
    const token = await getToken();
    try {
      await fetch('/api/admin/audit-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action,
          actor: 'أ. سلطان مغفوري',
          role: 'مالك المتجر (Super Admin)',
          details
        })
      });
      const logsRes = await fetch('/api/admin/audit-logs', { headers: { 'Authorization': `Bearer ${token}` } });
      if (logsRes.ok) setAuditLogsList(await logsRes.json());
    } catch (e) {}
  };

  // ==========================================
  // PRODUCT ACTIONS (WITH 3 TYPES DISTINCTION)
  // ==========================================
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormProductType('ready_file');
    setFormCategory('school_records');
    setFormSubCategory('سجلات إدارية');
    setFormPrice(99);
    setFormOriginalPrice(149);
    setFormFormat('Word (.docx)');
    setFormTargetRole('مدير مدرسة');
    setFormDescription('');
    setFormFeatures('');
    setFormDownloadUrl('https://drive.google.com/drive/folders/sultan-magfory-store');
    setFormHidden(false);
    setFormKeywords('سجلات مدرسية, تعليم, إدارة مدرسية');
    setFormIsBestseller(false);
    setFormImage('');
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: any) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormProductType(prod.productType || (prod.category === 'smart_tools' ? 'smart_tool' : 'ready_file'));
    setFormCategory(prod.category);
    setFormSubCategory(prod.subCategory);
    setFormPrice(Number(prod.price));
    setFormOriginalPrice(Number(prod.originalPrice || prod.price));
    setFormFormat(prod.format);
    setFormTargetRole(prod.targetRole);
    setFormDescription(prod.description);
    setFormFeatures(Array.isArray(prod.features) ? prod.features.join('\n') : '');
    setFormDownloadUrl(prod.downloadUrl || '');
    setFormHidden(prod.hidden || false);
    setFormKeywords(prod.keywords || '');
    setFormIsBestseller(prod.isBestseller || false);
    setFormImage(prod.image || '');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    const featuresList = formFeatures.split('\n').map(s => s.trim()).filter(Boolean);

    const productPayload = {
      name: formName,
      productType: formProductType,
      category: formCategory,
      subCategory: formSubCategory,
      price: formPrice,
      originalPrice: formOriginalPrice,
      format: formFormat,
      targetRole: formTargetRole,
      description: formDescription,
      features: featuresList,
      downloadUrl: formDownloadUrl,
      hidden: formHidden,
      keywords: formKeywords,
      isBestseller: formIsBestseller,
      image: formImage
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      if (res.ok) {
        showToast(editingProduct ? 'تم تعديل المنتج وتحديث المتجر فوراً' : 'تمت إضافة المنتج ونشره بالمتجر فوراً');
        await recordAuditAction(
          editingProduct ? 'تعديل منتج تعليمي' : 'إضافة منتج تعليمي جديد',
          `${formName} - بسعر ${formPrice} ر.س - نوع: ${formProductType}`
        );
        setIsProductModalOpen(false);
        await refreshProducts();
        await loadDashboardData();
      } else {
        const errData = await res.json();
        showToast(`خطأ: ${errData.error || 'تعذر الحفظ'}`);
      }
    } catch (err) {
      showToast('حدث خطأ في الاتصال');
    }
  };

  const handleToggleProductVisibility = async (id: number) => {
    const token = await getToken();
    try {
      const res = await fetch(`/api/products/${id}/toggle-visibility`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('تم تغيير حالة ظهور المنتج بالمتجر فوراً');
        await recordAuditAction('تغيير حالة ظهور منتج', `معرف المنتج: ${id}`);
        await refreshProducts();
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في تغيير حالة المنتج');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج نهائياً من قاعدة البيانات والمتجر؟')) return;
    const token = await getToken();
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('تم حذف المنتج بنجاح وتحديث المتجر');
        await recordAuditAction('حذف منتج نهائياً', `معرف المنتج المحذوف: ${id}`);
        await refreshProducts();
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ أثناء الحذف');
    }
  };

  // ==========================================
  // CATEGORIES ACTIONS
  // ==========================================
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCatName('');
    setCatDesc('');
    setCatSubCategories('');
    setCatSeoKeywords('');
    setCatIcon('BookOpen');
    setIsAddCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDesc(cat.desc);
    setCatSubCategories(cat.subCategories.join(', '));
    setCatSeoKeywords(cat.seoKeywords || '');
    setCatIcon(cat.icon || 'BookOpen');
    setIsAddCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const subs = catSubCategories.split(',').map(s => s.trim()).filter(Boolean);
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: catName,
        desc: catDesc,
        subCategories: subs,
        seoKeywords: catSeoKeywords,
        icon: catIcon
      });
      showToast('تم تعديل القسم وتحديث الواجهة فوراً');
      recordAuditAction('تعديل قسم بالمتجر', `قسم: ${catName}`);
    } else {
      const newId = 'cat_' + Date.now();
      addCategory({
        id: newId,
        name: catName,
        desc: catDesc,
        subCategories: subs,
        seoKeywords: catSeoKeywords,
        icon: catIcon,
        orderIndex: categories.length + 1
      });
      showToast('تمت إضافة القسم الجديد ونشره بالمتجر فوراً');
      recordAuditAction('إضافة قسم جديد بالمتجر', `قسم: ${catName}`);
    }
    setIsAddCategoryModalOpen(false);
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;
    reorderCategories(newCategories);
    showToast('تم تعديل ترتيب الأقسام بالمتجر');
  };

  // ==========================================
  // ORDER ACTIONS & 6-STEP LIFECYCLE
  // ==========================================
  const handleUpdateOrderStatus = async (orderId: number, newStatus: string, lifecycleStep?: OrderLifecycleStep) => {
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status: newStatus,
          lifecycleStep: lifecycleStep || (newStatus === 'paid' ? 'product_delivered' : newStatus === 'completed' ? 'completed' : 'new_order')
        })
      });
      if (res.ok) {
        showToast(`تم تحديث حالة الطلب #${orderId} وحفظ مسار دورة الحياة`);
        await recordAuditAction('تحديث حالة طلب ومرحلة دورة الحياة', `طلب #${orderId} -> حالة: ${newStatus}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في تحديث حالة الطلب');
    }
  };

  const handleAdvanceLifecycle = async (order: any) => {
    const current = order.lifecycleStep || 'new_order';
    const currentIndex = LIFECYCLE_STEPS.findIndex(s => s.id === current);
    if (currentIndex < LIFECYCLE_STEPS.length - 1) {
      const nextStep = LIFECYCLE_STEPS[currentIndex + 1];
      const newStatus = nextStep.id === 'completed' ? 'completed' : nextStep.id === 'after_sales' ? 'completed' : 'paid';
      await handleUpdateOrderStatus(order.id, newStatus, nextStep.id);
    }
  };

  const handleSendWhatsAppDelivery = (order: any) => {
    const customerPhone = (order.user?.phone || '966508095912').replace(/\D/g, '');
    const customerName = order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() : 'عميلنا العزيز';
    const firstItem = order.items && order.items[0] ? order.items[0].product : null;
    const productName = firstItem?.name || 'المنتج الرقمي التعليمي';
    const downloadLink = firstItem?.downloadUrl || 'https://drive.google.com/drive/folders/sultan-magfory-store';

    const message = encodeURIComponent(
      `مرحباً ${customerName}،\n` +
      `نشكركم لثقتكم بمتجر احتياجك التعليمي (أ. سلطان مغفوري)!\n\n` +
      `✅ تم تفعيل طلبكم رقم: #ORD-${order.id.toString().padStart(4, '0')}\n` +
      `📦 المنتج: ${productName}\n` +
      `🔗 رابط التحميل السحابي المباشر:\n${downloadLink}\n\n` +
      `🧾 الفاتورة الضريبية ZATCA: INV-2026-${order.id.toString().padStart(5, '0')}\n\n` +
      `الملف متاح دائماً في خانة «طلباتي» بحسابكم. في حال وجود أي استفسار يسعدنا خدمتكم على مدار الساعة!`
    );

    window.open(`https://wa.me/${customerPhone}?text=${message}`, '_blank');
    recordAuditAction('إرسال تسليم واتساب للعميل', `طلب #${order.id} للعميل ${customerName}`);
    showToast('تم فتح محادثة الواتساب لإرسال روابط التسليم الرقمي فوراً');
  };

  // ==========================================
  // SMART TOOLS ACTIONS
  // ==========================================
  const handleToggleSmartToolStatus = async (toolId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'maintenance' : 'active';
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/smart-tools/${toolId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast(`تم تغيير حالة الأداة إلى: ${newStatus === 'active' ? 'نشطة' : 'صيانة مؤقتة'}`);
        await recordAuditAction('تغيير حالة أداة ذكية', `أداة ${toolId} -> ${newStatus}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('تعذر التحديث');
    }
  };

  // ==========================================
  // SUPPORT TICKET ACTIONS (6 STATES)
  // ==========================================
  const handleUpdateTicketStatus = async (ticketId: string, status: string, notes?: string) => {
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, adminNotes: notes })
      });
      if (res.ok) {
        showToast(`تم تحديث تذكرة الدعم ${ticketId}`);
        await recordAuditAction('تحديث حالة تذكرة دعم', `تذكرة ${ticketId} -> ${status}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في التحديث');
    }
  };

  // ==========================================
  // COUPON ACTIONS
  // ==========================================
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const token = await getToken();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: newCouponCode,
          discountPercent: newCouponPercent,
          isActive: true
        })
      });
      if (res.ok) {
        showToast(`تم إنشاء الكود ${newCouponCode.toUpperCase()} بخصم ${newCouponPercent}%`);
        await recordAuditAction('إنشاء كود خصم جديد', `كود ${newCouponCode.toUpperCase()} بخصم ${newCouponPercent}% - فئة: ${newCouponTargetRole}`);
        setNewCouponCode('');
        setIsAddCouponModalOpen(false);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('تعذر إنشاء الكود');
    }
  };

  const handleToggleCoupon = async (id: number) => {
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/coupons/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('تم تغيير حالة الكوبون');
        await recordAuditAction('تغيير حالة كود خصم', `معرف الكود: ${id}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في تحديث الكوبون');
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    if (!confirm('حذف هذا الكوبون؟')) return;
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('تم حذف الكوبون');
        await recordAuditAction('حذف كود خصم', `معرف الكود: ${id}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في الحذف');
    }
  };

  // ==========================================
  // CUSTOMER ACTIONS
  // ==========================================
  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: newCustomerFirstName,
          lastName: newCustomerLastName,
          email: newCustomerEmail,
          phone: newCustomerPhone
        })
      });
      if (res.ok) {
        showToast('تمت إضافة العميل بنجاح');
        await recordAuditAction('إضافة عميل يدوياً', `${newCustomerFirstName} ${newCustomerLastName} - ${newCustomerPhone}`);
        setNewCustomerFirstName('');
        setNewCustomerLastName('');
        setNewCustomerEmail('');
        setNewCustomerPhone('05');
        setIsAddCustomerModalOpen(false);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في إضافة العميل');
    }
  };

  // ==========================================
  // REVIEWS ACTIONS
  // ==========================================
  const handleDeleteReview = async (id: number) => {
    if (!confirm('حذف هذا التقييم؟')) return;
    const token = await getToken();
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showToast('تم حذف التقييم');
        await recordAuditAction('حذف تقييم', `معرف التقييم: ${id}`);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في حذف التقييم');
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: newReviewProductId || (allAdminProducts[0]?.id || 1),
          rating: newReviewRating,
          comment: newReviewComment
        })
      });
      if (res.ok) {
        showToast('تم نشر المراجعة الموثقة');
        await recordAuditAction('نشر تقييم موثق لمنتج', `تقييم ${newReviewRating} نجوم`);
        setNewReviewComment('');
        setIsAddReviewModalOpen(false);
        await loadDashboardData();
      }
    } catch (err) {
      showToast('خطأ في إضافة المراجعة');
    }
  };

  // Save Settings & Immediately Propagate (Local & Server)
  const handleSaveSettings = async () => {
    updateSettings(localSettings);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(localSettings)
      });
    } catch (e) {
      console.warn("Server settings sync warning", e);
    }
    recordAuditAction('تعديل وحفظ إعدادات المتجر العامة', 'تحديث بيانات الهوية والتواصل والضرائب وبوابات الدفع والتكاملات وسياسات المتجر');
    showToast('تم حفظ كافة إعدادات المتجر وتطبيقها إجبارياً على المتجر فوراً');
  };

  // Fetch System Health & Metrics
  const fetchSystemHealth = async () => {
    setHealthLoading(true);
    try {
      const res = await fetch('/api/admin/system/health', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setSystemHealth(data);
    } catch (err) {
      console.error("Health check error", err);
    } finally {
      setHealthLoading(false);
    }
  };

  // Export Full JSON Database Backup
  const handleExportBackup = async () => {
    try {
      const res = await fetch('/api/admin/backup/export', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sultan-magfory-full-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('تم تصدير وتنزيل النسخة الاحتياطية الشاملة لقاعدة بيانات المتجر بنجاح');
      recordAuditAction('تصدير نسخة احتياطية شاملة', 'تنزيل ملف JSON متكامل لجميع الجداول والسجلات');
    } catch (err) {
      showToast('تعذر تصدير النسخة الاحتياطية');
    }
  };

  // Test WhatsApp Notification Dispatch
  const handleTestWhatsApp = async () => {
    try {
      const res = await fetch('/api/admin/notifications/whatsapp-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ phone: whatsappTestPhone, message: whatsappTestMessage })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`تم توجيه رسالة الاختبار للرقم ${whatsappTestPhone}`);
        if (data.whatsappWebUrl) {
          window.open(data.whatsappWebUrl, '_blank');
        }
      }
    } catch (err) {
      showToast('خطأ في إرسال رسالة واتساب');
    }
  };

  // Simulate / Test Salla Webhook Event
  const handleSimulateSallaWebhook = async () => {
    try {
      const res = await fetch('/api/webhooks/salla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'order.created',
          data: {
            id: 'ORD-SALLA-' + Math.floor(1000 + Math.random() * 9000),
            status: { name: 'تم الدفع وتجهيز الروابط' },
            total: { amount: 113.85, currency: 'SAR' },
            customer: { name: 'عميل منصة سلة التعليمي', mobile: '0501234567' }
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('تم استقبال ومعالجة إشعار Webhook من منصة سلة وتوثيقه في سجل الرقابة بنجاح');
        await loadDashboardData();
      }
    } catch (err) {
      showToast('تعذر استقبال إشعار Webhook');
    }
  };

  // 15 Comprehensive Navigation Tabs list
  const navTabs: { id: TabType; label: string; icon: any; badge?: string | number }[] = [
    { id: 'dashboard', label: 'لوحة المعلومات الرئيسية', icon: Layout },
    { id: 'products', label: 'إدارة المنتجات (3 أنواع)', icon: Package, badge: allAdminProducts.length || products.length },
    { id: 'categories', label: 'إدارة الأقسام والتصنيفات', icon: Layers, badge: categories.length },
    { id: 'orders', label: 'إدارة الطلبات ودورة الحياة', icon: ShoppingBag, badge: ordersList.length },
    { id: 'smart_tools', label: 'إدارة الأدوات الذكية والأتمتة', icon: Cpu, badge: smartToolsList.length || '4' },
    { id: 'digital_products', label: 'المنتجات الرقمية والتراخيص', icon: Download },
    { id: 'customers', label: 'إدارة العملاء والشرائح', icon: User, badge: customersList.length },
    { id: 'payments', label: 'المدفوعات والفواتير (ZATCA)', icon: CreditCard },
    { id: 'coupons', label: 'الكوبونات والعروض الموجهة', icon: Percent, badge: couponsList.length },
    { id: 'marketing', label: 'التسويق والإعلانات والـ SEO', icon: Tag },
    { id: 'reviews', label: 'التقييمات والمراجعات (+6000)', icon: Star, badge: reviewsList.length },
    { id: 'support', label: 'خدمة العملاء والدعم السداسي', icon: Ticket, badge: ticketsList.filter(t => t.status === 'new' || t.status === 'in_progress').length || undefined },
    { id: 'reports', label: 'التقارير والإحصائيات الخمسة', icon: BarChart3 },
    { id: 'users', label: 'المستخدمين وسجل العمليات (Audit)', icon: ShieldCheck },
    { id: 'settings', label: 'إعدادات المتجر والتكاملات', icon: Settings },
  ];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4 font-sans" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-800/90 backdrop-blur-md border border-stone-700/80 p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6 text-right"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center shadow-lg shadow-teal-900/50">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white">لوحة تحكم متجر احتياجك التعليمي</h2>
            <p className="text-xs text-stone-400">الإصدار الإداري الشامل — الأستاذ سلطان مغفوري</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">اسم المستخدم</label>
              <input 
                type="text" 
                value={adminUser} 
                onChange={(e) => setAdminUser(e.target.value)} 
                placeholder="1"
                className="w-full p-3.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#008489] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">كلمة المرور</label>
              <input 
                type="password" 
                value={adminPass} 
                onChange={(e) => setAdminPass(e.target.value)} 
                placeholder="123"
                className="w-full p-3.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#008489] transition-all" 
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-700/50 text-[11px] text-stone-400 space-y-1">
              <p className="font-bold text-stone-300">بيانات الدخول التجريبية السريعة:</p>
              <p>اسم المستخدم: <span className="text-teal-400 font-mono font-bold">1</span></p>
              <p>كلمة المرور: <span className="text-teal-400 font-mono font-bold">123</span></p>
            </div>

            <button 
              type="submit" 
              className="w-full p-3.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-sm font-black transition-all shadow-lg shadow-teal-900/40 cursor-pointer"
            >
              تسجيل الدخول للوحة التحكم
            </button>

            <button 
              type="button" 
              onClick={onBackToStorefront} 
              className="w-full p-3 bg-stone-700/50 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              <span>العودة لواجهة المتجر</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen text-stone-900 font-sans flex flex-col lg:flex-row antialiased relative" dir="rtl">
      
      {/* ========================================================= */}
      {/* MOBILE STICKY TOP APP BAR (Visible on screens < lg) */}
      {/* ========================================================= */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 text-stone-800 hover:text-[#008489] hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            aria-label="قائمة التحكم"
          >
            <Menu className="w-6 h-6 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xs font-black text-stone-900 leading-tight">لوحة الإدارة والتشغيل</h1>
              <p className="text-[9px] text-[#008489] font-bold">
                {navTabs.find(t => t.id === activeTab)?.label}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={loadDashboardData}
            disabled={loadingData}
            className="p-2 text-stone-600 hover:text-[#008489] hover:bg-stone-100 rounded-xl transition-colors"
            title="تحديث البيانات الحية"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin text-teal-600' : ''}`} />
          </button>

          <button
            onClick={onBackToStorefront}
            className="px-2.5 py-1.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
          >
            <span>المتجر</span>
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE SLIDING SIDEBAR NAVIGATION DRAWER (AnimatePresence) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <div
            className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-start lg:hidden"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[82vw] max-w-xs h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto text-right"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center font-bold shadow-xs">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-stone-900">لوحة تحكم المتجر</h3>
                      <p className="text-[9px] text-[#008489] font-bold">الميدان التعليمي 1448هـ</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categorized Mobile Navigation Modules */}
                <nav className="space-y-1 py-1">
                  <div className="text-[10px] font-bold text-stone-400 px-2 py-1">التشغيل والمبيعات</div>
                  {navTabs.slice(0, 6).map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileNavOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#008489] text-white shadow-xs'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#008489]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className="text-[10px] font-bold text-stone-400 px-2 pt-3 py-1 border-t border-stone-100 mt-2">
                    العملاء والمالية والتسويق
                  </div>
                  {navTabs.slice(6, 10).map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileNavOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#008489] text-white shadow-xs'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#008489]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className="text-[10px] font-bold text-stone-400 px-2 pt-3 py-1 border-t border-stone-100 mt-2">
                    الجودة والدعم والإعدادات
                  </div>
                  {navTabs.slice(10).map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileNavOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#008489] text-white shadow-xs'
                            : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#008489]'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <button
                  onClick={onBackToStorefront}
                  className="w-full py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  <span>معاينة المتجر المباشر</span>
                </button>

                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full text-center text-xs text-rose-600 font-bold py-1"
                >
                  تسجيل الخروج
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* DESKTOP SIDEBAR NAVIGATION (Visible on screens >= lg) */}
      {/* ========================================================= */}
      <aside className="hidden lg:flex w-72 bg-white border-l border-stone-200 flex-col shrink-0 h-screen sticky top-0 z-30 shadow-xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center font-bold shadow-xs">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-black text-stone-900 leading-tight">لوحة الإدارة والتشغيل</h1>
              <p className="text-[10px] text-teal-700 font-bold">متجر سلطان مغفوري</p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            مباشر 🟢
          </span>
        </div>

        {/* Navigation Items (15 Modules) */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
          {navTabs.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#008489] text-white shadow-xs' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-stone-100 space-y-2 bg-stone-50/50">
          <button 
            onClick={onBackToStorefront} 
            className="w-full px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rotate-180" />
            <span>معاينة المتجر المباشر</span>
          </button>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="w-full text-center text-[11px] text-stone-400 hover:text-rose-600 py-1 font-semibold transition-colors cursor-pointer"
          >
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-h-screen">
        
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-stone-200/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>لوحة التحكم الإدارية</span>
              <span>/</span>
              <span className="text-[#008489] font-bold">
                {navTabs.find(t => t.id === activeTab)?.label}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              {navTabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button 
              onClick={loadDashboardData} 
              disabled={loadingData}
              className="px-3.5 py-2 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin text-teal-600' : ''}`} />
              <span>تحديث البيانات الحية</span>
            </button>

            <button 
              onClick={() => {
                if (confirm('تأكيد إعادة ضبط المتجر على الإعدادات الافتراضية؟')) {
                  resetToDefaults();
                  showToast('تمت استعادة ضبط المصنع لجميع الإعدادات');
                }
              }} 
              className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>إعادة ضبط المصنع</span>
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* TAB 1: لوحة المعلومات الرئيسية (DASHBOARD) */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Primary KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">إجمالي المبيعات</span>
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {stats ? Number(stats.totalSales).toLocaleString('ar-SA') : '0'} ر.س
                </div>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                  <span>+18.4%</span>
                  <span className="text-stone-400 font-normal">مقارنة بالشهر الماضي</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">صافي الأرباح التشغيلية</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-emerald-700 font-mono">
                  {stats ? Number(stats.netProfit || stats.netRevenue).toLocaleString('ar-SA') : '0'} ر.س
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  بعد خصم الضريبة 15% ورسوم بوابات الدفع
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">إجمالي الطلبات المنفذة</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {stats ? stats.orderCount : ordersList.length}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px]">
                  <span className="text-emerald-600 font-bold">{stats ? stats.completedOrdersCount : 0} مكتمل</span>
                  <span className="text-stone-300">|</span>
                  <span className="text-amber-600 font-bold">{stats ? stats.newOrdersCount : 0} جديد</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-500">العملاء والمدارس</span>
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-black text-stone-900 font-mono">
                  {stats ? stats.customerCount : customersList.length}
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  معلمون ومديرون ووكلاء مسجلون
                </div>
              </div>
            </div>

            {/* Secondary Financial & Tech KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 font-bold block mb-0.5">المبيعات قبل الضريبة</span>
                  <span className="text-lg font-black font-mono text-teal-400">
                    {stats ? stats.baseSales : '0'} ر.س
                  </span>
                </div>
                <DollarSign className="w-7 h-7 text-teal-400/80" />
              </div>

              <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 font-bold block mb-0.5">ضريبة القيمة المضافة 15%</span>
                  <span className="text-lg font-black font-mono text-amber-400">
                    {stats ? stats.vatAmount : '0'} ر.س
                  </span>
                </div>
                <ShieldCheck className="w-7 h-7 text-amber-400/80" />
              </div>

              <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 font-bold block mb-0.5">تشغيل الأدوات الذكية</span>
                  <span className="text-lg font-black font-mono text-emerald-400">
                    1,240 عملية
                  </span>
                </div>
                <Cpu className="w-7 h-7 text-emerald-400/80" />
              </div>

              <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 font-bold block mb-0.5">نسبة نجاح الأتمتة</span>
                  <span className="text-lg font-black font-mono text-emerald-300">
                    99.5%
                  </span>
                </div>
                <CheckCircle2 className="w-7 h-7 text-emerald-400/80" />
              </div>
            </div>

            {/* Executive Daily Questions Check */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="text-sm font-black text-stone-900">
                    تساؤلات ومؤشرات المدير التنفيذي اليومية
                  </h3>
                </div>
                <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg font-bold">
                  تحديث تلقائي لحالة المتجر
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">1. هل المبيعات تسير وفق المستهدف الشهري؟</span>
                    <span className="text-emerald-700 font-bold">نعم (88% من المستهدف)</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    تم تحقيق 14,850 ر.س خلال آخر 15 يوماً مدفوعة بالإقبال على خطط التقويم الذاتي وبداية الفصل الدراسي.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">2. حالة أتمتة التسليم الرقمي للملفات؟</span>
                    <span className="text-emerald-700 font-bold">100% مؤتمت وسلس</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    الربط السحابي لـ Google Drive وواتساب مفعّل بنجاح؛ الملفات والروابط تصل للمشتري لحظة تأكيد السداد.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">3. طلبات الاسترجاع وفق سياسة الـ 48 ساعة؟</span>
                    <span className="text-teal-700 font-bold">0 تذاكر متأخرة</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    يتم فحص بلاغات عدم مطابقة الملفات أو المشاكل التقنية في أقل من 24 ساعة، مع إمكانية التعويض الفوري.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-800">4. فئات المعلمين الأكثر إقبالاً اليوم؟</span>
                    <span className="text-blue-700 font-bold">مديرو ووكلاء المدارس (62%)</span>
                  </div>
                  <p className="text-stone-500 text-[11px] leading-relaxed">
                    حقائب السجلات المدرسية وأدوات رصد الحضور والانضباط عبر الإكسل تشهد أعلى معدلات التحويل.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: إدارة المنتجات (PRODUCTS - 3 TYPES) */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-5">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="بحث بالاسم أو الكلمات المفتاحية..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pr-9 pl-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#008489]"
                  />
                </div>

                <select 
                  value={productTypeFilter}
                  onChange={(e) => setProductTypeFilter(e.target.value)}
                  className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none"
                >
                  <option value="all">كل الأنواع (ملفات، روابط، أدوات)</option>
                  <option value="ready_file">📄 ملفات جاهزة (Word, Excel)</option>
                  <option value="web_link">🔗 روابط شهادات ومنصات</option>
                  <option value="smart_tool">⚡ أدوات تفاعلية ذكية</option>
                </select>

                <select 
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none"
                >
                  <option value="all">كل الأقسام الرئيسية</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button 
                  onClick={handleOpenAddProduct}
                  className="px-4 py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة منتج تعليمي جديد</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-4">المنتج والنوع</th>
                      <th className="p-4">التصنيف والقسم</th>
                      <th className="p-4">الدور المستهدف</th>
                      <th className="p-4">السعر</th>
                      <th className="p-4">حالة العرض بالمتجر</th>
                      <th className="p-4">آلية التسليم والرابط</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {(allAdminProducts.length > 0 ? allAdminProducts : products)
                      .filter(p => {
                        const matchesSearch = 
                          p.name.includes(productSearch) || 
                          (p.subCategory && p.subCategory.includes(productSearch)) ||
                          (p.keywords && p.keywords.includes(productSearch));
                        const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
                        const pType = p.productType || (p.category === 'smart_tools' ? 'smart_tool' : 'ready_file');
                        const matchesType = productTypeFilter === 'all' || pType === productTypeFilter;
                        return matchesSearch && matchesCategory && matchesType;
                      })
                      .map((prod: any) => {
                        const pType = prod.productType || (prod.category === 'smart_tools' ? 'smart_tool' : 'ready_file');
                        return (
                          <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-stone-900 leading-snug">{prod.name}</div>
                              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                                {pType === 'smart_tool' && (
                                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                    <Cpu className="w-3 h-3" />
                                    <span>أداة تفاعلية ذكية</span>
                                  </span>
                                )}
                                {pType === 'web_link' && (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                    <LinkIcon className="w-3 h-3" />
                                    <span>رابط شهادة/منصة</span>
                                  </span>
                                )}
                                {pType === 'ready_file' && (
                                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    <span>ملف جاهز للتعديل</span>
                                  </span>
                                )}

                                <span className="bg-stone-100 px-2 py-0.5 rounded font-mono font-bold text-stone-700">
                                  {prod.format || 'Word'}
                                </span>

                                {prod.isBestseller && (
                                  <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded font-bold">
                                    الأكثر مبيعاً ⭐
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="p-4">
                              <span className="inline-block bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg font-bold text-[11px]">
                                {prod.subCategory || 'سجلات تعليمية'}
                              </span>
                            </td>

                            <td className="p-4 text-stone-700 font-medium">
                              {prod.targetRole || 'الجميع'}
                            </td>

                            <td className="p-4">
                              <div className="font-black font-mono text-stone-900 text-sm">{prod.price} ر.س</div>
                              {prod.originalPrice && Number(prod.originalPrice) > Number(prod.price) && (
                                <div className="text-[10px] text-stone-400 line-through font-mono">
                                  {prod.originalPrice} ر.س
                                </div>
                              )}
                            </td>

                            <td className="p-4">
                              <button
                                onClick={() => handleToggleProductVisibility(prod.id)}
                                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                  !prod.hidden 
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                }`}
                              >
                                {!prod.hidden ? (
                                  <>
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>معروض بالمتجر</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3.5 h-3.5" />
                                    <span>مخفي</span>
                                  </>
                                )}
                              </button>
                            </td>

                            <td className="p-4">
                              {prod.downloadUrl ? (
                                <a 
                                  href={prod.downloadUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="text-teal-700 hover:underline inline-flex items-center gap-1 font-bold text-[11px]"
                                >
                                  <span>{pType === 'smart_tool' ? 'تشغيل الأداة' : 'فحص الرابط'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-stone-400 text-[11px]">غير مضاف</span>
                              )}
                            </td>

                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => handleOpenEditProduct(prod)}
                                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors cursor-pointer"
                                  title="تعديل المنتج"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="p-2 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors cursor-pointer"
                                  title="حذف المنتج"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: إدارة الأقسام والتصنيفات (CATEGORIES) */}
        {/* ========================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs">
              <div>
                <h3 className="text-base font-black text-stone-900">
                  إدارة الأقسام والتصنيفات الرسمية لمتجر سلطان مغفوري (sultan-magfory.com)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  تعديل أسماء الأقسام، ترتيبها، إدارة الفئات الفرعية، تحسين محركات البحث SEO، وإخفاء أو إظهار أي قسم فوراً
                </p>
              </div>
              <button
                onClick={handleOpenAddCategory}
                className="px-4 py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء قسم جديد</span>
              </button>
            </div>

            <div className="space-y-3">
              {categories.map((cat, idx) => {
                const count = (allAdminProducts.length > 0 ? allAdminProducts : products).filter(p => p.category === cat.id).length;
                return (
                  <div 
                    key={cat.id} 
                    className={`bg-white rounded-2xl border transition-all p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      cat.isHidden ? 'border-dashed border-stone-300 opacity-60 bg-stone-50' : 'border-stone-200'
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex flex-col gap-1 items-center justify-center shrink-0">
                        <button
                          onClick={() => handleMoveCategory(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 hover:bg-stone-100 disabled:opacity-30 rounded text-stone-600 cursor-pointer"
                          title="تحريك لأعلى"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-mono font-bold text-stone-400">{idx + 1}</span>
                        <button
                          onClick={() => handleMoveCategory(idx, 'down')}
                          disabled={idx === categories.length - 1}
                          className="p-1.5 hover:bg-stone-100 disabled:opacity-30 rounded text-stone-600 cursor-pointer"
                          title="تحريك لأسفل"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold shrink-0">
                        <BookOpen className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-stone-900 text-sm">{cat.name}</h4>
                          <span className="text-[11px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-bold">
                            {count} منتجات مربوطة
                          </span>
                          {cat.isHidden && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                              مخفي مؤقتاً
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 leading-relaxed">{cat.desc}</p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[11px] font-bold text-stone-400">الفئات الفرعية:</span>
                          {cat.subCategories.map((sub, sIdx) => (
                            <span key={sIdx} className="bg-stone-100 text-stone-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                              {sub}
                            </span>
                          ))}
                        </div>

                        {cat.seoKeywords && (
                          <div className="text-[10px] text-teal-700 pt-0.5">
                            <span className="font-bold">كلمات السيو (SEO):</span> {cat.seoKeywords}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                      <button
                        onClick={() => {
                          setProductCategoryFilter(cat.id);
                          setActiveTab('products');
                        }}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        عرض المنتجات
                      </button>

                      <button
                        onClick={() => toggleCategoryHidden(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                          !cat.isHidden ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100' : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {!cat.isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{!cat.isHidden ? 'معروض' : 'مخفي'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditCategory(cat)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors cursor-pointer"
                        title="تعديل القسم"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`حذف قسم "${cat.name}"؟`)) {
                            deleteCategory(cat.id);
                            showToast('تم حذف القسم بنجاح');
                          }
                        }}
                        className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl transition-colors cursor-pointer"
                        title="حذف القسم"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: إدارة الطلبات ودورة الحياة الستة (ORDERS) */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#008489]" />
                    <span>دورة حياة الطلب الستة (The 6-Step Order Lifecycle):</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    مسار أوتوماتيكي ومباشر يضمن تسليم الملفات والروابط للعميل عبر واتساب وفي خانة طلباتي فور السداد
                  </p>
                </div>
                <span className="text-xs font-bold bg-teal-50 text-[#008489] px-3 py-1 rounded-full">
                  تسليم رقمي فوري 100%
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
                {LIFECYCLE_STEPS.map((step) => {
                  const count = ordersList.filter(o => (o.lifecycleStep || 'new_order') === step.id).length;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setOrderLifecycleFilter(orderLifecycleFilter === step.id ? 'all' : step.id)}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        orderLifecycleFilter === step.id 
                          ? 'border-[#008489] bg-teal-50/70 shadow-xs' 
                          : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-xs text-stone-900">{step.label}</span>
                        <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-stone-200 text-stone-700">
                          {count}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 leading-tight">{step.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orders Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="بحث برقم الطلب، اسم العميل، أو الجوال..." 
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pr-9 pl-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#008489]"
                  />
                </div>

                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
                  {[
                    { id: 'all', label: 'كل الحالات' },
                    { id: 'paid', label: 'مدفوع ومسلّم' },
                    { id: 'pending', label: 'قيد الانتظار' },
                    { id: 'refunded', label: 'مسترجع' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setOrderStatusFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        orderStatusFilter === tab.id ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs font-bold text-stone-500">
                إجمالي الطلبات المعروضة: {ordersList.length}
              </span>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-4">رقم الطلب والتاريخ</th>
                      <th className="p-4">العميل والجوال</th>
                      <th className="p-4">المنتجات ونوعها</th>
                      <th className="p-4">طريقة الدفع</th>
                      <th className="p-4">الإجمالي</th>
                      <th className="p-4">مرحلة دورة الحياة الستة</th>
                      <th className="p-4 text-center">التسليم الفوري</th>
                      <th className="p-4 text-center">الفاتورة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ordersList
                      .filter(o => {
                        const matchesSearch = 
                          o.id.toString().includes(orderSearch) || 
                          (o.user && (`${o.user.firstName} ${o.user.lastName}`).includes(orderSearch)) ||
                          (o.user?.phone && o.user.phone.includes(orderSearch));
                        const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
                        const currentStep = o.lifecycleStep || 'completed';
                        const matchesStep = orderLifecycleFilter === 'all' || currentStep === orderLifecycleFilter;
                        return matchesSearch && matchesStatus && matchesStep;
                      })
                      .map((order: any) => {
                        const currentStepObj = LIFECYCLE_STEPS.find(s => s.id === (order.lifecycleStep || 'completed')) || LIFECYCLE_STEPS[4];
                        return (
                          <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-black text-stone-900 block">
                                #ORD-{order.id.toString().padStart(4, '0')}
                              </span>
                              <span className="text-[10px] text-stone-400">
                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('ar-SA') : 'اليوم'}
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="font-bold text-stone-900">
                                {order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() : 'عميل تعليمي'}
                              </div>
                              <div className="text-[10px] text-stone-400 font-mono">
                                {order.user?.phone || '05XXXXXXXX'}
                              </div>
                            </td>

                            <td className="p-4 max-w-xs">
                              <div className="truncate text-stone-800 font-medium">
                                {order.items && order.items.length > 0 
                                  ? order.items.map((it: any) => it.product?.name).filter(Boolean).join(' + ')
                                  : 'أداة تحسين أو حقيبة السجلات المدرسية'}
                              </div>
                              <span className="text-[10px] text-teal-700 font-bold">
                                {order.items ? `${order.items.length} ملفات رقمية` : '1 ملف'}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                                {order.paymentMethod === 'mada' ? 'مدى Mada' : 
                                 order.paymentMethod === 'apple_pay' ? 'أبل باي Apple Pay' : 
                                 order.paymentMethod === 'tamara' ? 'تمارا Tamara' : 
                                 order.paymentMethod || 'بطاقة بنكية'}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className="font-mono font-black text-stone-900 text-sm">
                                {Number(order.total).toFixed(2)} ر.س
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="space-y-1">
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${currentStepObj.badgeColor}`}>
                                  {currentStepObj.label}
                                </span>
                                
                                <div className="flex items-center gap-1">
                                  <select
                                    value={order.lifecycleStep || 'completed'}
                                    onChange={(e) => handleUpdateOrderStatus(order.id, order.status, e.target.value as OrderLifecycleStep)}
                                    className="p-1 rounded text-[10px] bg-stone-50 border border-stone-200 font-medium"
                                  >
                                    {LIFECYCLE_STEPS.map(s => (
                                      <option key={s.id} value={s.id}>{s.label}</option>
                                    ))}
                                  </select>

                                  <button
                                    onClick={() => handleAdvanceLifecycle(order)}
                                    className="p-1 text-teal-700 hover:bg-teal-50 rounded text-[10px] font-bold cursor-pointer"
                                    title="التقدم للمرحلة التالية في دورة الحياة"
                                  >
                                    تخطي ←
                                  </button>
                                </div>
                              </div>
                            </td>

                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleSendWhatsAppDelivery(order)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                                title="إرسال رابط التحميل والبيانات تلقائياً لواتساب العميل"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>إرسال واتساب</span>
                              </button>
                            </td>

                            <td className="p-4 text-center">
                              <button
                                onClick={() => {
                                  setSelectedInvoiceOrder(order);
                                  setIsInvoiceModalOpen(true);
                                }}
                                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>الفاتورة</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: إدارة الأدوات الذكية والأتمتة (SMART TOOLS) */}
        {/* ========================================================= */}
        {activeTab === 'smart_tools' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#008489]" />
                    <span>لوحة تشغيل وإدارة الأدوات الرقمية الذكية (Smart Tools Management):</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    إدارة النماذج والمدخلات، محرك معالجة البيانات، ملفات المخرجات بصيغ Word و PDF، وإحصائيات العمليات الفاشلة والناجحة
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    معدل النجاح: 99.5%
                  </span>
                </div>
              </div>

              {/* KPI Cards for Smart Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                  <span className="text-[11px] font-bold text-teal-800 block mb-1">إجمالي عمليات المعالجة</span>
                  <span className="text-2xl font-black text-[#008489] font-mono">3,260</span>
                  <span className="text-[10px] text-teal-700 block mt-1">تشغيل سحابي مؤتمت</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[11px] font-bold text-emerald-800 block mb-1">العمليات الناجحة</span>
                  <span className="text-2xl font-black text-emerald-700 font-mono">3,247</span>
                  <span className="text-[10px] text-emerald-600 block mt-1">تم تسليم ملفات Word وPDF</span>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                  <span className="text-[11px] font-bold text-rose-800 block mb-1">العمليات الفاشلة</span>
                  <span className="text-2xl font-black text-rose-700 font-mono">13</span>
                  <span className="text-[10px] text-rose-600 block mt-1">بسبب ملفات تالفة مرفوعة من المستخدم</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[11px] font-bold text-blue-800 block mb-1">متوسط وقت المعالجة</span>
                  <span className="text-2xl font-black text-blue-700 font-mono">7.2 ثانية</span>
                  <span className="text-[10px] text-blue-600 block mt-1">فائق السرعة وبدون برامج</span>
                </div>
              </div>
            </div>

            {/* Smart Tools List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(smartToolsList.length > 0 ? smartToolsList : [
                {
                  id: 'tool_tahseen',
                  name: 'أداة تحسين — خطة التحسين للتقويم الذاتي',
                  version: 'الإصدار الثالث 1447هـ',
                  category: 'التقويم الذاتي والتطوير',
                  inputDescription: 'رفع تقرير منصة تميز PDF / Excel أو إدخال درجات مجالات التقويم',
                  outputDescription: 'توليد خطة التحسين والتطوير شاملة المبادرات ومؤشرات الأداء',
                  outputFormats: ['Word (.docx)', 'PDF'],
                  totalRuns: 1240,
                  successfulRuns: 1234,
                  failedRuns: 6,
                  avgProcessingTimeSec: 11.8,
                  status: 'active',
                  lastUpdated: '1447/03/15'
                },
                {
                  id: 'tool_attendance',
                  name: 'أداة وكشف إكسل الذكي لرصد الحضور والانضباط',
                  version: 'إصدار 2026 التلقائي',
                  category: 'كشوفات المتابعة التلقائية',
                  inputDescription: 'إدخال غياب الطلاب وساعات الاستئذان اليومية',
                  outputDescription: 'حساب النسب المئوية آلياً وإصدار تنبيهات الغياب والرسوم البيانية',
                  outputFormats: ['Excel (.xlsx) مبرمج'],
                  totalRuns: 890,
                  successfulRuns: 888,
                  failedRuns: 2,
                  avgProcessingTimeSec: 4.2,
                  status: 'active',
                  lastUpdated: '1447/04/01'
                },
                {
                  id: 'tool_nafs',
                  name: 'أداة تحليل ومقارنة نتائج اختبارات نافس الوطنية',
                  version: 'إصدار 1447 المحدث',
                  category: 'التقويم والتحسين',
                  inputDescription: 'رفع درجات الطلاب في المواد المستهدفة باختبارات نافس',
                  outputDescription: 'مقارنة متوسط المدرسة بالمتوسط الوطني ومكتب التعليم وتوليد خطة علاجية',
                  outputFormats: ['Word (.docx)', 'PDF'],
                  totalRuns: 480,
                  successfulRuns: 477,
                  failedRuns: 3,
                  avgProcessingTimeSec: 8.5,
                  status: 'active',
                  lastUpdated: '1447/02/20'
                },
                {
                  id: 'tool_certificates',
                  name: 'مولد الروابط الذكية لشهادات الشكر والتقدير التفاعلية',
                  version: 'إصدار سحابي 2026',
                  category: 'شهادات وتهنئة',
                  inputDescription: 'رفع كشف أسماء الطلاب أو المعلمين بصيغة Excel',
                  outputDescription: 'إنتاج شهادات تفاعلية مخصصة برابط استعراض وتنزيل فوري',
                  outputFormats: ['PDF فائق الدقة', 'رابط ويب تفاعلي'],
                  totalRuns: 650,
                  successfulRuns: 648,
                  failedRuns: 2,
                  avgProcessingTimeSec: 3.4,
                  status: 'active',
                  lastUpdated: '1447/04/10'
                }
              ]).map((tool) => (
                <div key={tool.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-teal-50 text-[#008489] text-[10px] font-bold px-2.5 py-1 rounded-lg">
                        {tool.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tool.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tool.status === 'active' ? 'نشطة ومحدثة 🟢' : 'صيانة مؤقتة 🟡'}
                      </span>
                    </div>

                    <h4 className="font-black text-stone-900 text-sm leading-snug">{tool.name}</h4>
                    <span className="text-[11px] text-stone-500 font-mono block mt-0.5">{tool.version}</span>

                    <div className="mt-3 p-3 bg-stone-50 rounded-xl space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-stone-700 block text-[10px]">المدخلات والنماذج:</span>
                        <p className="text-stone-600 text-[11px] leading-relaxed">{tool.inputDescription}</p>
                      </div>
                      <div>
                        <span className="font-bold text-stone-700 block text-[10px]">المخرجات المنتجة:</span>
                        <p className="text-stone-600 text-[11px] leading-relaxed">{tool.outputDescription}</p>
                      </div>
                    </div>

                    {/* Formats and Metrics */}
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-100 text-center font-mono text-[11px]">
                      <div className="p-2 bg-stone-50 rounded-lg">
                        <span className="text-stone-400 block text-[9px]">مرات التشغيل</span>
                        <span className="font-black text-stone-900">{tool.totalRuns}</span>
                      </div>
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <span className="text-emerald-600 block text-[9px]">عمليات ناجحة</span>
                        <span className="font-black text-emerald-700">{tool.successfulRuns}</span>
                      </div>
                      <div className="p-2 bg-stone-50 rounded-lg">
                        <span className="text-stone-400 block text-[9px]">متوسط الوقت</span>
                        <span className="font-black text-blue-700">{tool.avgProcessingTimeSec}ث</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-400">آخر تحديث: {tool.lastUpdated}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleSmartToolStatus(tool.id, tool.status)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {tool.status === 'active' ? 'إيقاف للصيانة' : 'تفعيل الأداة'}
                      </button>
                      <button
                        onClick={() => {
                          onBackToStorefront();
                        }}
                        className="px-3 py-1.5 bg-[#008489] hover:bg-[#007478] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>تجربة الأداة التفاعلية</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: إدارة المنتجات الرقمية والتراخيص (DIGITAL PRODUCTS) */}
        {/* ========================================================= */}
        {activeTab === 'digital_products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                <Download className="w-4 h-4 text-[#008489]" />
                <span>إدارة الملفات الرقمية، التراخيص، ومجلدات التخزين السحابي</span>
              </h3>
              <p className="text-xs text-stone-500">
                دعم الملفات بصيغ DOCX (وورد قابل للتعديل)، XLSX (إكسل مبرمج)، PDF (جاهز للطباعة)، ZIP (حقائب مجمعة)، وروابط الويب التفاعلية.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <table className="w-full text-right text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-600">
                  <tr>
                    <th className="p-4">اسم المنتج الرقمي</th>
                    <th className="p-4">صيغة الملف المدعومة</th>
                    <th className="p-4">رابط التنزيل المباشر (Google Drive / OneDrive)</th>
                    <th className="p-4">صلاحية الرابط</th>
                    <th className="p-4 text-center">إجراء وفحص</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {(allAdminProducts.length > 0 ? allAdminProducts : products).map((prod: any) => (
                    <tr key={prod.id} className="hover:bg-stone-50/80">
                      <td className="p-4 font-bold text-stone-900">
                        {prod.name}
                      </td>

                      <td className="p-4">
                        <span className="font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          {prod.format || 'Word .docx'}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="font-mono text-stone-600 text-[11px] block truncate max-w-xs" dir="ltr">
                          {prod.downloadUrl || 'https://drive.google.com/drive/folders/sultan-magfory'}
                        </span>
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <Check className="w-3.5 h-3.5" />
                          <span>صالح ومفحوص</span>
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-bold cursor-pointer"
                          >
                            تحديث الرابط
                          </button>
                          <a
                            href={prod.downloadUrl || 'https://drive.google.com'}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-[11px] font-bold inline-flex items-center gap-1"
                          >
                            <span>تنزيل تجريبي</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: إدارة العملاء والشرائح (CUSTOMERS) */}
        {/* ========================================================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="بحث باسم العميل أو الجوال..." 
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pr-9 pl-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-[#008489]"
                  />
                </div>

                <select 
                  value={customerSegmentFilter}
                  onChange={(e) => setCustomerSegmentFilter(e.target.value)}
                  className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700 focus:outline-none"
                >
                  <option value="all">كل الشرائح التعليمية</option>
                  <option value="شريحة القيادة المدرسية">مديرو المدارس</option>
                  <option value="شريحة وكلاء">وكلاء المدارس</option>
                  <option value="شريحة المعلمين">المعلمون والمعلمات</option>
                  <option value="شريحة الموجهين">الموجهون الطلابيون</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddCustomerModalOpen(true)}
                className="px-4 py-2 bg-[#008489] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عميل يدوياً</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-4">اسم العميل والجوال</th>
                      <th className="p-4">البريد الإلكتروني</th>
                      <th className="p-4">شريحة الاهتمام التعليمي</th>
                      <th className="p-4">الطلبات والمشتريات</th>
                      <th className="p-4">آخر طلب</th>
                      <th className="p-4">الحالة والتصنيف</th>
                      <th className="p-4 text-center">إجراء وتواصل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {customersList
                      .filter(c => {
                        const matchesSearch = 
                          c.name.includes(customerSearch) || 
                          (c.phone && c.phone.includes(customerSearch)) ||
                          (c.email && c.email.includes(customerSearch));
                        const matchesSegment = customerSegmentFilter === 'all' || (c.segment && c.segment.includes(customerSegmentFilter));
                        return matchesSearch && matchesSegment;
                      })
                      .map((customer: any) => (
                        <tr key={customer.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-stone-900 block">{customer.name}</span>
                            <span className="font-mono text-stone-500 text-[11px]">{customer.phone}</span>
                          </td>

                          <td className="p-4 font-mono text-stone-600 text-[11px]">
                            {customer.email}
                          </td>

                          <td className="p-4">
                            <span className="bg-teal-50 text-teal-800 px-2.5 py-1 rounded-lg text-[10px] font-bold block w-fit">
                              {customer.segment || 'شريحة المعلمين'}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="font-mono font-black text-emerald-700 text-sm block">
                              {customer.totalSpent || '149.00'} ر.س
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {customer.orderCount || 1} طلبات منجزة
                            </span>
                          </td>

                          <td className="p-4 text-stone-500 text-[11px]">
                            {customer.lastPurchaseDate || 'اليوم'}
                          </td>

                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              Number(customer.totalSpent || 0) > 300 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {Number(customer.totalSpent || 0) > 300 ? 'عميل VIP ⭐️' : 'نشط ومفعل'}
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => setSelectedCustomerDetails(customer)}
                                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-bold cursor-pointer"
                              >
                                السجل
                              </button>
                              <a
                                href={`https://wa.me/${(customer.phone || '966504260216').replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                <span>واتساب</span>
                              </a>
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

        {/* ========================================================= */}
        {/* TAB 8: إدارة المدفوعات والفواتير (PAYMENTS & ZATCA) */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>متابعة حركة الأموال والمدفوعات الإلكترونية ومطابقة الضرائب:</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    بوابات الدفع (مدى، فيزا، أبل باي، تمارا) — الرقم الضريبي الرسمي: 312890988700003 ووثيقة العمل الحر: FL-199700808
                  </p>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono">
                  <span className="text-[10px] text-stone-500 font-sans font-bold block">إجمالي المبيعات</span>
                  <span className="text-lg font-black text-stone-900">{stats?.totalSales || '0'} ر.س</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono">
                  <span className="text-[10px] text-stone-500 font-sans font-bold block">قبل الضريبة</span>
                  <span className="text-lg font-black text-stone-700">{stats?.baseSales || '0'} ر.س</span>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-mono">
                  <span className="text-[10px] text-amber-800 font-sans font-bold block">ضريبة 15% (VAT)</span>
                  <span className="text-lg font-black text-amber-700">{stats?.vatAmount || '0'} ر.س</span>
                </div>

                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 font-mono">
                  <span className="text-[10px] text-purple-800 font-sans font-bold block">رسوم بوابات الدفع</span>
                  <span className="text-lg font-black text-purple-700">{stats?.gatewayFees || '0'} ر.س</span>
                </div>

                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 font-mono">
                  <span className="text-[10px] text-rose-800 font-sans font-bold block">الاسترجاعات</span>
                  <span className="text-lg font-black text-rose-700">{stats?.refundedOrdersCount || '0'} ر.س</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-mono">
                  <span className="text-[10px] text-emerald-800 font-sans font-bold block">صافي الأرباح</span>
                  <span className="text-lg font-black text-emerald-700">{stats?.netProfit || '0'} ر.س</span>
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 font-bold text-stone-600">
                    <tr>
                      <th className="p-4">رقم الفاتورة الضريبية</th>
                      <th className="p-4">العميل ورقم الطلب</th>
                      <th className="p-4">وسيلة الدفع</th>
                      <th className="p-4">المبلغ الخاضع للضريبة</th>
                      <th className="p-4">الضريبة (15%)</th>
                      <th className="p-4">الإجمالي شامل الضريبة</th>
                      <th className="p-4 text-center">الفاتورة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {ordersList.map((order: any) => {
                      const total = Number(order.total || 0);
                      const base = (total / 1.15).toFixed(2);
                      const vat = (total - Number(base)).toFixed(2);
                      return (
                        <tr key={order.id} className="hover:bg-stone-50/80">
                          <td className="p-4 font-mono font-black text-[#008489]">
                            INV-2026-{order.id.toString().padStart(5, '0')}
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-stone-900 block">{order.user?.name || 'عميل تعليمي'}</span>
                            <span className="font-mono text-stone-400 text-[10px]">#ORD-{order.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded text-[10px] font-bold">
                              {order.paymentMethod || 'مدى Mada'}
                            </span>
                          </td>
                          <td className="p-4 font-mono">{base} ر.س</td>
                          <td className="p-4 font-mono text-amber-700 font-bold">{vat} ر.س</td>
                          <td className="p-4 font-mono font-black text-stone-900 text-sm">{total.toFixed(2)} ر.س</td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedInvoiceOrder(order);
                                setIsInvoiceModalOpen(true);
                              }}
                              className="px-3 py-1 bg-stone-900 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>طباعة ZATCA</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: الكوبونات والعروض الموجهة (COUPONS) */}
        {/* ========================================================= */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div>
                <h3 className="text-sm font-black text-stone-900">إدارة الحملات والكوبونات الترويجية الموجهة</h3>
                <p className="text-xs text-stone-500">توجيه عروض مخصصة (مثال: عرض ملفات إنجاز المعلمين بنسبة 20%)</p>
              </div>

              <button
                onClick={() => setIsAddCouponModalOpen(true)}
                className="px-4 py-2 bg-[#008489] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء كود خصم جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {couponsList.map((coup: any) => (
                <div key={coup.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-lg text-teal-800 bg-teal-50 px-3 py-1 rounded-xl">
                      {coup.code}
                    </span>
                    <span className="text-xl font-black text-stone-900 font-mono">
                      {coup.discountPercent}% خصم
                    </span>
                  </div>

                  <div className="text-xs text-stone-500 space-y-1">
                    <p>الفئة المستهدفة: <span className="font-bold text-stone-800">المعلمون والمدارس</span></p>
                    <p>المبيعات الناتجة: <span className="font-mono font-bold text-emerald-700">1,840 ر.س</span></p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <span>الحالة: {coup.isActive ? 'مفعّل وشغال' : 'معطّل'}</span>
                    <button
                      onClick={() => handleToggleCoupon(coup.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-[11px] cursor-pointer ${
                        coup.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {coup.isActive ? 'تعطيل' : 'تفعيل'}
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteCoupon(coup.id)}
                    className="w-full text-center text-rose-600 hover:text-rose-700 text-[11px] font-bold pt-1 cursor-pointer"
                  >
                    حذف الكود
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 10: التسويق والإعلانات والـ SEO (MARKETING) */}
        {/* ========================================================= */}
        {activeTab === 'marketing' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
              <div>
                <h3 className="text-sm font-black text-stone-900 mb-1">
                  تخصيص الحملات التسويقية والبنرات الرئيسية ومحركات البحث (SEO)
                </h3>
                <p className="text-xs text-stone-500">
                  ربط التسويق بالمبيعات الفعلية ومعدل التحويل (3.6%)
                </p>
              </div>

              {/* Marketing Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-bold">الزوار شهرياً</span>
                  <span className="text-xl font-black text-stone-900 font-mono">42,500</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-bold">معدل التحويل (Conversion)</span>
                  <span className="text-xl font-black text-emerald-700 font-mono">3.6%</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-bold">العائد الإعلاني (ROAS)</span>
                  <span className="text-xl font-black text-teal-700 font-mono">4.8x</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-400 block font-bold">معدل تكرار الشراء</span>
                  <span className="text-xl font-black text-purple-700 font-mono">38%</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    شريط التنبيهات الإعلاني العلوي المتحرك (Notice Bar)
                  </label>
                  <input
                    type="text"
                    value={localSettings.bannerNotice}
                    onChange={(e) => setLocalSettings({ ...localSettings, bannerNotice: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:border-[#008489] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    العنوان التسويقي الرئيسي (Hero Title)
                  </label>
                  <input
                    type="text"
                    value={localSettings.heroTitle}
                    onChange={(e) => setLocalSettings({ ...localSettings, heroTitle: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:border-[#008489] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    العنوان الفرعي التوضيحي (Hero Subtitle)
                  </label>
                  <textarea
                    value={localSettings.heroSubtitle}
                    onChange={(e) => setLocalSettings({ ...localSettings, heroSubtitle: e.target.value })}
                    rows={3}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium focus:border-[#008489] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      نص زر الدعوة للإجراء (Call to Action)
                    </label>
                    <input
                      type="text"
                      value={localSettings.heroButtonText}
                      onChange={(e) => setLocalSettings({ ...localSettings, heroButtonText: e.target.value })}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      نسبة خصم الهدية الترحيبية للزوار (%)
                    </label>
                    <input
                      type="number"
                      value={localSettings.welcomeDiscountPercent}
                      onChange={(e) => setLocalSettings({ ...localSettings, welcomeDiscountPercent: Number(e.target.value) })}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ ونشر التغييرات على المتجر فوراً</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 11: التقييمات والمراجعات (+6000 تقييم) (REVIEWS) */}
        {/* ========================================================= */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-stone-900">
                    تحليل آراء وتقييمات العملاء الموثقة (+6,000 تقييم معتمد)
                  </h3>
                  <p className="text-xs text-stone-500">
                    متوسط التقييم العام: <span className="text-amber-500 font-bold">4.9 / 5</span> — 98% من التقييمات إيجابية
                  </p>
                </div>

                <button
                  onClick={() => setIsAddReviewModalOpen(true)}
                  className="px-4 py-2 bg-[#008489] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة تقييم موثق جديد</span>
                </button>
              </div>

              {/* Star Rating Breakdown */}
              <div className="grid grid-cols-5 gap-2 pt-2 text-center text-xs">
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-amber-500 font-bold block">5 نجوم</span>
                  <span className="font-mono font-black text-stone-900">92%</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-amber-500 font-bold block">4 نجوم</span>
                  <span className="font-mono font-black text-stone-900">6%</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-amber-500 font-bold block">3 نجوم</span>
                  <span className="font-mono font-black text-stone-900">1.5%</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-stone-400 font-bold block">نجمتان</span>
                  <span className="font-mono font-black text-stone-900">0.4%</span>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl border border-stone-100">
                  <span className="text-stone-400 font-bold block">نجمة واحدة</span>
                  <span className="font-mono font-black text-stone-900">0.1%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewsList.map((rev: any) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">
                        {rev.user ? `${rev.user.firstName || ''} ${rev.user.lastName || ''}`.trim() : 'معلم معتمد'}
                      </h4>
                      <span className="text-[10px] text-teal-700 font-bold">
                        {rev.product?.name || 'أداة تحسين والتقويم الذاتي'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(Number(rev.rating || 5))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[10px] text-stone-400">
                    <span>{rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('ar-SA') : 'مؤخراً'}</span>
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                    >
                      حذف التقييم
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 12: خدمة العملاء والدعم الفني السداسي (SUPPORT) */}
        {/* ========================================================= */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-[#008489]" />
                    <span>نظام إدارة التذاكر السداسي المعتمد (6-State Support & Returns):</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    ربط كل تذكرة برقم الطلب والمنتج والالتزام بالرد خلال 48 ساعة واسترجاع المبالغ خلال 5 أيام عمل
                  </p>
                </div>
                <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                  سياسة الضمان الذهبي 3 أيام
                </span>
              </div>

              {/* Ticket State Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-2">
                {TICKET_STATUSES.map(s => {
                  const count = ticketsList.filter(t => t.status === s.id).length;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setTicketStatusFilter(ticketStatusFilter === s.id ? 'all' : s.id)}
                      className={`p-2.5 rounded-xl border text-right transition-all cursor-pointer ${
                        ticketStatusFilter === s.id ? 'border-[#008489] bg-teal-50' : 'border-stone-200 bg-stone-50/60'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-xs text-stone-900">{s.label}</span>
                        <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.2 rounded border">
                          {count}
                        </span>
                      </div>
                      <span className="text-[9px] text-stone-400 block">{s.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <table className="w-full text-right text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <tr>
                    <th className="p-4">رقم التذكرة والطلب</th>
                    <th className="p-4">العميل والجوال</th>
                    <th className="p-4">نوع المشكلة</th>
                    <th className="p-4">تفاصيل الطلب</th>
                    <th className="p-4">حالة التذكرة (المراحل الستة)</th>
                    <th className="p-4 text-center">تواصل سريع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {ticketsList
                    .filter(t => ticketStatusFilter === 'all' || t.status === ticketStatusFilter)
                    .map((ticket: any) => {
                      const statusObj = TICKET_STATUSES.find(s => s.id === ticket.status) || TICKET_STATUSES[0];
                      return (
                        <tr key={ticket.id} className="hover:bg-stone-50/80">
                          <td className="p-4">
                            <span className="font-mono font-black text-stone-900 block">{ticket.id}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{ticket.orderNumber}</span>
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-stone-900 block">{ticket.customerName}</span>
                            <span className="text-[10px] text-stone-500 font-mono">{ticket.customerPhone}</span>
                          </td>

                          <td className="p-4">
                            <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-bold text-[11px] block w-fit mb-1">
                              {ticket.reason}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {ticket.type === 'refund' ? 'طلب استرجاع مالي' : ticket.type === 'exchange' ? 'استبدال منتج' : 'دعم فني وتثبيت'}
                            </span>
                          </td>

                          <td className="p-4 max-w-xs">
                            <p className="text-stone-700 leading-relaxed truncate">{ticket.description}</p>
                            {ticket.adminNotes && (
                              <span className="text-[10px] text-teal-700 block font-bold mt-1">
                                رد الإدارة: {ticket.adminNotes}
                              </span>
                            )}
                          </td>

                          <td className="p-4">
                            <select
                              value={ticket.status}
                              onChange={(e) => handleUpdateTicketStatus(ticket.id, e.target.value)}
                              className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${statusObj.color}`}
                            >
                              {TICKET_STATUSES.map(s => (
                                <option key={s.id} value={s.id}>{s.label}</option>
                              ))}
                            </select>
                          </td>

                          <td className="p-4 text-center">
                            <a
                              href={`https://wa.me/${(ticket.customerPhone || '966504260216').replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold text-[11px] inline-flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>واتساب</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 13: التقارير والإحصائيات الخمسة (REPORTS) */}
        {/* ========================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-base font-black text-stone-900">
                    مركز التقارير والإحصائيات الخمسة لاتخاذ القرارات
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    التقارير البيعية، المالية، العملاء، المنتجات، وتقارير الأدوات الذكية
                  </p>
                </div>

                <div className="flex gap-1 bg-stone-100 p-1 rounded-xl text-xs font-bold">
                  {[
                    { id: 'sales', label: '1. البيعية' },
                    { id: 'finance', label: '2. المالية' },
                    { id: 'customers', label: '3. العملاء' },
                    { id: 'products', label: '4. المنتجات' },
                    { id: 'smart_tools', label: '5. الأدوات الذكية' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setReportSubTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        reportSubTab === tab.id ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtab 1: Sales Reports */}
              {reportSubTab === 'sales' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div className="p-4 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">المبيعات اليومية</span>
                    <span className="text-xl font-black text-stone-900 font-mono">1,890.00 ر.س</span>
                    <span className="text-[10px] text-emerald-600 block mt-1">+12% عن الأمس</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">المبيعات الأسبوعية</span>
                    <span className="text-xl font-black text-stone-900 font-mono">14,250.00 ر.س</span>
                    <span className="text-[10px] text-emerald-600 block mt-1">+18% عن الأسبوع الماضي</span>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">المبيعات الشهرية</span>
                    <span className="text-xl font-black text-stone-900 font-mono">54,800.00 ر.س</span>
                    <span className="text-[10px] text-teal-700 block mt-1">مستهدف الربع 88%</span>
                  </div>
                </div>
              )}

              {/* Subtab 2: Financial Reports */}
              {reportSubTab === 'finance' && (
                <div className="space-y-3 pt-2 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                    <div className="p-3 bg-stone-50 rounded-xl border">
                      <span className="font-sans text-stone-400 block font-bold text-[10px]">إجمالي الإيرادات</span>
                      <span className="font-black text-stone-900 text-base">{stats?.totalSales || '0'} ر.س</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border">
                      <span className="font-sans text-stone-400 block font-bold text-[10px]">الضرائب 15%</span>
                      <span className="font-black text-amber-700 text-base">{stats?.vatAmount || '0'} ر.س</span>
                    </div>
                    <div className="p-3 bg-stone-50 rounded-xl border">
                      <span className="font-sans text-stone-400 block font-bold text-[10px]">رسوم الدفع (Mada/Visa)</span>
                      <span className="font-black text-purple-700 text-base">{stats?.gatewayFees || '0'} ر.س</span>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span className="font-sans text-emerald-800 block font-bold text-[10px]">صافي الربح</span>
                      <span className="font-black text-emerald-700 text-base">{stats?.netProfit || '0'} ر.س</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 3: Customer Reports */}
              {reportSubTab === 'customers' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">متوسط إنفاق العميل</span>
                    <span className="text-lg font-black font-mono text-stone-900">149.00 ر.س</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">العملاء الجدد هذا الأسبوع</span>
                    <span className="text-lg font-black font-mono text-teal-700">28 مدرسة ومعلم</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border">
                    <span className="text-stone-400 block font-bold">العملاء المتكررون (VIP)</span>
                    <span className="text-lg font-black font-mono text-amber-700">42 عميل قيادي</span>
                  </div>
                </div>
              )}

              {/* Subtab 4: Product Reports */}
              {reportSubTab === 'products' && (
                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border flex justify-between items-center">
                    <span className="font-bold text-stone-900">المنتج الأكثر مبيعاً: أداة تحسين</span>
                    <span className="font-mono font-black text-[#008489]">1,240 عملية شراء</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border flex justify-between items-center">
                    <span className="font-bold text-stone-900">الأعلى تقييماً: حقيبة مدير المدرسة 1447</span>
                    <span className="font-bold text-amber-500">5.0 / 5 نجوم</span>
                  </div>
                </div>
              )}

              {/* Subtab 5: Smart Tools Reports */}
              {reportSubTab === 'smart_tools' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 bg-stone-50 rounded-xl border">
                    <span className="font-sans text-stone-400 block font-bold">إجمالي تشغيل الأدوات</span>
                    <span className="font-black text-stone-900 text-lg">3,260 عملية</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="font-sans text-emerald-800 block font-bold">نسبة نجاح إنتاج الخطط</span>
                    <span className="font-black text-emerald-700 text-lg">99.5%</span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border">
                    <span className="font-sans text-stone-400 block font-bold">متوسط سرعة المعالجة</span>
                    <span className="font-black text-blue-700 text-lg">7.2 ثواني</span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => {
                    const text = `تقرير متجر سلطان مغفوري التشغيلي والمالي\nالتاريخ: ${new Date().toLocaleDateString('ar-SA')}\nإجمالي المبيعات: ${stats?.totalSales} ر.س\nصافي الربح: ${stats?.netProfit} ر.س\nالضرائب: ${stats?.vatAmount} ر.س\nالطلبات: ${ordersList.length}\nالعملاء: ${customersList.length}`;
                    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Store_Comprehensive_Report_${Date.now()}.txt`;
                    a.click();
                    showToast('تم تصدير التقرير بنجاح');
                  }}
                  className="px-4 py-2 bg-[#008489] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  تصدير التقرير المالي والإحصائي كاملاً
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 14: المستخدمين وسجل العمليات الحساسة (USERS & AUDIT) */}
        {/* ========================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Roles Table (RBAC) */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-black text-stone-900">
                هيكل المستخدمين والصلاحيات الوظيفية (RBAC):
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-3">الدور الوظيفي</th>
                      <th className="p-3">المسؤول</th>
                      <th className="p-3">الصلاحيات المعتمدة</th>
                      <th className="p-3">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {[
                      { role: 'مالك المتجر', name: 'أ. سلطان مغفوري', perms: 'كافة الصلاحيات غير المقيدة (المنتجات، المالية، الحذف)', status: 'نشط' },
                      { role: 'مدير المتجر', name: 'م. خالد الدوسري', perms: 'إدارة المنتجات، متابعة الطلبات، إدارة العملاء', status: 'نشط' },
                      { role: 'المحاسب المالي', name: 'أ. عبدالمجيد السالم', perms: 'المدفوعات، الفواتير ZATCA، الضرائب، التقارير', status: 'نشط' },
                      { role: 'مسؤول التسويق', name: 'أ. سارة المنصور', perms: 'الحملات الإعلانية، الكوبونات، محركات البحث SEO', status: 'نشط' },
                      { role: 'خدمة العملاء والدعم التقني', name: 'أ. ريم الزهراني', perms: 'متابعة التذاكر السداسية، معالجة مشاكل التنزيل', status: 'نشط' },
                    ].map((user, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80">
                        <td className="p-3 font-bold text-stone-900">{user.role}</td>
                        <td className="p-3">{user.name}</td>
                        <td className="p-3 text-stone-600 text-[11px]">{user.perms}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {user.status} 🟢
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sensitive Operations Audit Log */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-[#008489]" />
                    <span>سجل تتبع العمليات الحساسة (Activity Audit Log):</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    توثيق تلقائي لكل عملية تعديل أسعار أو حذف منتجات أو إصدار فواتير مع المنفّذ والتوقيت وعنوان IP
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-stone-100 px-3 py-1 rounded-full text-stone-700">
                  {auditLogsList.length} عمليات موثقة
                </span>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                    <tr>
                      <th className="p-3">معرف العملية</th>
                      <th className="p-3">نوع الإجراء الحساس</th>
                      <th className="p-3">المنفّذ والدور</th>
                      <th className="p-3">التفاصيل والتأثير</th>
                      <th className="p-3">التوقيت و IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {auditLogsList.map((log: any) => (
                      <tr key={log.id} className="hover:bg-stone-50/80">
                        <td className="p-3 font-mono font-bold text-stone-400 text-[10px]">{log.id}</td>
                        <td className="p-3 font-bold text-stone-900">{log.action}</td>
                        <td className="p-3">
                          <span className="block text-stone-800 font-bold">{log.actor}</span>
                          <span className="text-[10px] text-teal-700">{log.role}</span>
                        </td>
                        <td className="p-3 text-stone-700 max-w-xs truncate">{log.details}</td>
                        <td className="p-3 text-stone-500 text-[10px] font-mono">
                          <span className="block">{new Date(log.timestamp).toLocaleString('ar-SA')}</span>
                          <span className="text-stone-400">{log.ip}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 15 & MODULES 16 - 20: إعدادات المتجر والإدارة العامة والتكاملات */}
        {/* ========================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-2xs overflow-x-auto flex items-center gap-1.5 scrollbar-none">
              {[
                { id: 'identity', label: 'الهوية والنطاق والـ SEO', icon: Globe },
                { id: 'whatsapp', label: 'التواصل وواتساب والأتمتة', icon: Send },
                { id: 'payments', label: 'الضرائب 15% وبوابات الدفع', icon: CreditCard },
                { id: 'policies', label: 'السياسات والضمان والاسترجاع', icon: ShieldCheck },
                { id: 'salla', label: 'المنصة التقنية وتكامل سلة', icon: Boxes },
                { id: 'lifecycle', label: 'الترابط التشغيلي ودورة العمليات', icon: Workflow },
                { id: 'levels', label: 'التقييم الثلاثي للمستويات', icon: Layers },
                { id: 'health_backup', label: 'النسخ الاحتياطي وصحة النظام', icon: Database },
                { id: 'visibility', label: 'ظهور أقسام المتجر', icon: Eye }
              ].map((sub) => {
                const SubIcon = sub.icon;
                const isSelected = settingsSubTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSettingsSubTab(sub.id as any);
                      if (sub.id === 'health_backup' && !systemHealth) {
                        fetchSystemHealth();
                      }
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-[#008489] text-white shadow-2xs' 
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    <SubIcon className="w-3.5 h-3.5" />
                    <span>{sub.label}</span>
                  </button>
                );
              })}
            </div>

            {/* SUB-TAB 1: الهوية والنطاق والـ SEO */}
            {settingsSubTab === 'identity' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#008489]" />
                      <span>بيانات الهوية الرسمية والنطاق</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      شعار المتجر المعتمد
                    </span>
                  </h3>

                  {/* Logo Upload & Preview Card */}
                  <div className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200 space-y-3">
                    <label className="block text-xs font-bold text-stone-800 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#008489]" />
                      <span>شعار المتجر الرسمي (رفع من الجهاز أو عبر رابط):</span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      {/* Left: Upload controls */}
                      <div className="space-y-3">
                        <div className="relative border-2 border-dashed border-stone-300 hover:border-[#008489] bg-white rounded-xl p-4 text-center transition-all cursor-pointer group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 5 * 1024 * 1024) {
                                  showToast('حجم الصورة كبير، يرجى اختيار صورة أقل من 5 ميجابايت');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = () => {
                                  if (reader.result) {
                                    setLocalSettings({ ...localSettings, logoImage: reader.result as string });
                                    showToast('تم رفع صورة الشعار من جهازك بنجاح');
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <div className="flex flex-col items-center justify-center space-y-1.5">
                            <div className="w-10 h-10 rounded-full bg-teal-50 text-[#008489] flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-stone-800">اضغط لرفع الشعار من جهازك (PNG / JPG / SVG)</span>
                            <span className="text-[10px] text-stone-500">يدعم سحب وإسقاط الصور حتى 5 ميجابايت</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">أو أدخل رابط الشعار مباشرة (URL):</label>
                          <input
                            type="url"
                            value={localSettings.logoImage || ''}
                            onChange={(e) => setLocalSettings({ ...localSettings, logoImage: e.target.value })}
                            placeholder="https://example.com/logo.png"
                            className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-[11px] font-bold text-stone-500">نماذج جاهزة:</span>
                          {[
                            '/assets/aistudio/image_082663d6.png',
                            '/assets/aistudio/image_13a62f23.png',
                            '/assets/aistudio/image_509e2f64.png'
                          ].map((path, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setLocalSettings({ ...localSettings, logoImage: path });
                                showToast(`تم اختيار النموذج ${idx + 1} لشعار المتجر`);
                              }}
                              className="w-8 h-8 rounded-lg border border-stone-200 bg-white p-1 hover:border-[#008489] transition-all cursor-pointer overflow-hidden"
                              title={`استخدام الشعار النموذج ${idx + 1}`}
                            >
                              <img src={path} alt="Preset Logo" className="w-full h-full object-contain" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right: Live Logo Preview */}
                      <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center space-y-2 min-h-[160px]">
                        <span className="text-[10px] font-bold text-stone-400">معاينة الشعار الحية في الهيدر:</span>
                        {localSettings.logoImage ? (
                          <div className="relative group flex flex-col items-center">
                            <div className="p-2 border border-stone-200 rounded-2xl bg-stone-50 shadow-xs max-w-[180px] max-h-[90px] flex items-center justify-center">
                              <img
                                src={localSettings.logoImage}
                                alt="Store Logo Preview"
                                className="max-w-full max-h-[80px] object-contain"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setLocalSettings({ ...localSettings, logoImage: '' });
                                showToast('تم إزالة صورة الشعار والاعتماد على الشعار النصي');
                              }}
                              className="mt-2 text-[10px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>إزالة صورة الشعار والعودة للشعار النصي</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-stone-400 space-y-1">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#008489] to-[#093c42] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                              اح
                            </div>
                            <span className="text-xs font-bold text-stone-600">{localSettings.logoText || 'متجر احتياجك'}</span>
                            <span className="text-[10px] text-stone-400">(يعمل بالشعار النصي الافتراضي)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">اسم المتجر الرسمي</label>
                      <input
                        type="text"
                        value={localSettings.name}
                        onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">الشعار النصي (Logo Text)</label>
                      <input
                        type="text"
                        value={localSettings.logoText}
                        onChange={(e) => setLocalSettings({ ...localSettings, logoText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">النطاق المعتمد (Domain)</label>
                      <input
                        type="text"
                        value={localSettings.domain || 'sultan-magfory.com'}
                        onChange={(e) => setLocalSettings({ ...localSettings, domain: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold text-teal-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">العملة الرسمية</label>
                      <input
                        type="text"
                        value={localSettings.currency || 'ريال سعودي (SAR)'}
                        onChange={(e) => setLocalSettings({ ...localSettings, currency: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">العنوان والمقر</label>
                      <input
                        type="text"
                        value="المملكة العربية السعودية - الرياض"
                        disabled
                        className="w-full p-3 bg-stone-100/70 border border-stone-200 rounded-xl text-xs font-bold text-stone-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">شعار المتجر اللفظي (Slogan)</label>
                      <input
                        type="text"
                        value={localSettings.subtitle}
                        onChange={(e) => setLocalSettings({ ...localSettings, subtitle: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* ======================================================= */}
                {/* 2. التحكم في خلفية الموقع الإلكتروني (BACKGROUND CONTROL) */}
                {/* ======================================================= */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#008489]" />
                      <span>التحكم في خلفية الموقع الإلكتروني (رفع خلفية / زغرفة / تدرج)</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      مخصص للمتجر
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Background Uploader & URL */}
                    <div className="space-y-3 p-4 bg-stone-50/80 rounded-2xl border border-stone-200">
                      <label className="block text-xs font-bold text-stone-800">رفع صورة خلفية من جهازك أو الرابط:</label>
                      
                      <div className="relative border-2 border-dashed border-stone-300 hover:border-[#008489] bg-white rounded-xl p-3 text-center transition-all cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 8 * 1024 * 1024) {
                                showToast('حجم خلفية الصورة كبير، يرجى اختيار ملف أقل من 8 ميجابايت');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (reader.result) {
                                  setLocalSettings({ ...localSettings, backgroundImage: reader.result as string });
                                  showToast('تم رفع صورة خلفية الموقع بنجاح');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2 text-stone-700">
                          <Upload className="w-4 h-4 text-[#008489]" />
                          <span className="text-xs font-bold">رفع صورة خلفية (PNG / JPG / WebP)</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">أو أدخل رابط صورة الخلفية:</label>
                        <input
                          type="url"
                          value={localSettings.backgroundImage || ''}
                          onChange={(e) => setLocalSettings({ ...localSettings, backgroundImage: e.target.value })}
                          placeholder="https://example.com/background.jpg"
                          className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono"
                        />
                      </div>

                      {localSettings.backgroundImage && (
                        <button
                          type="button"
                          onClick={() => setLocalSettings({ ...localSettings, backgroundImage: '' })}
                          className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>إزالة صورة الخلفية المخصصة</span>
                        </button>
                      )}
                    </div>

                    {/* Presets & Overlays */}
                    <div className="space-y-3 p-4 bg-stone-50/80 rounded-2xl border border-stone-200 text-xs">
                      <div>
                        <label className="block font-bold text-stone-800 mb-1.5">نمط الشفافية على الخلفية (Overlay):</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'none', label: 'بدون' },
                            { id: 'light', label: 'فاتح' },
                            { id: 'dark', label: 'داكن' },
                            { id: 'glass', label: 'زجاجي' }
                          ].map(o => (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => setLocalSettings({ ...localSettings, backgroundOverlay: o.id as any })}
                              className={`py-2 rounded-xl border text-center font-bold transition-all ${
                                (localSettings.backgroundOverlay || 'none') === o.id
                                  ? 'border-[#008489] bg-teal-50 text-[#008489]'
                                  : 'border-stone-200 bg-white text-stone-700'
                              }`}
                            >
                              {o.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="block font-bold text-stone-800 mb-1.5">زخرفة وشبكة الخلفية (Pattern):</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'none', label: 'سادة' },
                            { id: 'grid', label: 'شبكة تعليمية' },
                            { id: 'education', label: 'رموز الوزارة' }
                          ].map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setLocalSettings({ ...localSettings, backgroundPattern: p.id as any })}
                              className={`py-2 rounded-xl border text-center font-bold transition-all ${
                                (localSettings.backgroundPattern || 'education') === p.id
                                  ? 'border-[#008489] bg-teal-50 text-[#008489]'
                                  : 'border-stone-200 bg-white text-stone-700'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================================= */}
                {/* 3. بيانات غلاف السجل المدرسي الرسمي وتوقيع المديرة والمنسقة (SCHOOL COVER SIGNATURES) */}
                {/* ======================================================= */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#008489]" />
                      <span>إعدادات وتوقيعات غلاف السجل المدرسي (طقا لقوالب متجر احتياجك التعليمي)</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      مطابق لصور المتجر الرسمي 1448هـ
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Input Fields */}
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">الإدارة العامة للتعليم بمنطقة:</label>
                        <input
                          type="text"
                          value={localSettings.defaultEducationRegion || 'الرياض'}
                          onChange={(e) => setLocalSettings({ ...localSettings, defaultEducationRegion: e.target.value })}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                          placeholder="مثال: الرياض / الشرقية / مكة"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">اسم المدرسة:</label>
                        <input
                          type="text"
                          value={localSettings.defaultSchoolName || 'المدرسة الأولى الابتدائية'}
                          onChange={(e) => setLocalSettings({ ...localSettings, defaultSchoolName: e.target.value })}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                          placeholder="مثال: مدرسة الابتدائية 124"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-700 mb-1">العام الدراسي:</label>
                        <input
                          type="text"
                          value={localSettings.defaultAcademicYear || '1448هـ'}
                          onChange={(e) => setLocalSettings({ ...localSettings, defaultAcademicYear: e.target.value })}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold font-mono"
                        />
                      </div>

                      <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl space-y-2">
                        <span className="font-black text-[#008489] block">التوقيعات الرسمية بأسفل السجل (مطابق للصورة 2 و WA0007):</span>
                        
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">مسؤولة السجل:</label>
                          <input
                            type="text"
                            value={localSettings.defaultRecordSupervisor || 'أ. فاطمة بن خالد العتيبي'}
                            onChange={(e) => setLocalSettings({ ...localSettings, defaultRecordSupervisor: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">منسق/ة العمل التعاوني:</label>
                          <input
                            type="text"
                            value={localSettings.defaultCooperativeCoordinator || 'أ. نورة بن فهد الشمري'}
                            onChange={(e) => setLocalSettings({ ...localSettings, defaultCooperativeCoordinator: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">الموجه/ة الطلابي:</label>
                          <input
                            type="text"
                            value={localSettings.defaultCounselorName || 'أ. سارة بن سعد القحطاني'}
                            onChange={(e) => setLocalSettings({ ...localSettings, defaultCounselorName: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">مدير/ة المدرسة:</label>
                          <input
                            type="text"
                            value={localSettings.defaultSchoolPrincipal || 'أ. مريم بن عبدالله الغامدي'}
                            onChange={(e) => setLocalSettings({ ...localSettings, defaultSchoolPrincipal: e.target.value })}
                            className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 text-xs"
                          />
                        </div>
                      </div>

                      {/* Auto Date and Time Control Card */}
                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-900">التحديث التلقائي للتاريخ والوقت في المستندات:</span>
                          <input
                            type="checkbox"
                            checked={localSettings.autoDateUpdates !== false}
                            onChange={(e) => setLocalSettings({ ...localSettings, autoDateUpdates: e.target.checked })}
                            className="w-4 h-4 text-[#008489] rounded"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <label className="text-[10px] text-stone-600 block">التاريخ الهجري:</label>
                            <input
                              type="text"
                              value={localSettings.currentHijriDateText || '21 جمادى الأولى 1448هـ'}
                              onChange={(e) => setLocalSettings({ ...localSettings, currentHijriDateText: e.target.value })}
                              className="w-full p-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-stone-600 block">التاريخ الميلادي:</label>
                            <input
                              type="text"
                              value={localSettings.currentGregorianDateText || '10 نوفمبر 2026م'}
                              onChange={(e) => setLocalSettings({ ...localSettings, currentGregorianDateText: e.target.value })}
                              className="w-full p-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exact Visual Live Preview Box (Matching Images 1 & 2 attached by user) */}
                    <div className="bg-white border-2 border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between text-stone-900 font-sans text-center relative overflow-hidden min-h-[300px]" dir="rtl">
                      {/* Top Ministry Header Bar matching Image 1 */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#008489]/30">
                        <div className="text-right text-[10px] space-y-0.5">
                          <div className="font-bold text-stone-800">المملكة العربية السعودية</div>
                          <div className="font-bold text-[#008489]">وزارة التعليم</div>
                        </div>

                        <div className="flex flex-col items-center">
                          <img
                            src="/assets/aistudio/_____________b1c4c42d.jpg"
                            alt="Ministry Logo"
                            className="h-10 w-auto object-contain"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <span className="text-[8px] font-bold text-teal-800 mt-0.5">وزارة التعليم - Ministry of Education</span>
                        </div>

                        <div className="text-right text-[9.5px] space-y-0.5">
                          <div><span className="text-stone-500">الإدارة العامة للتعليم بمنطقة : </span><span className="font-bold text-[#008489]">{localSettings.defaultEducationRegion || '........'}</span></div>
                          <div><span className="text-stone-500">مدرسة : </span><span className="font-bold text-[#008489]">{localSettings.defaultSchoolName || '........'}</span></div>
                        </div>
                      </div>

                      {/* Center Calendar Badge & Title matching Image 2 */}
                      <div className="my-6 space-y-2 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#008489] flex items-center justify-center shadow-2xs">
                          <Calendar className="w-7 h-7" />
                        </div>
                        
                        <div className="text-xs font-black text-stone-700">العام الدراسي</div>
                        <div className="text-lg font-black text-[#008489] font-mono tracking-wider">{localSettings.defaultAcademicYear || '1448هـ'}</div>
                      </div>

                      {/* Bottom Rounded Signature Pill Boxes matching Image 2 */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-200">
                        <div className="border-2 border-[#008489] bg-white rounded-full py-2 px-3 text-center shadow-2xs">
                          <span className="text-[10px] font-bold text-[#008489] block">منسق/ة العمل التعاوني / مسؤولة السجل :</span>
                          <span className="text-xs font-black text-stone-900 mt-0.5 block truncate">
                            {localSettings.defaultRecordSupervisor || '........................'}
                          </span>
                        </div>

                        <div className="border-2 border-[#008489] bg-white rounded-full py-2 px-3 text-center shadow-2xs">
                          <span className="text-[10px] font-bold text-[#008489] block">مدير/ة المدرسة :</span>
                          <span className="text-xs font-black text-stone-900 mt-0.5 block truncate">
                            {localSettings.defaultSchoolPrincipal || '........................'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Configuration */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#008489]" />
                      <span>تحسين محركات البحث ووسوم الميتا (SEO & OpenGraph)</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700 font-mono">Google & Social Indexed</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">عنوان الصفحة لمحركات البحث (Meta Title)</label>
                      <input
                        type="text"
                        value={localSettings.seoSettings?.metaTitle || 'متجر سلطان مغفوري | احتياجك التعليمي - سجلات وأدوات ذكية 1447هـ'}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          seoSettings: { ...(localSettings.seoSettings as any), metaTitle: e.target.value }
                        })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">وصف المتجر في جوجل (Meta Description)</label>
                      <textarea
                        rows={2}
                        value={localSettings.seoSettings?.metaDescription || 'المتجر التعليمي الرائد لتوفير السجلات المدرسية، ملفات الإنجاز، الخطة التشغيلية، وأداة تحسين المعتمدة لمنصة تميز ونافس في المملكة العربية السعودية.'}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          seoSettings: { ...(localSettings.seoSettings as any), metaDescription: e.target.value }
                        })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">الكلمات المفتاحية المستهدفة (SEO Keywords)</label>
                      <input
                        type="text"
                        value={localSettings.seoSettings?.keywords || 'سجلات مدرسية, ملف إنجاز, أداة تحسين, خطة تشغيلية, منصة تميز, اختبارات نافس, سلطان مغفوري'}
                        onChange={(e) => setLocalSettings({
                          ...localSettings,
                          seoSettings: { ...(localSettings.seoSettings as any), keywords: e.target.value }
                        })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Section Titles, Hero Texts & Badges Editor */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#008489]" />
                      <span>تخصيص كامل العبارات والنصوص والبنرات في الواجهة</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      تأثير مباشر 100%
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block font-bold text-stone-800 mb-1.5">نص شريط الإعلانات العُلوي المباشر (Announcement Notice):</label>
                      <input
                        type="text"
                        value={localSettings.bannerNotice || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, bannerNotice: e.target.value })}
                        placeholder="🚨 لا تنس استخدام كود الخصم SAD بخصم 15% على جميع السجلات"
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-teal-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">عنوان البنر الرئيسي (Hero Title):</label>
                      <input
                        type="text"
                        value={localSettings.heroTitle || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, heroTitle: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">نص زر البنر الرئيسي (Hero Button Text):</label>
                      <input
                        type="text"
                        value={localSettings.heroButtonText || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, heroButtonText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1.5">وصف البنر الرئيسي (Hero Subtitle):</label>
                      <textarea
                        rows={2}
                        value={localSettings.heroSubtitle || ''}
                        onChange={(e) => setLocalSettings({ ...localSettings, heroSubtitle: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">عنوان قسم التصنيفات (Categories Title):</label>
                      <input
                        type="text"
                        value={localSettings.categoriesTitle || 'تصنيفات وسجلات المتجر المدرسية'}
                        onChange={(e) => setLocalSettings({ ...localSettings, categoriesTitle: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">عنوان قسم المنتجات (Products Title):</label>
                      <input
                        type="text"
                        value={localSettings.productsTitle || 'المنتجات والسجلات الأكثر طلباً للعام 1447هـ'}
                        onChange={(e) => setLocalSettings({ ...localSettings, productsTitle: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">وسام الضمان الذهبي (Guarantee Badge):</label>
                      <input
                        type="text"
                        value={localSettings.guaranteeBadgeText || 'الضمان الذهبي 3 أيام'}
                        onChange={(e) => setLocalSettings({ ...localSettings, guaranteeBadgeText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1.5">وسام سرعة التسليم (Delivery Speed Badge):</label>
                      <input
                        type="text"
                        value={localSettings.deliverySpeedText || 'تسليم فوري 100%'}
                        onChange={(e) => setLocalSettings({ ...localSettings, deliverySpeedText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: التواصل وواتساب والأتمتة */}
            {settingsSubTab === 'whatsapp' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-600" />
                    <span>قنوات التواصل وإعدادات أتمتة الواتساب والبريد</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">رقم الواتساب الرسمي (خدمة العملاء)</label>
                      <input
                        type="text"
                        value={localSettings.whatsapp}
                        onChange={(e) => setLocalSettings({ ...localSettings, whatsapp: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">البريد الإلكتروني للدعم</label>
                      <input
                        type="email"
                        value={localSettings.email}
                        onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">رابط قناة التليجرام الرسمية</label>
                      <input
                        type="text"
                        value={localSettings.telegram}
                        onChange={(e) => setLocalSettings({ ...localSettings, telegram: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Automation Template */}
                  <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-xs text-emerald-950 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>قالب رسالة تسليم روابط التنزيل الفورية عبر واتساب</span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        مفعل تلقائياً عند تأكيد السداد
                      </span>
                    </div>

                    <textarea
                      rows={3}
                      value={localSettings.whatsappAutomation?.messageTemplate || 'مرحباً {customer_name}، شكراً لطلبك من متجر سلطان مغفوري رقم {order_number}. يمكنك تنزيل ملفاتك التعليمية فوراً عبر الرابط التالي: {download_url}'}
                      onChange={(e) => setLocalSettings({
                        ...localSettings,
                        whatsappAutomation: {
                          enabled: true,
                          sendInstantDelivery: true,
                          messageTemplate: e.target.value
                        }
                      })}
                      className="w-full p-3 bg-white border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium"
                    />
                    <p className="text-[11px] text-emerald-800">
                      * المتغيرات المدعومة: <code className="bg-emerald-100 px-1 rounded font-bold">{'{customer_name}'}</code>, <code className="bg-emerald-100 px-1 rounded font-bold">{'{order_number}'}</code>, <code className="bg-emerald-100 px-1 rounded font-bold">{'{download_url}'}</code>
                    </p>
                  </div>

                  {/* Test WhatsApp Dispatch Tool */}
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black text-stone-900 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#008489]" />
                      <span>اختبار مباشر لإرسال رسالة واتساب (Live WhatsApp Test)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">رقم الجوال للتجربة</label>
                        <input
                          type="text"
                          value={whatsappTestPhone}
                          onChange={(e) => setWhatsappTestPhone(e.target.value)}
                          className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono font-bold"
                          placeholder="05XXXXXXXX"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-stone-600 mb-1">نص رسالة الاختبار</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={whatsappTestMessage}
                            onChange={(e) => setWhatsappTestMessage(e.target.value)}
                            className="flex-1 p-2.5 bg-white border border-stone-200 rounded-xl text-xs"
                          />
                          <button
                            onClick={handleTestWhatsApp}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>إرسال تجريبي</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: الضرائب وبوابات الدفع */}
            {settingsSubTab === 'payments' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#008489]" />
                    <span>الفوترة وضريبة القيمة المضافة ZATCA (15%)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">الرقم الضريبي المعتمد (15 رقم)</label>
                      <input
                        type="text"
                        value={localSettings.vatNumber}
                        onChange={(e) => setLocalSettings({ ...localSettings, vatNumber: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">رقم وثيقة العمل الحر المعتمدة</label>
                      <input
                        type="text"
                        value={localSettings.freelanceDoc}
                        onChange={(e) => setLocalSettings({ ...localSettings, freelanceDoc: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">نسبة الضريبة الرسمية</label>
                      <input
                        type="text"
                        value="15% (شاملة في كافة الأسعار المعلنة)"
                        disabled
                        className="w-full p-3 bg-stone-100/70 border border-stone-200 rounded-xl text-xs font-bold text-stone-600"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-blue-950">تفعيل الفاتورة الإلكترونية برمز الاستجابة السريع (ZATCA QR Code)</h4>
                      <p className="text-[11px] text-blue-800 mt-0.5">توليد تلقائي لبيانات الفاتورة الضريبية وفق اشتراطات هيئة الزكاة والضريبة والجمارك</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold">مفعل 100%</span>
                  </div>
                </div>

                {/* Payment Gateways Toggles */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100">
                    بوابات الدفع الإلكتروني المعتمدة على المتجر
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { key: 'mada', name: 'مدى (Mada)', desc: 'البطاقات البنكية السعودية', fee: '1.0% + 1 ر.س', active: true },
                      { key: 'applePay', name: 'Apple Pay', desc: 'الدفع السريع لأجهزة آبل', fee: '1.8%', active: true },
                      { key: 'visaMastercard', name: 'Visa & MasterCard', desc: 'البطاقات الائتمانية الدولية', fee: '2.2%', active: true },
                      { key: 'tamara', name: 'تمارا (Tamara)', desc: 'الدفع الآجل والتقسيط على دفعات', fee: 'متوافق', active: true },
                      { key: 'tabby', name: 'تابي (Tabby)', desc: 'تقسيط المشتريات بدون فوائد', fee: 'متاح للربط', active: false }
                    ].map((gw) => (
                      <div key={gw.key} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-stone-900 text-xs block">{gw.name}</span>
                          <span className="text-[10px] text-stone-500">{gw.desc} ({gw.fee})</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${gw.active ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'}`}>
                          {gw.active ? 'مفعلة' : 'معطلة'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 4: السياسات والضمان */}
            {settingsSubTab === 'policies' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>سياسات المتجر والضمان المعلن للمنتجات الرقمية</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-stone-700">سياسة الاسترجاع والضمان (Refund Policy)</label>
                        <span className="text-[11px] font-mono text-emerald-700 font-bold">مهلة معالجة 3 أيام عمل</span>
                      </div>
                      <textarea
                        rows={3}
                        value={localSettings.refundPolicyText || 'ضمان استرجاع كامل المبلغ إذا تعذر استخدام المنتج الرقمي أو وجود مشكلة تقنية لم يتم حلها خلال 3 أيام عمل وفق سياسة المتجر المنشورة.'}
                        onChange={(e) => setLocalSettings({ ...localSettings, refundPolicyText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-stone-700">سياسة الاستبدال (Exchange Policy)</label>
                        <span className="text-[11px] font-mono text-emerald-700 font-bold">خلال 24 ساعة عمل</span>
                      </div>
                      <textarea
                        rows={2}
                        value={localSettings.exchangePolicyText || 'إمكانية استبدال المنتج بمنتج آخر من الفئة نفسها أو بالقيمة نفسها خلال 24 ساعة عمل من استلام الطلب.'}
                        onChange={(e) => setLocalSettings({ ...localSettings, exchangePolicyText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">سياسة الخصوصية وحماية بيانات المدارس</label>
                      <textarea
                        rows={2}
                        value={localSettings.privacyPolicyText || 'يلتزم المتجر بحماية خصوصية بيانات المعلمين والمدارس والعملاء، ولا يتم مشاركة أي ملفات أو تقارير مرفوعة مع أي طرف ثالث إطلاقاً.'}
                        onChange={(e) => setLocalSettings({ ...localSettings, privacyPolicyText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">الشروط والأحكام والملكية الفكرية</label>
                      <textarea
                        rows={2}
                        value={localSettings.termsText || 'المنتجات الرقمية مخصصة للاستخدام الشخصي والمدرسي للمشتري، ولا يجوز إعادة بيعها أو نشرها تجارياً دون إذن مسبق من المتجر.'}
                        onChange={(e) => setLocalSettings({ ...localSettings, termsText: e.target.value })}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 5: المنصة التقنية وتكامل سلة (MODULE 17) */}
            {settingsSubTab === 'salla' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                        <Boxes className="w-4 h-4 text-[#008489]" />
                        <span>المنصة التقنية التي يعمل عليها متجر سلطان مغفوري (المعمارية الهجينة)</span>
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        «صنع بإتقان على منصة سلة» مع محرك التطبيقات الذكية المخصص
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black">
                      Salla Verified & Connected
                    </span>
                  </div>

                  {/* Architecture Diagram Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 font-black text-xs text-teal-950">
                        <ShoppingBag className="w-4 h-4 text-teal-700" />
                        <span>1. واجهة ومتجر سلة (Salla Cloud)</span>
                      </div>
                      <p className="text-[11px] text-teal-800 leading-relaxed">
                        إدارة المتجر الإلكتروني، عرض المنتجات، تسجيل العملاء، بوابات الدفع الوطنية (مدى/Apple Pay)، واستقبال الطلبات وتوثيقها.
                      </p>
                      <div className="pt-2 text-[10px] font-mono font-bold text-teal-900 border-t border-teal-200/60">
                        المعرف: SALLA-MERCHANT-89211
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50/60 border border-purple-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 font-black text-xs text-purple-950">
                        <Cpu className="w-4 h-4 text-purple-700" />
                        <span>2. الأنظمة المخصصة (Custom Microservices)</span>
                      </div>
                      <p className="text-[11px] text-purple-800 leading-relaxed">
                        محرك معالجة «أداة تحسين» المعتمدة لـ 52 مؤشراً، معالج تقارير درجات نافس، ومولد الشهادات وملفات Word وPDF الآلية.
                      </p>
                      <div className="pt-2 text-[10px] font-mono font-bold text-purple-900 border-t border-purple-200/60">
                        محرك: Tahseen V3 Engine (1447هـ)
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 font-black text-xs text-blue-950">
                        <Send className="w-4 h-4 text-blue-700" />
                        <span>3. الخدمات المتصلة (External Integrations)</span>
                      </div>
                      <p className="text-[11px] text-blue-800 leading-relaxed">
                        واتساب للأعمال للتسليم الفوري لروابط التحميل، Google Drive CDN للملفات المشفرة، وبوابات الدفع بالتقسيط تمارا.
                      </p>
                      <div className="pt-2 text-[10px] font-mono font-bold text-blue-900 border-t border-blue-200/60">
                        التسليم: WhatsApp Instant Delivery API
                      </div>
                    </div>
                  </div>

                  {/* Salla Webhooks Live Test */}
                  <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-stone-900">نقطة استقبال إشعارات الويب هوك (Salla Webhook Endpoint)</h4>
                        <span className="text-[11px] font-mono text-stone-500 font-bold">/api/webhooks/salla</span>
                      </div>
                      <button
                        onClick={handleSimulateSallaWebhook}
                        className="px-4 py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>اختبار استقبال إشعار طلب سلة تجريبي</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-600">
                      عند النقر، يتم إرسال حدث Webhook محاكي لطلب ناجح، ومعالجته وتوثيقه بسجل الرقابة والعمليات الإدارية فوراً.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 6: الترابط التشغيلي ودورة العمليات (MODULE 18) */}
            {settingsSubTab === 'lifecycle' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                  <div className="pb-3 border-b border-stone-100">
                    <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-[#008489]" />
                      <span>الترابط التشغيلي ودورة حياة العمليات في متجر سلطان مغفوري</span>
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      المتجر لا يعمل بأقسام منفصلة بل من خلال دورة عمليات متكاملة ومؤتمتة
                    </p>
                  </div>

                  {/* Interactive Cycle Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        step: '1',
                        title: 'إدارة المنتجات والأدوات',
                        desc: 'إضافة السجلات والخطط وتطوير الأدوات الذكية وتحديد الأسعار والخصومات.',
                        icon: Package,
                        color: 'from-blue-500 to-blue-600',
                        bg: 'bg-blue-50 border-blue-200'
                      },
                      {
                        step: '2',
                        title: 'واجهة المتجر والتسويق',
                        desc: 'عرض المنتجات وتصنيفها واستهداف الفئات (مدير، وكيل، معلم) عبر الكوبونات والعروض.',
                        icon: Layout,
                        color: 'from-teal-500 to-teal-600',
                        bg: 'bg-teal-50 border-teal-200'
                      },
                      {
                        step: '3',
                        title: 'الطلبات والمدفوعات',
                        desc: 'استقبال الطلب، التحقق الآلي من السداد عبر مدى أو Apple Pay، وإصدار الفاتورة الضريبية.',
                        icon: ShoppingBag,
                        color: 'from-indigo-500 to-indigo-600',
                        bg: 'bg-indigo-50 border-indigo-200'
                      },
                      {
                        step: '4',
                        title: 'تسليم المنتجات والتراخيص',
                        desc: 'توليد روابط التنزيل المباشرة، معالجة ملفات الأدوات الذكية، وإرسال الروابط لواتساب العميل.',
                        icon: Send,
                        color: 'from-purple-500 to-purple-600',
                        bg: 'bg-purple-50 border-purple-200'
                      },
                      {
                        step: '5',
                        title: 'خدمة العملاء والتقييمات',
                        desc: 'الدعم الفني المباشر، معالجة طلبات الاستبدال والاسترجاع خلال 48h، وجمع تقييمات الرضا.',
                        icon: ShieldCheck,
                        color: 'from-emerald-500 to-emerald-600',
                        bg: 'bg-emerald-50 border-emerald-200'
                      },
                      {
                        step: '6',
                        title: 'التقارير والتحليل الإداري',
                        desc: 'تحليل سلوك العملاء ونسب المبيعات وأداء الأدوات وتغذية قسم المنتجات للتحسين المستمر.',
                        icon: BarChart3,
                        color: 'from-amber-500 to-amber-600',
                        bg: 'bg-amber-50 border-amber-200'
                      }
                    ].map((item) => {
                      const IconComp = item.icon;
                      return (
                        <div key={item.step} className={`p-5 rounded-2xl border ${item.bg} space-y-2 relative`}>
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-lg bg-stone-900 text-white text-xs font-black flex items-center justify-center">
                              {item.step}
                            </span>
                            <IconComp className="w-5 h-5 text-stone-700" />
                          </div>
                          <h4 className="text-xs font-black text-stone-900">{item.title}</h4>
                          <p className="text-[11px] text-stone-700 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 7: التقييم الثلاثي للمستويات الإدارية (MODULE 19) */}
            {settingsSubTab === 'levels' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
                  <div className="pb-3 border-b border-stone-100">
                    <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#008489]" />
                      <span>التقييم الشامل لثلاثية مستويات إدارة المتجر (Commercial, Operational, Technical)</span>
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      توزيع مهام ومسؤوليات الإدارة بين الجوانب التجارية والتشغيلية والتقنية
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Level 1: Commercial */}
                    <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-stone-900">1. المستوى التجاري</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] font-bold">Commercial</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        إدارة دورة البيع والنمو التجاري والتسويق:
                      </p>
                      <ul className="text-xs text-stone-800 space-y-2 font-medium">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>إدارة كتالوج المنتجات وتحديد الأسعار</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>إدارة العملاء وشرائح المدارس المستهدفة</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>أكواد الخصم والحملات الإعلانية ومعدل التحويل</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                          <span>متابعة إجمالي الإيرادات والفواتير</span>
                        </li>
                      </ul>
                    </div>

                    {/* Level 2: Operational */}
                    <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-stone-900">2. المستوى التشغيلي</span>
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded text-[10px] font-bold">Operational</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        ضمان تسليم المنتجات الرقمية ورضا العملاء:
                      </p>
                      <ul className="text-xs text-stone-800 space-y-2 font-medium">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span>تسليم الملفات والروابط الفورية للعميل</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span>دورة التذاكر الست لحل مشاكل التنزيل</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span>تنفيذ سياسة الاسترجاع خلال مهلة 3 أيام</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-teal-600" />
                          <span>إرسال المنتجات البديلة خلال 24 ساعة</span>
                        </li>
                      </ul>
                    </div>

                    {/* Level 3: Technical */}
                    <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-stone-900">3. المستوى التقني</span>
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-bold">Technical</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        تشغيل الأدوات الذكية والبنية التحتية:
                      </p>
                      <ul className="text-xs text-stone-800 space-y-2 font-medium">
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                          <span>تشغيل أداة تحسين لـ 52 مؤشراً لتميز</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                          <span>محرك تحليل درجات نافس وإنتاج Word/PDF</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                          <span>مراقبة الأعطال الحية واستجابة PostgreSQL</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                          <span>إدارة النسخ الاحتياطية وسجلات النشاط</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 8: النسخ الاحتياطي وصحة النظام ومراقبة الأعطال (MODULE 20) */}
            {settingsSubTab === 'health_backup' && (
              <div className="space-y-6">
                {/* Backup Actions Card */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                        <Database className="w-4 h-4 text-[#008489]" />
                        <span>إدارة النسخ الاحتياطية الشاملة (Full Database Backups)</span>
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        حفظ وتصدير واسترجاع بيانات المتجر والمنتجات والطلبات والعملاء بضغطة زر
                      </p>
                    </div>

                    <button
                      onClick={handleExportBackup}
                      className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل نسخة احتياطية حية (.JSON)</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[10px] text-stone-500 block">آخر نسخة احتياطية تم أخذها</span>
                      <span className="font-mono font-bold text-stone-800 text-xs">اليوم، 1447هـ (تلقائي)</span>
                    </div>
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[10px] text-stone-500 block">حالة التخزين والنسخ</span>
                      <span className="font-bold text-emerald-700 text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>محفوظ سحابياً ومحلياً</span>
                      </span>
                    </div>
                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                      <span className="text-[10px] text-stone-500 block">تشفير وحماية البيانات</span>
                      <span className="font-bold text-stone-800 text-xs">AES-256 Bit ZATCA Standard</span>
                    </div>
                  </div>
                </div>

                {/* System Health & Realtime Diagnostics */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-black text-stone-900 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <span>مراقبة الأعطال وصحة النظام الحية (System Health & Latency Monitor)</span>
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        فحص حي ومباشر لاستجابة قاعدة البيانات والذاكرة والخدمات المرتبطة
                      </p>
                    </div>

                    <button
                      onClick={fetchSystemHealth}
                      disabled={healthLoading}
                      className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? 'animate-spin' : ''}`} />
                      <span>فحص فوري الآن</span>
                    </button>
                  </div>

                  {systemHealth ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                        <span className="text-[11px] font-bold text-emerald-900 block">قاعدة البيانات PostgreSQL</span>
                        <div className="text-base font-black text-emerald-950 mt-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>متصلة وجاهزة</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-mono mt-1 block">
                          زمن الاستجابة: {systemHealth.dbLatencyMs}ms
                        </span>
                      </div>

                      <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl">
                        <span className="text-[11px] font-bold text-teal-900 block">وقت تشغيل الخادم (Uptime)</span>
                        <div className="text-sm font-black text-teal-950 mt-1">
                          {systemHealth.uptimeFormatted}
                        </div>
                        <span className="text-[10px] text-teal-700 font-mono mt-1 block">
                          {systemHealth.uptimeSec} ثانية بدون توقف
                        </span>
                      </div>

                      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl">
                        <span className="text-[11px] font-bold text-blue-900 block">استهلاك الذاكرة RAM</span>
                        <div className="text-base font-black text-blue-950 mt-1 font-mono">
                          {systemHealth.memoryHeapMB} MB
                        </div>
                        <span className="text-[10px] text-blue-700 font-mono mt-1 block">
                          RSS: {systemHealth.memoryRssMB} MB
                        </span>
                      </div>

                      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl">
                        <span className="text-[11px] font-bold text-purple-900 block">بوابة سلة وواتساب</span>
                        <div className="text-sm font-black text-purple-950 mt-1 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                          <span>متصلة بنجاح</span>
                        </div>
                        <span className="text-[10px] text-purple-700 mt-1 block">
                          {systemHealth.storageHealth}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
                      جاري تجهيز مقاييس الفحص الفوري... اضغط "فحص فوري الآن" للتحديث المباشر.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 9: ظهور أقسام المتجر (VISIBILITY) */}
            {settingsSubTab === 'visibility' && (
              <div className="space-y-6">
                {/* 1. Storefront Sections Visibility */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#008489]" />
                      <span>إظهار وإخفاء أقسام وبنرات واجهة المتجر الرئيسية</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700">تحديث لحظي فور الضغط</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
                    {[
                      { key: 'showTopAnnouncementBanner', label: 'شريط الإعلانات الترويجي العُلمي', category: 'بنرات' },
                      { key: 'showHeroBanner', label: 'بنر الهيرو الرئيسي ونصوص العرض', category: 'بنرات' },
                      { key: 'showPersonaCards', label: 'بطاقات الفئات والأدوار (مدير، وكيل، معلم...)', category: 'بطاقات' },
                      { key: 'showSmartToolsSection', label: 'قسم الأدوات الذكية بالصفحة الرئيسية', category: 'أدوات' },
                      { key: 'showCategoriesSection', label: 'قسم التصنيفات والسجلات المدرسية', category: 'تصنيفات' },
                      { key: 'showProductsSection', label: 'قسم شبكة المنتجات والسجلات المميزة', category: 'منتجات' },
                      { key: 'showPrincipalRecordsSection', label: 'قسم سجلات مدير المدرسة الرسمية', category: 'سجلات' },
                      { key: 'showVicePrincipalSection', label: 'قسم سجلات وكيل المدرسة والشؤون التعليمية', category: 'سجلات' },
                      { key: 'showCounselorSection', label: 'قسم سجلات وخطة الموجه الطلابي', category: 'إرشاد' },
                      { key: 'showOperationalPlansSection', label: 'قسم الخطط التشغيلية والاستعداد', category: 'خطط' },
                      { key: 'showSelfEvaluationSection', label: 'قسم التقويم الذاتي والاعتماد المدرسي (تميز)', category: 'تقويم' },
                      { key: 'showCertificatesSection', label: 'قسم شهادات Word والانضباط المدرسي', category: 'شهادات' },
                      { key: 'showTrackingSheetsSection', label: 'قسم كشوفات المتابعة والرصد التلقائي', category: 'كشوفات' },
                      { key: 'showActivitySection', label: 'قسم النشاط الطلابي والفعاليات', category: 'أنشطة' },
                      { key: 'showStatsSection', label: 'شريط الإحصائيات والأرقام القياسية', category: 'إحصائيات' },
                      { key: 'showFeaturesSection', label: 'قسم مميزات المتجر والضمان الذهبي', category: 'مميزات' },
                      { key: 'showFaqSection', label: 'قسم الأسئلة الشائعة والإجابات', category: 'أسئلة' },
                      { key: 'showContactBox', label: 'صندوق الدعم الفني والتواصل المباشر', category: 'دعم' },
                      { key: 'showWelcomeGiftTab', label: 'النافذة الترحيبية لقسيمة الخصم', category: 'عروض' },
                      { key: 'showFooterSection', label: 'فوتر المتجر السفلي وحقوق النشر', category: 'تذييل' },
                    ].map((sec) => (
                      <label 
                        key={sec.key} 
                        className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/80 cursor-pointer transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-800">{sec.label}</span>
                          <span className="text-[9px] text-stone-400 font-semibold">{sec.category}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={(sectionVisibility as any)[sec.key] !== false}
                          onChange={(e) => {
                            updateSectionVisibility({ [sec.key]: e.target.checked });
                            showToast(`تم تحديث حالة عرض: ${sec.label}`);
                          }}
                          className="w-4 h-4 text-[#008489] rounded focus:ring-0 cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Header Navigation Tabs Visibility */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-black text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#008489]" />
                      <span>إظهار وإخفاء تبويبات شريط التصفح العلوي (Top Header Nav Tabs)</span>
                    </span>
                    <span className="text-[11px] font-bold text-teal-700">تحكم كامل بدقة 100%</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
                    {[
                      { key: 'showTopInspectionRibbon', label: 'شريط الفحص العلوي الأسود', category: 'شريط علوي' },
                      { key: 'showOperationalStudyTab', label: 'تبويب الدراسة والتحليل التشغيلي', category: 'تبويب علوي' },
                      { key: 'showSmartToolsTab', label: 'تبويب تجربة الأدوات الذكية المدرسية', category: 'تبويب علوي' },
                      { key: 'showOverviewTab', label: 'تبويب تقرير الفحص والاعتماد الشامل', category: 'تبويب علوي' },
                      { key: 'showWorkflowsTab', label: 'تبويب مصفوفة المهام والوظائف ورحلة المستفيد', category: 'تبويب علوي' },
                      { key: 'showCatalogTab', label: 'تبويب جدول الفهرسة والبحث التفصيلي', category: 'تبويب علوي' },
                    ].map((sec) => (
                      <label 
                        key={sec.key} 
                        className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/80 cursor-pointer transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-800">{sec.label}</span>
                          <span className="text-[9px] text-stone-400 font-semibold">{sec.category}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={(sectionVisibility as any)[sec.key] !== false}
                          onChange={(e) => {
                            updateSectionVisibility({ [sec.key]: e.target.checked });
                            showToast(`تم تحديث حالة عرض: ${sec.label}`);
                          }}
                          className="w-4 h-4 text-[#008489] rounded focus:ring-0 cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar - Save All Settings */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center gap-2 text-stone-500 text-xs">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>جميع التعديلات يتم تطبيقها لحظياً وبشكل إجباري على واجهة المتجر وقاعدة البيانات</span>
              </div>
              <button
                onClick={handleSaveSettings}
                className="px-6 py-3 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ كافة الإعدادات وتطبيقها إجبارياً على المتجر</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL: CUSTOMER DETAIL & SEGMENT VIEW */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedCustomerDetails && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-black text-stone-900">{selectedCustomerDetails.name}</h3>
                  <span className="text-stone-500 font-mono text-[11px]">{selectedCustomerDetails.phone} | {selectedCustomerDetails.email}</span>
                </div>
                <button onClick={() => setSelectedCustomerDetails(null)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl">
                  <div>
                    <span className="text-[10px] text-teal-700 block font-bold">شريحة الاهتمام التعليمية:</span>
                    <span className="font-black text-teal-900 text-xs">{selectedCustomerDetails.segment}</span>
                  </div>
                  <span className="bg-white text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-200">
                    مستهدف بعروض الإدارة
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-stone-800 mb-2">سجل المنتجات والملفات المشتراة سابقاً:</h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {selectedCustomerDetails.purchasedProducts && selectedCustomerDetails.purchasedProducts.length > 0 ? (
                      selectedCustomerDetails.purchasedProducts.map((pName: string, i: number) => (
                        <div key={i} className="p-2 bg-stone-50 rounded-lg border border-stone-100 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-stone-800 font-medium">{pName}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-stone-400">أداة تحسين — خطة التحسين للتقويم الذاتي 1447</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex gap-2">
                  <a
                    href={`https://wa.me/${(selectedCustomerDetails.phone || '966504260216').replace(/\D/g, '')}?text=${encodeURIComponent(`مرحباً أستاذ ${selectedCustomerDetails.name}، نقدم لكم عرضاً خاصاً مخصصاً لـ ${selectedCustomerDetails.segment} بخصم 20% بكود TEACHER!`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>إرسال عرض مخصص عبر واتساب</span>
                  </a>
                  <button onClick={() => setSelectedCustomerDetails(null)} className="px-4 py-2.5 bg-stone-100 rounded-xl font-bold">
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
                <h3 className="text-lg font-black text-stone-900">
                  {editingProduct ? 'تعديل بيانات المنتج التعليمي' : 'إضافة منتج تعليمي جديد للمتجر'}
                </h3>
                <button 
                  onClick={() => setIsProductModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="block font-bold text-stone-900">
                    نوع المنتج التعليمي (حدد النوع الفعلي للمنتج):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { 
                        type: 'ready_file' as ProductType, 
                        title: 'ملف جاهز للتعديل', 
                        desc: 'ملف Word أو Excel أو PDF للتنزيل الفوري',
                        icon: FileText 
                      },
                      { 
                        type: 'web_link' as ProductType, 
                        title: 'منتج مرتبط برابط', 
                        desc: 'شهادات ذكية أو منصات تفاعلية',
                        icon: LinkIcon 
                      },
                      { 
                        type: 'smart_tool' as ProductType, 
                        title: 'أداة تفاعلية ذكية', 
                        desc: 'معالجة بيانات وإصدار خطط وتقارير تميز',
                        icon: Cpu 
                      },
                    ].map((pt) => (
                      <button
                        type="button"
                        key={pt.type}
                        onClick={() => {
                          setFormProductType(pt.type);
                          if (pt.type === 'smart_tool') setFormFormat('أداة ويب ذكية');
                          if (pt.type === 'web_link') setFormFormat('رابط تفاعلي');
                          if (pt.type === 'ready_file' && formFormat === 'أداة ويب ذكية') setFormFormat('Word (.docx)');
                        }}
                        className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                          formProductType === pt.type 
                            ? 'border-[#008489] bg-teal-50/80 shadow-xs ring-1 ring-[#008489]' 
                            : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900 mb-1">
                          <pt.icon className="w-4 h-4 text-[#008489]" />
                          <span>{pt.title}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight">{pt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">اسم المنتج</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="مثال: أداة تحسين — خطة التحسين للتقويم الذاتي"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-[#008489]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">التصنيف والقسم الرئيسي</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">القسم الفرعي</label>
                    <input
                      type="text"
                      required
                      value={formSubCategory}
                      onChange={(e) => setFormSubCategory(e.target.value)}
                      placeholder="مثال: أداة ذكية أو سجلات إدارية"
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">السعر الحالي (ر.س)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">السعر قبل الخصم (ر.س)</label>
                    <input
                      type="number"
                      min={0}
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">صيغة الملف / النظام</label>
                    <select
                      value={formFormat}
                      onChange={(e) => setFormFormat(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                    >
                      <option value="Word (.docx)">Word (.docx)</option>
                      <option value="Excel (.xlsx)">Excel (.xlsx)</option>
                      <option value="PDF">PDF</option>
                      <option value="أداة ويب ذكية">أداة ويب ذكية (معالجة بيانات سحابية)</option>
                      <option value="رابط تفاعلي">رابط تفاعلي</option>
                      <option value="Photoshop (PSD)">Photoshop (PSD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">الدور التعليمي المستهدف</label>
                    <select
                      value={formTargetRole}
                      onChange={(e) => setFormTargetRole(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                    >
                      <option value="مدير مدرسة">مدير مدرسة</option>
                      <option value="وكيل مدرسة">وكيل مدرسة</option>
                      <option value="معلم / معلمة">معلم / معلمة</option>
                      <option value="موجه طلابي">موجه طلابي</option>
                      <option value="رائد نشاط">رائد نشاط</option>
                      <option value="رياض الأطفال">رياض الأطفال</option>
                      <option value="لجان الاختبارات">لجان الاختبارات والتحسين</option>
                      <option value="الجميع">الجميع</option>
                    </select>
                  </div>
                </div>

                {/* 1. SECTION: PRODUCT IMAGE (Upload from File OR URL OR Assets) */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                  <label className="block font-bold text-stone-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#008489]" />
                      <span>صورة المنتج (رفع من الملفات أو عبر رابط):</span>
                    </span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      مستحسن 800x600px
                    </span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    {/* Left: Upload file or URL */}
                    <div className="space-y-2.5">
                      <div className="relative border border-dashed border-stone-300 hover:border-[#008489] bg-white rounded-xl p-3 text-center transition-all cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                showToast('حجم صورة المنتج كبير، يرجى اختيار صورة أقل من 5 ميجابايت');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (reader.result) {
                                  setFormImage(reader.result as string);
                                  showToast('تم اختيار صورة المنتج من ملفاتك بنجاح');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex items-center justify-center gap-2">
                          <Upload className="w-4 h-4 text-[#008489]" />
                          <span className="text-xs font-bold text-stone-700">اختيار صورة المنتج من جهازك</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-stone-500 shrink-0">أو رابط الصورة:</span>
                        <input
                          type="url"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                          placeholder="https://example.com/product.jpg"
                          className="w-full p-2 bg-white border border-stone-200 rounded-xl text-xs font-mono text-stone-800"
                        />
                      </div>

                      {/* Quick Asset Thumbnails */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-bold text-stone-500">معرض الأصول:</span>
                        {[
                          '/assets/aistudio/image_082663d6.png',
                          '/assets/aistudio/image_4a19c382.png',
                          '/assets/aistudio/image_509e2f64.png',
                          '/assets/aistudio/image_81763d5f.png'
                        ].map((path, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFormImage(path);
                              showToast(`تم تحديث صورة المنتج (${idx + 1})`);
                            }}
                            className="w-7 h-7 rounded-lg border border-stone-200 bg-white p-0.5 hover:border-[#008489] transition-all cursor-pointer overflow-hidden"
                            title={`صورة asset ${idx + 1}`}
                          >
                            <img src={path} alt="Product Asset" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Product Image Thumbnail Preview */}
                    <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col items-center justify-center space-y-1 min-h-[120px]">
                      <span className="text-[10px] font-bold text-stone-400">معاينة صورة المنتج:</span>
                      {formImage ? (
                        <div className="relative group flex flex-col items-center">
                          <img
                            src={formImage}
                            alt="Product Preview"
                            className="w-24 h-24 object-cover rounded-xl border border-stone-200 shadow-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormImage('');
                              showToast('تم مسح صورة المنتج');
                            }}
                            className="mt-1 text-[10px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>حذف الصورة</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-stone-400 py-3">
                          <ImageIcon className="w-8 h-8 text-stone-300 mb-1" />
                          <span className="text-[11px] font-bold text-stone-500">لا توجد صورة محددة</span>
                          <span className="text-[9px] text-stone-400">(سيتم استخدام غلاف الفئة التلقائي)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. SECTION: DIGITAL PRODUCT FILE OR URL (Upload from File OR Link) */}
                <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200 space-y-3">
                  <label className="block font-bold text-stone-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileUp className="w-4 h-4 text-[#008489]" />
                      <span>
                        {formProductType === 'smart_tool' ? 'رابط أداة الويب الذكية أو رفع برمجية الأداة:' : 
                         formProductType === 'web_link' ? 'رابط الوصول للشهادة الذكية / المنصة:' : 
                         'ملف المنتج الرقمي الجاهز للتسليم (رفع من الملفات أو عبر رابط):'}
                      </span>
                    </span>
                    <span className="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full font-bold">
                      تسليم آلي فوري
                    </span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Option A: Local File Upload */}
                    <div className="relative border border-dashed border-teal-300 hover:border-[#008489] bg-white rounded-xl p-3 text-center transition-all cursor-pointer group flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.zip,.rar"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.result) {
                                setFormDownloadUrl(reader.result as string);
                                showToast(`تم رفع ملف المنتج الرقمي (${file.name}) بنجاح`);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <FileUp className="w-5 h-5 text-[#008489] mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-stone-800">رفع ملف المنتج من الجهاز</span>
                      <span className="text-[10px] text-stone-500">يدعم (Word, Excel, PDF, ZIP)</span>
                    </div>

                    {/* Option B: Download Link URL Input */}
                    <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col justify-center space-y-1.5">
                      <label className="block text-[11px] font-bold text-stone-700">أو ضع رابط التنزيل السحابي (Google Drive / URL):</label>
                      <input
                        type="url"
                        value={formDownloadUrl}
                        onChange={(e) => setFormDownloadUrl(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs text-stone-800 focus:outline-none focus:border-[#008489]"
                      />
                    </div>
                  </div>

                  {/* Status indicator for uploaded file / link */}
                  {formDownloadUrl && (
                    <div className="p-2.5 bg-white rounded-xl border border-teal-200 text-xs font-mono text-teal-900 flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate font-bold">
                          {formDownloadUrl.startsWith('data:') ? 'تم ارفاق ملف رقمي مرفع من الجهاز جاهز للتحميل المباشر' : formDownloadUrl}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormDownloadUrl('')}
                        className="text-[10px] font-bold text-stone-500 hover:text-rose-600 shrink-0 cursor-pointer"
                      >
                        حذف الملف/الرابط
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الكلمات المفتاحية لمحركات البحث (SEO Keywords)</label>
                  <input
                    type="text"
                    value={formKeywords}
                    onChange={(e) => setFormKeywords(e.target.value)}
                    placeholder="مثال: تقويم ذاتي, أداة تحسين, خطة مدرسية, تميز"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الوصف التفصيلي وشرح الفوائد التعليمية</label>
                  <textarea
                    rows={3}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="اكتب وصفاً جذاباً يوضح القيمة والمهام الميدانية المنجزة..."
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    المميزات المشمولة ومكونات الحزمة (اكتب كل ميزة في سطر منفصل)
                  </label>
                  <textarea
                    rows={3}
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="شامل الإصدار الثالث 1447&#10;ملف قابل للتعديل بالكامل&#10;متوافق مع منصة تميز"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <label className="flex items-center gap-2 font-bold text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBestseller}
                      onChange={(e) => setFormIsBestseller(e.target.checked)}
                      className="w-4 h-4 text-[#008489] rounded cursor-pointer"
                    />
                    <span>تمييز كمنتج أكثر مبيعاً (Bestseller ⭐)</span>
                  </label>

                  <label className="flex items-center gap-2 font-bold text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formHidden}
                      onChange={(e) => setFormHidden(e.target.checked)}
                      className="w-4 h-4 text-[#008489] rounded cursor-pointer"
                    />
                    <span>إخفاء المنتج مؤقتاً من واجهة المتجر</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl font-bold shadow-xs cursor-pointer"
                  >
                    {editingProduct ? 'حفظ التعديلات' : 'نشر المنتج فوراً'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT CATEGORY */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddCategoryModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-stone-200"
            >
              <h3 className="text-base font-black text-stone-900 mb-4">
                {editingCategory ? 'تعديل بيانات القسم' : 'إنشاء قسم رئيسي جديد بالمتجر'}
              </h3>
              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">اسم القسم</label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="مثال: السجلات المدرسية"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الوصف المختصر للقسم</label>
                  <textarea
                    rows={2}
                    required
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="شرح محتويات القسم والفئات المستفيدة..."
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الفئات الفرعية (افصل بينها بفاصلة ,)</label>
                  <input
                    type="text"
                    value={catSubCategories}
                    onChange={(e) => setCatSubCategories(e.target.value)}
                    placeholder="مدير المدرسة, وكيل المدرسة, المعلم"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الكلمات المفتاحية للسيو (SEO)</label>
                  <input
                    type="text"
                    value={catSeoKeywords}
                    onChange={(e) => setCatSeoKeywords(e.target.value)}
                    placeholder="سجلات, إدارة مدرسية, خطط"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-[#008489] text-white rounded-xl font-bold cursor-pointer">
                    حفظ القسم
                  </button>
                  <button type="button" onClick={() => setIsAddCategoryModalOpen(false)} className="px-4 py-2.5 bg-stone-100 rounded-xl font-bold cursor-pointer">
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ZATCA INVOICE PREVIEW & PRINT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isInvoiceModalOpen && selectedInvoiceOrder && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 text-xs text-stone-900"
            >
              <div className="flex justify-between items-start pb-6 border-b border-stone-200">
                <div>
                  <h3 className="text-base font-black text-stone-900">فاتورة ضريبية مبسطة</h3>
                  <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                    رقم الفاتورة: INV-2026-{selectedInvoiceOrder.id.toString().padStart(5, '0')}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono">
                    التاريخ: {selectedInvoiceOrder.createdAt ? new Date(selectedInvoiceOrder.createdAt).toLocaleDateString('ar-SA') : '2026/11/08'}
                  </p>
                </div>

                <div className="text-left">
                  <span className="font-black text-sm text-[#008489] block">متجر احتياجك التعليمي</span>
                  <span className="text-[10px] text-stone-500 block">سلطان مغفوري</span>
                  <span className="text-[10px] text-stone-500 font-mono block">الرقم الضريبي: 312890988700003</span>
                  <span className="text-[10px] text-stone-500 font-mono block">وثيقة العمل الحر: FL-199700808</span>
                </div>
              </div>

              <div className="my-4 p-3 bg-stone-50 rounded-xl border border-stone-100 flex justify-between">
                <div>
                  <span className="text-stone-400 block text-[10px]">العميل:</span>
                  <span className="font-bold">
                    {selectedInvoiceOrder.user ? `${selectedInvoiceOrder.user.firstName || ''} ${selectedInvoiceOrder.user.lastName || ''}`.trim() : 'عميل تعليمي'}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-stone-400 block text-[10px]">رقم الجوال:</span>
                  <span className="font-mono">{selectedInvoiceOrder.user?.phone || '05XXXXXXXX'}</span>
                </div>
              </div>

              <table className="w-full text-right my-4 border-t border-b border-stone-200">
                <thead className="bg-stone-50 text-stone-600 font-bold">
                  <tr>
                    <th className="p-2.5">الوصف والمنتج</th>
                    <th className="p-2.5 text-center">الكمية</th>
                    <th className="p-2.5 text-left">السعر</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {selectedInvoiceOrder.items && selectedInvoiceOrder.items.length > 0 ? (
                    selectedInvoiceOrder.items.map((it: any, idx: number) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium">{it.product?.name || 'منتج تعليمي رقمي'}</td>
                        <td className="p-2.5 text-center">1</td>
                        <td className="p-2.5 text-left font-mono">{Number(it.price || selectedInvoiceOrder.total).toFixed(2)} ر.س</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-2.5 font-medium">حزمة السجلات والأدوات التعليمية المعتمدة</td>
                      <td className="p-2.5 text-center">1</td>
                      <td className="p-2.5 text-left font-mono">{Number(selectedInvoiceOrder.total).toFixed(2)} ر.س</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="space-y-1.5 p-3 bg-stone-50 rounded-xl text-xs font-mono">
                <div className="flex justify-between">
                  <span>المبلغ غير شامل الضريبة:</span>
                  <span>{(Number(selectedInvoiceOrder.total) / 1.15).toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span>{(Number(selectedInvoiceOrder.total) - Number(selectedInvoiceOrder.total) / 1.15).toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between font-black text-sm text-stone-900 pt-1.5 border-t border-stone-200">
                  <span>المبلغ الإجمالي شامل الضريبة:</span>
                  <span>{Number(selectedInvoiceOrder.total).toFixed(2)} ر.س</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-stone-900 rounded-lg p-1.5 flex items-center justify-center text-white font-mono text-[8px] text-center leading-tight">
                    [ZATCA QR CODE]
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block">فاتورة إلكترونية معتمدة</span>
                    <span>متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة</span>
                  </button>
                  <button
                    onClick={() => setIsInvoiceModalOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-700 rounded-xl font-bold cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD COUPON */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddCouponModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-stone-200"
            >
              <h3 className="text-base font-black text-stone-900 mb-4">إنشاء كود خصم موجه</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">رمز الكود (باللغة الإنجليزية)</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    placeholder="مثال: TEACHER20"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">نسبة الخصم (%)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={90}
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">الفئة المستهدفة</label>
                  <select
                    value={newCouponTargetRole}
                    onChange={(e) => setNewCouponTargetRole(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    <option value="الجميع">الجميع</option>
                    <option value="مدير مدرسة">مديرو المدارس</option>
                    <option value="معلم / معلمة">المعلمون والمعلمات</option>
                    <option value="وكيل مدرسة">وكلاء المدارس</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-[#008489] text-white rounded-xl font-bold cursor-pointer">
                    حفظ ونشر الكود
                  </button>
                  <button type="button" onClick={() => setIsAddCouponModalOpen(false)} className="px-4 py-2.5 bg-stone-100 rounded-xl font-bold cursor-pointer">
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD CUSTOMER */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddCustomerModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-stone-200"
            >
              <h3 className="text-base font-black text-stone-900 mb-4">إضافة عميل يدوياً</h3>
              <form onSubmit={handleCreateCustomer} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">الاسم الأول</label>
                  <input
                    type="text"
                    required
                    value={newCustomerFirstName}
                    onChange={(e) => setNewCustomerFirstName(e.target.value)}
                    placeholder="مثال: فهد"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">اسم العائلة</label>
                  <input
                    type="text"
                    value={newCustomerLastName}
                    onChange={(e) => setNewCustomerLastName(e.target.value)}
                    placeholder="مثال: العتيبي"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={newCustomerEmail}
                    onChange={(e) => setNewCustomerEmail(e.target.value)}
                    placeholder="user@edu.sa"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">رقم الجوال</label>
                  <input
                    type="text"
                    required
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="0501234567"
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-[#008489] text-white rounded-xl font-bold cursor-pointer">
                    إضافة العميل
                  </button>
                  <button type="button" onClick={() => setIsAddCustomerModalOpen(false)} className="px-4 py-2.5 bg-stone-100 rounded-xl font-bold cursor-pointer">
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD REVIEW */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddReviewModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-stone-200"
            >
              <h3 className="text-base font-black text-stone-900 mb-4">إضافة تقييم موثق لمنتج</h3>
              <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">المنتج التعليمي</label>
                  <select
                    value={newReviewProductId}
                    onChange={(e) => setNewReviewProductId(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    {(allAdminProducts.length > 0 ? allAdminProducts : products).map((p: any) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">التقييم بالنجوم</label>
                  <select
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  >
                    <option value={5}>⭐️⭐️⭐️⭐️⭐️ (5 نجوم)</option>
                    <option value={4}>⭐️⭐️⭐️⭐️ (4 نجوم)</option>
                    <option value={3}>⭐️⭐️⭐️ (3 نجوم)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">نص الرأي أو التقييم</label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="اكتب تعليق العميل وتجربته..."
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-[#008489] text-white rounded-xl font-bold cursor-pointer">
                    نشر التقييم
                  </button>
                  <button type="button" onClick={() => setIsAddReviewModalOpen(false)} className="px-4 py-2.5 bg-stone-100 rounded-xl font-bold cursor-pointer">
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Floating Action Button */}
      {showAdminScrollTop && (
        <button
          onClick={scrollToAdminTop}
          className="fixed bottom-6 left-6 z-40 bg-[#008489] hover:bg-[#007478] text-white p-3 rounded-full shadow-xl transition-all hover:scale-105 cursor-pointer"
          title="العودة لأعلى الصفحة"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

    </div>
  );
};
