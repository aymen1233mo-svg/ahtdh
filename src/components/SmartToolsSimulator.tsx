import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  User,
  Users,
  FileText,
  School,
  Building,
  CheckCircle,
  Eye,
  Info
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { useStore } from '../context/StoreContext';

export const SmartToolsSimulator: React.FC = () => {
  const { settings } = useStore();
  const [activeTool, setActiveTool] = useState<'tahseen' | 'school_info' | 'discipline_cert' | 'school_cover' | 'absence'>('tahseen');

  // Real-time Date and Time Engine
  const [currentHijri, setCurrentHijri] = useState<string>('21 جمادى الأولى 1448هـ');
  const [currentGregorian, setCurrentGregorian] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [autoDate, setAutoDate] = useState<boolean>(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const gregStr = now.toLocaleDateString('ar-SA', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long' 
      });
      setCurrentGregorian(gregStr);
      setCurrentTime(now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // ==============================================================
  // 1. Tahseen & Tameez Platform State (Exact Image 3)
  // ==============================================================
  const [tameezSchool, setTameezSchool] = useState<string>('مدرسة الأمل الثانوية النموذجية');
  const [ministerialNumber, setMinisterialNumber] = useState<string>('1098234');
  const [academicStage, setAcademicStage] = useState<string>('المرحلة المتوسطة');
  const [schoolGender, setSchoolGender] = useState<'بنين' | 'بنات'>('بنين');
  const [officeBelonging, setOfficeBelonging] = useState<string>('مكتب التعليم شمال');
  const [buildingType, setBuildingType] = useState<'مستقل' | 'مشترك'>('مستقل');
  const [principalTameez, setPrincipalTameez] = useState<string>('أ. مريم بن عبدالله الغامدي');
  const [phoneTameez, setPhoneTameez] = useState<string>('0508095912');
  const [evalType, setEvalType] = useState<'ذاتي' | 'خارجي'>('ذاتي');

  // 4 Evaluation Domains
  const [leadershipScore, setLeadershipScore] = useState<number>(88);
  const [learningScore, setLearningScore] = useState<number>(76);
  const [outcomesScore, setOutcomesScore] = useState<number>(64);
  const [environmentScore, setEnvironmentScore] = useState<number>(92);
  const [tahseenCopied, setTahseenCopied] = useState<boolean>(false);

  const averageScore = Math.round((leadershipScore + learningScore + outcomesScore + environmentScore) / 4);

  // Four-Tier Colors according to National Education Evaluation Authority (Image 3)
  const getLevelInfo = (score: number) => {
    if (score >= 85) return { name: 'التميز', color: 'bg-emerald-600 text-white', textColor: 'text-emerald-700', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300' };
    if (score >= 70) return { name: 'التقدم', color: 'bg-blue-600 text-white', textColor: 'text-blue-700', badgeColor: 'bg-blue-50 text-blue-700 border-blue-300' };
    if (score >= 50) return { name: 'الانطلاق', color: 'bg-amber-500 text-white', textColor: 'text-amber-700', badgeColor: 'bg-amber-50 text-amber-700 border-amber-300' };
    return { name: 'التهيئة', color: 'bg-rose-600 text-white', textColor: 'text-rose-700', badgeColor: 'bg-rose-50 text-rose-700 border-rose-300' };
  };

  const overallLevel = getLevelInfo(averageScore);

  // ==============================================================
  // 2. School General Info & Formations (Exact Image 1)
  // ==============================================================
  const [generalSchoolName, setGeneralSchoolName] = useState<string>('مدرسة رواد المستقبل الابتدائية');
  const [generalRegion, setGeneralRegion] = useState<string>('الإدارة العامة للتعليم بمنطقة الرياض');
  const [generalOffice, setGeneralOffice] = useState<string>('مكتب التعليم شمال');
  const [counselorDocName, setCounselorDocName] = useState<string>('أ. سارة بن سعد القحطاني');
  
  // Formations staff counts
  const [staffCounts, setStaffCounts] = useState({
    principal: 1,
    vicePrincipal: 2,
    counselor: 2,
    teacher: 28,
    activityLeader: 1,
    learningResources: 1,
    adminAssistant: 3,
    dataRegistrar: 1,
    computerTech: 1,
    labTech: 1,
    servicesWorker: 2,
    guard: 2
  });

  // Classroom and students counts
  const [classCounts, setClassCounts] = useState({
    c1_classes: 3, c1_students: 84,
    c2_classes: 3, c2_students: 82,
    c3_classes: 3, c3_students: 79,
    c4_classes: 2, c4_students: 60,
    c5_classes: 2, c5_students: 58,
    c6_classes: 2, c6_students: 55
  });

  const totalClasses = classCounts.c1_classes + classCounts.c2_classes + classCounts.c3_classes + classCounts.c4_classes + classCounts.c5_classes + classCounts.c6_classes;
  const totalStudentsCount = classCounts.c1_students + classCounts.c2_students + classCounts.c3_students + classCounts.c4_students + classCounts.c5_students + classCounts.c6_students;

  // Facilities
  const [facilities, setFacilities] = useState([
    { name: 'مصادر تعلم', available: true, count: 1 },
    { name: 'صالة رياضية', available: false, count: 0 },
    { name: 'معمل حاسب آلي', available: true, count: 1 },
    { name: 'مختبر علوم', available: true, count: 1 },
    { name: 'مصلى مستقل', available: false, count: 0 },
    { name: 'قاعة تربية فنية', available: true, count: 1 },
    { name: 'مكتبة', available: false, count: 0 }
  ]);

  // ==============================================================
  // 3. School Discipline Certificate (Exact Image 2)
  // ==============================================================
  const [certStudent, setCertStudent] = useState<string>('سارة بن خالد القحطاني');
  const [certClass, setCertClass] = useState<string>('الصف الثالث الابتدائي');
  const [certTerm, setCertTerm] = useState<string>('الفصل الدراسي الأول');
  const [certSchoolName, setCertSchoolName] = useState<string>('مدرسة الأمل الابتدائية');
  const [certPrincipalName, setCertPrincipalName] = useState<string>('أ. مريم بن عبدالله الغامدي');
  const [certCounselorName, setCertCounselorName] = useState<string>('أ. هدى بن محمد الشهراني');
  const [certCopied, setCertCopied] = useState<boolean>(false);

  // ==============================================================
  // 4. School Cover & Signatures 1448H (Images WA0007 & متجر احتياجك)
  // ==============================================================
  const [coverTitle, setCoverTitle] = useState<string>('سجل التكليفات والمهام الإدارية والتعليمية');
  const [coverSchool, setCoverSchool] = useState<string>('مدرسة رواد المعرفة الأهلية');
  const [coverSupervisor, setCoverSupervisor] = useState<string>('أ. فاطمة بن خالد العتيبي');
  const [coverPrincipal, setCoverPrincipal] = useState<string>('أ. مريم بن عبدالله الغامدي');
  const [coverCoordinator, setCoverCoordinator] = useState<string>('أ. نورة بن فهد الشمري');
  const [coverYear, setCoverYear] = useState<string>('1448هـ');

  // ==============================================================
  // 5. Absence & Discipline Calculator
  // ==============================================================
  const [totalStudents, setTotalStudents] = useState<number>(450);
  const [totalDays, setTotalDays] = useState<number>(20);
  const [excusedAbsences, setExcusedAbsences] = useState<number>(36);
  const [unexcusedAbsences, setUnexcusedAbsences] = useState<number>(18);

  const totalPossibleAttendances = totalStudents * totalDays;
  const totalAbsences = excusedAbsences + unexcusedAbsences;
  const actualAttendances = totalPossibleAttendances - totalAbsences;
  const attendanceRate = totalPossibleAttendances > 0 
    ? ((actualAttendances / totalPossibleAttendances) * 100).toFixed(2) 
    : '0';

  // Generic Word Downloader
  const downloadWordDocument = (title: string, htmlContent: string) => {
    const fullDoc = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Arial; direction: rtl; text-align: right; margin: 30px; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th { background-color: #008489; color: white; border: 1px solid #006064; padding: 8px; text-align: center; }
          td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          .level-tamayuz { background: #10b981; color: white; }
          .level-taqaddum { background: #2563eb; color: white; }
          .level-intilaq { background: #f59e0b; color: white; }
          .level-tahiya { background: #ef4444; color: white; }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
    const blob = new Blob([fullDoc], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title} 1448هـ.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Smart Tools Playground Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#008489] mb-1">
              <Sparkles className="w-4 h-4 text-[#008489]" />
              <span>منظومة الأدوات والمولدات الذكية للمستندات المدرسية (1448هـ)</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              أدوات توليد وتعديل السجلات والتقارير آلياً وفق معايير وزارة التعليم وهيئة تقويم التعليم
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              توليد فوري لتقارير منصة تميز، كشوفات التشكيلات المدرسية، شهادات الانضباط، وأغلفة السجلات الرسمية
            </p>
          </div>

          {/* Real-time Clock Badge */}
          <div className="flex items-center gap-2.5 text-xs font-mono bg-stone-50 p-2 rounded-xl border border-stone-200 self-start md:self-auto">
            <div className="flex items-center gap-1.5 text-[#008489] font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentHijri}</span>
            </div>
            <span className="text-stone-300">|</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime || '11:25:00 م'}</span>
            </div>
          </div>
        </div>

        {/* 5 Comprehensive Tool Switcher Tabs */}
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-stone-100">
          <button
            onClick={() => setActiveTool('tahseen')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
              activeTool === 'tahseen'
                ? 'bg-[#008489] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>1. أداة "تحسين" (منصة تميز)</span>
          </button>

          <button
            onClick={() => setActiveTool('school_info')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
              activeTool === 'school_info'
                ? 'bg-[#008489] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>2. معلومات وتشكيلات المدرسة</span>
          </button>

          <button
            onClick={() => setActiveTool('discipline_cert')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
              activeTool === 'discipline_cert'
                ? 'bg-[#008489] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. شهادات الانضباط السريعة</span>
          </button>

          <button
            onClick={() => setActiveTool('school_cover')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
              activeTool === 'school_cover'
                ? 'bg-[#008489] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>4. مولد أغلفة السجلات والتواقيع</span>
          </button>

          <button
            onClick={() => setActiveTool('absence')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-2xs ${
              activeTool === 'absence'
                ? 'bg-[#008489] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <Table2 className="w-4 h-4" />
            <span>5. حاسبة الانضباط والغياب</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. Tahseen & Tameez Tool (Exact Image 3) */}
      {/* ============================================================== */}
      {activeTool === 'tahseen' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="text-xs font-bold text-[#008489]">مدخلات أداة تحسين (منصة تميز الرقمية)</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">52 مؤشراً</span>
            </div>

            {/* School Profile inputs matching Image 3 */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">اسم المدرسة:</label>
                <input
                  type="text"
                  value={tameezSchool}
                  onChange={(e) => setTameezSchool(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#008489] focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">الرقم الوزاري:</label>
                  <input
                    type="text"
                    value={ministerialNumber}
                    onChange={(e) => setMinisterialNumber(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">المرحلة الدراسية:</label>
                  <input
                    type="text"
                    value={academicStage}
                    onChange={(e) => setAcademicStage(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">الجنس:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSchoolGender('بنين')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${schoolGender === 'بنين' ? 'bg-[#008489] text-white' : 'bg-stone-100 text-stone-600'}`}
                    >
                      بنين
                    </button>
                    <button
                      onClick={() => setSchoolGender('بنات')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${schoolGender === 'بنات' ? 'bg-[#008489] text-white' : 'bg-stone-100 text-stone-600'}`}
                    >
                      بنات
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">مبنى المدرسة:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setBuildingType('مستقل')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${buildingType === 'مستقل' ? 'bg-[#008489] text-white' : 'bg-stone-100 text-stone-600'}`}
                    >
                      مستقل
                    </button>
                    <button
                      onClick={() => setBuildingType('مشترك')}
                      className={`flex-1 py-1.5 rounded text-xs font-bold ${buildingType === 'مشترك' ? 'bg-[#008489] text-white' : 'bg-stone-100 text-stone-600'}`}
                    >
                      مشترك
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">المكتب التابعة له:</label>
                <input
                  type="text"
                  value={officeBelonging}
                  onChange={(e) => setOfficeBelonging(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">اسم مدير/ة المدرسة:</label>
                <input
                  type="text"
                  value={principalTameez}
                  onChange={(e) => setPrincipalTameez(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* 4 Score Sliders */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
              <span className="font-bold text-stone-900 text-xs block">درجات مجالات التقويم المدرسي:</span>

              {/* Leadership */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">1. الإدارة المدرسية</span>
                  <span className="font-bold text-[#008489]">{leadershipScore}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={leadershipScore}
                  onChange={(e) => setLeadershipScore(Number(e.target.value))}
                  className="w-full accent-[#008489] cursor-pointer"
                />
              </div>

              {/* Learning */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">2. التعليم والتعلم</span>
                  <span className="font-bold text-[#008489]">{learningScore}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={learningScore}
                  onChange={(e) => setLearningScore(Number(e.target.value))}
                  className="w-full accent-[#008489] cursor-pointer"
                />
              </div>

              {/* Outcomes */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">3. نواتج التعلم</span>
                  <span className="font-bold text-[#008489]">{outcomesScore}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={outcomesScore}
                  onChange={(e) => setOutcomesScore(Number(e.target.value))}
                  className="w-full accent-[#008489] cursor-pointer"
                />
              </div>

              {/* Environment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">4. البيئة المدرسية</span>
                  <span className="font-bold text-[#008489]">{environmentScore}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={environmentScore}
                  onChange={(e) => setEnvironmentScore(Number(e.target.value))}
                  className="w-full accent-[#008489] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Document Preview Column (Exact Image 3 Matching) */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md relative text-xs text-stone-900"
              style={{
                backgroundImage: 'url(/assets/aistudio/_____________b1c4c42d.jpg)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Official Header */}
              <div className="flex justify-between items-start border-b-2 border-[#008489]/30 pb-3 mb-4">
                <div className="text-right space-y-0.5">
                  <div className="font-bold text-[#093c42]">المملكة العربية السعودية</div>
                  <div className="font-bold text-[#008489]">وزارة التعليم</div>
                  <div className="text-[10px] text-stone-600">الإدارة العامة للتعليم بمنطقة الرياض</div>
                  <div className="text-[10px] text-stone-600">{officeBelonging}</div>
                  <div className="font-bold text-stone-900">{tameezSchool}</div>
                </div>

                <div className="text-center">
                  <svg className="h-7 w-auto mx-auto" viewBox="0 0 135 42" fill="none">
                    <circle cx="28" cy="8" r="4" fill="#f59e0b" />
                    <rect x="23" y="16" width="9" height="23" rx="4.5" fill="#008489" />
                    <rect x="36" y="21" width="9" height="18" rx="4.5" fill="#008489" />
                    <rect x="49" y="10" width="9" height="29" rx="4.5" fill="#008489" />
                    <rect x="62" y="19" width="9" height="20" rx="4.5" fill="#008489" />
                  </svg>
                  <div className="text-[9px] text-stone-500 font-mono">وزارة التعليم</div>
                </div>

                <div className="text-left font-mono text-[10px] text-stone-600 space-y-0.5" dir="ltr">
                  <div>التاريخ الهجري: {currentHijri}</div>
                  <div>التاريخ الميلادي: {currentGregorian}</div>
                  <div>العام الدراسي: 1448هـ</div>
                </div>
              </div>

              {/* Title Header */}
              <div className="bg-[#093c42] text-white py-1.5 px-3 rounded-lg text-center font-bold text-sm mb-4">
                نتائج التقويم المدرسي (منصة تميز الرقمية) وخطة التحسين
              </div>

              {/* 1. Basic Data Table (Image 3) */}
              <div className="mb-4">
                <div className="font-bold text-[#093c42] mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008489]"></span>
                  <span>البيانات الأساسية:</span>
                </div>
                <table className="w-full border-collapse border border-stone-300 text-center">
                  <tbody>
                    <tr>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300 w-1/4">اسم المدرسة</td>
                      <td className="p-1.5 border border-stone-300 w-1/4">{tameezSchool}</td>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300 w-1/4">الرقم الوزاري</td>
                      <td className="p-1.5 border border-stone-300 w-1/4 font-mono">{ministerialNumber}</td>
                    </tr>
                    <tr>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">المرحلة الدراسية</td>
                      <td className="p-1.5 border border-stone-300">{academicStage}</td>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">الجنس</td>
                      <td className="p-1.5 border border-stone-300">{schoolGender}</td>
                    </tr>
                    <tr>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">المكتب التابعة له</td>
                      <td className="p-1.5 border border-stone-300">{officeBelonging}</td>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">مبنى المدرسة</td>
                      <td className="p-1.5 border border-stone-300">{buildingType}</td>
                    </tr>
                    <tr>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">اسم مدير/المدرسة</td>
                      <td className="p-1.5 border border-stone-300">{principalTameez}</td>
                      <td className="bg-emerald-100 font-bold p-1.5 border border-stone-300">رقم الجوال</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{phoneTameez}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 2. Results Summary Table with 4 Colors (Exact Image 3) */}
              <div className="mb-4">
                <div className="font-bold text-[#093c42] mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008489]"></span>
                  <span>ملخص نتائج أداء المدرسة وفق تقرير التقويم المدرسي:</span>
                </div>
                <table className="w-full border-collapse border border-stone-300 text-center">
                  <thead>
                    <tr>
                      <th className="bg-emerald-100 p-1.5 border border-stone-300 text-stone-900 w-2/5" rowSpan={2}>الوصف</th>
                      <th className="bg-emerald-100 p-1.5 border border-stone-300 text-stone-900 w-1/5" rowSpan={2}>نسبة الأداء (رقماً)</th>
                      <th className="bg-emerald-100 p-1.5 border border-stone-300 text-stone-900" colSpan={4}>مستوى المدرسة</th>
                    </tr>
                    <tr>
                      <th className="bg-emerald-600 text-white p-1 text-[10px]">التميز</th>
                      <th className="bg-blue-600 text-white p-1 text-[10px]">التقدم</th>
                      <th className="bg-amber-500 text-white p-1 text-[10px]">الانطلاق</th>
                      <th className="bg-rose-600 text-white p-1 text-[10px]">التهيئة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Overall */}
                    <tr className="font-bold bg-stone-50">
                      <td className="p-1.5 border border-stone-300 text-right">الأداء العام للمدرسة</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{averageScore}%</td>
                      <td className="p-1.5 border border-stone-300">{averageScore >= 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{averageScore >= 70 && averageScore < 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{averageScore >= 50 && averageScore < 70 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{averageScore < 50 ? '✓' : ''}</td>
                    </tr>
                    {/* Outcomes */}
                    <tr>
                      <td className="p-1.5 border border-stone-300 text-right">نواتج التعلم</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{outcomesScore}%</td>
                      <td className="p-1.5 border border-stone-300">{outcomesScore >= 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{outcomesScore >= 70 && outcomesScore < 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{outcomesScore >= 50 && outcomesScore < 70 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{outcomesScore < 50 ? '✓' : ''}</td>
                    </tr>
                    {/* Teaching */}
                    <tr>
                      <td className="p-1.5 border border-stone-300 text-right">التعليم والتعلم</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{learningScore}%</td>
                      <td className="p-1.5 border border-stone-300">{learningScore >= 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{learningScore >= 70 && learningScore < 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{learningScore >= 50 && learningScore < 70 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{learningScore < 50 ? '✓' : ''}</td>
                    </tr>
                    {/* Leadership */}
                    <tr>
                      <td className="p-1.5 border border-stone-300 text-right">الإدارة المدرسية</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{leadershipScore}%</td>
                      <td className="p-1.5 border border-stone-300">{leadershipScore >= 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{leadershipScore >= 70 && leadershipScore < 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{leadershipScore >= 50 && leadershipScore < 70 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{leadershipScore < 50 ? '✓' : ''}</td>
                    </tr>
                    {/* Environment */}
                    <tr>
                      <td className="p-1.5 border border-stone-300 text-right">البيئة المدرسية</td>
                      <td className="p-1.5 border border-stone-300 font-mono">{environmentScore}%</td>
                      <td className="p-1.5 border border-stone-300">{environmentScore >= 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{environmentScore >= 70 && environmentScore < 85 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{environmentScore >= 50 && environmentScore < 70 ? '✓' : ''}</td>
                      <td className="p-1.5 border border-stone-300">{environmentScore < 50 ? '✓' : ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Exact Footer matching Image 3 */}
              <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-[9px] text-stone-500">
                <div>تقرير واقع المدرسة للعام الدراسي 1448هـ - مدرسة {tameezSchool}</div>
                <div>منصة تميز الرقمية • هيئة تقويم التعليم والتدريب</div>
              </div>
            </div>

            {/* Export Toolbar */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => {
                  const text = `تقرير واقع المدرسة - منصة تميز: المدرسة: ${tameezSchool} - الأداء العام: ${averageScore}% (${overallLevel.name})`;
                  navigator.clipboard.writeText(text);
                  setTahseenCopied(true);
                  setTimeout(() => setTahseenCopied(false), 2000);
                }}
                className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                {tahseenCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{tahseenCopied ? 'تم النسخ' : 'نسخ التقرير'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة / حفظ PDF</span>
                </button>
                <button
                  onClick={() => downloadWordDocument('خطة تحسين وتقويم منصة تميز', `
                    <h2>المملكة العربية السعودية - وزارة التعليم</h2>
                    <h3>تقرير واقع المدرسة والتقويم الذاتي (منصة تميز)</h3>
                    <p>مدرسة: ${tameezSchool} | العام: 1448هـ | الأداء العام: ${averageScore}% (${overallLevel.name})</p>
                  `)}
                  className="px-4 py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تصدير Word (.docx)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. School General Info & Formations (Exact Image 1) */}
      {/* ============================================================== */}
      {activeTool === 'school_info' && (
        <div className="space-y-6">
          <div 
            className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md text-xs text-stone-900"
            style={{
              backgroundImage: 'url(/assets/aistudio/_____________b1c4c42d.jpg)',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Top Ministry Header */}
            <div className="flex justify-between items-start border-b-2 border-[#008489]/40 pb-3 mb-4">
              <div className="text-right space-y-0.5">
                <div className="font-bold text-[#093c42]">المملكة العربية السعودية</div>
                <div className="font-bold text-[#008489]">وزارة التعليم</div>
                <div className="text-[10px] text-stone-600">الإدارة العامة للتعليم بمنطقة: <span className="font-bold text-stone-900">الرياض</span></div>
                <div className="text-[10px] text-stone-600">اسم مكتب التعليم: <span className="font-bold text-stone-900">مكتب الشمال</span></div>
                <div className="text-[11px] font-bold text-stone-900">مدرسة: {generalSchoolName}</div>
              </div>

              <div className="text-center">
                <div className="bg-[#093c42] text-white py-1.5 px-6 rounded-lg font-black text-sm shadow-xs">
                  معلومات عامة عن المدرسة
                </div>
                <div className="text-[9px] text-stone-400 mt-1">تشكيلات الهيئة الإدارية والتعليمية والفصول</div>
              </div>

              <div className="text-left font-mono text-[10px] text-stone-600" dir="ltr">
                <div>التاريخ: {currentHijri}</div>
                <div>العام الدراسي: 1448هـ</div>
              </div>
            </div>

            {/* School Profile Bar */}
            <div className="mb-4">
              <table className="w-full border-collapse border border-stone-300 text-center">
                <thead>
                  <tr className="bg-emerald-100 text-stone-900 font-bold">
                    <th className="p-1.5 border border-stone-300">المدرسة</th>
                    <th className="p-1.5 border border-stone-300">المرحلة</th>
                    <th className="p-1.5 border border-stone-300">نوع التعليم</th>
                    <th className="p-1.5 border border-stone-300">استقلالية المبنى</th>
                    <th className="p-1.5 border border-stone-300">نوع المبنى</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1.5 border border-stone-300 font-bold">{generalSchoolName}</td>
                    <td className="p-1.5 border border-stone-300">ابتدائي</td>
                    <td className="p-1.5 border border-stone-300">عام</td>
                    <td className="p-1.5 border border-stone-300">مستقل</td>
                    <td className="p-1.5 border border-stone-300">حكومي</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 12 Staff Roles Table (Exact Image 1) */}
            <div className="mb-4">
              <div className="bg-emerald-100 font-bold text-center py-1 border border-stone-300 border-b-0 text-stone-900">
                التشكيلات المدرسية للهيئتين الإدارية والتعليمية (بالعدد)
              </div>
              <table className="w-full border-collapse border border-stone-300 text-center text-[11px]">
                <thead>
                  <tr className="bg-stone-50 text-stone-800">
                    <th className="p-1 border border-stone-300">مدير</th>
                    <th className="p-1 border border-stone-300">وكيل</th>
                    <th className="p-1 border border-stone-300">موجه طلابي</th>
                    <th className="p-1 border border-stone-300">معلم</th>
                    <th className="p-1 border border-stone-300">رائد نشاط مفرغ</th>
                    <th className="p-1 border border-stone-300">أمين مصادر تعلم</th>
                    <th className="p-1 border border-stone-300">مساعد إداري</th>
                    <th className="p-1 border border-stone-300">مسجل معلومات</th>
                    <th className="p-1 border border-stone-300">محضر حاسب</th>
                    <th className="p-1 border border-stone-300">محضر مختبر</th>
                    <th className="p-1 border border-stone-300">عامل خدمات</th>
                    <th className="p-1 border border-stone-300">حارس</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-bold font-mono text-[#008489]">
                    <td className="p-1.5 border border-stone-300">{staffCounts.principal}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.vicePrincipal}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.counselor}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.teacher}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.activityLeader}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.learningResources}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.adminAssistant}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.dataRegistrar}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.computerTech}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.labTech}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.servicesWorker}</td>
                    <td className="p-1.5 border border-stone-300">{staffCounts.guard}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Classes and Students Table (Exact Image 1) */}
            <div className="mb-4">
              <div className="bg-emerald-100 font-bold text-center py-1 border border-stone-300 border-b-0 text-stone-900">
                واقع تشكيلات المدرسة من الفصول والطلاب (بالعدد) - التعليم العام
              </div>
              <table className="w-full border-collapse border border-stone-300 text-center text-[11px]">
                <thead>
                  <tr className="bg-stone-50 text-stone-800">
                    <th className="p-1 border border-stone-300 w-1/4">الصف</th>
                    <th className="p-1 border border-stone-300">أول</th>
                    <th className="p-1 border border-stone-300">ثاني</th>
                    <th className="p-1 border border-stone-300">ثالث</th>
                    <th className="p-1 border border-stone-300">رابع</th>
                    <th className="p-1 border border-stone-300">خامس</th>
                    <th className="p-1 border border-stone-300">سادس</th>
                    <th className="p-1 border border-stone-300 bg-emerald-50 font-bold">المجموع</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1 border border-stone-300 font-bold text-right bg-stone-50">عدد الفصول</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c1_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c2_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c3_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c4_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c5_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c6_classes}</td>
                    <td className="p-1 border border-stone-300 font-mono font-bold bg-emerald-50 text-[#008489]">{totalClasses}</td>
                  </tr>
                  <tr>
                    <td className="p-1 border border-stone-300 font-bold text-right bg-stone-50">عدد الطلاب/ات</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c1_students}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c2_students}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c3_students}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c4_students}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c5_students}</td>
                    <td className="p-1 border border-stone-300 font-mono">{classCounts.c6_students}</td>
                    <td className="p-1 border border-stone-300 font-mono font-bold bg-emerald-50 text-[#008489]">{totalStudentsCount}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Facilities Table (Exact Image 1) */}
            <div className="mb-4">
              <div className="bg-emerald-100 font-bold text-center py-1 border border-stone-300 border-b-0 text-stone-900">
                المرافق التعليمية المساندة في المدرسة
              </div>
              <table className="w-full border-collapse border border-stone-300 text-center text-[11px]">
                <thead>
                  <tr className="bg-stone-50 text-stone-800">
                    <th className="p-1 border border-stone-300 w-1/4">النوع</th>
                    {facilities.map((f, i) => (
                      <th key={i} className="p-1 border border-stone-300">{f.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1 border border-stone-300 font-bold text-right bg-stone-50">التوفر</td>
                    {facilities.map((f, i) => (
                      <td key={i} className="p-1 border border-stone-300">
                        {f.available ? <span className="text-emerald-700 font-bold">متوفر</span> : <span className="text-stone-400">غير متوفر</span>}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-1 border border-stone-300 font-bold text-right bg-stone-50">العدد</td>
                    {facilities.map((f, i) => (
                      <td key={i} className="p-1 border border-stone-300 font-mono">
                        {f.count}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exact Footer from Image 1: خطة عمل الموجه الطلابي - مدرسة */}
            <div className="pt-3 border-t-2 border-[#008489]/40 flex justify-between items-center text-[10px] text-stone-600 font-bold">
              <div>خطة عمل الموجه الطلابي — مدرسة {generalSchoolName}</div>
              <div>الموجه الطلابي: {counselorDocName}</div>
              <div>العام الدراسي 1448هـ</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 flex justify-end gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المستند</span>
            </button>
            <button
              onClick={() => downloadWordDocument('معلومات وتشكيلات المدرسة العامة', `
                <h2>معلومات عامة عن المدرسة وتشكيلاتها 1448هـ</h2>
                <p>مدرسة: ${generalSchoolName} | عدد الطلاب: ${totalStudentsCount} | الفصول: ${totalClasses}</p>
              `)}
              className="px-4 py-2 bg-[#008489] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>تصدير Word (.docx)</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. School Discipline Certificate (Exact Image 2) */}
      {/* ============================================================== */}
      {activeTool === 'discipline_cert' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div className="font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#008489]" />
              <span>بيانات شهادة الانضباط المدرسي السريعة</span>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">اسم الطالب/ـة المكرم/ـة:</label>
              <input
                type="text"
                value={certStudent}
                onChange={(e) => setCertStudent(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-bold text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">الصف الدراسي:</label>
              <input
                type="text"
                value={certClass}
                onChange={(e) => setCertClass(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">اسم المدرسة:</label>
              <input
                type="text"
                value={certSchoolName}
                onChange={(e) => setCertSchoolName(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">مدير/ة المدرسة:</label>
              <input
                type="text"
                value={certPrincipalName}
                onChange={(e) => setCertPrincipalName(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">الموجه/ة الطلابي:</label>
              <input
                type="text"
                value={certCounselorName}
                onChange={(e) => setCertCounselorName(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Certificate Live Preview (Image 2) */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              className="bg-white rounded-2xl p-8 sm:p-12 border-4 border-[#008489]/30 shadow-lg text-center relative overflow-hidden flex flex-col justify-between min-h-[440px]"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, #f7fbfc 0%, #ffffff 100%)'
              }}
            >
              {/* Top Emblems Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-right">
                  <div className="text-xs font-bold text-[#008489]">المملكة العربية السعودية</div>
                  <div className="text-[10px] text-stone-500">وزارة التعليم • {certSchoolName}</div>
                </div>

                {/* Campaign Emblem */}
                <div className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-700 to-[#008489] text-white rounded-full text-xs font-black shadow-xs">
                  حملة الانضباط المدرسي 1448هـ
                </div>

                <div className="text-left font-mono text-[10px] text-stone-400">
                  VISION 2030
                </div>
              </div>

              {/* Certificate Core Text */}
              <div className="my-6 space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#093c42] tracking-wide">
                  شهادة شكر وتقدير للانضباط الدراسي
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed">
                  تتقدم إدارة مدرسة <span className="font-bold text-[#008489]">{certSchoolName}</span> بوافر الشكر والتقدير للطالب/ـة:
                </p>
                <div className="text-lg sm:text-xl font-black text-amber-700 py-1 border-b-2 border-amber-300 inline-block px-8">
                  {certStudent}
                </div>
                <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed pt-2">
                  بالصف <span className="font-bold text-stone-900">{certClass}</span> نظير تميزه وانضباطه الدراسي وحرصه على الحضور وعدم الغياب في {certTerm} للعام الدراسي 1448هـ.
                </p>
              </div>

              {/* Signatures matching Image 2 */}
              <div className="pt-6 border-t border-stone-200 mt-6 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="font-bold text-stone-800">الموجه/ة الطلابي :</div>
                  <div className="text-[#008489] font-bold mt-1">{certCounselorName}</div>
                  <div className="text-[10px] text-stone-400 pt-2">التوقيع: .....................</div>
                </div>

                <div>
                  <div className="font-bold text-stone-800">مدير/ة المدرسة :</div>
                  <div className="text-[#008489] font-bold mt-1">{certPrincipalName}</div>
                  <div className="text-[10px] text-stone-400 pt-2">الختم والاعتماد: .....................</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الشهادة فوراً</span>
              </button>
              <button
                onClick={() => downloadWordDocument('شهادة انضباط مدرسي', `
                  <h2 style="text-align: center; color: #008489;">شهادة شكر وتقدير للانضباط المدرسي 1448هـ</h2>
                  <p style="text-align: center; font-size: 16px;">للطالب/ـة: ${certStudent} - ${certClass}</p>
                `)}
                className="px-4 py-2 bg-[#008489] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تصدير Word (.docx)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. School Cover & Signatures 1448H (Images WA0007 & متجر احتياجك) */}
      {/* ============================================================== */}
      {activeTool === 'school_cover' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-xs">
            <div className="font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#008489]" />
              <span>تخصيص غلاف وتواقيع السجل (1448هـ)</span>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">مسمى السجل المدرسي:</label>
              <input
                type="text"
                value={coverTitle}
                onChange={(e) => setCoverTitle(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-bold text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">اسم المدرسة:</label>
              <input
                type="text"
                value={coverSchool}
                onChange={(e) => setCoverSchool(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">مدير/ة المدرسة:</label>
              <input
                type="text"
                value={coverPrincipal}
                onChange={(e) => setCoverPrincipal(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">مسؤولة السجل:</label>
              <input
                type="text"
                value={coverSupervisor}
                onChange={(e) => setCoverSupervisor(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">منسق/ة العمل التعاوني:</label>
              <input
                type="text"
                value={coverCoordinator}
                onChange={(e) => setCoverCoordinator(e.target.value)}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Cover Preview (Exact Images WA0007 & متجر احتياجك) */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              className="bg-white rounded-2xl p-8 sm:p-14 border border-stone-200 shadow-lg text-center relative overflow-hidden min-h-[580px] flex flex-col justify-between"
              style={{
                backgroundImage: 'url(/assets/aistudio/_____________b1c4c42d.jpg)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-stone-200 pb-3">
                <div className="text-right text-xs">
                  <div className="font-bold text-[#093c42]">المملكة العربية السعودية</div>
                  <div className="font-bold text-[#008489]">وزارة التعليم</div>
                  <div className="text-[10px] text-stone-500">الإدارة العامة للتعليم بمنطقة الرياض</div>
                  <div className="text-[11px] font-bold text-stone-900">مدرسة: {coverSchool}</div>
                </div>

                <div className="text-left font-mono text-[10px] text-stone-600" dir="ltr">
                  <div>{currentHijri}</div>
                  <div>{currentGregorian}</div>
                </div>
              </div>

              {/* Center Emblem: Exact WA0007 Image */}
              <div className="my-auto py-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#e6f3f4] to-white border border-[#c2e2e5] flex items-center justify-center mx-auto shadow-sm">
                  <Calendar className="w-8 h-8 text-[#008489]" />
                </div>
                <div className="text-sm font-bold text-[#008489]">العام الدراسي</div>
                <div className="text-3xl font-black text-amber-700 font-mono tracking-wider">
                  {coverYear}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#093c42] pt-4 max-w-md mx-auto">
                  {coverTitle}
                </h2>
              </div>

              {/* Exact Bottom Signatures from WA0007 */}
              <div className="pt-6 border-t-2 border-[#008489]/40 mt-8">
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white/80 border border-stone-200">
                    <div className="font-bold text-stone-800">مسؤولة السجل :</div>
                    <div className="text-[#008489] font-bold mt-1">{coverSupervisor}</div>
                  </div>

                  <div className="p-2 rounded-xl bg-white/80 border border-stone-200">
                    <div className="font-bold text-stone-800">منسق/ة العمل التعاوني :</div>
                    <div className="text-[#008489] font-bold mt-1">{coverCoordinator}</div>
                  </div>

                  <div className="p-2 rounded-xl bg-white/80 border border-stone-200">
                    <div className="font-bold text-stone-800">مدير/ة المدرسة :</div>
                    <div className="text-[#008489] font-bold mt-1">{coverPrincipal}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-stone-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة الغلاف</span>
              </button>
              <button
                onClick={() => downloadWordDocument('غلاف سجل مدرسي رسمي', `
                  <div style="text-align: center;">
                    <h1>المملكة العربية السعودية - وزارة التعليم</h1>
                    <h2>${coverTitle}</h2>
                    <h3>العام الدراسي ${coverYear}</h3>
                    <p>مدرسة: ${coverSchool}</p>
                    <p>مدير/ة المدرسة: ${coverPrincipal} | مسؤولة السجل: ${coverSupervisor}</p>
                  </div>
                `)}
                className="px-4 py-2 bg-[#008489] text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>تصدير Word (.docx)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. Absence & Discipline Calculator */}
      {/* ============================================================== */}
      {activeTool === 'absence' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">حاسبة الانضباط المدرسي ومعدلات الحضور والغياب</h3>
              <p className="text-xs text-stone-500">حساب فوري للنسب المئوية ومعدلات الانضباط وفق معايير الوزارة</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              نسبة الحضور: {attendanceRate}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">إجمالي عدد طلاب المدرسة:</label>
              <input
                type="number"
                value={totalStudents}
                onChange={(e) => setTotalStudents(Number(e.target.value))}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">عدد أيام الدراسة المحسوبة:</label>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(Number(e.target.value))}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">الغياب بعذر (طبي/رسمي):</label>
              <input
                type="number"
                value={excusedAbsences}
                onChange={(e) => setExcusedAbsences(Number(e.target.value))}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-stone-700 block mb-1">الغياب بدون عذر:</label>
              <input
                type="number"
                value={unexcusedAbsences}
                onChange={(e) => setUnexcusedAbsences(Number(e.target.value))}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg font-mono font-bold text-rose-600"
              />
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs text-stone-500 block mb-1">الحضور الفعلي الإجمالي</span>
              <span className="text-xl font-black text-stone-900 font-mono">{actualAttendances.toLocaleString()}</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs text-stone-500 block mb-1">إجمالي أيام الغياب</span>
              <span className="text-xl font-black text-rose-600 font-mono">{totalAbsences}</span>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 block mb-1">معدل الانضباط</span>
              <span className="text-xl font-black text-emerald-700 font-mono">{attendanceRate}%</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
              <span className="text-xs text-stone-500 block mb-1">التقييم الوزاري</span>
              <span className={`text-sm font-bold block mt-1 ${Number(attendanceRate) >= 95 ? 'text-emerald-700' : 'text-amber-700'}`}>
                {Number(attendanceRate) >= 95 ? '⭐ انضباط متميز' : 'يحتاج متابعة وتفعيل خطة'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
