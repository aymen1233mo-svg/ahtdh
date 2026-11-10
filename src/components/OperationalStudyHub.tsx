import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Headphones, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Send, 
  Zap, 
  AlertTriangle, 
  Layers, 
  ArrowRight, 
  Award, 
  ExternalLink, 
  Cpu, 
  Check, 
  Copy,
  ChevronDown,
  Building,
  Target,
  BarChart3,
  HelpCircle,
  MessageCircle,
  FileSpreadsheet,
  Palette,
  Briefcase
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface OperationalStudyHubProps {
  onBackToStorefront: () => void;
  onOpenTool: (toolId: string) => void;
  onOpenCatalog: () => void;
}

export const OperationalStudyHub: React.FC<OperationalStudyHubProps> = ({
  onBackToStorefront,
  onOpenTool,
  onOpenCatalog
}) => {
  const [activeSection, setActiveSection] = useState<
    'sales_marketing' | 'customer_support' | 'community_affiliate' | 'services_ops' | 'competitive_model' | 'assessment_blueprint'
  >('sales_marketing');

  // Refund request interactive simulator state
  const [refundOrderNumber, setRefundOrderNumber] = useState('');
  const [refundReason, setRefundReason] = useState('وجود مشكلة تقنية في تشغيل الملف');
  const [refundNotes, setRefundNotes] = useState('');
  const [refundActionType, setRefundActionType] = useState<'refund' | 'exchange'>('refund');
  const [refundSubmitted, setRefundSubmitted] = useState(false);
  const [copiedAffiliateLink, setCopiedAffiliateLink] = useState(false);

  // Affiliate Calculator state
  const [monthlyReferrals, setMonthlyReferrals] = useState<number>(35);
  const averageOrderPrice = 85;
  const commissionRate = 0.20; // 20% commission
  const estimatedEarnings = Math.round(monthlyReferrals * averageOrderPrice * commissionRate);

  const sectionsList = [
    { id: 'sales_marketing', label: 'التسويق والمبيعات الإلكترونية', icon: ShoppingBag },
    { id: 'customer_support', label: 'خدمة العملاء وسياسة الاسترجاع', icon: Headphones },
    { id: 'community_affiliate', label: 'بناء المجتمع والتسويق بالعمولة', icon: Share2 },
    { id: 'services_ops', label: 'الخدمات الخمس ودورة البيع', icon: Layers },
    { id: 'competitive_model', label: 'نقاط التميز ونموذج العمل (Canvas)', icon: TrendingUp },
    { id: 'assessment_blueprint', label: 'التقييم الإداري وخطة إنشاء متجر', icon: Building },
  ];

  return (
    <div className="space-y-6 pb-16 font-sans text-stone-900" dir="rtl">
      {/* Top Banner & Header */}
      <div className="bg-gradient-to-r from-[#093c42] to-[#008489] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-teal-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>الدراسة التحليلية والتشغيلية المتقدمة لمتجر سلطان مغفوري التعليمي</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              التحليل الوظيفي، دورة العمليات، ونموذج العمل التجاري
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
              تحليل تفصيلي لكافة وظائف المبيعات، خدمة العملاء والدعم الفني، سياسة الاستبدال والاسترجاع، التسويق بالعمولة، وخطة بناء متجر تعليمي مشابه.
            </p>
          </div>

          <button
            onClick={onBackToStorefront}
            className="px-5 py-2.5 bg-white text-[#008489] hover:bg-stone-50 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>العودة للمتجر</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15 overflow-x-auto no-scrollbar">
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#008489] shadow-md scale-102'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. وظيفة التسويق والمبيعات الإلكترونية */}
      {/* ============================================================== */}
      {activeSection === 'sales_marketing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-stone-900">
                  وظيفة التسويق والمبيعات الإلكترونية
                </h2>
                <p className="text-xs text-stone-500">
                  الآليات المتبعة في عرض المنتجات، إدارة السلة، تقديم العروض، واستلام المبيعات الرقمية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                {
                  title: '1. عرض المنتجات والترويج لها',
                  desc: 'تصنيف المنتجات حسب الفئات المدرسية (مدير، وكيل، معلم، موجه، رياض أطفال) وتوضيح الصيغة (Word / Excel / PDF) والمواصفات بدقة عالية.',
                  badge: 'كتالوج ديناميكي'
                },
                {
                  title: '2. تقديم العروض والخصومات',
                  desc: 'تفعيل الخصومات الموسمية (مثل خصومات بداية العام الدراسي ونهاية الفصول) وتقديم عروض تصاعدية بالسلة (مثال: أضف 77 ر.س واحصل على 30% خصم).',
                  badge: 'محفزات تحويل'
                },
                {
                  title: '3. إبراز المنتجات الأكثر مبيعاً',
                  desc: 'تسليط الضوء على المنتجات الاستراتيجية ذات الطلب الكثيف، مثل أداة تحسين (أكثر من 1200 عملية شراء) وكشوفات رصد الغياب وتوزيع الأسابيع الدراسية.',
                  badge: 'Social Proof'
                },
                {
                  title: '4. إدارة سلة المشتريات',
                  desc: 'واجهة سلة متطورة تتيح تعديل الكميات، تطبيق كوبونات الخصم، إظهار شريط التقدم للخصم الإضافي، وعرض تفاصيل السعر الشامل للضريبة.',
                  badge: 'تجربة سريعة'
                },
                {
                  title: '5. توفير وسائل الدفع الإلكترونية المتنوعة',
                  desc: 'دعم كامل لمنظومة الدفع السعودية: مدى، Apple Pay، فيزا/ماستركارد، STC Pay، بالإضافة إلى حلول التقسيط الميسر بدون فوائد (تمارا وتابي).',
                  badge: 'تكامل كامل'
                },
                {
                  title: '6. تنفيذ عمليات البيع وإصدار الطلبات ومتابعتها',
                  desc: 'إصدار فوري لرقم الطلب والفاتورة الرقمية، متابعة حالة الطلب في خانة "طلباتي"، وإرسال إشعارات التحديث التلقائي إلى واتساب العميل.',
                  badge: 'أتمتة المبيعات'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-4 border border-stone-200/80 flex flex-col justify-between hover:border-[#008489] transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#008489] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/50">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Electronic Payments Showcase */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
            <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>منظومة بوابات الدفع الإلكتروني واستلام المبيعات المعتمدة</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
              {[
                { name: 'مدى (Mada)', sub: 'خصم مباشر فوري', badge: 'الأكثر استخداماً' },
                { name: 'Apple Pay', sub: 'سداد سريع بنقرة واحدة', badge: 'لأجهزة آبل' },
                { name: 'فيزا وماستركارد', sub: 'بطاقات ائتمانية', badge: 'دولي ومحلي' },
                { name: 'تمارا (Tamara)', sub: 'تقسيط 4 دفعات بدون فوائد', badge: 'شراء الآن ودفع لاحقاً' },
                { name: 'تابي (Tabby)', sub: 'تقسيط مرن وميسر', badge: 'بدون رسوم إضافية' },
                { name: 'STC Pay', sub: 'محفظة رقمية سعودية', badge: 'سداد فوري' }
              ].map((p, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 py-0.5 rounded mb-1">{p.badge}</span>
                  <span className="text-xs font-bold text-stone-900">{p.name}</span>
                  <span className="text-[10px] text-stone-500 mt-1">{p.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. وظيفة خدمة العملاء والدعم الفني + سياسة الاسترجاع */}
      {/* ============================================================== */}
      {activeSection === 'customer_support' && (
        <div className="space-y-6">
          {/* Customer Support Pillars */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-stone-900">
                  وظيفة خدمة العملاء والدعم الفني
                </h2>
                <p className="text-xs text-stone-500">
                  المتابعة المباشرة، استقبال الاستفسارات، التوجيه لاختيار النماذج، وحل الإشكالات التقنية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {[
                {
                  title: 'استقبال استفسارات العملاء',
                  desc: 'قنوات مباشرة للرد على تساؤلات الميدان التعليمي حول محتوى السجلات ومطابقتها لأدلة وزارة التعليم.',
                  channel: 'واتساب + تيليجرام'
                },
                {
                  title: 'المساعدة في اختيار المنتج المناسب',
                  desc: 'توجيه مدير المدرسة أو المعلم أو الوكيل نحو الحقيبة المناسبة لمرحلته (ابتدائي، متوسط، ثانوي، رياض أطفال).',
                  channel: 'استشارة فورية'
                },
                {
                  title: 'حل المشكلات التقنية والتعديل',
                  desc: 'مساعدة العميل في فك ضغط الملفات، التعامل مع دوال الإكسل المبرمجة، وتعديل قوالب الوورد عند الحاجة.',
                  channel: 'دعم فني مخصص'
                },
                {
                  title: 'معالجة طلبات الاستبدال والاسترجاع',
                  desc: 'مسار واضح ومحدد وفق سياسة المتجر المنشورة لضمان حقوق العميل وسرعة البت في الطلب خلال 48 ساعة.',
                  channel: 'ضمان ذهبي 3 أيام'
                },
                {
                  title: 'تقديم الإرشادات وأدلة الاستخدام',
                  desc: 'توفير خطوات مرئية ومكتوبة لاستخدام الأدوات الذكية وتوليد الشهادات والتقارير بدون برامج معقدة.',
                  channel: 'فيديوهات وأدلة'
                },
                {
                  title: 'التواصل عبر واتساب والبريد الإلكتروني',
                  desc: `تواصل فوري على رقم الواتساب الرسمي (${STORE_INFO.contact.whatsappFormatted}) والبريد (${STORE_INFO.contact.email}).`,
                  channel: 'قنوات معتمدة'
                }
              ].map((sup, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#008489] block mb-1">{sup.channel}</span>
                    <h3 className="text-xs font-bold text-stone-900 mb-1.5">{sup.title}</h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{sup.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund & Exchange Published Policy Table */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-stone-900">
                    سياسة وعمليات الاستبدال والاسترجاع الرسمية (الجدول المعلن والمدد الزمنية)
                  </h3>
                </div>
                <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-bold">
                  وفق سياسة المتجر المنشورة
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                توضح هذه السياسة الإجراءات المعلنة والمدد الملزمة لمعالجة أي إشكالية في المنتجات الرقمية:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <th className="p-3 rounded-tr-lg">الحالة / العملية</th>
                    <th className="p-3">الإجراء المعلن</th>
                    <th className="p-3">المهلة الزمنية المحددة</th>
                    <th className="p-3 rounded-tl-lg">ملاحظات التحقق</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">وجود مشكلة تقنية</td>
                    <td className="p-3 text-emerald-700 font-semibold">ضمان استرجاع كامل المبلغ إذا تعذر استخدام المنتج</td>
                    <td className="p-3 font-mono font-bold text-stone-800">خلال 3 أيام عمل</td>
                    <td className="p-3 text-stone-500">تقديم لقطة شاشة للخطأ التقني</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">عدم مطابقة الوصف</td>
                    <td className="p-3 text-emerald-700 font-semibold">إمكانية طلب استرجاع المبلغ أو التعويض</td>
                    <td className="p-3 font-mono font-bold text-stone-800">خلال 3 أيام عمل</td>
                    <td className="p-3 text-stone-500">مقارنة محتوى الملف بالوصف المنشور</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">عدم حل المشكلة من الدعم</td>
                    <td className="p-3 text-rose-700 font-semibold">الاسترجاع التلقائي إذا لم يتمكن الدعم من حلها</td>
                    <td className="p-3 font-mono font-bold text-stone-800">3 أيام عمل</td>
                    <td className="p-3 text-stone-500">التواصل عبر واتساب الدعم الفني</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">استبدال المنتج</td>
                    <td className="p-3 text-blue-700 font-semibold">استبداله بمنتج آخر من الفئة نفسها أو بالقيمة نفسها</td>
                    <td className="p-3 font-mono font-bold text-stone-800">خلال 24 ساعة عمل</td>
                    <td className="p-3 text-stone-500">اختيار بديل مطابق للقيمة</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">تقديم طلب الاسترجاع</td>
                    <td className="p-3">إرسال رقم الطلب ووصف المشكلة والأدلة إن وجدت</td>
                    <td className="p-3 font-mono font-bold text-stone-800">فوري عبر القنوات</td>
                    <td className="p-3 text-stone-500">تزويد الدعم ببيانات الفاتورة</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">الرد الرسمي على الطلب</td>
                    <td className="p-3 font-semibold text-stone-800">مراجعة الطلب من فريق خدمة العملاء وإفادة العميل</td>
                    <td className="p-3 font-mono font-bold text-stone-800">خلال 48 ساعة عمل</td>
                    <td className="p-3 text-stone-500">إشعار عبر واتساب / إيميل</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">إعادة الأموال (Refund)</td>
                    <td className="p-3 text-emerald-800 font-bold">تحويل المبلغ إلى نفس وسيلة الدفع الأصلية</td>
                    <td className="p-3 font-mono font-bold text-stone-800">أقصاها 5 أيام عمل</td>
                    <td className="p-3 text-stone-500">حسب سياسة البنك والبطاقة</td>
                  </tr>
                  <tr className="hover:bg-stone-50/80">
                    <td className="p-3 font-bold text-stone-900">إرسال المنتج البديل</td>
                    <td className="p-3 font-semibold text-stone-800">تفعيل الرابط الجديد وإرساله للعميل</td>
                    <td className="p-3 font-mono font-bold text-stone-800">خلال 24 ساعة عمل</td>
                    <td className="p-3 text-stone-500">يظهر في خانة طلباتي فوراً</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">ملاحظة نظامية مهمة:</span>
                <p className="text-amber-800 leading-relaxed">
                  هذه المدد والشروط مبنية وفق سياسة المتجر المنشورة، وهي ليست ضماناً بأن جميع الطلبات تُنفذ تلقائياً بدون تحقق؛ بل تخضع لفحص الدعم الفني للتأكد من عدم إساءة استخدام المنتجات الرقمية بعد تحميلها.
                </p>
              </div>
            </div>

            {/* Interactive Return/Exchange Ticket Simulator */}
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#008489]" />
                <span>نموذج محاكاة تقديم طلب استرجاع أو استبدال رقمي</span>
              </h4>

              {refundSubmitted ? (
                <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-emerald-900 text-sm">تم تسجيل طلبك بنجاح برقم مرجعي: #{refundOrderNumber || 'REQ-8831'}</h5>
                  <p className="text-xs text-emerald-800">
                    وفق سياسة المتجر، سيتم مراجعة طلبك والرد عليك خلال <strong>48 ساعة عمل</strong> عبر الواتساب. وفي حال الموافقة على الاسترجاع ستعاد الأموال خلال <strong>5 أيام عمل</strong>.
                  </p>
                  <button
                    onClick={() => { setRefundSubmitted(false); setRefundOrderNumber(''); setRefundNotes(''); }}
                    className="mt-2 px-4 py-1.5 text-xs font-bold text-[#008489] bg-white rounded-lg border border-teal-200 hover:bg-stone-50"
                  >
                    تقديم طلب آخر
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">نوع الطلب:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRefundActionType('refund')}
                        className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                          refundActionType === 'refund' ? 'bg-[#008489] text-white border-[#008489]' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        طلب استرجاع المبلغ
                      </button>
                      <button
                        onClick={() => setRefundActionType('exchange')}
                        className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                          refundActionType === 'exchange' ? 'bg-[#008489] text-white border-[#008489]' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        طلب استبدال المنتج
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">رقم الطلب الأصلي:</label>
                    <input
                      type="text"
                      placeholder="مثال: #4812"
                      value={refundOrderNumber}
                      onChange={(e) => setRefundOrderNumber(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-right font-mono focus:border-[#008489] outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">سبب الطلب وفق اللائحة:</label>
                    <select
                      value={refundReason}
                      onChange={(e) => setRefundReason(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-right focus:border-[#008489] outline-none"
                    >
                      <option>وجود مشكلة تقنية في تشغيل الملف</option>
                      <option>عدم مطابقة محتوى الملف للوصف المعلن</option>
                      <option>تعذر تعديل القالب أو خطأ في صيغة الملف</option>
                      <option>طلب خاطئ والرغبة في استبداله بمنتج موازٍ</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">وصف الإشكالية والأدلة:</label>
                    <input
                      type="text"
                      placeholder="صف المشكلة بدقة لسرعة المعالجة..."
                      value={refundNotes}
                      onChange={(e) => setRefundNotes(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-right focus:border-[#008489] outline-none"
                    />
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end">
                    <button
                      onClick={() => setRefundSubmitted(true)}
                      className="px-6 py-2.5 bg-[#008489] hover:bg-[#007478] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                    >
                      إرسال الطلب لفريق خدمة العملاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. وظيفة بناء المجتمع والتسويق بالعمولة */}
      {/* ============================================================== */}
      {activeSection === 'community_affiliate' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-stone-900">
                  وظيفة بناء المجتمع والتسويق بالعمولة (Affiliate & Community)
                </h2>
                <p className="text-xs text-stone-500">
                  الاستفادة من القنوات الرقمية والتليجرام لاستقطاب المسوقين وتوفير فرص دخل إضافية لصناع المحتوى
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {[
                {
                  title: 'نشر المنتجات والعروض الجديدة أولاً بأول',
                  desc: 'تحديث الكوادر التعليمية بكل جديد في لوائح وزارة التعليم وتوزيع المناهج للعام الدراسي الجديد 1447-1448هـ.',
                  badge: 'مواكبة اللوائح'
                },
                {
                  title: 'تقديم محتوى تعليمي وتقني توعوي',
                  desc: 'شروحات حول معايير الاعتماد المدرسي، تحليل مؤشرات نافس الوطنية، وكيفية استيفاء شواهد الأداء الوظيفي في فارس.',
                  badge: 'قيمة مضافة'
                },
                {
                  title: 'مشاركة الأدوات والنماذج المجانية',
                  desc: 'طرح قوالب مجانية دورية لتعزيز ثقة المجتمع بالمتجر وتحويل المتابعين إلى عملاء مخلصين.',
                  badge: 'Lead Magnets'
                },
                {
                  title: 'استقطاب المسوقين بالعمولة',
                  desc: 'فتح باب الشراكة مع المعلمين والمعلمات والمؤثرين التربويين للتسويق لمنتجات المتجر مقابل عمولات مجزية.',
                  badge: 'شراكات النمو'
                },
                {
                  title: 'توفير فرص دخل لصناع المحتوى',
                  desc: 'تمكين الكفاءات التعليمية المتميزة من الاستفادة من شبكات علاقاتهم ومجموعات المدارس لتحقيق دخل مستدام.',
                  badge: 'تمكين المعلمين'
                },
                {
                  title: 'قناة تيليجرام مهتمة بالأتمتة والتقنيات',
                  desc: `قناة نشطة تضم آلاف القيادات والمعلمين (${STORE_INFO.contact.telegramHandle}) تنشر حلول الأتمتة والبرمجة المدرسية.`,
                  badge: 'مجتمع متخصص'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#008489] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/50 self-start mb-2">
                    {item.badge}
                  </span>
                  <h3 className="text-xs font-bold text-stone-900 mb-1">{item.title}</h3>
                  <p className="text-[11px] text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Affiliate Calculator & Portal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#008489]" />
                  <span>حاسبة أرباح المسوق بالعمولة (Affiliate Earnings)</span>
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  عمولة تصل إلى 20%
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-stone-700 mb-1.5">
                    <span>عدد الطلبات المحققة عبر رابطك شهرياً:</span>
                    <span className="text-[#008489] font-mono text-sm">{monthlyReferrals} طلب</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={monthlyReferrals}
                    onChange={(e) => setMonthlyReferrals(Number(e.target.value))}
                    className="w-full accent-[#008489] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 font-mono text-center">
                  <div>
                    <span className="text-[10px] text-stone-500 block">متوسط قيمة السلة</span>
                    <span className="font-bold text-stone-900 text-sm mt-0.5 block">{averageOrderPrice} ر.س</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block">نسبة عمولتك</span>
                    <span className="font-bold text-[#008489] text-sm mt-0.5 block">20%</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">الدخل الشهري التقديري:</span>
                    <span className="text-[10px] text-emerald-800">يُحوّل لحسابك البنكي شهرياً</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-800 font-mono">
                    {estimatedEarnings.toLocaleString('ar-SA')} ر.س
                  </div>
                </div>
              </div>
            </div>

            {/* Telegram & Affiliate Action Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#093c42] to-[#008489] text-white rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                  <Send className="w-4 h-4" />
                  <span>انضم لمجتمع المتجر وقناة الأتمتة على تيليجرام</span>
                </div>
                <h3 className="text-lg font-black leading-snug">
                  قناة احتياجك التعليمي الرسمية لتقنيات وأتمتة المدارس
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed">
                  احصل على التحديثات الفورية للخطط التشغيلية، نماذج الإكسل التلقائية، وأكواد الخصم الحصرية مع أكثر من 15,000 معلم ومدير مدرسة.
                </p>

                <div className="p-3 bg-white/10 rounded-xl border border-white/15 text-xs flex items-center justify-between">
                  <span className="font-mono text-emerald-200">https://t.me/sultan_magfory</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://t.me/sultan_magfory');
                      setCopiedAffiliateLink(true);
                      setTimeout(() => setCopiedAffiliateLink(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-white text-[#008489] rounded-lg font-bold text-[10px] hover:bg-stone-100 cursor-pointer"
                  >
                    {copiedAffiliateLink ? 'تم النسخ!' : 'نسخ الرابط'}
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={STORE_INFO.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-white text-[#008489] hover:bg-stone-50 font-bold rounded-xl text-xs text-center transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>فتح القناة في تيليجرام</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. الخدمات الخمس التي يقدمها المتجر ودورة المبيعات */}
      {/* ============================================================== */}
      {activeSection === 'services_ops' && (
        <div className="space-y-6">
          {/* The 5 Main Service Categories */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#008489] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-stone-900">
                  الخدمات الخمس التي يقدمها المتجر
                </h2>
                <p className="text-xs text-stone-500">
                  تصنيف متكامل يجمع بين النماذج الإدارية، التقويم الذاتي، المتابعة، التصاميم، والأدوات الذكية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              {/* Service 1 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-stone-900">1. الخدمات الإدارية المدرسية</h3>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  نماذج نظام فارس المحدثة للعام الدراسي 1447 هـ - 2025 م، السجلات المدرسية، الخطط التشغيلية، ملفات الإنجاز، ونماذج الإدارة والإشراف.
                </p>
                <div className="text-[10px] font-semibold text-[#008489] bg-teal-50 p-2 rounded border border-teal-100">
                  الصيغ: Word (.docx) قابل للتعديل بالكامل
                </div>
              </div>

              {/* Service 2 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-stone-900">2. خدمات التقويم والتحسين (AssessX)</h3>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  أدوات ومحركات التقويم الذاتي المدرسي، إعداد وتوليد خطط التحسين تلقائياً، وتوثيق شواهد الأداء متوافقة مع هيئة تقويم التعليم والتدريب.
                </p>
                <div className="text-[10px] font-semibold text-amber-800 bg-amber-50 p-2 rounded border border-amber-100">
                  الصيغ: أدوات ويب ذكية + PDF + Word
                </div>
              </div>

              {/* Service 3 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-stone-900">3. خدمات المتابعة التلقائية (Automated Tracker)</h3>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  كشوف الحضور والغياب والانضباط التلقائية، متابعة درجات الطلاب، مصنفات Excel برمجية متقدمة تحسب النسب وتلون الحالات أوتوماتيكياً.
                </p>
                <div className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-100">
                  الصيغ: Excel (.xlsx) مبرمج بدوال ومعادلات
                </div>
              </div>

              {/* Service 4 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  <Palette className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-stone-900">4. الخدمات الإبداعية والشهادات الفاخرة</h3>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  شهادات الشكر والتقدير الملكية، بطاقات التهنئة، تصاميم المناسبات الوطنية (يوم التأسيس، اليوم الوطني)، وروابط الشهادات الذكية برمز QR.
                </p>
                <div className="text-[10px] font-semibold text-indigo-800 bg-indigo-50 p-2 rounded border border-indigo-100">
                  الصيغ: Word + Photoshop PSD + روابط ويب
                </div>
              </div>

              {/* Service 5 */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 md:col-span-2 lg:col-span-2">
                <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-stone-900">5. الخدمات التقنية الذكية وتوليد المستندات (Bulk Doc Creator)</h3>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  توليد التقارير والخطط والمستندات آلياً من البيانات المدخلة؛ يرفع العميل ملف إكسل أو يدخل البيانات فتخرج المستندات دفعة واحدة بصيغ Word و PDF وبدون برامج من الهاتف أو الحاسوب.
                </p>
                <div className="text-[10px] font-semibold text-teal-800 bg-teal-50 p-2 rounded border border-teal-100">
                  الصيغ: مخرجات آلية فورية مطابقة للوثائق الرسمية
                </div>
              </div>
            </div>
          </div>

          {/* Operational Workflow: 6-Step Digital Sales Lifecycle */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>العمليات التشغيلية: دورة تنفيذ عملية البيع الرقمية (Sales & Ops Lifecycle)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                توثيق مسار رحلة العميل من دخول المتجر حتى الاستخدام والدعم الفني:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  step: 1,
                  title: '1. عرض المنتجات',
                  desc: 'تصنيف المنتجات حسب الفئات المدرسية، إظهار تفاصيل كل سجل وأداة، الصيغة المتاحة، والأسعار الشاملة للضريبة.'
                },
                {
                  step: 2,
                  title: '2. اختيار المنتج',
                  desc: 'يحدد العميل المنتج المناسب لاحتياجه، ويضيفه إلى سلة المشتريات مع إمكانية إدخال كوبون الخصم أو تفعيل العروض.'
                },
                {
                  step: 3,
                  title: '3. إتمام الطلب',
                  desc: 'ينتقل العميل إلى صفحة الدفع السريع، يدخل بيانات التواصل ورقم الجوال المرتبط بواتساب لاستلام الروابط.'
                },
                {
                  step: 4,
                  title: '4. تأكيد عملية الدفع',
                  desc: 'التحقق اللحظي عبر بوابات الدفع الإلكترونية المشفرة (مدى، أبل باي، فيزا، تمارا، تابي، STC Pay).'
                },
                {
                  step: 5,
                  title: '5. تسليم المنتج الفوري',
                  desc: 'إرسال الملفات والروابط السحابية تلقائياً وبدون أي تدخل يدوي عبر رسالة WhatsApp وإتاحتها الدائمة في خانة "طلباتي".'
                },
                {
                  step: 6,
                  title: '6. خدمة ما بعد البيع والدعم',
                  desc: 'تقديم الدعم الفني، الإجابة عن الاستفسارات، تقديم الإرشادات، ومعالجة طلبات الاسترجاع والاستبدال خلال 48 ساعة.'
                }
              ].map((cycle) => (
                <div key={cycle.step} className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#008489] text-white flex items-center justify-center font-bold text-xs mb-2">
                      {cycle.step}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900">{cycle.title}</h4>
                    <p className="text-[11px] text-stone-600 leading-relaxed">{cycle.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. ما يميز المتجر عن المتاجر التقليدية + نموذج العمل التجاري */}
      {/* ============================================================== */}
      {activeSection === 'competitive_model' && (
        <div className="space-y-6">
          {/* Competitive Advantage Table (9 Features) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-black text-stone-900">
                  ما الذي يميز المتجر عن المتاجر الإلكترونية التقليدية؟ (مقارنة تحليلية)
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                تحليل الفوارق الاستراتيجية والتقنية والتشغيلية التي تمنح المتجر تفوقاً تنافسياً واضحاً في السوق التعليمي:
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                    <th className="p-3 rounded-tr-lg">الميزة التنافسية</th>
                    <th className="p-3">طبيعتها</th>
                    <th className="p-3 rounded-tl-lg">القيمة التي تقدمها للميدان التعليمي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {[
                    { feat: 'التخصص التعليمي', type: 'استراتيجية', value: 'استهداف احتياجات قطاع محدد بعمق وفهم متطلبات القيادة المدرسية واللوائح الوزارية.' },
                    { feat: 'المنتجات القابلة للتعديل', type: 'وظيفية', value: 'إمكانية تخصيص الملفات بصيغتي Word و Excel وإضافة بيانات المدرسة وشعارها دون قيود.' },
                    { feat: 'الأدوات الذكية والأتمتة', type: 'تقنية', value: 'اختصار وقت إعداد التقارير والخطط من أسابيع إلى دقائق معدودة عبر المعالجة الآلية.' },
                    { feat: 'التسليم الرقمي الفوري', type: 'تشغيلية', value: 'عدم الحاجة للشحن التقليدي وانتظار المندوب؛ الاستلام فوري عبر الواتساب وخانة طلباتي.' },
                    { feat: 'تنوع المنتجات والشرائح', type: 'تجارية', value: 'خدمة عدة فئات داخل المنشأة (مدير، وكيل، معلم، موجه، رائد نشاط، لجان، رياض أطفال).' },
                    { feat: 'الدعم الفني المباشر', type: 'خدمية', value: 'معالجة المشكلات التقنية، المساعدة في فتح الملفات، وتوفير الضمان الذهبي والاسترجاع.' },
                    { feat: 'تعدد صيغ المخرجات', type: 'تقنية', value: 'توفير مخرجات Word قابلة للتحرير، ونسخ PDF رسمية عالية الدقة، وإكسل بمعادلات جاهزة.' },
                    { feat: 'التسويق بالعمولة والمجتمع', type: 'تسويقية', value: 'توسيع قنوات الوصول للعملاء عبر المعلمين والمؤثرين التربويين وقناة التيليجرام.' },
                    { feat: 'المنتجات ذات الاستخدام المتكرر', type: 'اقتصادية', value: 'إمكانية بيع المنتج الرقمي وتحديثه لكل عام دراسي مع تكلفة إعادة إنتاج تقارب الصفر.' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80">
                      <td className="p-3 font-bold text-stone-900">{row.feat}</td>
                      <td className="p-3">
                        <span className="font-semibold text-xs px-2 py-0.5 rounded bg-teal-50 text-[#008489] border border-teal-200/60">
                          {row.type}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600 leading-relaxed">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Business Model Canvas (4 Pillars) */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>نموذج العمل التجاري للمتجر (Business Model Canvas Analysis)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-100 space-y-2">
                <span className="text-xs font-bold text-teal-900 block">1. الموارد الأساسية:</span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  المعرفة والخبرة التعليمية والأنظمة الوزارية – مهارات التصميم الجرافيكي – البرمجة والأتمتة – المنتجات الرقمية – المنصة الإلكترونية السحابية.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                <span className="text-xs font-bold text-emerald-900 block">2. الأنشطة الرئيسية:</span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  تطوير وتحديث المنتجات للأعوام الدراسية – إنشاء وبرمجة الأدوات الذكية – التسويق الرقمي – إدارة المبيعات – التسليم التلقائي – الدعم الفني.
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                <span className="text-xs font-bold text-amber-900 block">3. القيمة المقدمة للعملاء:</span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  توفير الوقت الضائع في إعداد النماذج – تقليل الجهد الإداري – تحسين جودة وثائق ومخرجات المدرسة – تسهيل الإجراءات والجاهزية للتقويم الخارجي.
                </p>
              </div>

              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2">
                <span className="text-xs font-bold text-blue-900 block">4. مصادر الإيرادات:</span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  بيع الملفات الرقمية الجاهزة (Word/Excel) – بيع الاشتراكات واستخدام الأدوات الذكية – تقديم الخدمات والحلول التقنية المخصصة للمدارس.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200">
              * تنويه: النموذج أعلاه تحليل استراتيجي لطبيعة النشاط ومصادر الإيرادات المحتملة، وليس إفصاحاً مالياً رسمياً من المتجر.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. التقييم الإداري والتقني وخطة إنشاء متجر مشابه */}
      {/* ============================================================== */}
      {activeSection === 'assessment_blueprint' && (
        <div className="space-y-6">
          {/* Strengths & Development Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-stone-900">نقاط القوة التنافسية (Strengths)</h3>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 list-inside">
                {[
                  'التخصص الدقيق في سوق واضح ذي كثافة عالية وهو القطاع التعليمي.',
                  'الجمع المبتكر بين المنتجات الرقمية القابلة للتعديل والأدوات الذكية البرمجية.',
                  'توفير حلول عملية واقعية لمشكلات إدارية متكررة يعاني منها المعلمون والمديرون.',
                  'سهولة الوصول للمنتجات واستخدام الأدوات من الهاتف والكمبيوتر دون تثبيت برامج.',
                  'التسليم الإلكتروني السريع والمؤتمت عبر واتساب وخانة طلباتي.',
                  'توفير صيغ مفتوحة المصدر (Word و Excel) قابلة للتعديل والطباعة.',
                  'تنوع شرائح العملاء المستهدفة لتشمل كافة الهرم المدرسي من المدير إلى رياض الأطفال.'
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/60 leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-stone-900">فرص التطوير والتوسع (Opportunities)</h3>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 list-inside">
                {[
                  'تطوير لوحة تحكم موحدة للعملاء لإدارة وتحديث جميع مشترياتهم وأدواتهم سحابياً.',
                  'توفير اشتراكات شهرية وسنوية (SaaS) للمدارس للوصول لكافة الأدوات والخطط.',
                  'بناء نظام متقدم لإدارة علاقات العملاء (CRM) لتخصيص التوصيات والعروض.',
                  'إنشاء نظام تتبع آلي لتذاكر الدعم الفني وتقييم زمن الاستجابة.',
                  'إضافة تقارير تحليلية ذكية توضح أكثر المنتجات استخداماً والفجوات الأكثر شيوعاً.',
                  'توسيع التكامل مع الأنظمة التعليمية الوطنية (مثل منصة مدرستي ونظام نور).',
                  'تطوير برامج وورش تدريبية تفاعلية تشرح استراتيجيات القيادة واستخدام الأدوات.'
                ].map((o, i) => (
                  <li key={i} className="flex items-start gap-2 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100/60 leading-relaxed">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5 rotate-180" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Aspects requiring additional verification */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>جوانب تحتاج إلى تحقق إضافي (لا تظهر من الموقع العام وحده)</span>
            </h3>
            <p className="text-xs text-stone-500">
              أمور تشغيلية وداخلية تتطلب إفصاحاً مباشراً أو وصولاً للأنظمة الخلفية:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
              {[
                'الهيكل التنظيمي وعدد الموظفين والمصممين والمبرمجين العاملين بالمتجر.',
                'النظام الداخلي لإدارة المخزون الرقمي وتوليد التراخيص للأدوات.',
                'آلية إدارة الحسابات المالية والربط مع الهيئة العامة للزكاة والضريبة.',
                'الأنظمة المستخدمة في أتمتة الرسائل والتسويق الآلي عبر البريد والواتساب.',
                'مستوى التكامل البرمجي العميق بين منصة سلة وخوادم الأدوات الذكية الخارجية.',
                'مؤشرات الأداء الفعلية لرضا العملاء (NPS) وتكلفة اكتساب العميل (CAC).'
              ].map((v, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-700 leading-relaxed">
                  <span className="font-bold text-amber-800 block mb-1">المحور {i + 1}:</span>
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* Blueprint for Building a Similar Store (Next Stage Execution Plan) */}
          <div className="bg-gradient-to-br from-stone-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                خطة المرحلة التالية: تصور تنفيذي متكامل
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                خطة واستراتيجية إنشاء متجر تعليمي ورقمي مشابه من الصفر
              </h3>
              <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
                إذا كان هدفك الاستفادة من تجربة متجر سلطان مغفوري في بناء مشروع ريادي تعليمي، فهذا هو المخطط التنفيذي للركائز الخمس الأساسية:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
                <span className="font-bold text-emerald-300 block">1. الهيكل الوظيفي:</span>
                <p className="text-stone-300 leading-relaxed">
                  تحديد الفريق الأساسي: خبير محتوى تعليمي (ملم بلوائح الوزارة)، مصمم جرافيك محترف (Word/PDF/PSD)، مبرمج حلول ويب وأتمتة، مسؤول مبيعات وخدمة عملاء.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
                <span className="font-bold text-emerald-300 block">2. تحليل وتوثيق العمليات:</span>
                <p className="text-stone-300 leading-relaxed">
                  بناء مسار أوتوماتيكي كامل من لحظة دخول الزائر، فحص السلة، إتمام الدفع، تفعيل الربط عبر Webhook لإرسال الملفات بالواتساب وتفعيل صلاحية التحميل.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
                <span className="font-bold text-emerald-300 block">3. تحليل الأنظمة والتقنيات:</span>
                <p className="text-stone-300 leading-relaxed">
                  اختيار المنصة (سلة Salla أو منصة خاصة)، ربط بوابة دفع (مدى/تمارا)، خادم استضافة الأدوات (Node.js/React)، ونظام إرسال رسائل WhatsApp API.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
                <span className="font-bold text-emerald-300 block">4. تحليل وتطوير المنتجات:</span>
                <p className="text-stone-300 leading-relaxed">
                  البدء بحزم المنتجات الأكثر إلحاحاً: الخطط التشغيلية، سجلات مدير المدرسة، كشوف الحضور والانضباط، وتطوير أداة ذكية واحدة كأداة جذب رئيسية.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2 md:col-span-2">
                <span className="font-bold text-emerald-300 block">5. استراتيجية الإطلاق والتسويق:</span>
                <p className="text-stone-300 leading-relaxed">
                  بناء قناة تيليجرام تعليمية متخصصة، طرح نماذج مجانية مميزة لجمع جهات الاتصال، وتفعيل نظام التسويق بالعمولة لجذب الكوادر التربوية المؤثرة.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
