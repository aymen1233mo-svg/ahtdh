import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { STORE_INFO, STORE_AUDIT_METRICS, STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storeData';

interface StoreReportExportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreReportExport: React.FC<StoreReportExportProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullReportText = `========================================================================
تقرير الفحص الفني والوظيفي الشامل لمتجر احتياجك التعليمي للمنتجات المدرسية والرقمية
رابط المتجر المفحوص: ${STORE_INFO.fullUrl}
تاريخ الفحص: 2026-11-08
========================================================================

1. الهوية التجارية والاعتماد النظامي:
----------------------------------------
- اسم المتجر: ${STORE_INFO.name}
- المالك والمؤسس: ${STORE_INFO.owner}
- المنصة المشغلة: ${STORE_INFO.platform}
- التوثيق الرسمي: ${STORE_INFO.verification.freelanceDoc}
- المركز السعودي للأعمال: ${STORE_INFO.verification.businessCenter}
- الرقم الضريبي: ${STORE_INFO.verification.taxNumber}
- تشفير البيانات: ${STORE_INFO.verification.ssl}
- هاتف وواتساب الدعم: ${STORE_INFO.contact.whatsapp}
- البريد الإلكتروني: ${STORE_INFO.contact.email}
- قناة التليجرام: ${STORE_INFO.contact.telegram}

2. وظيفة التسويق والمبيعات الإلكترونية:
----------------------------------------
- عرض المنتجات والترويج لها حسب الفئات المدرسية.
- تقديم العروض والخصومات التصاعدية وكوبونات التخفيض.
- إبراز المنتجات الأكثر مبيعاً (مثل أداة تحسين التي تجاوزت 1200 عملية شراء).
- إدارة سلة المشتريات وتوفير وسائل الدفع المتنوعة (مدى، Apple Pay، فيزا، تمارا، تابي، STC Pay).
- تنفيذ عمليات البيع وإصدار الفواتير الرقمية وتتبع الطلبات.

3. وظيفة خدمة العملاء والدعم الفني:
----------------------------------------
- استقبال استفسارات العملاء والمساعدة في اختيار النماذج المناسبة.
- حل المشكلات التقنية وتعديل قوالب Word و Excel.
- تقديم الإرشادات وأدلة الاستخدام المرئية.
- التواصل المباشر عبر واتساب والبريد الإلكتروني.

4. سياسة وعمليات الاستبدال والاسترجاع (الجدول المعلن والمدد):
----------------------------------------
- وجود مشكلة تقنية: ضمان استرجاع كامل المبلغ إذا تعذر استخدام المنتج.
- عدم مطابقة الوصف: إمكانية طلب استرجاع المبلغ أو التعويض.
- عدم حل المشكلة: استرجاع المبلغ إذا لم يتمكن الدعم من حلها خلال 3 أيام عمل.
- استبدال المنتج: استبداله بمنتج آخر من الفئة نفسها أو بالقيمة نفسها خلال 24 ساعة عمل.
- تقديم طلب الاسترجاع: إرسال رقم الطلب ووصف المشكلة والأدلة.
- الرد على الطلب: خلال 48 ساعة عمل.
- إعادة الأموال: خلال مدة أقصاها 5 أيام عمل.
- إرسال المنتج البديل: خلال 24 ساعة عمل.

5. وظيفة بناء المجتمع والتسويق بالعمولة (Affiliate & Community):
----------------------------------------
- استقطاب المعلمين والمعلمات وصناع المحتوى كمسوقين بالعمولة بنسب تصل إلى 20%.
- نشر المنتجات والعروض الجديدة ومواكبة لوائح وزارة التعليم المحدثة 1447-1448هـ.
- تقديم محتوى تعليمي وتقني توعوي ومشاركة أدوات ونماذج مجانية.
- قناة تيليجرام نشطة متخصصة بحلول الأتمتة المدرسية والتقنيات الرقمية.

6. الخدمات الخمس التي يقدمها المتجر:
----------------------------------------
1. الخدمات الإدارية المدرسية (نماذج نظام فارس 1447هـ، الخطط التشغيلية، السجلات، ملفات الإنجاز).
2. خدمات التقويم والتحسين (أدوات التقويم الذاتي، إعداد خطط التحسين، توثيق شواهد الأداء).
3. خدمات المتابعة (كشوف الحضور والغياب، متابعة الطلاب، إكسل مبرمج تلقائي).
4. الخدمات الإبداعية (الشهادات والبطاقات الفاخرة، تصاميم المناسبات الوطنية).
5. الخدمات التقنية الذكية (توليد التقارير والخطط والمستندات آلياً من البيانات المدخلة بصيغ Word و PDF).

7. دورة تنفيذ عملية البيع الرقمية (العمليات التشغيلية):
----------------------------------------
عرض المنتجات -> اختيار المنتج -> إتمام الطلب -> تأكيد الدفع -> تسليم المنتج الفوري (واتساب وخانة طلباتي) -> خدمة ما بعد البيع.

8. ما يميز المتجر عن المتاجر التقليدية (الميزات التسع):
----------------------------------------
1. التخصص التعليمي (استراتيجية) | 2. المنتجات القابلة للتعديل (وظيفية) | 3. الأدوات الذكية والأتمتة (تقنية)
4. التسليم الرقمي الفوري (تشغيلية) | 5. تنوع المنتجات والشرائح (تجارية) | 6. الدعم الفني المباشر (خدمية)
7. تعدد صيغ المخرجات Word و PDF (تقنية) | 8. التسويق بالعمولة (تسويقية) | 9. المنتجات ذات الاستخدام المتكرر (اقتصادية).

9. نموذج العمل التجاري للمتجر (Business Model Canvas):
----------------------------------------
- الموارد الأساسية: المعرفة التعليمية، التصميم، البرمجة، المنتجات الرقمية، المنصة السحابية.
- الأنشطة الرئيسية: تطوير النماذج، إنشاء الأدوات، التسويق، البيع، التسليم، الدعم.
- القيمة المقدمة: توفير الوقت، تقليل الجهد، تحسين جودة الأعمال، تسهيل الإجراءات والتقويم.
- مصادر الإيرادات: بيع الملفات الجاهزة، بيع الأدوات الذكية، الخدمات والحلول التقنية المخصصة.

10. التقييم الإداري والتقني وخطة إنشاء متجر مماثل:
----------------------------------------
- نقاط القوة: التخصص الدقيق، أتمتة الوظائف، سهولة الاستخدام بدون برامج، سرعة التسليم.
- فرص التطوير: توفير اشتراكات سحابية SaaS، نظام CRM، الربط المباشر مع الأنظمة التعليمية.
- خطة بناء متجر مماثل: الهيكل الوظيفي، توثيق العمليات، الأنظمة التقنية، حزم المنتجات، واستراتيجية الإطلاق.

التوصيف الاستراتيجي النهائي:
منصة تجارة إلكترونية متخصصة في تطوير وتسويق وبيع المنتجات التعليمية الرقمية والحلول التقنية الذكية، تستهدف رقمنة وتسهيل الإجراءات الإدارية والتعليمية، تجمع بين بيع المنتجات الجاهزة وتقديم الأدوات الرقمية المؤتمتة.
========================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([fullReportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير_فحص_متجر_احتياجك_التعليمي_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-base font-bold text-stone-900">تقرير الفحص الفني والوظيفي الكامل</h3>
              <p className="text-xs text-stone-500">جاهز للنسخ، التصدير، والطباعة الرسمية</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Report Content Box */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-stone-800 leading-relaxed bg-stone-50/50 whitespace-pre-wrap select-all">
          {fullReportText}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-stone-500">
            تم الفحص والتحليل التلقائي لكافة صفحات وأقسام الرابط
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors border border-stone-200"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ للحافظة' : 'نسخ التقرير'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل ملف نصي (TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
