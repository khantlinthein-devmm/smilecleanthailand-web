"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminDispatchPortalProps {
  locale: string;
}

interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  unitPrice: number;
}

// Convert numbers to Thai Baht text (Enterprise standard for official Thai Tax Receipts)
function thaiBahtText(num: number): string {
  if (isNaN(num) || num === 0) return "ศูนย์บาทถ้วน";
  const thaiNums = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
  const thaiUnits = ["", "สิบ", "ร้อย", "พัน", "หมื่น", "แสน", "ล้าน"];
  
  const [integerPart, decimalPart] = num.toFixed(2).split(".");
  let result = "";
  
  // Integer part
  const intStr = integerPart;
  const len = intStr.length;
  for (let i = 0; i < len; i++) {
    const digit = parseInt(intStr[i]);
    const pos = len - i - 1;
    if (digit !== 0) {
      if (pos % 6 === 1 && digit === 1 && len > 1) {
        result += ""; // สิบ
      } else if (pos % 6 === 1 && digit === 2) {
        result += "ยี่";
      } else if (pos % 6 === 0 && digit === 1 && len > 1 && i > 0) {
        result += "เอ็ด";
      } else {
        result += thaiNums[digit];
      }
      result += thaiUnits[pos % 6];
    }
    if (pos >= 6 && pos % 6 === 0) {
      result += "ล้าน";
    }
  }
  result += "บาท";

  // Decimal part (Satang)
  const dec = parseInt(decimalPart);
  if (dec === 0) {
    result += "ถ้วน";
  } else {
    const d1 = parseInt(decimalPart[0]);
    const d2 = parseInt(decimalPart[1]);
    if (d1 !== 0) {
      if (d1 === 1) result += "";
      else if (d1 === 2) result += "ยี่";
      else result += thaiNums[d1];
      result += "สิบ";
    }
    if (d2 !== 0) {
      if (d2 === 1 && d1 !== 0) result += "เอ็ด";
      else result += thaiNums[d2];
    }
    result += "สตางค์";
  }

  return result;
}

