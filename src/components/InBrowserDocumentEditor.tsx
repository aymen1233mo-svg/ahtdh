import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Save, 
  Sparkles, 
  Calendar, 
  Clock, 
  FileText, 
  Edit3, 
  Eye, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  Plus,
  Trash2,
  ShieldCheck,
  User,
  Users,
  CheckCircle2
} from 'lucide-react';
import { ProductItem, StoreSettings } from '../types';
import { useStore } from '../context/StoreContext';

interface InBrowserDocumentEditorProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InBrowserDocumentEditor: React.FC<InBrowserDocumentEditorProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { settings } = useStore();

  // State for Document Metadata
  const [schoolName, setSchoolName] = useState<string>('');
  const [educationRegion, setEducationRegion] = useState<string>('');
  const [officeName, setOfficeName] = useState<string>('مكتب التعليم شمال');
  const [academicYear, setAcademicYear] = useState<string>('1448هـ');
  const [principalName, setPrincipalName] = useState<string>('');
  const [supervisorName, setSupervisorName] = useState<string>('');
  const [coordinatorName, setCoordinatorName] = useState<string>('');
  const [counselorName, setCounselorName] = useState<string>('');
  
  // Date and Time State with Auto-Update
  const [autoUpdateDateTime, setAutoUpdateDateTime] = useState<boolean>(true);
  const [hijriDate, setHijriDate] = useState<string>('21 جمادى الأولى 1448هـ');
  const [gregorianDate, setGregorianDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Document Body Content & Dynamic Tables
  const [docTitle, setDocTitle] = useState<string>('');
  const [docDescription, setDocDescription] = useState<string>('');
  const [notes, setNotes] = useState<string>('تم اعتماد هذا المستند وتوثيقه وفق لوائح وأنظمة وزارة التعليم للعام الدراسي 1448هـ.');
  const [tableRows, setTableRows] = useState<Array<{ id: string; col1: string; col2: string; col3: string; col4: string; col5: string }>>([
    { id: '1', col1: '1', col2: 'إعداد الخطة التشغيلية وتشكيل لجان المدرسة', col3: 'مدير/ة المدرسة', col4: 'الأسبوع الأول', col5: 'منجز 100%' },
    { id: '2', col1: '2', col2: 'توزيع التكليفات والمهام الإدارية والتعليمية', col3: 'وكيل/ة المدرسة', col4: 'الأسبوع الأول', col5: 'منجز 100%' },
    { id: '3', col1: '3', col2: 'حصر تشكيلات الطلاب والفصول والمرافق المساندة', col3: 'الموجه/ة الطلابي', col4: 'الأسبوع الثاني', col5: 'قيد المتابعة' },
    { id: '4', col1: '4', col2: 'متابعة الانضباط المدرسي ورصد الغياب عبر المنصة', col3: 'لجنة الانضباط', col4: 'مستمر طوال الفصل', col5: 'نشط' }
  ]);

  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Initialize data from product and store settings
  useEffect(() => {
    if (product) {
      setDocTitle(product.name || 'سجل رسمي مدرسي');
      setDocDescription(product.description || 'مستند ونموذج مدرسي رسمي معتمد وقابل للتعديل والطباعة.');
      setSchoolName(product.schoolName || settings.defaultSchoolName || 'مدرسة رواد المستقبل النموذجية');
      setEducationRegion(product.educationRegion || settings.defaultEducationRegion || 'الرياض');
      setAcademicYear(product.academicYear || settings.defaultAcademicYear || '1448هـ');
      setPrincipalName(product.schoolPrincipal || settings.defaultSchoolPrincipal || 'أ. مريم بن عبدالله الغامدي');
      setSupervisorName(product.recordSupervisor || settings.defaultRecordSupervisor || 'أ. فاطمة بن خالد العتيبي');
      setCoordinatorName(product.cooperativeCoordinator || settings.defaultCooperativeCoordinator || 'أ. نورة بن فهد الشمري');
      setCounselorName(settings.defaultCounselorName || 'أ. سارة بن سعد القحطاني');
    }
  }, [product, settings]);

  // Live Auto-Update Date and Time Engine
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format Gregorian Date in Arabic
      const gregOptions: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long' 
      };
      const formattedGreg = now.toLocaleDateString('ar-SA', gregOptions);
      setGregorianDate(formattedGreg);

      // Format Time
      const timeStr = now.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [autoUpdateDateTime]);

  if (!isOpen || !product) return null;

  // Add Table Row
  const handleAddRow = () => {
    const newId = String(tableRows.length + 1);
    setTableRows([
      ...tableRows,
      { id: newId, col1: newId, col2: 'مهمة أو إجراء تنفيذي جديد', col3: 'المسؤول الميداني', col4: 'الفصل الأول', col5: 'مكتمل' }
    ]);
  };

  // Remove Table Row
  const handleRemoveRow = (id: string) => {
    if (tableRows.length <= 1) return;
    setTableRows(tableRows.filter(r => r.id !== id));
  };

  // Update Table Row Cell
  const handleCellChange = (id: string, col: 'col2' | 'col3' | 'col4' | 'col5', value: string) => {
    setTableRows(tableRows.map(r => r.id === id ? { ...r, [col]: value } : r));
  };

  // Export as Word (.docx) HTML-based Document
  const handleDownloadWordDoc = () => {
    const headerHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${docTitle}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; direction: rtl; text-align: right; margin: 30px; }
          .header-table { width: 100%; border-bottom: 3px solid #008489; padding-bottom: 15px; margin-bottom: 25px; }
          .header-table td { vertical-align: top; }
          .title { font-size: 22px; font-weight: bold; color: #093c42; text-align: center; margin: 20px 0; }
          .meta-box { background-color: #f7fbfc; border: 1px solid #c2e2e5; padding: 12px; margin-bottom: 20px; border-radius: 6px; }
          table.data-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          table.data-table th { background-color: #008489; color: white; border: 1px solid #006b6f; padding: 8px; font-size: 13px; text-align: center; }
          table.data-table td { border: 1px solid #ddd; padding: 8px; font-size: 12px; text-align: center; }
          .footer-table { width: 100%; margin-top: 50px; border-top: 2px solid #008489; padding-top: 20px; }
          .sig-box { text-align: center; font-size: 13px; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 35%; text-align: right;">
              <div>المملكة العربية السعودية</div>
              <div>وزارة التعليم</div>
              <div>الإدارة العامة للتعليم بمنطقة: ${educationRegion}</div>
              <div>${officeName}</div>
              <div>مدرسة: ${schoolName}</div>
            </td>
            <td style="width: 30%; text-align: center;">
              <h2 style="color: #008489; margin: 0;">وزارة التعليم</h2>
              <div style="font-size: 10px; color: #555;">Ministry of Education</div>
            </td>
            <td style="width: 35%; text-align: left;" dir="ltr">
              <div>التاريخ الهجري: ${hijriDate}</div>
              <div>التاريخ الميلادي: ${gregorianDate}</div>
              <div>العام الدراسي: ${academicYear}</div>
            </td>
          </tr>
        </table>

        <div class="title">${docTitle}</div>
        <p style="text-align: center; color: #444; font-size: 13px;">${docDescription}</p>

        <div class="meta-box">
          <strong>البيانات التنظيمية:</strong> مدرسة: ${schoolName} | المنطقة التعليمية: ${educationRegion} | العام الدراسي: ${academicYear}
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 8%;">م</th>
              <th style="width: 42%;">البيان / الإجراء / المهمة</th>
              <th style="width: 20%;">المسؤول التنفيذي</th>
              <th style="width: 15%;">الفترة الزمنية</th>
              <th style="width: 15%;">حالة الإنجاز</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows.map((r, i) => `
              <tr>
                <td>${i + 1}</td>
                <td style="text-align: right;">${r.col2}</td>
                <td>${r.col3}</td>
                <td>${r.col4}</td>
                <td>${r.col5}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 30px; padding: 12px; background: #fffbf0; border: 1px solid #fed7aa; font-size: 12px;">
          <strong>ملاحظات وتوجيهات الإدارة:</strong> ${notes}
        </div>

        <table class="footer-table">
          <tr>
            <td class="sig-box" style="width: 33%;">
              <strong>مسؤولة السجل:</strong><br><br>
              ${supervisorName}<br>
              التوقيع: .....................
            </td>
            <td class="sig-box" style="width: 33%;">
              <strong>منسقة العمل التعاوني:</strong><br><br>
              ${coordinatorName}<br>
              التوقيع: .....................
            </td>
            <td class="sig-box" style="width: 33%;">
              <strong>مديرة المدرسة:</strong><br><br>
              ${principalName}<br>
              الختم والاعتماد: .....................
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([headerHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.name} - قابل للتعديل 1448هـ.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Print PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Copy Content
  const handleCopyText = () => {
    const text = `
المملكة العربية السعودية - وزارة التعليم
الإدارة العامة للتعليم بمنطقة: ${educationRegion}
مدرسة: ${schoolName}
العام الدراسي: ${academicYear} - التاريخ: ${hijriDate}
----------------------------------------------------
${docTitle}
${docDescription}

المهام والإجراءات:
${tableRows.map((r, i) => `${i + 1}. ${r.col2} | المسؤول: ${r.col3} | الزمن: ${r.col4} | الحالة: ${r.col5}`).join('\n')}

الملاحظات: ${notes}
مسؤولة السجل: ${supervisorName} | مديرة المدرسة: ${principalName}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save to Local Storage
  const handleSaveToBrowser = () => {
    const docData = {
      productId: product.id,
      docTitle,
      schoolName,
      educationRegion,
      academicYear,
      principalName,
      supervisorName,
      coordinatorName,
      tableRows,
      notes,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`ahtdh_doc_editor_${product.id}`, JSON.stringify(docData));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className={`bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden w-full transition-all duration-300 ${
            isFullscreen ? 'fixed inset-2 h-[calc(100vh-16px)]' : 'max-w-5xl max-h-[92vh]'
          }`}
        >
          {/* Top Bar */}
          <div className="bg-[#093c42] text-white px-4 py-3 flex items-center justify-between border-b border-[#135058]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#008489] flex items-center justify-center text-white shadow-2xs">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                    محرر وتخصيص السجلات المباشر (داخل المتصفح)
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 font-medium">
                    1448هـ المعتمد
                  </span>
                </div>
                <p className="text-[10px] text-stone-300">
                  عدّل الحقول والجداول مباشرة ثم صدّر الملف بصيغة Word (.docx) أو PDF
                </p>
              </div>
            </div>

            {/* Actions & Window Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                title={isFullscreen ? 'تصغير' : 'ملء الشاشة'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-rose-500 transition-colors"
                title="إغلاق المحرر"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub Navigation & Modes */}
          <div className="bg-stone-100 border-b border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'editor' 
                    ? 'bg-white text-[#008489] shadow-2xs border border-stone-200' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>شاشة التعديل والتعبئة</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'preview' 
                    ? 'bg-white text-[#008489] shadow-2xs border border-stone-200' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>معاينة المستند الرسمي (خلفية الوزارة)</span>
              </button>
            </div>

            {/* Live Auto-Time Indicator */}
            <div className="flex items-center gap-3 text-[11px] text-stone-600 font-mono">
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-stone-200 shadow-2xs">
                <Calendar className="w-3 h-3 text-[#008489]" />
                <span>{hijriDate}</span>
              </div>
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-stone-200 shadow-2xs">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>{currentTime || '11:25:00 م'}</span>
              </div>
            </div>
          </div>

          {/* Editor Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
            {activeTab === 'editor' ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* 1. Header & School Info Card */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-2 text-stone-900 font-bold text-xs sm:text-sm">
                      <ShieldCheck className="w-4 h-4 text-[#008489]" />
                      <span>1. الترويسة وبيانات المدرسة الرسمية</span>
                    </div>
                    <span className="text-[10px] text-stone-400">تحديث تلقائي على جميع صفحات السجل</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">اسم المدرسة:</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="اكتب اسم المدرسة هنا..."
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">الإدارة العامة للتعليم بمنطقة:</label>
                      <input
                        type="text"
                        value={educationRegion}
                        onChange={(e) => setEducationRegion(e.target.value)}
                        placeholder="مثل: الرياض، جدة، الشرقية..."
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">اسم مكتب التعليم:</label>
                      <input
                        type="text"
                        value={officeName}
                        onChange={(e) => setOfficeName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Signatures and Roles */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs pt-2">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">مدير/ة المدرسة:</label>
                      <input
                        type="text"
                        value={principalName}
                        onChange={(e) => setPrincipalName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">مسؤولة السجل:</label>
                      <input
                        type="text"
                        value={supervisorName}
                        onChange={(e) => setSupervisorName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">منسق/ة العمل التعاوني:</label>
                      <input
                        type="text"
                        value={coordinatorName}
                        onChange={(e) => setCoordinatorName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">الموجه/ة الطلابي:</label>
                      <input
                        type="text"
                        value={counselorName}
                        onChange={(e) => setCounselorName(e.target.value)}
                        className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Document Title & Description */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100 font-bold text-stone-900">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#008489]" />
                      <span>2. مسمى السجل والوصف الإجرائي</span>
                    </div>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded">العام 1448هـ</span>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">عنوان ومسمى السجل:</label>
                    <input
                      type="text"
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-bold text-[#093c42] text-xs focus:outline-none focus:border-[#008489] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">وصف وأهداف السجل الميداني:</label>
                    <textarea
                      rows={2}
                      value={docDescription}
                      onChange={(e) => setDocDescription(e.target.value)}
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#008489] focus:bg-white resize-none"
                    />
                  </div>
                </div>

                {/* 3. Interactive Data Table (Editable Rows) */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-stone-900">
                      <Users className="w-4 h-4 text-[#008489]" />
                      <span>3. جدول المهام، التكليفات، ومتابعة الإجراءات</span>
                    </div>
                    <button
                      onClick={handleAddRow}
                      className="px-2.5 py-1 bg-[#e6f3f4] hover:bg-[#cce8eb] text-[#008489] rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة صف جديد</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right border-collapse">
                      <thead>
                        <tr className="bg-[#008489] text-white">
                          <th className="p-2 border border-[#006f73] text-center w-10">م</th>
                          <th className="p-2 border border-[#006f73]">البيان / الإجراء / التكليف</th>
                          <th className="p-2 border border-[#006f73] w-36">المسؤول التنفيذي</th>
                          <th className="p-2 border border-[#006f73] w-28">الزمن / الفترة</th>
                          <th className="p-2 border border-[#006f73] w-28 text-center">حالة الإنجاز</th>
                          <th className="p-2 border border-[#006f73] text-center w-10">حذف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-stone-50 border-b border-stone-200">
                            <td className="p-2 border border-stone-200 text-center font-bold text-stone-600 bg-stone-50">
                              {idx + 1}
                            </td>
                            <td className="p-1.5 border border-stone-200">
                              <input
                                type="text"
                                value={row.col2}
                                onChange={(e) => handleCellChange(row.id, 'col2', e.target.value)}
                                className="w-full p-1.5 bg-transparent border-0 focus:ring-1 focus:ring-[#008489] rounded text-xs"
                              />
                            </td>
                            <td className="p-1.5 border border-stone-200">
                              <input
                                type="text"
                                value={row.col3}
                                onChange={(e) => handleCellChange(row.id, 'col3', e.target.value)}
                                className="w-full p-1.5 bg-transparent border-0 focus:ring-1 focus:ring-[#008489] rounded text-xs"
                              />
                            </td>
                            <td className="p-1.5 border border-stone-200">
                              <input
                                type="text"
                                value={row.col4}
                                onChange={(e) => handleCellChange(row.id, 'col4', e.target.value)}
                                className="w-full p-1.5 bg-transparent border-0 focus:ring-1 focus:ring-[#008489] rounded text-xs"
                              />
                            </td>
                            <td className="p-1.5 border border-stone-200 text-center">
                              <input
                                type="text"
                                value={row.col5}
                                onChange={(e) => handleCellChange(row.id, 'col5', e.target.value)}
                                className="w-full p-1.5 bg-transparent border-0 focus:ring-1 focus:ring-[#008489] rounded text-xs text-center font-bold text-emerald-700"
                              />
                            </td>
                            <td className="p-1.5 border border-stone-200 text-center">
                              <button
                                onClick={() => handleRemoveRow(row.id)}
                                className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                                title="حذف الصف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Notes & Directives */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2 text-xs">
                  <label className="font-bold text-stone-900 block">4. توجيهات وملاحظات إدارة المدرسة:</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:border-[#008489] focus:bg-white resize-none"
                  />
                </div>
              </div>
            ) : (
              /* ============================================================== */
              /* Official Ministry Document Live Preview (Exact Images Background) */
              /* ============================================================== */
              <div className="max-w-3xl mx-auto my-2">
                <div 
                  id="printable-record-sheet"
                  className="bg-white rounded-xl shadow-lg border border-stone-200 p-8 sm:p-12 relative overflow-hidden text-stone-900 min-h-[900px] flex flex-col justify-between"
                  style={{
                    backgroundImage: `url(${settings.officialBorderBackground || '/assets/aistudio/_____________b1c4c42d.jpg'})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Official Header Content positioned cleanly inside border */}
                  <div>
                    <div className="flex justify-between items-start text-xs border-b-2 border-[#008489]/40 pb-4 mb-6">
                      <div className="space-y-1 text-right">
                        <div className="font-bold text-[#093c42]">المملكة العربية السعودية</div>
                        <div className="font-bold text-[#008489]">وزارة التعليم</div>
                        <div className="text-[11px] text-stone-600">الإدارة العامة للتعليم بمنطقة: <span className="font-bold text-stone-900">{educationRegion}</span></div>
                        <div className="text-[11px] text-stone-600">مكتب التعليم: <span className="font-bold text-stone-900">{officeName}</span></div>
                        <div className="text-[11px] text-stone-600">مدرسة: <span className="font-bold text-stone-900">{schoolName}</span></div>
                      </div>

                      <div className="text-center space-y-1">
                        <div className="inline-block p-2 rounded-full bg-emerald-50 text-[#008489]">
                          <svg className="h-8 w-auto mx-auto" viewBox="0 0 135 42" fill="none">
                            <circle cx="28" cy="8" r="4" fill="#f59e0b" />
                            <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
                            <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
                            <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
                            <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
                            <rect x="75" y="5" width="9" height="34" rx="4.5" fill="#008489" />
                          </svg>
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono tracking-widest">MINISTRY OF EDUCATION</div>
                      </div>

                      <div className="text-left space-y-1 text-[11px] text-stone-600 font-mono" dir="ltr">
                        <div>التاريخ الهجري: <span className="font-bold text-stone-900">{hijriDate}</span></div>
                        <div>التاريخ الميلادي: <span className="font-bold text-stone-900">{gregorianDate}</span></div>
                        <div>العام الدراسي: <span className="font-bold text-[#008489]">{academicYear}</span></div>
                      </div>
                    </div>

                    {/* 1448 Calendar Emblem matching Image ______________________c27aa1db.jpg */}
                    <div className="text-center my-4">
                      <div className="inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#e6f3f4] to-white border border-[#c2e2e5] shadow-xs">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#008489]">
                          <Calendar className="w-4 h-4 text-[#008489]" />
                          <span>العام الدراسي المعتمد</span>
                        </div>
                        <span className="text-base font-black text-amber-700 tracking-wider mt-0.5">{academicYear}</span>
                      </div>
                    </div>

                    {/* Document Title Banner */}
                    <div className="text-center my-4 space-y-1">
                      <h2 className="text-lg sm:text-xl font-black text-[#093c42] tracking-wide">
                        {docTitle}
                      </h2>
                      <p className="text-xs text-stone-600 max-w-xl mx-auto leading-relaxed">
                        {docDescription}
                      </p>
                    </div>

                    {/* Clean Rendered Table */}
                    <div className="my-6">
                      <table className="w-full text-xs text-right border-collapse border border-stone-300">
                        <thead>
                          <tr className="bg-[#008489] text-white">
                            <th className="p-2 border border-stone-300 text-center w-10">م</th>
                            <th className="p-2 border border-stone-300">البيان / الإجراء / المهمة</th>
                            <th className="p-2 border border-stone-300 text-center w-32">المسؤول</th>
                            <th className="p-2 border border-stone-300 text-center w-24">الفترة</th>
                            <th className="p-2 border border-stone-300 text-center w-24">حالة الإنجاز</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows.map((r, i) => (
                            <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                              <td className="p-2 border border-stone-300 text-center font-bold text-stone-600">{i + 1}</td>
                              <td className="p-2 border border-stone-300 font-medium text-stone-800">{r.col2}</td>
                              <td className="p-2 border border-stone-300 text-center text-stone-700">{r.col3}</td>
                              <td className="p-2 border border-stone-300 text-center text-stone-600">{r.col4}</td>
                              <td className="p-2 border border-stone-300 text-center font-bold text-emerald-700">{r.col5}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Notes Box */}
                    {notes && (
                      <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-stone-700 leading-relaxed mb-6">
                        <strong className="text-amber-900 block mb-0.5">ملاحظات واعتماد إدارة المدرسة:</strong>
                        <span>{notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Official Signatures Band matching Image 2 & WA0007 */}
                  <div className="pt-6 border-t-2 border-[#008489]/40 mt-8">
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      {/* Signature 1: Record Supervisor */}
                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">مسؤولة السجل :</div>
                        <div className="text-[#008489] font-semibold">{supervisorName}</div>
                        <div className="text-[10px] text-stone-400 pt-2">التوقيع: .....................</div>
                      </div>

                      {/* Signature 2: Coordinator */}
                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">منسق/ة العمل التعاوني :</div>
                        <div className="text-[#008489] font-semibold">{coordinatorName}</div>
                        <div className="text-[10px] text-stone-400 pt-2">التوقيع: .....................</div>
                      </div>

                      {/* Signature 3: School Principal */}
                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">مدير/ة المدرسة :</div>
                        <div className="text-[#008489] font-semibold">{principalName}</div>
                        <div className="text-[10px] text-stone-400 pt-2">الختم والاعتماد: .....................</div>
                      </div>
                    </div>

                    {/* Official Document Footer matching screenshots */}
                    <div className="mt-8 pt-3 border-t border-stone-200 flex justify-between items-center text-[9px] text-stone-500">
                      <div>متجر احتياجك التعليمي للمنتجات المدرسية والسجلات الرقمية</div>
                      <div>خطة وسجل تنفيذي معتمد — مدرسة {schoolName}</div>
                      <div>العام 1448هـ</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Export Bar */}
          <div className="bg-white border-t border-stone-200 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
            {/* Left buttons: Local Save & Copy */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToBrowser}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4" />}
                <span>{savedSuccess ? 'تم الحفظ في المتصفح' : 'حفظ مسودة'}</span>
              </button>

              <button
                onClick={handleCopyText}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
              </button>

              {/* Original Raw Download if available */}
              {product.downloadUrl && (
                <a
                  href={product.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-emerald-200"
                >
                  <Download className="w-4 h-4" />
                  <span>تنزيل الملف الخام الأصلي</span>
                </a>
              )}
            </div>

            {/* Right Buttons: DOCX & PDF */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintPdf}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة / حفظ PDF</span>
              </button>

              <button
                onClick={handleDownloadWordDoc}
                className="px-5 py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>تنزيل بصيغة Word (.docx)</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
