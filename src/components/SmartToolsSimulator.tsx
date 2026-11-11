import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Award, 
  Table2, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  Printer, 
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
  Info,
  Layers,
  ChevronDown,
  BookOpen,
  Search,
  Filter,
  Plus,
  Trash2,
  Share2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FolderOpen
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import { useStore } from '../context/StoreContext';
import { generateAndDownloadDocx } from '../lib/docxGenerator';

// Tool Definition interface
interface ToolDef {
  id: string;
  name: string;
  group: 'school_admin' | 'plans_development' | 'portfolios_guides' | 'certificates_cards' | 'excel_tracking';
  category: string;
  badge: string;
  description: string;
  format: string;
  imagePreview?: string;
  defaultTable?: {
    columns: string[];
    rows: (string | number)[][];
  };
}

export const SmartToolsSimulator: React.FC = () => {
  const { settings } = useStore();
  
  // Navigation: Tools Studio OR Client Documents Library OR Subscriptions Hub
  const [activeView, setActiveView] = useState<'studio' | 'library' | 'plans'>('studio');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Tool state
  const [selectedToolId, setSelectedToolId] = useState<string>('tahseen');
  const [currentStage, setCurrentStage] = useState<'form' | 'processing' | 'preview'>('form');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Client Subscription State (Simulating Authenticated Account Quotas)
  const [clientPlan, setClientPlan] = useState({
    name: 'الباقة السنوية الاحترافية (Pro 1448)',
    usedGenerations: 6,
    maxGenerations: 50,
    validUntil: '1448/12/30هـ',
    licenseKey: 'SULTAN-1448-PRO-9842',
    tier: 'pro'
  });

  // Client Documents Library State (Fetched from /api/client/documents)
  const [clientDocuments, setClientDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState<boolean>(false);
  const [libraryFilter, setLibraryFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Real-time Date and Time Engine
  const [currentHijri, setCurrentHijri] = useState<string>('21 جمادى الأولى 1448هـ');
  const [currentGregorian, setCurrentGregorian] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [autoDate, setAutoDate] = useState<boolean>(true);

  // Common School Metadata State (Official Saudi Ministry standard)
  const [schoolName, setSchoolName] = useState<string>('مدرسة الأمل النموذجية');
  const [educationRegion, setEducationRegion] = useState<string>('الرياض');
  const [officeBelonging, setOfficeBelonging] = useState<string>('مكتب التعليم شمال');
  const [academicYear, setAcademicYear] = useState<string>('1448هـ');
  const [ministerialNumber, setMinisterialNumber] = useState<string>('1098234');
  const [academicStage, setAcademicStage] = useState<string>('المرحلة المتوسطة');
  const [schoolGender, setSchoolGender] = useState<'بنين' | 'بنات'>('بنين');
  const [buildingType, setBuildingType] = useState<'مستقل' | 'مشترك'>('مستقل');
  const [principalName, setPrincipalName] = useState<string>('أ. مريم بن عبدالله الغامدي');
  const [counselorName, setCounselorName] = useState<string>('أ. سارة بن سعد القحطاني');
  const [supervisorName, setSupervisorName] = useState<string>('أ. فاطمة بن خالد العتيبي');
  const [coordinatorName, setCoordinatorName] = useState<string>('أ. نورة بن فهد الشمري');
  const [contactPhone, setContactPhone] = useState<string>('0508095912');

  // Specific Tool: Tahseen & Tameez (Image 3)
  const [evalType, setEvalType] = useState<'ذاتي' | 'خارجي'>('ذاتي');
  const [leadershipScore, setLeadershipScore] = useState<number>(88);
  const [learningScore, setLearningScore] = useState<number>(76);
  const [outcomesScore, setOutcomesScore] = useState<number>(64);
  const [environmentScore, setEnvironmentScore] = useState<number>(92);
  const averageScore = Math.round((leadershipScore + learningScore + outcomesScore + environmentScore) / 4);

  // Specific Tool: School Info & Formations (Image 1)
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

  // Specific Tool: Discipline Certificate (Image 2)
  const [certStudent, setCertStudent] = useState<string>('سارة بن خالد القحطاني');
  const [certClass, setCertClass] = useState<string>('الصف الثالث الابتدائي');
  const [certTerm, setCertTerm] = useState<string>('الفصل الدراسي الأول');

  // Specific Tool: School Operational & Tasks Table (WA0007 / Image 4)
  const [docCustomTitle, setDocCustomTitle] = useState<string>('سجل التكليفات والمهام الإدارية والتعليمية');
  const [docCustomNotes, setDocCustomNotes] = useState<string>('تم اعتماد هذا المستند وتوثيقه وفق لوائح وأنظمة وزارة التعليم للعام الدراسي 1448هـ.');
  const [dynamicTableRows, setDynamicTableRows] = useState<Array<{ id: string; col1: string; col2: string; col3: string; col4: string; col5: string }>>([
    { id: '1', col1: '1', col2: 'إعداد الخطة التشغيلية وتشكيل لجان المدرسة', col3: 'مدير/ة المدرسة', col4: 'الأسبوع الأول', col5: 'منجز 100%' },
    { id: '2', col1: '2', col2: 'توزيع التكليفات والمهام الإدارية والتعليمية', col3: 'وكيل/ة المدرسة', col4: 'الأسبوع الأول', col5: 'منجز 100%' },
    { id: '3', col1: '3', col2: 'حصر تشكيلات الطلاب والفصول والمرافق المساندة', col3: 'الموجه/ة الطلابي', col4: 'الأسبوع الثاني', col5: 'قيد المتابعة' },
    { id: '4', col1: '4', col2: 'متابعة الانضباط المدرسي ورصد الغياب عبر المنصة', col3: 'لجنة الانضباط', col4: 'مستمر طوال الفصل', col5: 'نشط' }
  ]);

  // Specific Tool: Absence & Discipline Calculator
  const [totalEnrolledStudents, setTotalEnrolledStudents] = useState<number>(450);
  const [totalSchoolDays, setTotalSchoolDays] = useState<number>(20);
  const [excusedAbsences, setExcusedAbsences] = useState<number>(36);
  const [unexcusedAbsences, setUnexcusedAbsences] = useState<number>(18);

  const totalPossibleAttendances = totalEnrolledStudents * totalSchoolDays;
  const totalAbsences = excusedAbsences + unexcusedAbsences;
  const actualAttendances = totalPossibleAttendances - totalAbsences;
  const attendanceRate = totalPossibleAttendances > 0 
    ? ((actualAttendances / totalPossibleAttendances) * 100).toFixed(2) 
    : '0';

  const previewPrintRef = useRef<HTMLDivElement>(null);

  // Live Auto-Update Clock
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

  // Fetch Client Documents on mount or library view
  const fetchClientDocs = async () => {
    setLoadingDocs(true);
    try {
      const res = await fetch('/api/client/documents');
      if (res.ok) {
        const data = await res.json();
        setClientDocuments(data);
      }
    } catch {
      // fallback
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchClientDocs();
  }, []);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 5 Master Tool Groups Library
  const toolsLibrary: ToolDef[] = [
    // Group 1: أدوات الإدارة المدرسية (School Admin)
    {
      id: 'tool_principal_record',
      name: 'سجل مدير المدرسة للمتابعة اليومية والإجرائية',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'معتمد 1448هـ',
      description: 'توليد سجل مدير المدرسة الشامل مع رصد المهام والقرارات ومتابعة سير اليوم الدراسي والزيارات الإشرافية',
      format: 'Word (.docx) + PDF',
      defaultTable: {
        columns: ['م', 'المجال الإداري', 'المسؤول المباشر', 'مؤشر الإنجاز', 'حالة التنفيذ'],
        rows: [
          [1, 'الإشراف على الاصطفاف الصباحي والانضباط', 'مدير المدرسة', 'نسبة الحضور 98%', 'مكتمل يومياً'],
          [2, 'متابعة انتظام الحصص الدراسية وسد الاحتياج', 'وكيل الشؤون التعليمية', 'لا يوجد حصص شاغرة', 'منجز'],
          [3, 'اعتماد خطط النشاط الطلابي والبرامج التوجيهية', 'رائد النشاط والموجه', 'خطة معتمدة فصلياً', 'منجز'],
          [4, 'مراجعة إجراءات الأمن والسلامة المدرسية', 'لجنة الطوارئ', 'جاهزية مخارج الطوارئ', 'نشط']
        ]
      }
    },
    {
      id: 'tool_school_cover',
      name: 'أغلفة السجلات الرسمية والتكليفات المدرسية (1448هـ)',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'مطابق للصورة الرسمية',
      description: 'توليد وتنسيق غلاف رسمي معتمد لسجلات المدرسة يتضمن شعار الوزارة، التكليفات، واعتمادات الإدارة الثلاثية',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_school_info',
      name: 'كشف التشكيلات المدرسية وتوزيع الفصول والمرافق',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'مطابق لصورة الوزارة',
      description: 'توليد الجدول الرسمي المعتمد لإحصائيات المدرسة والكوادر التعليمية والإدارية والصفوف والمرافق المساندة',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_vice_record',
      name: 'سجل وكيل المدرسة للشؤون التعليمية والمدرسية',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'جديد 1448',
      description: 'سجل وكيل المدرسة لتنظيم الحصص والانتظار والمناوبة اليومية والإشراف الفني على البيئة التعليمية',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_classroom_visits',
      name: 'سجل الزيارات الصفية وتقويم أداء المعلمين',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'نموذج فني',
      description: 'أداة توثيق الزيارات الإشرافية الميدانية للمعلمين في الحصص وقياس فاعلية استراتيجيات التدريس',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_school_committees',
      name: 'سجل تشكيل اللجان المدرسية ومحاضر الاجتماعات',
      group: 'school_admin',
      category: 'الإدارة المدرسية',
      badge: 'قوالب نظامية',
      description: 'إنشاء قرارات تشكيل اللجان (لجنة التوجيه، الانضباط، التحصيل، الصندوق) مع نماذج المحاضر والتوصيات',
      format: 'Word (.docx) + PDF'
    },

    // Group 2: أدوات الخطط والتطوير (Plans & Development)
    {
      id: 'tahseen',
      name: 'أداة تحسين — خطة التقويم الذاتي المدرسي (منصة تميز)',
      group: 'plans_development',
      category: 'التقويم الذاتي والتحسين',
      badge: 'الأداة الأكثر طلباً',
      description: 'المعالجة الذكية لدرجات مجالات التقويم المدرسي وتحويلها فورياً إلى خطة تحسين إجرائية معتمدة بصيغتي Word و PDF',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_operational_plan',
      name: 'مولد الخطة التشغيلية السنوية الشاملة للمدرسة',
      group: 'plans_development',
      category: 'الخطط التشغيلية',
      badge: 'شاملة 1448هـ',
      description: 'بناء خطة المدرسة التشغيلية الموزعة على الأسابيع والفصول مع ربطها بالأهداف الوزارية ومؤشرات الأداء',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_remedial_plan',
      name: 'الخطة العلاجية لمعالجة الفاقد التعليمي ومهارات الطلاب',
      group: 'plans_development',
      category: 'الخطط التطويرية',
      badge: 'معالجة الفاقد',
      description: 'تحديد المهارات المستهدفة والطلاب المستفيدين وجدول البرامج الإثرائية والعلاجية وقياس التحسن',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_swot_analysis',
      name: 'مصفوفة تحليل واقع المدرسة (SWOT Analysis)',
      group: 'plans_development',
      category: 'التشخيص والتطوير',
      badge: 'تشخيص مؤسسي',
      description: 'تحليل نقاط القوة والضعف والفرص والتحديات للمدرسة وربطها بالتوصيات والمبادرات التحسينية',
      format: 'Word (.docx) + PDF'
    },

    // Group 3: أدوات ملفات الإنجاز (Portfolios & Guides)
    {
      id: 'tool_teacher_portfolio',
      name: 'ملف إنجاز المعلم/ة الرقمي المطور (Portfolio)',
      group: 'portfolios_guides',
      category: 'ملفات الإنجاز',
      badge: 'جاهز للتعديل',
      description: 'توليد هيكل ملف الإنجاز المهني للمعلم متضمناً السيرة، الفلسفة، النمو المهني، والشواهد والأدلة',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_counselor_portfolio',
      name: 'ملف إنجاز وسجل الموجه/ة الطلابي',
      group: 'portfolios_guides',
      category: 'ملفات الإنجاز',
      badge: 'توجيه وإرشاد',
      description: 'توثيق برامج التوجيه الطلابي، رعاية الموهوبين والمتعثرين، ودراسة الحالات السلوكية والنفسية',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_evidence_docs',
      name: 'سجل توثيق شواهد وأدلة الأداء الوظيفي والتميز',
      group: 'portfolios_guides',
      category: 'الشواهد والأدلة',
      badge: 'معايير التميز',
      description: 'نماذج تنظيم شواهد الإنجاز وفق معايير تقييم الأداء الوظيفي ورتب المعلمين الجديدة',
      format: 'Word (.docx) + PDF'
    },

    // Group 4: أدوات الشهادات والبطاقات (Certificates & Cards)
    {
      id: 'tool_discipline_cert',
      name: 'مولد شهادات الانضباط المدرسي السريعة',
      group: 'certificates_cards',
      category: 'الشهادات والتهنئة',
      badge: 'مطابق للصورة الرسمية',
      description: 'توليد فوري لشهادات شكر وتقدير الانضباط المدرسي والحضور الكامل بتصميم وزارة التعليم مع التوقيعات',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_excellence_cert',
      name: 'شهادات التفوق والتميز الدراسي للمتفوقين',
      group: 'certificates_cards',
      category: 'الشهادات والتهنئة',
      badge: 'تصميم راقٍ',
      description: 'توليد شهادات التكريم للأوائل والمتفوقين في الاختبارات الشهرية والفصلية مع شعارات الوزارة',
      format: 'Word (.docx) + PDF'
    },
    {
      id: 'tool_greeting_cards',
      name: 'بطاقات التهنئة بالعام الجديد واليوم الوطني',
      group: 'certificates_cards',
      category: 'الشهادات والتهنئة',
      badge: 'تفاعلي',
      description: 'أداة إنشاء بطاقات تهنئة باسم المدرسة ومنسوبيها لمناسبات العام الدراسي واليوم الوطني ويوم التأسيس',
      format: 'Word (.docx) + PDF'
    },

    // Group 5: أدوات Excel والمتابعة (Excel & Tracking)
    {
      id: 'tool_absence_calc',
      name: 'حاسبة وكشف رصد الغياب ونسب الانضباط المدرسي',
      group: 'excel_tracking',
      category: 'كشوفات المتابعة',
      badge: 'حساب تلقائي',
      description: 'حساب النسب المئوية للحضور والغياب بعذر وبدون عذر وتوليد تقرير إحصائي مفصل للمدير والمكتب',
      format: 'Excel / Word / PDF'
    },
    {
      id: 'tool_grades_tracking',
      name: 'كشف متابعة درجات الطلاب التراكمي والفصلي',
      group: 'excel_tracking',
      category: 'كشوفات المتابعة',
      badge: 'كشوف رصد',
      description: 'جداول إلكترونية لرصد أعمال السنة، المهام الأدائية، والاختبارات القصيرة مع حساب المتوسطات',
      format: 'Excel + Word (.docx)'
    }
  ];

  // Filtered tools
  const filteredTools = useMemo(() => {
    return toolsLibrary.filter(t => {
      const matchGroup = selectedGroup === 'all' || t.group === selectedGroup;
      const matchQuery = !searchQuery || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGroup && matchQuery;
    });
  }, [toolsLibrary, selectedGroup, searchQuery]);

  const activeToolDef = useMemo(() => {
    return toolsLibrary.find(t => t.id === selectedToolId) || toolsLibrary[0];
  }, [toolsLibrary, selectedToolId]);

  // Handle Dynamic Rows in Custom Table
  const handleAddTableRow = () => {
    const newId = String(Date.now());
    setDynamicTableRows(prev => [
      ...prev,
      {
        id: newId,
        col1: String(prev.length + 1),
        col2: 'بند تنفيذي ومهمة إجرائية جديدة',
        col3: 'المسؤول المكلف',
        col4: 'الأسبوع القادم',
        col5: 'قيد التنفيذ'
      }
    ]);
  };

  const handleDeleteTableRow = (id: string) => {
    setDynamicTableRows(prev => prev.filter(r => r.id !== id));
  };

  const handleUpdateTableRow = (id: string, field: 'col2' | 'col3' | 'col4' | 'col5', val: string) => {
    setDynamicTableRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));
  };

  // Run Smart Processing (Stage 3 -> 4)
  const handleProcessTool = async () => {
    setIsProcessing(true);
    setCurrentStage('processing');

    // Simulate smart algorithmic processing & analysis (500ms for responsiveness)
    setTimeout(async () => {
      setIsProcessing(false);
      setCurrentStage('preview');
      showToast('تمت المعالجة الذكية بنجاح وتوليد المستند وفق معايير 1448هـ!');

      // Register generation run on the backend to maintain audit log & quotas
      try {
        await fetch('/api/smart-tools/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            toolId: activeToolDef.id,
            formData: {
              title: activeToolDef.name,
              schoolName,
              educationRegion,
              principalName,
              academicYear,
              averageScore,
              attendanceRate
            },
            clientUsername: 'demo_subscriber'
          })
        });
        setClientPlan(prev => ({
          ...prev,
          usedGenerations: Math.min(prev.maxGenerations, prev.usedGenerations + 1)
        }));
        fetchClientDocs();
      } catch {
        // Continue even if offline
      }
    }, 700);
  };

  // Generate Real Microsoft Word DOCX
  const handleDownloadRealDocx = async () => {
    try {
      showToast('جاري تصدير ملف Word (.docx) الأصلي...');

      if (activeToolDef.id === 'tahseen') {
        await generateAndDownloadDocx({
          title: 'خطة التحسين والتطوير المدرسي (منصة تميز للتقويم المدرسي)',
          subtitle: `المستوى العام للمدرسة: ${getLevelInfo(averageScore).name} — النسبة العامة: ${averageScore}%`,
          schoolName,
          educationRegion,
          academicYear,
          officeName: officeBelonging,
          principalName,
          counselorName,
          supervisorName,
          coordinatorName,
          summaryItems: [
            { label: 'الرقم الوزاري', value: ministerialNumber },
            { label: 'المرحلة الدراسية', value: academicStage },
            { label: 'نوع التقويم', value: evalType === 'ذاتي' ? 'تقويم مدرسي ذاتي' : 'تقويم خارجي معتمد' },
            { label: 'جوال مدير المدرسة', value: contactPhone }
          ],
          tableData: {
            columns: ['مجال التقويم', 'الدرجة المحققة', 'مستوى الأداء', 'الهدف التحسيني والمبادرة الإجرائية'],
            rows: [
              ['الإدارة المدرسية', `${leadershipScore}%`, getLevelInfo(leadershipScore).name, 'تطوير آليات الإشراف وتفعيل مجالس التطوير'],
              ['التعليم والتعلم', `${learningScore}%`, getLevelInfo(learningScore).name, 'تطبيق استراتيجيات التمايز وتنمية التفكير الناقد'],
              ['نواتج التعلم', `${outcomesScore}%`, getLevelInfo(outcomesScore).name, 'برامج علاجية لرفع مهارات الاختبارات الوطنية (نافس)'],
              ['البيئة المدرسية', `${environmentScore}%`, getLevelInfo(environmentScore).name, 'تعزيز مرافق السلامة والبيئة الجاذبة المحفزة']
            ]
          },
          notes: 'توصيات هيئة تقويم التعليم: تكثيف المتابعة الصفية للتركيز على نواتج التعلم وتطبيق مؤشرات الأداء بشكل دوري.'
        });
      } else if (activeToolDef.id === 'tool_school_info') {
        await generateAndDownloadDocx({
          title: 'كشف التشكيلات المدرسية وتوزيع الفصول والمرافق',
          subtitle: `مجموع الفصول: ${totalClasses} فصلاً — إجمالي الطلاب: ${totalStudentsCount} طالباً`,
          schoolName,
          educationRegion,
          academicYear,
          officeName: officeBelonging,
          principalName,
          counselorName,
          tableData: {
            columns: ['الصف الدراسي', 'عدد الفصول', 'عدد الطلاب', 'متوسط الكثافة الصفية'],
            rows: [
              ['الصف الأول', classCounts.c1_classes, classCounts.c1_students, Math.round(classCounts.c1_students / classCounts.c1_classes)],
              ['الصف الثاني', classCounts.c2_classes, classCounts.c2_students, Math.round(classCounts.c2_students / classCounts.c2_classes)],
              ['الصف الثالث', classCounts.c3_classes, classCounts.c3_students, Math.round(classCounts.c3_students / classCounts.c3_classes)],
              ['الصف الرابع', classCounts.c4_classes, classCounts.c4_students, Math.round(classCounts.c4_students / classCounts.c4_classes)],
              ['الصف الخامس', classCounts.c5_classes, classCounts.c5_students, Math.round(classCounts.c5_students / classCounts.c5_classes)],
              ['الصف السادس', classCounts.c6_classes, classCounts.c6_students, Math.round(classCounts.c6_students / classCounts.c6_classes)],
              ['الإجمالي الكلي', totalClasses, totalStudentsCount, Math.round(totalStudentsCount / totalClasses)]
            ]
          },
          notes: 'تمت مطابقة هذا الكشف مع بوابة نور الوزارية وحصر التشكيلات المعتمدة للعام 1448هـ.'
        });
      } else if (activeToolDef.id === 'tool_discipline_cert') {
        await generateAndDownloadDocx({
          title: 'شهادة شكر وتقدير للانضباط المدرسي',
          subtitle: `تهنئة وتقدير للطالب/ة: ${certStudent} — ${certClass}`,
          schoolName,
          educationRegion,
          academicYear,
          principalName,
          counselorName,
          summaryItems: [
            { label: 'المدرسة', value: schoolName },
            { label: 'الفصل الدراسي', value: certTerm },
            { label: 'اسم الطالب/ة', value: certStudent },
            { label: 'الصف', value: certClass }
          ],
          notes: 'يسر إدارة المدرسة ومنسوبوها منح هذه الشهادة تقديراً للالتزام التام بالانضباط والحضور اليومي وعدم الغياب طوال الفصل الدراسي.'
        });
      } else {
        // Generic Tool Export with Dynamic Rows
        await generateAndDownloadDocx({
          title: activeToolDef.name,
          subtitle: `وثيقة معتمدة لإدارة مدرسة ${schoolName}`,
          schoolName,
          educationRegion,
          academicYear,
          officeName: officeBelonging,
          principalName,
          counselorName,
          supervisorName,
          coordinatorName,
          tableData: {
            columns: ['م', 'المهمة / الإجراء', 'المسؤول', 'الفترة الزمنية', 'نسبة الإنجاز'],
            rows: dynamicTableRows.map(r => [r.col1, r.col2, r.col3, r.col4, r.col5])
          },
          notes: docCustomNotes
        });
      }

      showToast('تم تحميل ملف Word (.docx) بنجاح!');
    } catch (e: any) {
      showToast('حدث خطأ أثناء تصدير Word: ' + (e?.message || ''));
    }
  };

  // Print Official PDF
  const handlePrintPdf = () => {
    window.print();
  };

  // Four-Tier Colors according to National Education Evaluation Authority (Image 3)
  const getLevelInfo = (score: number) => {
    if (score >= 85) return { name: 'التميز', color: 'bg-emerald-600 text-white', textColor: 'text-emerald-700', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-300' };
    if (score >= 70) return { name: 'التقدم', color: 'bg-blue-600 text-white', textColor: 'text-blue-700', badgeColor: 'bg-blue-50 text-blue-700 border-blue-300' };
    if (score >= 50) return { name: 'الانطلاق', color: 'bg-amber-500 text-white', textColor: 'text-amber-700', badgeColor: 'bg-amber-50 text-amber-700 border-amber-300' };
    return { name: 'التهيئة', color: 'bg-rose-600 text-white', textColor: 'text-rose-700', badgeColor: 'bg-rose-50 text-rose-700 border-rose-300' };
  };

  return (
    <div className="space-y-6 pb-20 font-sans" dir="rtl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#093c42] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-teal-500/30 text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Client Subscription Status Bar */}
      <div className="bg-gradient-to-r from-[#093c42] to-[#008489] text-white p-5 rounded-2xl shadow-md border border-teal-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                اشتراك مفعل
              </span>
              <span className="text-xs text-teal-100 font-mono">ترخيص: {clientPlan.licenseKey}</span>
            </div>
            <h1 className="text-base sm:text-xl font-black">
              بوابة الأدوات الذكية ومولد المستندات المدرسية المعتمدة (1448هـ)
            </h1>
            <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
              محرك ذكي متكامل لتوليد وتعديل سجلات المدرسة، خطط التحسين والتقويم الذاتي (منصة تميز)، شهادات الانضباط، وكشوفات المتابعة بصيغتي Word و PDF.
            </p>
          </div>

          {/* Quota Gauge & Upgrade */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex flex-col sm:flex-row items-center gap-4 text-xs shrink-0">
            <div className="space-y-1 text-right">
              <div className="flex justify-between items-center gap-4 text-[11px] text-teal-100">
                <span>رصيد المستندات:</span>
                <span className="font-bold text-white">{clientPlan.usedGenerations} / {clientPlan.maxGenerations} مستند</span>
              </div>
              <div className="w-44 bg-teal-950/60 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(clientPlan.usedGenerations / clientPlan.maxGenerations) * 100}%` }}
                />
              </div>
              <div className="text-[10px] text-teal-200">صالح حتى: {clientPlan.validUntil}</div>
            </div>

            <button
              onClick={() => setActiveView('plans')}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-3.5 py-2 rounded-lg text-xs transition-colors shrink-0 shadow-xs"
            >
              ترقية الباقة
            </button>
          </div>
        </div>

        {/* Live Saudi Ministry Date & Time Banner */}
        <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Calendar className="w-4 h-4" />
              <span>{currentHijri}</span>
            </div>
            <span className="text-teal-300">|</span>
            <div className="flex items-center gap-1.5 font-mono text-teal-100">
              <Clock className="w-4 h-4 text-emerald-300" />
              <span>{currentTime}</span>
            </div>
          </div>

          {/* Master View Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('studio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'studio' ? 'bg-white text-[#093c42] shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
            >
              استوديو المولدات الذكية
            </button>
            <button
              onClick={() => setActiveView('library')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'library' ? 'bg-white text-[#093c42] shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>مكتبة مستنداتي ({clientDocuments.length})</span>
            </button>
            <button
              onClick={() => setActiveView('plans')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeView === 'plans' ? 'bg-white text-[#093c42] shadow-xs' : 'text-teal-100 hover:text-white'
              }`}
            >
              باقات الاشتراك
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: STUDIO (SMART TOOLS GENERATOR) */}
      {activeView === 'studio' && (
        <div className="space-y-6">
          {/* Group Tabs & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#008489]" />
                <h2 className="text-sm sm:text-base font-bold text-stone-900">
                  مكتبة الأدوات الذكية المعتمدة (5 مجموعات تخصصية)
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="ابحث عن أداة أو سجل..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008489]/30"
                />
              </div>
            </div>

            {/* 5 Group Selectors */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setSelectedGroup('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'all' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                جميع الأدوات ({toolsLibrary.length})
              </button>
              <button
                onClick={() => setSelectedGroup('school_admin')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'school_admin' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                1. الإدارة المدرسية (6)
              </button>
              <button
                onClick={() => setSelectedGroup('plans_development')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'plans_development' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                2. الخطط والتطوير والتقويم (4)
              </button>
              <button
                onClick={() => setSelectedGroup('portfolios_guides')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'portfolios_guides' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                3. ملفات الإنجاز والشواهد (3)
              </button>
              <button
                onClick={() => setSelectedGroup('certificates_cards')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'certificates_cards' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                4. الشهادات والبطاقات (3)
              </button>
              <button
                onClick={() => setSelectedGroup('excel_tracking')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedGroup === 'excel_tracking' ? 'bg-[#008489] text-white shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                5. كشوفات Excel والمتابعة (2)
              </button>
            </div>
          </div>

          {/* Quick Tool Selector Carousel/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((t) => {
              const isSelected = t.id === selectedToolId;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedToolId(t.id);
                    setCurrentStage('form');
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 text-right ${
                    isSelected
                      ? 'bg-teal-50/60 border-[#008489] ring-2 ring-[#008489]/20 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-teal-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                      {t.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#008489]/10 text-[#008489]">
                      {t.badge}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-1 leading-snug">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mb-3">
                    {t.description}
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100">
                    <span className="text-stone-400 font-mono">{t.format}</span>
                    <span className={`font-bold flex items-center gap-1 ${isSelected ? 'text-[#008489]' : 'text-stone-600'}`}>
                      {isSelected ? 'قيد التعديل' : 'اختيار الأداة'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 5-STAGE WORKFLOW ENGINE FOR SELECTED TOOL */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            {/* Stage Stepper Header */}
            <div className="bg-stone-50 p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#008489] text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    {activeToolDef.name}
                  </h3>
                  <div className="text-[11px] text-stone-500">
                    {activeToolDef.description}
                  </div>
                </div>
              </div>

              {/* Steps Progress Pills */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setCurrentStage('form')}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${
                    currentStage === 'form' ? 'bg-[#008489] text-white' : 'bg-stone-200/70 text-stone-700'
                  }`}
                >
                  <span>1. إدخال وتعديل البيانات</span>
                </button>
                <ChevronRight className="w-3 h-3 text-stone-400 rotate-180" />
                <button
                  onClick={() => setCurrentStage('preview')}
                  className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 ${
                    currentStage === 'preview' ? 'bg-[#008489] text-white' : 'bg-stone-200/70 text-stone-700'
                  }`}
                >
                  <span>2. المعاينة الرسمية والتصدير</span>
                </button>
              </div>
            </div>

            {/* STAGE 1: DYNAMIC FORM DATA ENTRY */}
            {currentStage === 'form' && (
              <div className="p-5 sm:p-6 space-y-6">
                {/* 1. Common Saudi Ministry Official Metadata (Matching Images 1, 3, 4) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
                      <School className="w-4 h-4 text-[#008489]" />
                      <span>بيانات المدرسة والإدارة التعليمية (الترويسة الرسمية)</span>
                    </h4>
                    <span className="text-[10px] text-stone-400">تظهر أعلى كافة المستندات والشهادات</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">اسم المدرسة</label>
                      <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#008489]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">الإدارة العامة للتعليم بمنطقة</label>
                      <input
                        type="text"
                        value={educationRegion}
                        onChange={(e) => setEducationRegion(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#008489]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">مكتب التعليم</label>
                      <input
                        type="text"
                        value={officeBelonging}
                        onChange={(e) => setOfficeBelonging(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#008489]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">العام الدراسي</label>
                      <input
                        type="text"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#008489]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">اسم مدير/ة المدرسة</label>
                      <input
                        type="text"
                        value={principalName}
                        onChange={(e) => setPrincipalName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">الموجه/ة الطلابي</label>
                      <input
                        type="text"
                        value={counselorName}
                        onChange={(e) => setCounselorName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">مسؤولة السجل / المشرفة</label>
                      <input
                        type="text"
                        value={supervisorName}
                        onChange={(e) => setSupervisorName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Tool-Specific Dynamic Fields */}
                {selectedToolId === 'tahseen' && (
                  <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200/70 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs sm:text-sm text-[#093c42] flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>معايير درجات منصة تميز لهيئة تقويم التعليم والتدريب (Image 3)</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#008489]">
                        المتوسط العام: {averageScore}% — المستوى: {getLevelInfo(averageScore).name}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                        <label className="font-bold text-stone-700 block">مجال الإدارة المدرسية ({leadershipScore}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={leadershipScore}
                          onChange={(e) => setLeadershipScore(Number(e.target.value))}
                          className="w-full accent-[#008489]"
                        />
                        <div className="text-[11px] font-bold text-[#008489]">{getLevelInfo(leadershipScore).name}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                        <label className="font-bold text-stone-700 block">مجال التعليم والتعلم ({learningScore}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={learningScore}
                          onChange={(e) => setLearningScore(Number(e.target.value))}
                          className="w-full accent-[#008489]"
                        />
                        <div className="text-[11px] font-bold text-[#008489]">{getLevelInfo(learningScore).name}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                        <label className="font-bold text-stone-700 block">مجال نواتج التعلم ({outcomesScore}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={outcomesScore}
                          onChange={(e) => setOutcomesScore(Number(e.target.value))}
                          className="w-full accent-[#008489]"
                        />
                        <div className="text-[11px] font-bold text-[#008489]">{getLevelInfo(outcomesScore).name}</div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs space-y-1">
                        <label className="font-bold text-stone-700 block">مجال البيئة المدرسية ({environmentScore}%)</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={environmentScore}
                          onChange={(e) => setEnvironmentScore(Number(e.target.value))}
                          className="w-full accent-[#008489]"
                        />
                        <div className="text-[11px] font-bold text-[#008489]">{getLevelInfo(environmentScore).name}</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedToolId === 'tool_discipline_cert' && (
                  <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-200/70 space-y-4">
                    <div className="font-bold text-xs sm:text-sm text-[#093c42] flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>بيانات شهادة الانضباط المدرسي (Image 2)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">اسم الطالب/ة المكرم/ة</label>
                        <input
                          type="text"
                          value={certStudent}
                          onChange={(e) => setCertStudent(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">الصف الدراسي</label>
                        <input
                          type="text"
                          value={certClass}
                          onChange={(e) => setCertClass(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 mb-1">الفصل الدراسي</label>
                        <input
                          type="text"
                          value={certTerm}
                          onChange={(e) => setCertTerm(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Dynamic Custom Table Rows (Adding, editing, and deleting items) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
                        <Table2 className="w-4 h-4 text-[#008489]" />
                        <span>جدول البنود والمهام التنفيذية المخصصة (جدول ديناميكي قابل للإضافة والتعديل)</span>
                      </h4>
                      <p className="text-[11px] text-stone-400">يمكنك إضافة وحذف الصفوف وتعديل الحقول مباشرة</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddTableRow}
                      className="px-3 py-1.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة صف جديد</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-stone-200 rounded-xl">
                    <table className="w-full text-xs text-right border-collapse">
                      <thead>
                        <tr className="bg-stone-100 text-stone-700 border-b border-stone-200 font-bold">
                          <th className="p-2.5 text-center w-12">م</th>
                          <th className="p-2.5 min-w-[200px]">المهمة / الإجراء التنفيذي</th>
                          <th className="p-2.5 min-w-[140px]">المسؤول المباشر</th>
                          <th className="p-2.5 min-w-[120px]">الفترة الزمنية</th>
                          <th className="p-2.5 min-w-[120px]">حالة الإنجاز</th>
                          <th className="p-2.5 text-center w-12">حذف</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {dynamicTableRows.map((r, idx) => (
                          <tr key={r.id} className="hover:bg-stone-50/60">
                            <td className="p-2 text-center font-bold text-stone-500">{idx + 1}</td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={r.col2}
                                onChange={(e) => handleUpdateTableRow(r.id, 'col2', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={r.col3}
                                onChange={(e) => handleUpdateTableRow(r.id, 'col3', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={r.col4}
                                onChange={(e) => handleUpdateTableRow(r.id, 'col4', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={r.col5}
                                onChange={(e) => handleUpdateTableRow(r.id, 'col5', e.target.value)}
                                className="w-full px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs font-bold text-emerald-700"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteTableRow(r.id)}
                                className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50"
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

                {/* Bottom Trigger Action */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-xs text-stone-500">
                    سيتم معالجة البيانات وتوليد الهيدر الرسمي وفق معايير وزارة التعليم (1448هـ)
                  </div>

                  <button
                    onClick={handleProcessTool}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#008489] to-[#093c42] hover:brightness-110 text-white rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>معالجة البيانات والانتقال للمعاينة الرسمية</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: PROCESSING SIMULATOR */}
            {currentStage === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#008489] border-t-transparent rounded-full animate-spin"></div>
                <h4 className="text-base font-black text-stone-800">جاري المعالجة والتحليل الذكي للمستند...</h4>
                <p className="text-xs text-stone-500 max-w-sm">
                  مطابقة الترويسة الوزارية، احتساب مؤشرات الأداء، وتنسيق جداول Word و PDF الرسمية.
                </p>
              </div>
            )}

            {/* STAGE 3: LIVE OFFICIAL PREVIEW & EXPORT (MATCHING EXACT SCREENSHOTS) */}
            {currentStage === 'preview' && (
              <div className="p-5 sm:p-6 space-y-6">
                {/* Export Control Toolbar */}
                <div className="bg-stone-50 p-3 sm:p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentStage('form')}
                      className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>تعديل البيانات</span>
                    </button>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>المستند جاهز للاعتماد والتصدير</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Real DOCX Download */}
                    <button
                      onClick={handleDownloadRealDocx}
                      className="px-4 py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>تحميل بصيغة Word (.docx)</span>
                    </button>

                    {/* PDF Print */}
                    <button
                      onClick={handlePrintPdf}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>طباعة / حفظ PDF</span>
                    </button>
                  </div>
                </div>

                {/* THE OFFICIAL DOCUMENT PAPER CANVAS (Pixel-perfect match to Images 1, 2, 3, 4, WA0007) */}
                <div 
                  ref={previewPrintRef}
                  className="bg-white border-2 border-stone-300 rounded-2xl shadow-xl p-6 sm:p-10 max-w-4xl mx-auto space-y-6 text-stone-900"
                >
                  {/* Ministry Official Header (Dark Teal Band matching Image 1, 3, 4) */}
                  <div className="bg-[#0c2b33] text-white rounded-2xl p-6 relative overflow-hidden shadow-inner">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
                      {/* Right side: Region & Office */}
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-sm tracking-wide">الإدارة العامة للتعليم</div>
                        <div className="text-teal-200">بمنطقة {educationRegion}</div>
                        <div className="text-[11px] text-teal-300">{officeBelonging}</div>
                      </div>

                      {/* Center: Ministry of Education Emblem */}
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        </div>
                        <div className="text-lg font-black tracking-widest text-white">وزارة الـتـعـلـيـم</div>
                        <div className="text-[9px] tracking-wider text-teal-200 font-sans">Ministry of Education</div>
                      </div>

                      {/* Left side: School Pill Header */}
                      <div className="bg-[#123e4a] border border-teal-500/40 px-5 py-2.5 rounded-xl text-center shadow-md">
                        <div className="text-[10px] text-teal-300 font-bold mb-0.5">المدرسة الرسمية</div>
                        <div className="text-sm font-black text-white">{schoolName}</div>
                      </div>
                    </div>

                    {/* Prominent White School Title Band (Matching Image 1 & Image 3) */}
                    <div className="mt-5 pt-3 border-t border-teal-700/60 text-center">
                      <div className="text-base sm:text-xl font-black text-amber-300 tracking-wide">
                        {schoolName}
                      </div>
                    </div>
                  </div>

                  {/* Document Title Banner */}
                  <div className="text-center space-y-1 pt-2">
                    <span className="inline-block bg-[#008489]/10 text-[#008489] text-xs font-black px-4 py-1 rounded-full">
                      العام الدراسي {academicYear}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-black text-[#093c42]">
                      {activeToolDef.name}
                    </h2>
                    <p className="text-xs text-stone-500 max-w-xl mx-auto">
                      {activeToolDef.description}
                    </p>
                  </div>

                  {/* PREVIEW CONTENT FOR TAHSEEN (IMAGE 3) */}
                  {selectedToolId === 'tahseen' && (
                    <div className="space-y-5 text-xs">
                      {/* Basic Metadata Table */}
                      <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                        <div className="bg-emerald-700 text-white font-bold p-2 text-center">
                          البيانات الأساسية للمدرسة ونتائج التقويم المدرسي (منصة تميز)
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-stone-200 text-stone-800 bg-stone-50/50">
                          <div className="p-2"><span className="text-stone-500 block text-[10px]">الرقم الوزاري:</span> <strong className="font-mono">{ministerialNumber}</strong></div>
                          <div className="p-2"><span className="text-stone-500 block text-[10px]">المرحلة الدراسية:</span> <strong>{academicStage}</strong></div>
                          <div className="p-2"><span className="text-stone-500 block text-[10px]">الجنس:</span> <strong>{schoolGender}</strong></div>
                          <div className="p-2"><span className="text-stone-500 block text-[10px]">مبنى المدرسة:</span> <strong>{buildingType}</strong></div>
                        </div>
                      </div>

                      {/* 4 Evaluation Domains Summary (Matching Image 3) */}
                      <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                        <table className="w-full text-center border-collapse">
                          <thead>
                            <tr className="bg-emerald-700 text-white font-bold text-xs">
                              <th className="p-2.5">مجال التقويم المدرسي</th>
                              <th className="p-2.5">النسبة المئوية (%)</th>
                              <th className="p-2.5">مستوى المدرسة المعتمد</th>
                              <th className="p-2.5">الأثر والمبادرة التحسينية</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200 text-xs">
                            <tr>
                              <td className="p-2 font-bold text-stone-800">الإدارة المدرسية</td>
                              <td className="p-2 font-mono font-bold">{leadershipScore}%</td>
                              <td className="p-2"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getLevelInfo(leadershipScore).badgeColor}`}>{getLevelInfo(leadershipScore).name}</span></td>
                              <td className="p-2 text-stone-600">تطوير منظومة التخطيط والقيادة المدرسية</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold text-stone-800">التعليم والتعلم</td>
                              <td className="p-2 font-mono font-bold">{learningScore}%</td>
                              <td className="p-2"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getLevelInfo(learningScore).badgeColor}`}>{getLevelInfo(learningScore).name}</span></td>
                              <td className="p-2 text-stone-600">تنويع استراتيجيات التدريس والأنشطة الصفية</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold text-stone-800">نواتج التعلم</td>
                              <td className="p-2 font-mono font-bold">{outcomesScore}%</td>
                              <td className="p-2"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getLevelInfo(outcomesScore).badgeColor}`}>{getLevelInfo(outcomesScore).name}</span></td>
                              <td className="p-2 text-stone-600">خطط علاجية لرفع مهارات الاختبارات الوطنية (نافس)</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold text-stone-800">البيئة المدرسية</td>
                              <td className="p-2 font-mono font-bold">{environmentScore}%</td>
                              <td className="p-2"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getLevelInfo(environmentScore).badgeColor}`}>{getLevelInfo(environmentScore).name}</span></td>
                              <td className="p-2 text-stone-600">تعزيز معايير الصحة المدرسية والسلامة</td>
                            </tr>
                            <tr className="bg-emerald-50/70 font-bold border-t-2 border-emerald-600">
                              <td className="p-2 text-emerald-900">المتوسط العام للمدرسة</td>
                              <td className="p-2 font-mono font-bold text-emerald-900">{averageScore}%</td>
                              <td className="p-2" colSpan={2}><span className={`px-3 py-1 rounded-full text-xs font-black ${getLevelInfo(averageScore).color}`}>{getLevelInfo(averageScore).name}</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTENT FOR DISCIPLINE CERTIFICATE (IMAGE 2) */}
                  {selectedToolId === 'tool_discipline_cert' && (
                    <div className="border-4 border-double border-teal-600 p-8 rounded-2xl bg-gradient-to-b from-teal-50/30 to-amber-50/20 text-center space-y-6">
                      <div className="text-amber-600 font-bold text-sm tracking-widest">
                        ★ شهادة شكر وتقدير للانضباط المدرسي ★
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed max-w-lg mx-auto">
                        تتقدم إدارة مدرسة <strong>{schoolName}</strong> بالتهنئة والتقدير للطالب/ة:
                      </p>
                      <div className="text-2xl font-black text-[#008489] tracking-wide border-b-2 border-teal-300 pb-2 inline-block px-8">
                        {certStudent}
                      </div>
                      <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                        بالصف <strong>{certClass}</strong>، وذلك لتميزه/ا والتزامه/ا بالانضباط المدرسي والحضور الكامل وعدم الغياب خلال <strong>{certTerm}</strong> للعام الدراسي <strong>{academicYear}</strong>.
                      </p>
                      <div className="text-xs font-bold text-stone-700">
                        سائلين الله له/ا دوام التوفيق والنجاح.
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTENT FOR DYNAMIC ROWS (GENERAL SCHOOL RECORDS & IMAGE 4) */}
                  {selectedToolId !== 'tahseen' && selectedToolId !== 'tool_discipline_cert' && (
                    <div className="space-y-4">
                      <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                        <table className="w-full text-xs text-right border-collapse">
                          <thead>
                            <tr className="bg-[#008489] text-white font-bold">
                              <th className="p-2 text-center w-12">م</th>
                              <th className="p-2">المهمة / الإجراء التنفيذي</th>
                              <th className="p-2 text-center">المسؤول</th>
                              <th className="p-2 text-center">الفترة الزمنية</th>
                              <th className="p-2 text-center">نسبة الإنجاز</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-200">
                            {dynamicTableRows.map((r, i) => (
                              <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
                                <td className="p-2 text-center font-bold text-stone-500">{i + 1}</td>
                                <td className="p-2 font-medium text-stone-800">{r.col2}</td>
                                <td className="p-2 text-center text-stone-600">{r.col3}</td>
                                <td className="p-2 text-center text-stone-600">{r.col4}</td>
                                <td className="p-2 text-center font-bold text-emerald-700">{r.col5}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {docCustomNotes && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-stone-700">
                          <strong className="text-amber-900 block mb-0.5">توجيهات واعتماد إدارة المدرسة:</strong>
                          <span>{docCustomNotes}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Three Official Saudi Signatures (WA0007 / Image 2 / Image 4) */}
                  <div className="pt-6 border-t-2 border-[#008489]/40 mt-8">
                    <div className="grid grid-cols-3 gap-4 text-center text-xs">
                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">مسؤولة السجل / معدة التقرير:</div>
                        <div className="text-[#008489] font-semibold">{supervisorName}</div>
                        <div className="text-[10px] text-stone-400 pt-1">التوقيع: .....................</div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">منسق/ة العمل التعاوني:</div>
                        <div className="text-[#008489] font-semibold">{coordinatorName}</div>
                        <div className="text-[10px] text-stone-400 pt-1">التوقيع: .....................</div>
                      </div>

                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">مدير/ة المدرسة (الاعتماد):</div>
                        <div className="text-[#008489] font-semibold">{principalName}</div>
                        <div className="text-[10px] text-stone-400 pt-1">الختم الرسمي: .....................</div>
                      </div>
                    </div>

                    {/* Official Document Footer */}
                    <div className="mt-8 pt-3 border-t border-stone-200 flex justify-between items-center text-[10px] text-stone-500">
                      <div>متجر احتياجك التعليمي للمنتجات المدرسية والسجلات الرقمية</div>
                      <div>وثيقة معتمدة — مدرسة {schoolName}</div>
                      <div>العام 1448هـ</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: CLIENT DOCUMENTS LIBRARY */}
      {activeView === 'library' && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-stone-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#008489]" />
                <span>مكتبة مستنداتي وسجلاتي الرقمية المحفوظة</span>
              </h2>
              <p className="text-xs text-stone-500">
                جميع المستندات والسجلات التي تم توليدها مسبقاً مع روابط التحميل المباشرة وإعادة التعديل
              </p>
            </div>

            <button
              onClick={() => setActiveView('studio')}
              className="px-4 py-2 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء مستند جديد الآن</span>
            </button>
          </div>

          {loadingDocs ? (
            <div className="py-12 text-center text-xs text-stone-500">جاري تحميل المستندات...</div>
          ) : clientDocuments.length === 0 ? (
            <div className="py-12 text-center space-y-2 border-2 border-dashed border-stone-200 rounded-xl">
              <FileText className="w-8 h-8 text-stone-300 mx-auto" />
              <div className="text-xs font-bold text-stone-700">لم تقم بتوليد أي مستندات بعد</div>
              <p className="text-[11px] text-stone-400">اختر أداة من استوديو المولدات لبدء إنشاء أول مستند مدرسي معتمد</p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-stone-200 rounded-xl">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-700 border-b border-stone-200 font-bold">
                    <th className="p-3">رقم المستند</th>
                    <th className="p-3">عنوان المستند</th>
                    <th className="p-3">الأداة والتصنيف</th>
                    <th className="p-3">تاريخ الإنشاء</th>
                    <th className="p-3">الحالة</th>
                    <th className="p-3 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {clientDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-stone-50/70">
                      <td className="p-3 font-mono font-bold text-stone-700">{doc.id}</td>
                      <td className="p-3 font-bold text-stone-900">{doc.title}</td>
                      <td className="p-3">
                        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-medium">
                          {doc.toolName}
                        </span>
                      </td>
                      <td className="p-3 text-stone-500 font-mono text-[11px]">
                        {new Date(doc.createdAt).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          مكتمل
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedToolId(doc.toolId || 'tahseen');
                              setActiveView('studio');
                              setCurrentStage('preview');
                            }}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[11px] font-bold"
                          >
                            معاينة
                          </button>
                          <button
                            onClick={handleDownloadRealDocx}
                            className="px-2.5 py-1 bg-[#008489] hover:bg-[#007478] text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Word</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: SUBSCRIPTION PLANS UPGRADE TIERS */}
      {activeView === 'plans' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              ترقية حسابك
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-stone-900">
              اختر باقة الأدوات الذكية المناسبة لمدرستك (1448هـ)
            </h2>
            <p className="text-xs text-stone-500">
              توليد غير محدود لملفات Word القابلة للتعديل وشهادات الانضباط وخطط التقويم المدرسي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free Starter */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-right">
              <div className="space-y-1">
                <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">تجريبية</span>
                <h3 className="text-base font-bold text-stone-900">الباقة المجانية</h3>
                <div className="text-2xl font-black text-stone-900">0 <span className="text-xs font-normal">ر.س</span></div>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <li className="flex items-center gap-2">✓ توليد 3 مستندات مجاناً</li>
                <li className="flex items-center gap-2">✓ تصدير بصيغة PDF</li>
                <li className="flex items-center gap-2">✕ تصدير DOCX غير متاح</li>
              </ul>
              <button
                disabled
                className="w-full py-2 bg-stone-100 text-stone-400 rounded-xl text-xs font-bold"
              >
                مفعلة مسبقاً
              </button>
            </div>

            {/* Pro Annual (Highlighted) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#008489] shadow-lg relative space-y-4 text-right ring-4 ring-[#008489]/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow-xs">
                الأكثر طلباً للمدارس
              </span>
              <div className="space-y-1">
                <span className="text-[10px] font-bold bg-[#008489]/10 text-[#008489] px-2 py-0.5 rounded">سنوي شامل</span>
                <h3 className="text-base font-bold text-stone-900">الباقة السنوية الاحترافية (Pro)</h3>
                <div className="text-2xl font-black text-[#008489]">299 <span className="text-xs font-normal">ر.س / سنوياً</span></div>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <li className="flex items-center gap-2">✓ توليد 50 مستند وسجل رسمي</li>
                <li className="flex items-center gap-2">✓ تصدير حقيقي Word (.docx) و PDF</li>
                <li className="flex items-center gap-2">✓ تفعيل أداة تحسين وتقارير تميز كاملة</li>
                <li className="flex items-center gap-2">✓ مكتبة سحابية لحفظ المستندات طوال العام</li>
              </ul>
              <button
                onClick={() => {
                  showToast('تم تفعيل باقتك السنوية الاحترافية بنجاح!');
                  setActiveView('studio');
                }}
                className="w-full py-2.5 bg-[#008489] hover:bg-[#007478] text-white rounded-xl text-xs font-black shadow-md cursor-pointer"
              >
                تفعيل الباقة الآن
              </button>
            </div>

            {/* VIP School Suite */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4 text-right">
              <div className="space-y-1">
                <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">مجمعات ومدارس</span>
                <h3 className="text-base font-bold text-stone-900">باقة المجمعات المدرسية VIP</h3>
                <div className="text-2xl font-black text-stone-900">499 <span className="text-xs font-normal">ر.س / سنوياً</span></div>
              </div>
              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <li className="flex items-center gap-2">✓ توليد غير محدود لجميع السجلات</li>
                <li className="flex items-center gap-2">✓ جميع أدوات الإدارة، الخطط، والشهادات</li>
                <li className="flex items-center gap-2">✓ دعم فني مباشر عبر واتساب</li>
                <li className="flex items-center gap-2">✓ قوالب مخصصة بشعار مدرستك</li>
              </ul>
              <button
                onClick={() => {
                  showToast('تم اختيار باقة المجمعات VIP!');
                  setActiveView('studio');
                }}
                className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                طلب الاشتراك VIP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