export default function AdminDispatchPortal({ locale }: AdminDispatchPortalProps) {
  const [activeTab, setActiveTab] = useState<"dispatch" | "qc" | "billing">("billing");

  // Core Dispatch State
  const todayStr = new Date().toISOString().slice(0, 10);
  const [jobId, setJobId] = useState(
    `SC-${todayStr.replace(/-/g, "").slice(2)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  );
  const [customerName, setCustomerName] = useState("คุณวิภาดา สิริโชติ (Wiphada S.)");
  const [customerPhone, setCustomerPhone] = useState("089-456-7890");
  const [service, setService] = useState("ทำความสะอาดคอนโดรายครั้ง (Condo Deep Clean)");
  const [dateTime, setDateTime] = useState(`${todayStr} 09:30 - 12:30 น.`);
  const [address, setAddress] = useState("Ashton Asoke ห้อง 1204 ชั้น 12");
  const [zone, setZone] = useState("สุขุมวิท / อโศก (Zone A)");
  const [cleanerName, setCleanerName] = useState("แม่บ้านสมศรี พรหมมา (Team Lead)");
  const [cleanerPhone, setCleanerPhone] = useState("091-234-5678");
  const [deposit, setDeposit] = useState("500");
  const [bankInfo, setBankInfo] = useState("ธนาคารกสิกรไทย 123-4-56789-0 (บจก. สไมล์ คลีน ประเทศไทย)");
  const [notes, setNotes] = useState("มีสุนัขเล็ก 1 ตัว 🐾 / ฝากคีย์การ์ดไว้ที่เคาน์เตอร์นิติ");

  // Enterprise Billing / Tax Invoice State
  const [docType, setDocType] = useState<"receipt" | "tax_invoice" | "quotation" | "invoice">("tax_invoice");
  const [receiptNo, setReceiptNo] = useState(`TAX-${todayStr.replace(/-/g, "").slice(2)}-0089`);
  const [customerCompany, setCustomerCompany] = useState("บริษัท สยาม แคปปิตอล พาร์ทเนอร์ส จำกัด (สำนักงานใหญ่)");
  const [customerTaxId, setCustomerTaxId] = useState("0105559087654");
  const [customerBranch, setCustomerBranch] = useState("สำนักงานใหญ่ (Head Office)");
  const [customerAddress, setCustomerAddress] = useState("888 อาคารอโศก ทาวเวอร์ส ชั้น 18 ถนนสุขุมวิท 21 คลองเตยเหนือ วัฒนา กทม. 10110");
  const [vatMode, setVatMode] = useState<"none" | "included" | "added">("included");
  const [withholdingTax, setWithholdingTax] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "deposit" | "pending">("paid");
  const [paymentMethod, setPaymentMethod] = useState("เงินโอนผ่านธนาคาร (Bank Transfer - KBank)");

  // Multi-item Line Invoicing
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", desc: "บริการทำความสะอาดคอนโดมาตรฐาน (Condo Cleaning 35-45 ตร.ม.)", qty: 1, unitPrice: 1200 },
    { id: "2", desc: "บริการขัดล้างทำความสะอาดระเบียงและกระจกภายนอก (Balcony Care)", qty: 1, unitPrice: 350 },
  ]);

  // QC State
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const [qcInspector, setQcInspector] = useState("ผู้ตรวจการ ณัฐพล (Supervisor SC-04)");
  const [qcCheckpoints, setQcCheckpoints] = useState({
    floor: true,
    glass: true,
    trash: true,
    appliances: true,
    keyReturned: true,
    sanitized: true,
  });

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Financial Calculations
  const rawSubtotal = items.reduce((acc, it) => acc + (it.qty * it.unitPrice), 0);
  let subtotal = rawSubtotal;
  let vatAmount = 0;
  let grandTotal = rawSubtotal;

  if (vatMode === "included") {
    subtotal = Math.round((rawSubtotal / 1.07) * 100) / 100;
    vatAmount = Math.round((rawSubtotal - subtotal) * 100) / 100;
    grandTotal = rawSubtotal;
  } else if (vatMode === "added") {
    subtotal = rawSubtotal;
    vatAmount = Math.round(rawSubtotal * 0.07 * 100) / 100;
    grandTotal = subtotal + vatAmount;
  }

  const whtAmount = withholdingTax ? Math.round(subtotal * 0.03 * 100) / 100 : 0;
  const netPayable = grandTotal - whtAmount;

  const docTitleMap = {
    receipt: { th: "ใบเสร็จรับเงิน", en: "RECEIPT" },
    tax_invoice: { th: "ใบเสร็จรับเงิน / ใบกำกับภาษี", en: "RECEIPT / TAX INVOICE" },
    quotation: { th: "ใบเสนอราคา", en: "QUOTATION" },
    invoice: { th: "ใบแจ้งหนี้ / ใบเรียกเก็บเงิน", en: "INVOICE" },
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Math.random().toString(36).substring(2, 6), desc: "บริการเสริมเพิ่มเติม (Additional Service)", qty: 1, unitPrice: 300 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, val: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  // Copy helper
  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      alert("กรุณาคัดลอกข้อความด้วยตนเอง");
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "before" | "after") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (target === "before") setBeforeImg(event.target?.result as string);
        else setAfterImg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pre-compiled messages
  const customerLineMsg = `✨ ยืนยันการจองบริการ — Smile Clean Thailand ✨

รหัสงาน: ${jobId}
คุณลูกค้า: ${customerName}
เบอร์ติดต่อ: ${customerPhone}

📌 รายละเอียดบริการ:
• บริการ: ${service}
• วันและเวลานัดหมาย: ${dateTime}
• สถานที่: ${address} (โซน: ${zone})
• ข้อควรระวังหน้างาน: ${notes}

💰 ยอดชำระ:
• ยอดรวมสุทธิ: ${grandTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })} บาท
• ชำระมัดจำล็อกคิว: ${deposit} บาท
• บัญชีโอนเงิน: ${bankInfo}

*รบกวนส่งสลิปโอนเงินมัดจำเพื่อยืนยันคิวงานนะคะ*
หากมีข้อสงสัยสอบถามเพิ่มเติมได้ตลอดเวลาค่ะ ขอบพระคุณค่ะ 🙏`;

  const cleanerJobMsg = `🧹 ใบสั่งงานทำความสะอาด — Smile Clean 🧹

