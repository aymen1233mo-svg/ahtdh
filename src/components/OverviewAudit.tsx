import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  ExternalLink, 
  Smartphone, 
  FileCheck, 
  Award, 
  CreditCard, 
  Users, 
  Cpu, 
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { STORE_INFO, STORE_AUDIT_METRICS } from '../data/storeData';

interface OverviewAuditProps {
  onSwitchToCatalog: () => void;
  onSwitchToTools: () => void;
}

export const OverviewAudit: React.FC<OverviewAuditProps> = ({ onSwitchToCatalog, onSwitchToTools }) => {
  const [copied, setCopied] = useState(false);
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const averageScore = Math.round(
    STORE_AUDIT_METRICS.reduce((acc, curr) => acc + curr.score, 0) / STORE_AUDIT_METRICS.length
  );

  const handleCopySummary = () => {
    const text = `تقرير فحص متجر احتياجك التعليمي للمنتجات المدرسية والرقمية (sultan-magfory.com):
- المالك: ${STORE_INFO.owner}
- المنصة: ${STORE_INFO.platform}
- التوثيق: ${STORE_INFO.verification.freelanceDoc} | ${STORE_INFO.verification.businessCenter}
- التقييم التقني الإجمالي: ${averageScore}/100 (ممتاز)
- طبيعة المنتجات: منتجات وسجلات وخطط وأدوات ذكية رقمية 100%
- سرعة التسليم: فوري وتلقائي عبر الواتساب وخانة الطلبات
- سياسة الضمان: ضمان ذهبي واسترجاع آمن لمدة 3 أيام
- بوابات الدفع: مدى، أبل باي، فيزا، تمارا، تابي، STC Pay
- الدعم الفني: ${STORE_INFO.contact.whatsapp}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Executive Summary Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-emerald-800/50">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>نتائج فحص المتجر الإلكتروني الشامل (Audit Report)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                فحص محتوى ومكونات متجر احتياجك التعليمي
              </h2>
              <p className="text-sm sm:text-base text-stone-300 mt-2 max-w-3xl leading-relaxed">
                متجر إلكتروني سعودي رائد وموثق رسمياً عبر منصة <strong className="text-white">سلة (Salla)</strong>، متخصص في المنتجات المدرسية والرقمية، السجلات الإدارية، الخطط التشغيلية، وأدوات الأتمتة الذكية الموجهة للقيادات التعليمية والمعلمين في المملكة العربية السعودية.
              </p>
            </div>

            {/* Score Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 flex items-center gap-5 shrink-0">
              <div>
                <div className="text-4xl font-black text-emerald-300 tracking-tight">{averageScore}%</div>
                <div className="text-xs text-stone-300 font-medium mt-0.5">مؤشر الجودة والجاهزية</div>
              </div>
              <div className="h-10 w-px bg-white/20"></div>
              <div className="text-xs space-y-1">
                <div className="text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>معتمد وموثق نظامياً</span>
                </div>
                <div className="text-stone-300">تسليم فوري 100%</div>
                <div className="text-amber-300 font-semibold">ضمان استرجاع 3 أيام</div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs sm:text-sm">
            <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
              <span className="text-stone-400 block text-xs">الأقسام والفئات</span>
              <span className="text-lg font-bold text-white mt-1 block">6 أقسام رئيسية</span>
              <span className="text-stone-400 text-xs mt-0.5 block">18 قسماً فرعياً تخصصياً</span>
            </div>

            <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
              <span className="text-stone-400 block text-xs">طبيعة المنتجات</span>
              <span className="text-lg font-bold text-white mt-1 block">رقمية 100%</span>
              <span className="text-stone-400 text-xs mt-0.5 block">Word · Excel · PDF · أدوات</span>
            </div>

            <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
              <span className="text-stone-400 block text-xs">آلية التسليم</span>
              <span className="text-lg font-bold text-emerald-300 mt-1 block">فوري وتلقائي</span>
              <span className="text-stone-400 text-xs mt-0.5 block">واتساب + خانة طلباتي</span>
            </div>

            <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
              <span className="text-stone-400 block text-xs">مرونة الدفع</span>
              <span className="text-lg font-bold text-white mt-1 block">7 بوابات دفع</span>
              <span className="text-stone-400 text-xs mt-0.5 block">تقسيط تمارا وتابي متاح</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم نسخ التقرير بنجاح' : 'نسخ ملخص الفحص'}</span>
            </button>

            <button
              onClick={onSwitchToCatalog}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <span>استعراض جميع المنتجات والسجلات (+150)</span>
            </button>

            <button
              onClick={onSwitchToTools}
              className="px-4 py-2 bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-200 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 border border-emerald-400/30"
            >
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>تجربة محاكي الأدوات الذكية (أداة تحسين)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Identity & Trust Specifications Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>البيانات النظامية والتراخيص والاعتماد الرسمي</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
            <div className="font-bold text-stone-800 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>التوثيق والترخيص</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              موثق رسمياً بوثيقة العمل الحر ومعتمد لدى <strong>المركز السعودي للأعمال</strong> ومسجل بنظام ضريبة القيمة المضافة.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
            <div className="font-bold text-stone-800 flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>الضمان الذهبي (3 أيام)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              يقدم المتجر سياسة استرجاع وتعويض حصرية لمدة 3 أيام، وهي ميزة فريدة تثبت ثقة المتجر العالية في جودة ملفاته الرقمية.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-stone-50 border border-stone-100">
            <div className="font-bold text-stone-800 flex items-center gap-1.5 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>التسليم والدعم الفني</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              تسليم مباشر فور السداد عبر واتساب (<span dir="ltr">{STORE_INFO.contact.whatsappFormatted}</span>) وتليجرام، مع دعم فني لتعديل الملفات.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Audit Pillars Detailed Assessment */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              محاور الفحص التقني والوظيفي التفصيلي (6 ركائز أساسية)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              تحليل دقيق للبنية التحتية، رحلة التسليم، تنوع الكتالوج، وتجربة المستخدم
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            متوسط الجاهزية: <strong className="text-emerald-700 font-bold">{averageScore}%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STORE_AUDIT_METRICS.map((metric) => {
            const isExpanded = expandedMetric === metric.id;

            return (
              <div 
                key={metric.id}
                className="bg-white rounded-xl border border-stone-200 shadow-sm p-5 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {metric.score}%
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">{metric.title}</h4>
                    </div>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {metric.summary}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-stone-100 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>

                {/* Collapsible Details */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => setExpandedMetric(isExpanded ? null : metric.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-between w-full"
                  >
                    <span>{isExpanded ? 'إخفاء التفاصيل والتوصيات' : 'عرض تفاصيل الفحص والتوصيات (+)'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-3 text-xs pt-2">
                      <div>
                        <span className="font-bold text-stone-800 block mb-1">أبرز ما تم رصده في الفحص:</span>
                        <ul className="space-y-1 text-stone-600 list-disc list-inside">
                          {metric.details.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>توصيات تطويرية إضافية:</span>
                        </span>
                        <ul className="space-y-1 text-emerald-800 list-disc list-inside">
                          {metric.recommendations.map((rec, idx) => (
                            <li key={idx} className="leading-relaxed">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Audiences and High Value Functional Solutions */}
      <div className="bg-stone-50 rounded-xl border border-stone-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              الفئات المستهدفة وحلول المتجر لكل دور وظيفي بالمدرسة
            </h3>
            <p className="text-xs text-stone-500">
              كيف يخدم متجر احتياجك التعليمي مديري المدارس والوكلاء والمعلمين والموجهين
            </p>
          </div>
          <button 
            onClick={onSwitchToCatalog}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-auto flex items-center gap-1"
          >
            <span>استعراض المنتجات المخصصة لكل دور</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <span className="font-bold text-stone-900 block text-sm mb-1 text-emerald-800">
              مدير / مديرة المدرسة
            </span>
            <p className="text-stone-600 text-xs mb-2">
              الخطة التشغيلية السنوية، أداة "تحسين" الذكية لمعالجة التقويم الذاتي، وسجلات القيادة المدرسية والاجتماعات.
            </p>
            <span className="text-stone-400 text-xs">وفر أكثر من 40 ساعة عمل في إعداد الخطط</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <span className="font-bold text-stone-900 block text-sm mb-1 text-emerald-800">
              وكيل / وكيلة المدرسة
            </span>
            <p className="text-stone-600 text-xs mb-2">
              كشف إكسل الذكي لرصد الحضور والغياب مع تنبيهات الانضباط، حقيبة اللجان المدرسية، وحقيبة إدارة الاختبارات النهائية.
            </p>
            <span className="text-stone-400 text-xs">رصد تلقائي للغياب ونظام الكنترول</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <span className="font-bold text-stone-900 block text-sm mb-1 text-emerald-800">
              الموجه الطلابي
            </span>
            <p className="text-stone-600 text-xs mb-2">
              سجلات دراسة الحالة السرية، برامج الرعاية السلوكية، خطة التوجيه السنوية، ومتابعة الطلاب المتأخرين دراسياً.
            </p>
            <span className="text-stone-400 text-xs">توثيق نظامي محكم للحالات</span>
          </div>

          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <span className="font-bold text-stone-900 block text-sm mb-1 text-emerald-800">
              المعلم والمعلمة
            </span>
            <p className="text-stone-600 text-xs mb-2">
              ملف إنجاز المعلم التفاعلي الذكي، كشوفات رصد المتابعة اليومية، ومنظومة إصدار الشهادات التلقائية بروابط QR.
            </p>
            <span className="text-stone-400 text-xs">جاهزية كاملة لتقييم الأداء بنظام فارس</span>
          </div>
        </div>
      </div>
    </div>
  );
};
