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
تاريخ الفحص: 2026-11-05
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

2. الأقسام والمكونات الرئيسية للمتجر:
----------------------------------------
${STORE_CATEGORIES.map((c, i) => `${i + 1}. ${c.name} (${c.desc})`).join('\n')}

3. الأدوات الذكية المبتكرة (Smart Tools):
----------------------------------------
- أداة "تحسين" الذكية (الإصدار 3): تحويل تقرير التقويم الذاتي المدرسي إلى خطة تحسين وتطوير كاملة بصيغة Word قابلة للتعديل مع نسخة PDF رسمية.
- منظومة إصدار الشهادات التلقائية: توليد مئات الشهادات بروابط ورموز QR مخصصة للطلاب والمعلمين من ملف إكسل بضغطة زر واحدة.
- مصنف إكسل الذكي لرصد الحضور والانضباط: حساب آلي لنسب الغياب والانضباط وتوليد تنبيهات ملونة لخطط الدعم والتوجيه.

4. السجلات والملفات المتاحة:
----------------------------------------
- سجلات مدير المدرسة (الخطة التشغيلية، الاجتماعات، الصندوق المدرسي، تفويض المهام).
- سجلات وكيل المدرسة (الشؤون التعليمية، المدرسية، وشؤون الطلاب).
- سجلات الموجه الطلابي (دراسة الحالة، الرعاية السلوكية، المتفوقين والمتأخرين).
- سجلات المعلم والمعلمة (ملف إنجاز تفاعلي، كشوفات رصد المتابعة والدرجات).
- سجلات اللجان والمجالس المدرسية وفق الدليل التنظيمي المحدث.
- حقائب لجان الاختبارات النهائية (سير الاختبارات، الكنترول، المراقبة).

5. بوابات الدفع والتسليم الفوري:
----------------------------------------
- بوابات الدفع: مدى (Mada)، Apple Pay، فيزا/ماستركارد، تمارا (تقسيط)، تابي (تقسيط)، STC Pay، تحويل بنكي.
- آلية التسليم: فوري 100% بدون تدخل بشري فور تأكيد الدفع عبر رسائل WhatsApp وخانة "طلباتي" بالمتجر.
- سياسة الضمان: ضمان ذهبي واسترجاع آمن خلال 3 أيام.

6. نتائج ومؤشرات الفحص (Audit Scores):
----------------------------------------
${STORE_AUDIT_METRICS.map((m) => `- ${m.title}: ${m.score}% (${m.status}) - ${m.summary}`).join('\n')}

7. الخلاصة والتقييم النهائي:
----------------------------------------
يُعد متجر احتياجك التعليمي نموذجاً متميزاً للمتاجر المتخصصة في التجارة الرقمية التعليمية؛ حيث يجمع بين الامتثال النظامي الكامل بالمملكة العربية السعودية، وسرعة التسليم الفوري المبرمج، وتوفير أدوات ذكية حقيقية تختصر مئات ساعات العمل على مديري ومعلمي المدارس.
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
