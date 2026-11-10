import React, { useState } from 'react';
import { 
  Zap, 
  ShoppingBag, 
  CreditCard, 
  CheckCircle2, 
  MessageSquare, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  Target, 
  Briefcase, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles,
  Award,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { STORE_INFO, TARGET_PERSONAS, PURCHASE_JOURNEY_STEPS } from '../data/storeData';

export const WorkflowMatrix: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const activePersona = TARGET_PERSONAS[selectedRoleIndex];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-stone-200">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-600" />
          <span>تحليل المهام والوظائف ومسارات العمل بالمتجر (Workflows & Functional Matrix)</span>
        </h2>
        <p className="text-xs text-stone-500 mt-1">
          تفصيل شامل لكيفية تحويل متجر احتياجك التعليمي العمليات الإدارية المدرسية المعقدة إلى مسارات رقمية مؤتمتة
        </p>
      </div>

      {/* 5-Step Automated Purchase & Instant Delivery Pipeline */}
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>دورة حياة الطلب ومحرك الأتمتة الفوري (Instant Delivery Pipeline)</span>
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          كيف تصل الملفات الرقمية في ثوانٍ معدودة فور إتمام السداد عبر منصة سلة وقنوات الواتساب
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {PURCHASE_JOURNEY_STEPS.map((step, idx) => (
            <div key={step.step} className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between relative">
              <div>
                <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h4 className="font-bold text-stone-900 text-xs mb-1.5">{step.title}</h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-stone-300">
                  <ArrowLeft className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Target Roles Functional Breakdown */}
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 mb-6">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              مصفوفة المهام والحلول الوظيفية لكل فئة تعليمية
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              اختر الفئة للاطلاع على التحديات الميدانية والحلول الدقيقة التي يقدمها المتجر
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="flex flex-wrap gap-1.5">
            {TARGET_PERSONAS.map((persona, idx) => (
              <button
                key={persona.role}
                onClick={() => setSelectedRoleIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedRoleIndex === idx
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {persona.titleAr.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Persona Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pain Points */}
          <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
            <span className="text-xs font-bold text-rose-900 block mb-3 flex items-center gap-1.5">
              <span>التحديات والأعباء الميدانية الشائعة:</span>
            </span>
            <ul className="space-y-2.5 text-xs text-rose-950">
              {activePersona.painPoints.map((pain, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span>{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Solutions */}
          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <span className="text-xs font-bold text-emerald-900 block mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>الحلول والوظائف التي يوفرها المتجر:</span>
            </span>
            <ul className="space-y-2.5 text-xs text-emerald-950">
              {activePersona.storeSolutions.map((sol, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended products */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-stone-900 block mb-3 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>أبرز المنتجات الموصى بها لهذه الفئة:</span>
              </span>
              <div className="space-y-2">
                {activePersona.recommendedProducts.map((p, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800 font-semibold shadow-2xs">
                    {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-stone-500">
              تسليم فوري عبر واتساب ورسائل الطلب
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Security Architecture */}
      <div className="bg-white p-6 rounded-xl border border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <span>منظومة الدفع والتقسيط والأمان المالي بالمتجر</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {STORE_INFO.paymentMethods.map((method, idx) => (
            <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
              <span className="font-bold text-xs text-stone-900 block">{method.name}</span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 block bg-emerald-50 py-0.5 rounded">
                {method.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