รหัสงาน: ${jobId}
แม่บ้านผู้รับผิดชอบ: ${cleanerName} (${cleanerPhone})
วันเวลาเริ่มงาน: ${dateTime}

📍 สถานที่ปฏิบัติงาน:
• ที่อยู่: ${address}
• โซน: ${zone}
• รายการ: ${service}
• ข้อควรระวัง: ${notes}

⚠️ ข้อปฏิบัติสำคัญ:
1. ถ่ายรูป Before หน้างานก่อนเริ่มทุกครั้ง
2. สวมชุดสุภาพและหน้ากากอนามัย
3. ตรวจเช็คขยะ / กระจก / ปิดไฟ-แอร์ก่อนส่งมอบงาน
4. ถ่ายรูป After รายงานเข้ากลุ่มทันทีหลังทำเสร็จ`;

  return (
    <>
      {/* Enterprise Print Style */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          body * {
            visibility: hidden;
          }
          #enterprise-sheet,
          #enterprise-sheet * {
            visibility: visible;
          }
          #enterprise-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 24px 32px !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
        {/* Enterprise Command Header (Hidden on Print) */}
        <header className="no-print bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left: Brand & Status */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-900/40">
                SC
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-white text-base">
                    Smile Clean <span className="text-cyan-400 font-medium">Enterprise Console</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE OPS
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-mono">THAILAND-BKK (UTC+7)</span>
                  <span>·</span>
                  <span>HMAC-SHA256 SECURED</span>
                  <span>·</span>
                  <span className="text-slate-300">v2.4 Enterprise</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link
                href={`/${locale}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
              >
                ← Back to Portal
              </Link>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-950 transition flex items-center gap-1.5"
              >
                🖨️ Export PDF / Print
              </button>
            </div>
          </div>
        </header>

        {/* Console Sub-Header & Tabs (Hidden on Print) */}
        <div className="no-print bg-slate-900 border-b border-slate-800/80 px-4 sm:px-8 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto">
            {/* Segmented Tab Buttons */}
            <div className="flex items-center space-x-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-xl">
              <button
                onClick={() => setActiveTab("billing")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                  activeTab === "billing"
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                🧾 <span>Tax Invoice & Billing</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  A4 Ready
                </span>
              </button>
              <button
                onClick={() => setActiveTab("dispatch")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                  activeTab === "dispatch"
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                📱 <span>1-Click LINE Dispatch</span>
              </button>
              <button
                onClick={() => setActiveTab("qc")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 ${
                  activeTab === "qc"
                    ? "bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                📸 <span>Before & After QC</span>
              </button>
            </div>

            {/* Quick Session Indicator */}
            <div className="hidden md:flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span>JOB ID: <strong className="text-white">{jobId}</strong></span>
              <span>·</span>
              <span>AUTH: ADMIN</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
          {/* TAB 1: ENTERPRISE BILLING & TAX INVOICE */}
          {activeTab === "billing" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Drawer (Hidden on Print) */}
              <div className="no-print lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                      ⚙️ Configuration Console
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">Parameters for Official Tax Invoicing</p>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
                    VAT COMPLIANT
                  </span>
                </div>

                {/* Document Type & Number */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">Document Type</label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value as typeof docType)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="tax_invoice">ใบเสร็จรับเงิน / ใบกำกับภาษี (Receipt / Tax Invoice)</option>
                      <option value="receipt">ใบเสร็จรับเงิน (Official Receipt)</option>
                      <option value="invoice">ใบแจ้งหนี้ / ใบเรียกเก็บเงิน (Invoice)</option>
                      <option value="quotation">ใบเสนอราคา (Quotation)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">Doc Number</label>
                      <input
                        type="text"
                        value={receiptNo}
                        onChange={(e) => setReceiptNo(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">Issue Date</label>
                      <input
                        type="text"
                        value={todayStr}
                        readOnly
                        className="mt-1 w-full rounded-lg bg-slate-950/60 border border-slate-800 px-2.5 py-1.5 text-xs text-slate-400 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Customer / Entity Info */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800">
                  <span className="block text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Client Corporate Data</span>
                  <div>
                    <label className="block text-[10px] text-slate-400">Company Name / Registered Entity</label>
                    <input
                      type="text"
                      value={customerCompany}
                      onChange={(e) => setCustomerCompany(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400">Tax ID (13 Digits)</label>
                      <input
                        type="text"
                        value={customerTaxId}
                        onChange={(e) => setCustomerTaxId(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Branch (สาขา)</label>
                      <input
                        type="text"
                        value={customerBranch}
                        onChange={(e) => setCustomerBranch(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Registered Tax Address</label>
                    <textarea
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Line Items Manager */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Line Items</span>
                    <button
                      type="button"
                      onClick={addItem}
                      className="text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded"
                    >
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {items.map((it, idx) => (
                      <div key={it.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-slate-500">#{idx + 1}</span>
                          <input
                            type="text"
                            value={it.desc}
                            onChange={(e) => updateItem(it.id, "desc", e.target.value)}
                            className="flex-1 bg-transparent border-b border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                          />
                          {items.length > 1 && (
                            <button
                              onClick={() => removeItem(it.id)}
                              className="text-red-400 hover:text-red-300 text-xs"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-3 text-[11px] text-slate-400">
                          <label className="flex items-center gap-1">
                            Qty:
                            <input
                              type="number"
                              min={1}
                              value={it.qty}
                              onChange={(e) => updateItem(it.id, "qty", parseInt(e.target.value) || 1)}
                              className="w-10 bg-slate-900 border border-slate-700 rounded px-1 text-center text-white"
                            />
                          </label>
                          <label className="flex items-center gap-1">
                            Rate:
                            <input
                              type="number"
                              value={it.unitPrice}
                              onChange={(e) => updateItem(it.id, "unitPrice", parseFloat(e.target.value) || 0)}
                              className="w-16 bg-slate-900 border border-slate-700 rounded px-1 text-right text-white font-mono"
                            />
                          </label>
                          <span className="font-mono text-white">
                            {(it.qty * it.unitPrice).toLocaleString()} ฿
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax Rules & Settlements */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">VAT Calculation</label>
                    <select
                      value={vatMode}
                      onChange={(e) => setVatMode(e.target.value as typeof vatMode)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    >
                      <option value="included">ราคารวม VAT 7% แล้ว (Include VAT)</option>
                      <option value="added">ราคาบวก VAT 7% เพิ่ม (Exclude VAT)</option>
                      <option value="none">ไม่คิด VAT (Non-VAT Exempt)</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={withholdingTax}
                      onChange={(e) => setWithholdingTax(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span>หักภาษี ณ ที่จ่าย 3% (Withholding Tax 3%)</span>
                  </label>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 uppercase tracking-wider">Payment Status</label>
                    <select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value as typeof paymentStatus)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    >
                      <option value="paid">✅ ชำระเงินเรียบร้อยแล้ว (PAID)</option>
                      <option value="deposit">⏳ ชำระมัดจำแล้ว (DEPOSIT)</option>
                      <option value="pending">⚠️ ยังไม่ชำระ (PENDING)</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-xs font-bold shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    🖨️ พิมพ์ / บันทึกเป็น PDF (Print to PDF)
                  </button>
                  <button
                    onClick={() =>
                      copyText(
                        `🧾 ${docTitleMap[docType].th} — Smile Clean Thailand\nเลขที่: ${receiptNo}\nลูกค้า: ${customerCompany || customerName}\nยอดสุทธิ: ${netPayable.toLocaleString()} บาท\nสถานะ: ชำระแล้ว`,
                        "receipt-brief"
                      )
                    }
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition"
                  >
                    {copiedKey === "receipt-brief" ? "✓ คัดลอกสรุปแล้ว!" : "📋 คัดลอกสรุปส่ง LINE"}
                  </button>
                </div>
              </div>

              {/* Printable A4 Canvas (Enterprise White Sheet) */}
              <div className="lg:col-span-8 flex justify-center">
                <div
                  id="enterprise-sheet"
                  className="w-full max-w-[800px] bg-white text-slate-900 rounded-xl shadow-2xl p-8 sm:p-12 border border-slate-200 leading-relaxed font-sans"
                >
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-6">
                    {/* Left: Organization Info */}
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl tracking-tighter">
                          SC
                        </div>
                        <div>
                          <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase leading-none">
                            Smile Clean Thailand
                          </h1>
                          <p className="text-xs font-bold text-slate-700 mt-1">บริษัท สไมล์ คลีน (ประเทศไทย) จำกัด</p>
                        </div>
                      </div>
                      <div className="mt-3 text-[11px] text-slate-600 space-y-0.5 font-medium leading-relaxed">
                        <p>
                          <strong className="text-slate-800">เลขประจำตัวผู้เสียภาษี:</strong> 0-1055-66012-34-5 (สำนักงานใหญ่)
                        </p>
                        <p>88 อาคารอโศกทาวเวอร์ ชั้น 12 ถนนสุขุมวิท 21 คลองเตยเหนือ วัฒนา กรุงเทพฯ 10110</p>
                        <p>โทรศัพท์: 092-234-5678 · อีเมล: support@smilecleanthailand.com</p>
                      </div>
                    </div>

                    {/* Right: Document Identity */}
                    <div className="text-left sm:text-right">
                      <span className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-900 text-xs font-mono font-bold tracking-widest uppercase border border-slate-300">
                        {docTitleMap[docType].en}
                      </span>
                      <h2 className="text-lg font-black text-slate-950 mt-1.5">
                        {docTitleMap[docType].th}
                      </h2>
                      <div className="mt-3 text-xs text-slate-700 space-y-1 font-mono">
                        <p>
                          <span className="font-semibold text-slate-500 font-sans">เลขที่เอกสาร:</span>{" "}
                          <strong className="text-slate-950 text-sm">{receiptNo}</strong>
                        </p>
                        <p>
                          <span className="font-semibold text-slate-500 font-sans">วันที่:</span> {todayStr}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-500 font-sans">รหัสงานอ้างอิง:</span> {jobId}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer / Entity Info Card */}
                  <div className="mt-6 p-4 rounded-xl bg-slate-50/80 border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        ผู้ซื้อ / ลูกค้า (Customer / Billed To)
                      </span>
                      <p className="font-bold text-sm text-slate-950 mt-0.5">
                        {customerCompany || customerName}
                      </p>
                      {customerTaxId && (
                        <p className="text-slate-600 mt-0.5 font-mono text-[11px]">
                          <strong>เลขผู้เสียภาษี:</strong> {customerTaxId} ({customerBranch})
                        </p>
                      )}
                      <p className="text-slate-600 mt-0.5 text-[11px]">
                        <strong>ผู้ติดต่อ:</strong> {customerName} ({customerPhone})
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        สถานที่ปฏิบัติงาน / ที่อยู่ (Service Address)
                      </span>
                      <p className="text-slate-800 mt-0.5 leading-relaxed text-[11px]">
                        {customerAddress || address}
                      </p>
                      <p className="text-slate-500 mt-1 text-[11px]">
                        <strong>วันและเวลานัดหมาย:</strong> {dateTime}
                      </p>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-900 text-white font-semibold">
                        <tr>
                          <th className="py-2.5 px-3 w-12 text-center font-mono">ลำดับ</th>
                          <th className="py-2.5 px-4">รายการบริการ (Description)</th>
                          <th className="py-2.5 px-3 text-center w-16">จำนวน</th>
                          <th className="py-2.5 px-4 text-right w-28">ราคา/หน่วย</th>
                          <th className="py-2.5 px-4 text-right w-32">จำนวนเงิน (บาท)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {items.map((it, idx) => (
                          <tr key={it.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <p className="font-bold text-slate-900">{it.desc}</p>
                              <p className="text-[10px] text-slate-500">มาตรฐานบริการทำความสะอาด Smile Clean Thailand</p>
                            </td>
                            <td className="py-3 px-3 text-center font-mono">{it.qty}</td>
                            <td className="py-3 px-4 text-right font-mono text-slate-700">
                              {it.unitPrice.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-4 text-right font-mono font-bold text-slate-950">
                              {(it.qty * it.unitPrice).toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Calculations & Settlement */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                    {/* Left: Baht Text & Payment Confirmation */}
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          จำนวนเงินตัวอักษร (Amount in Words)
                        </span>
                        <p className="font-bold text-slate-900 mt-1 text-xs">
                          ({thaiBahtText(netPayable)})
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <p className="text-[11px] text-slate-600">
                          <strong>วิธีการชำระ:</strong> {paymentMethod}
                        </p>
                        <p className="text-[11px] text-slate-600">
                          <strong>ข้อมูลบัญชี:</strong> {bankInfo}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <strong className="text-slate-700 text-[11px]">สถานะ:</strong>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              paymentStatus === "paid"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : paymentStatus === "deposit"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-red-100 text-red-800 border border-red-300"
                            }`}
                          >
                            {paymentStatus === "paid"
                              ? "✓ ชำระเงินเรียบร้อยแล้ว (PAID IN FULL)"
                              : paymentStatus === "deposit"
                              ? `ชำระมัดจำแล้ว ${deposit} บาท`
                              : "รอการชำระเงิน (PENDING)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Financial Totals */}
                    <div className="space-y-1.5 text-xs text-right border-t sm:border-t-0 pt-3 sm:pt-0 font-mono">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-600 font-sans">รวมเป็นเงิน (Subtotal):</span>
                        <span className="font-semibold text-slate-900">
                          {subtotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                        </span>
                      </div>

                      {vatMode !== "none" && (
                        <div className="flex justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-600 font-sans">ภาษีมูลค่าเพิ่ม 7% (VAT 7%):</span>
                          <span className="font-semibold text-slate-900">
                            {vatAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                          </span>
                        </div>
                      )}

                      {withholdingTax && (
                        <div className="flex justify-between py-1 border-b border-slate-100 text-red-600">
                          <span className="font-sans">หักภาษี ณ ที่จ่าย 3% (WHT 3%):</span>
                          <span className="font-semibold">
                            -{whtAmount.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between py-2 border-t-2 border-slate-900 text-sm font-bold text-slate-950">
                        <span className="font-sans">ยอดสุทธิที่ต้องชำระ (Net Payable):</span>
                        <span className="text-base text-cyan-900">
                          {netPayable.toLocaleString("th-TH", { minimumFractionDigits: 2 })} ฿
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
                    <div>
                      <div className="h-14 border-b border-dashed border-slate-300 flex items-center justify-center">
                        <span className="text-slate-300 font-serif italic text-sm">Customer Signature</span>
                      </div>
                      <p className="mt-2 font-bold text-slate-800">ผู้รับบริการ / ลูกค้า</p>
                      <p className="text-[10px] text-slate-400">Authorized Customer Signature</p>
                    </div>
                    <div>
                      <div className="h-14 border-b border-dashed border-slate-300 flex items-center justify-center relative">
                        <span className="font-serif italic text-slate-900 font-bold text-sm">Smile Clean Finance</span>
                        <div className="absolute right-4 px-2 py-0.5 rounded border border-cyan-800 text-cyan-800 uppercase text-[9px] font-bold opacity-80 rotate-[-4deg]">
                          SMILE CLEAN SEAL
                        </div>
                      </div>
                      <p className="mt-2 font-bold text-slate-800">ผู้รับเงิน / ผู้มีอำนาจลงนาม</p>
                      <p className="text-[10px] text-slate-400">บริษัท สไมล์ คลีน (ประเทศไทย) จำกัด</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 1-CLICK LINE DISPATCH */}
          {activeTab === "dispatch" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Input */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <h2 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                  📝 Booking & Dispatch Parameters
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Job Reference ID</label>
                    <input
                      type="text"
                      value={jobId}
                      onChange={(e) => setJobId(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Assigned Team Lead</label>
                    <input
                      type="text"
                      value={cleanerName}
                      onChange={(e) => setCleanerName(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Customer Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Customer Phone</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">Service Category</label>
                  <input
                    type="text"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Date & Schedule Window</label>
                    <input
                      type="text"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300">Territory / Zone</label>
                    <input
                      type="text"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">Location / Room Number</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300">Site Notes / Pets / Security Key</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Output Preview */}
              <div className="lg:col-span-6 space-y-5">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-xs text-cyan-400">📱 Customer LINE Confirmation</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyText(customerLineMsg, "cust")}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white transition border border-slate-700"
                      >
                        {copiedKey === "cust" ? "✓ Copied!" : "📋 Copy"}
                      </button>
                      <a
                        href={`https://line.me/R/msg/text/?${encodeURIComponent(customerLineMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-[#06C755] hover:opacity-90 text-xs text-white font-medium"
                      >
                        Open LINE
                      </a>
                    </div>
                  </div>
                  <pre className="mt-3 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl whitespace-pre-wrap font-sans leading-relaxed border border-slate-800 max-h-56 overflow-y-auto">
                    {customerLineMsg}
                  </pre>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-xs text-emerald-400">🧹 Cleaner Team Job Order</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyText(cleanerJobMsg, "cleaner")}
                        className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-white transition border border-slate-700"
                      >
                        {copiedKey === "cleaner" ? "✓ Copied!" : "📋 Copy"}
                      </button>
                      <a
                        href={`https://line.me/R/msg/text/?${encodeURIComponent(cleanerJobMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-[#06C755] hover:opacity-90 text-xs text-white font-medium"
                      >
                        Open LINE
                      </a>
                    </div>
                  </div>
                  <pre className="mt-3 text-xs text-slate-300 bg-slate-950 p-3.5 rounded-xl whitespace-pre-wrap font-sans leading-relaxed border border-slate-800 max-h-56 overflow-y-auto">
                    {cleanerJobMsg}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BEFORE & AFTER QC INSPECTOR */}
          {activeTab === "qc" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
                <div>
                  <h2 className="text-base font-bold text-white">📸 Before & After Quality Assurance</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Dual-photo verification with checkpoint audit trail</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Inspector:</span>
                  <input
                    type="text"
                    value={qcInspector}
                    onChange={(e) => setQcInspector(e.target.value)}
                    className="rounded bg-slate-950 border border-slate-700 px-2 py-1 text-xs text-white font-medium"
                  />
                </div>
              </div>

              {/* Photo Upload Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Card */}
                <div className="border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px] bg-slate-950 relative overflow-hidden">
                  <span className="absolute top-3 left-3 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                    BEFORE (สภาพก่อนทำ)
                  </span>
                  {beforeImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={beforeImg} alt="Before" className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-3xl mb-2 opacity-60">📸</p>
                      <p className="text-xs text-slate-400">Upload Pre-cleaning Evidence</p>
                      <label className="mt-3 inline-block px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 cursor-pointer">
                        Select Photo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "before")} />
                      </label>
                    </div>
                  )}
                  {beforeImg && (
                    <button onClick={() => setBeforeImg(null)} className="mt-2 text-xs text-red-400 hover:underline">
                      Remove Photo
                    </button>
                  )}
                </div>

                {/* After Card */}
                <div className="border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px] bg-slate-950 relative overflow-hidden">
                  <span className="absolute top-3 left-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                    AFTER (ผลงานหลังเสร็จ)
                  </span>
                  {afterImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={afterImg} alt="After" className="w-full h-64 object-cover rounded-lg" />
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-3xl mb-2 opacity-60">✨</p>
                      <p className="text-xs text-slate-400">Upload Completion Evidence</p>
                      <label className="mt-3 inline-block px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium cursor-pointer shadow">
                        Select Photo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "after")} />
                      </label>
                    </div>
                  )}
                  {afterImg && (
                    <button onClick={() => setAfterImg(null)} className="mt-2 text-xs text-red-400 hover:underline">
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              {/* Checkpoints */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Enterprise QC Checklist
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.floor}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, floor: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Floor Cleaned & Degreased</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.glass}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, glass: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Glass & Mirrors Polished</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.trash}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, trash: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Trash Cleared & Disposed</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.appliances}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, appliances: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Lights / AC / Doors Locked</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.keyReturned}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, keyReturned: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Key & Access Cards Returned</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qcCheckpoints.sanitized}
                      onChange={(e) => setQcCheckpoints({ ...qcCheckpoints, sanitized: e.target.checked })}
                      className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                    />
                    <span>Sanitization Completed</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
