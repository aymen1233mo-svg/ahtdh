import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  Smartphone, 
  CheckCircle, 
  Zap, 
  Layers, 
  Cpu, 
  FileText, 
  Store
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeaderProps {
  activeTab: 'storefront' | 'tools' | 'overview' | 'catalog' | 'workflows';
  setActiveTab: (tab: 'storefront' | 'tools' | 'overview' | 'catalog' | 'workflows') => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenExport }) => {
  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
      {/* Top Inspection Ribbon */}
      <div className="bg-stone-900 text-stone-200 text-xs px-4 py-2 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400">تصميم وفحص متطابق 100%:</span>
            <span className="text-stone-300 truncate max-w-md" dir="ltr">{STORE_INFO.fullUrl}</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-xs">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>مطابق لتصميم منصة سلة (Salla) ومتجر احتياجك التعليمي</span>
            </span>
            <span className="hidden sm:inline text-stone-600">|</span>
            <a 
              href={STORE_INFO.fullUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span>فتح الرابط الأصلي</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-950/10 shrink-0 font-black text-sm">
              اح
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
                  {STORE_INFO.name}
                </h1>
              </div>
              <p className="text-xs text-stone-500 flex flex-wrap items-center gap-2">
                <span>تصميم متجر سلة الأصلي بدقة وجودة تامة</span>
                <span className="text-stone-300">·</span>
                <span>تسليم فوري 100%</span>
                <span className="text-stone-300">·</span>
                <span>الضمان الذهبي 3 أيام</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg border border-stone-200 transition-colors flex items-center gap-1.5"
              title="تصدير تقرير الفحص الفني والوظيفي كاملاً"
            >
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              <span>تصدير تقرير الفحص</span>
            </button>
            <a
              href={`https://wa.me/${STORE_INFO.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent('السلام عليكم، استفسار بخصوص منتجات متجر احتياجك التعليمي التعليمية والرقمية')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>واتساب المتجر</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Navigation Switcher Tabs */}
        <nav className="flex items-center gap-1 mt-3 pt-2 border-t border-stone-100 overflow-x-auto no-scrollbar" aria-label="أقسام العرض">
          <button
            onClick={() => setActiveTab('storefront')}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'storefront'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>واجهة المتجر الأصلية (سلة Salla)</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'tools'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>تجربة الأدوات الذكية المدرسية</span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>تقرير الفحص والاعتماد الشامل</span>
          </button>

          <button
            onClick={() => setActiveTab('workflows')}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'workflows'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>مصفوفة المهام والوظائف ورحلة المستفيد</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-1.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>جدول الفهرسة والبحث التفصيلي</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
