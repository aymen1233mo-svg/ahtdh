import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Target, 
  Award, 
  Table2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Printer, 
  Sliders, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const SmartToolsSimulator: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'tahseen' | 'cert' | 'absence'>('tahseen');

  // Tahseen Tool State
  const [leadershipScore, setLeadershipScore] = useState<number>(78);
  const [learningScore, setLearningScore] = useState<number>(65);
  const [outcomesScore, setOutcomesScore] = useState<number>(58);
  const [environmentScore, setEnvironmentScore] = useState<number>(84);
  const [schoolName, setSchoolName] = useState<string>('مدرسة الأمل الثانوية النموذجية');
  const [tahseenCopied, setTahseenCopied] = useState<boolean>(false);

  // Certificate Generator State
  const [certRecipient, setCertRecipient] = useState<string>('أ. فهد بن عبدالعزيز القحطاني');
  const [certSchool, setCertSchool] = useState<string>('مدرسة دار المعرفة الأهلية');
  const [certReason, setCertReason] = useState<string>('التميز في التدريس والتحفيز الطلابي');
  const [certPrincipal, setCertPrincipal] = useState<string>('د. عبدالرحمن بن عبدالله السعيد');
  const [certCategory, setCertCategory] = useState<'معلم' | 'طالب' | 'موجه'>('معلم');
  const [certCopied, setCertCopied] = useState<boolean>(false);

  // Absence Calculator State
  const [totalStudents, setTotalStudents] = useState<number>(450);
  const [totalDays, setTotalDays] = useState<number>(20);
  const [excusedAbsences, setExcusedAbsences] = useState<number>(42);
  const [unexcusedAbsences, setUnexcusedAbsences] = useState<number>(28);

  // Computed Tahseen Values
  const averageScore = Math.round((leadershipScore + learningScore + outcomesScore + environmentScore) / 4);

  const getEvaluationTier = (score: number) => {
    if (score >= 85) return { tier: 'متميز (أداء متقدم)', color: 'text-emerald-700 bg-emerald-50' };
    if (score >= 70) return { tier: 'منجز (أداء جيد)', color: 'text-blue-700 bg-blue-50' };
    if (score >= 50) return { tier: 'قريب من المنجز (يحتاج تحسين)', color: 'text-amber-700 bg-amber-50' };
    return { tier: 'غير منجز (أولوية تدخل عاجلة)', color: 'text-rose-700 bg-rose-50' };
  };

  const overallTier = getEvaluationTier(averageScore);

  // Generate Improvement Plan Output
  const generatedPlan = `المملكة العربية السعودية
وزارة التعليم - إدارة التعليم
اسم المنشأة التعليمية: ${schoolName}

وثيقة خطة التحسين والتطوير المدرسية (مستخرجة عبر أداة تحسين الذكية):
--------------------------------------------------
نتيجة التقويم الذاتي الإجمالية: ${averageScore}% - المستوى: ${overallTier.tier}

1. تشخيص الفجوات الميدانية وتحديد أولويات التطوير:
- القيادة المدرسية (${leadershipScore}%): ${leadershipScore < 75 ? 'الحاجة لتعزيز نظم المتابعة الدورية وتفعيل مجالس التطوير' : 'استدامة الأداء القيادي وتعزيز تفويض الصلاحيات'}
- التعليم والتعلم (${learningScore}%): ${learningScore < 75 ? 'تكثيف برامج التطوير المهني لاستراتيجيات التدريس المتمايز' : 'دعم الممارسات التدريسية الإثرائية'}
- نواتج التعلم (${outcomesScore}%): ${outcomesScore < 75 ? 'تنفيذ خطة علاجية مستعجلة لرفع درجات الاختبارات المعيارية والوطنية (نافس)' : 'برامج إثرائية للطلبة الموهوبين والمتفوقين'}
- البيئة المدرسية (${environmentScore}%): ${environmentScore < 75 ? 'تحسين بيئات التعلم الرقمية والتجهيزات الميدانية' : 'استثمار البيئة المدرسية الداعمة لرفاهية الطلاب'}

2. البرامج الإجرائية المقترحة للتنفيذ خلال الفصل الدراسي:
- البرنامج الأول: "ريادة التعليم" - ورش عمل تدريبية وتطوير مهني (المسؤول: رئيس لجنة التطوير المدرسي).
- البرنامج الثاني: "نافس بتميز" - حصص تقوية وبنوك أسئلة قياسية (المسؤول: وكيل الشؤون التعليمية).
- البرنامج الثالث: "انضباطي سر نجاحي" - تفعيل الإرشاد وتوثيق الحضور اليومي (المسؤول: الموجه الطلابي).

3. مؤشرات الإنجاز ومراجعة الأداء:
- مؤشر الأداء: رفع نسبة نواتج التعلم بواقع 15% خلال 60 يوماً.
- أداة التحقق: كشوفات الاختبارات الدورية واستبانات رضا المستفيدين.
اعتماد مدير المدرسة: ${schoolName}
`;

  const handleCopyTahseen = () => {
    navigator.clipboard.writeText(generatedPlan);
    setTahseenCopied(true);
    setTimeout(() => setTahseenCopied(false), 2500);
  };

  // Computed Absence Values
  const totalPossibleAttendances = totalStudents * totalDays;
  const totalAbsences = excusedAbsences + unexcusedAbsences;
  const actualAttendances = totalPossibleAttendances - totalAbsences;
  const attendanceRate = totalPossibleAttendances > 0 
    ? ((actualAttendances / totalPossibleAttendances) * 100).toFixed(2) 
    : '0';

  const unexcusedRate = totalPossibleAttendances > 0
    ? ((unexcusedAbsences / totalPossibleAttendances) * 100).toFixed(2)
    : '0';

  return (
    <div className="space-y-6 pb-12">
      {/* Smart Tools Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>محاكي الأدوات الذكية المدرسية (Interactive Smart Tools Playground)</span>
            </div>
            <h2 className="text-lg font-black text-stone-900">
              تجربة الأتمتة والوظائف الذكية التي يقدمها متجر احتياجك التعليمي
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              جرّب بنفسك كيف تقوم هذه الأدوات بتحويل نتائج التقويم الذاتي إلى خطط رسمية وتوليد الشهادات وحساب الانضباط
            </p>
          </div>

          {/* Tool selector buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTool('tahseen')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTool === 'tahseen'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>أداة "تحسين" (التقويم الذاتي)</span>
            </button>

            <button
              onClick={() => setActiveTool('cert')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTool === 'cert'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>منظومة الشهادات التلقائية</span>
            </button>

            <button
              onClick={() => setActiveTool('absence')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTool === 'absence'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <Table2 className="w-4 h-4" />
              <span>كاشف وحاسبة الانضباط والغياب</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tool 1: Tahseen Interactive Engine */}
      {activeTool === 'tahseen' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-800 block mb-1">المدخلات (درجات التقويم الذاتي للمدرسة)</span>
              <h3 className="text-sm font-bold text-stone-900">أدخل درجات المجالات الأربعة لهيئة التقويم:</h3>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">اسم المدرسة / المنشأة التعليمية:</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            {/* Range 1: Leadership */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-700">1. القيادة المدرسية</span>
                <span className="font-bold text-emerald-700">{leadershipScore}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={leadershipScore}
                onChange={(e) => setLeadershipScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Range 2: Teaching & Learning */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-700">2. التعليم والتعلم</span>
                <span className="font-bold text-emerald-700">{learningScore}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={learningScore}
                onChange={(e) => setLearningScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Range 3: Outcomes */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-700">3. نواتج التعلم (اختبارات نافس والتحصيلي)</span>
                <span className="font-bold text-emerald-700">{outcomesScore}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={outcomesScore}
                onChange={(e) => setOutcomesScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Range 4: Environment */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-700">4. البيئة المدرسية والأمن والسلامة</span>
                <span className="font-bold text-emerald-700">{environmentScore}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={environmentScore}
                onChange={(e) => setEnvironmentScore(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Calculated Composite diagnosis */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">المتوسط الموزون العام:</span>
                <span className="text-lg font-black text-stone-900">{averageScore}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-600">المستوى المعتمد:</span>
                <span className={`px-2 py-0.5 rounded font-bold text-xs ${overallTier.color}`}>
                  {overallTier.tier}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 bg-amber-50/60 p-3 rounded-lg border border-amber-100 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                في متجر احتياجك التعليمي، تُباع أداة "تحسين" الإصدار الثالث بسعر 113.85 ر.س وتُصدّر خطة تحسين شاملة في ملف Word جاهز للطباعة والرفع على منصة تميز المدرسية.
              </span>
            </div>
          </div>

          {/* Generated Plan Output Column */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-stone-900">
                    مخرجات خطة التحسين والتطوير المبرمجة آلياً
                  </span>
                </div>
                <button
                  onClick={handleCopyTahseen}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {tahseenCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{tahseenCopied ? 'تم النسخ!' : 'نسخ الخطة بالكامل'}</span>
                </button>
              </div>

              {/* Document Preview Box */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 font-mono text-xs text-stone-800 leading-relaxed whitespace-pre-wrap max-h-[420px] overflow-y-auto">
                {generatedPlan}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>الصيغة في المتجر: Word (.docx) مفتوح + PDF رسمي</span>
              <a
                href={STORE_INFO.fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <span>طلب أداة تحسين الأصلية من المتجر</span>
                <ArrowRight className="w-3 h-3 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tool 2: Automatic Certificate Generator */}
      {activeTool === 'cert' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form inputs */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-900">تخصيص بيانات شهادة التقدير:</h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">اسم المكرّم / المكرّمة:</label>
              <input
                type="text"
                value={certRecipient}
                onChange={(e) => setCertRecipient(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">اسم المنشأة التعليمية:</label>
              <input
                type="text"
                value={certSchool}
                onChange={(e) => setCertSchool(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">سبب ومجال التكريم:</label>
              <input
                type="text"
                value={certReason}
                onChange={(e) => setCertReason(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">اسم مدير / مديرة المدرسة المعتمد:</label>
              <input
                type="text"
                value={certPrincipal}
                onChange={(e) => setCertPrincipal(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold text-stone-700 block mb-1.5">فئة التكريم:</span>
              <div className="flex gap-2">
                {(['معلم', 'طالب', 'موجه'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCertCategory(cat)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      certCategory === cat
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-900 block mb-1">مميزات أداة الشهادات بمتجر احتياجك التعليمي:</span>
              تسمح باستيراد ملف إكسل بـ 500 اسم وتوليد 500 شهادة فردية في ثوانٍ مع رابط شخصي ورمز باركود QR لكل طالب.
            </div>
          </div>

          {/* Certificate Live Preview */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>معاينة شهادة الشكر والتقدير الملكية</span>
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الشهادة</span>
                </button>
              </div>

              {/* The Certificate Artwork */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 border-4 border-amber-500/30 shadow-inner relative text-center space-y-4">
                <div className="text-[11px] font-semibold text-stone-500 tracking-wider">
                  المملكة العربية السعودية · وزارة التعليم · {certSchool}
                </div>

                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                  <Award className="w-6 h-6" />
                </div>

                <h2 className="text-2xl font-black text-stone-900 tracking-wide">
                  شهادة شكر وتقدير
                </h2>

                <p className="text-xs text-stone-600">
                  يسر إدارة {certSchool} أن تتقدم بأسمى عبارات الشكر والثناء إلى:
                </p>

                <div className="text-xl font-black text-emerald-900 py-1 border-b-2 border-emerald-600/40 inline-block px-8">
                  {certRecipient}
                </div>

                <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed">
                  نظير جهوده المخلصة وعطائه المتميز في {certReason} متمنين له دوام التوفيق والنجاح والإبداع المستمر.
                </p>

                <div className="pt-6 flex items-center justify-between text-xs text-stone-800 max-w-md mx-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-stone-500 block">التاريخ</span>
                    <span className="font-bold">العام الدراسي 1447 - 1448 هـ</span>
                  </div>

                  <div className="text-left">
                    <span className="text-[10px] text-stone-500 block">مدير المدرسة</span>
                    <span className="font-bold">{certPrincipal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 flex justify-between items-center">
              <span>توليد تلقائي فوري · دقة طباعة عالية 300DPI</span>
              <span className="text-emerald-700 font-bold">متوفرة بالمتجر بـ 89 ر.س</span>
            </div>
          </div>
        </div>
      )}

      {/* Tool 3: Absence & Discipline Tracker */}
      {activeTool === 'absence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="text-sm font-bold text-stone-900">معايير رصد الحضور والانضباط:</h3>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">إجمالي عدد طلاب المدرسة:</label>
              <input
                type="number"
                value={totalStudents}
                onChange={(e) => setTotalStudents(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">عدد أيام الدراسة المحتسبة في الفترة:</label>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">حالات الغياب بعذر رسمي:</label>
              <input
                type="number"
                value={excusedAbsences}
                onChange={(e) => setExcusedAbsences(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">حالات الغياب دون عذر مقبول:</label>
              <input
                type="number"
                value={unexcusedAbsences}
                onChange={(e) => setUnexcusedAbsences(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-4">
                لوحة المؤشرات التلقائية وفق اللائحة الوزارية:
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">نسبة الحضور الإجمالية</span>
                  <span className="text-xl font-black text-emerald-700 mt-1 block">{attendanceRate}%</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">نسبة الغياب غير المبرر</span>
                  <span className="text-xl font-black text-rose-600 mt-1 block">{unexcusedRate}%</span>
                </div>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-stone-500 block">تصنيف انضباط المدرسة</span>
                  <span className="text-sm font-bold text-stone-900 mt-1 block">
                    {Number(attendanceRate) >= 95 ? 'انضباط مرتفع (ممتاز)' : 'يتطلب إجراءات علاجية'}
                  </span>
                </div>
              </div>

              {/* Action plan based on numbers */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-2">
                <span className="font-bold text-stone-900 block">الإجراءات النظامية الموصى بها تلقائياً:</span>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                  <li>إرسال رسائل توعية وتنبيه فوري لأولياء أمور الطلاب الغائبين بدون عذر ({unexcusedAbsences} حالة).</li>
                  <li>رصد درجات المواظبة وحسم الدرجات المقررة نظاماً في نظام نور.</li>
                  <li>إحالة الطلاب المتجاوزين لنسبة 5% من الغياب إلى الموجه الطلابي لدراسة الحالة.</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>كشف إكسل الذكي بمتجر احتياجك التعليمي يتيح حساب 1,000 طالب تلقائياً</span>
              <span className="text-emerald-700 font-bold">متوفر بالمتجر بـ 59 ر.س</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
