import React from 'react';
import { Printer, Download, Award, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { QuizSummary } from '../types';

interface CertificateProps {
  summary: QuizSummary;
  onClose: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ summary, onClose }) => {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const getDifficultyTitle = (diff: string) => {
    switch (diff) {
      case 'yeu': return 'Củng Cố Nền Tảng';
      case 'trung_binh': return 'Đạt Chuẩn Sách Giáo Khoa';
      case 'kha': return 'Vận Dụng Linh Hoạt';
      case 'gioi': return 'Vận Dụng Cao - Học Sinh Giỏi';
      case 'nang_cao': return 'Thử Thách Tư Duy Olympic';
      default: return 'Toán Học Tiểu Học';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col border border-amber-200 print:shadow-none print:border-none print:max-w-none">
        {/* Action Header bar (hidden when printing) */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm sm:text-base">Vinh Danh Thành Tích Học Tập</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Giấy Khen (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Đóng lại"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= Printable Certificate Body ================= */}
        <div id="certificate-print-area" className="p-4 sm:p-8 bg-[#fffdf5] relative select-none print:p-2">
          {/* Ornate Outer Border */}
          <div className="border-[8px] border-double border-amber-600/80 p-3 sm:p-5 rounded-lg bg-gradient-to-b from-[#fffef7] to-[#fffbf0] shadow-inner relative">
            {/* Inner Golden Line */}
            <div className="border-2 border-amber-500/60 p-4 sm:p-6 rounded relative">
              {/* Corner Ornaments */}
              <div className="absolute top-1 left-1 text-amber-600 text-lg sm:text-2xl font-serif">⚜</div>
              <div className="absolute top-1 right-1 text-amber-600 text-lg sm:text-2xl font-serif">⚜</div>
              <div className="absolute bottom-1 left-1 text-amber-600 text-lg sm:text-2xl font-serif">⚜</div>
              <div className="absolute bottom-1 right-1 text-amber-600 text-lg sm:text-2xl font-serif">⚜</div>

              {/* Watermark Logo in center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
                <span className="text-[120px] sm:text-[180px]">⭐</span>
              </div>

              {/* Certificate Header */}
              <div className="text-center space-y-1 relative z-10">
                <h4 className="text-xs sm:text-sm font-bold tracking-widest text-red-700 uppercase">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </h4>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-700 tracking-wider">
                  Độc lập - Tự do - Hạnh phúc
                </p>
                <div className="w-28 sm:w-36 h-[1.5px] bg-red-600 mx-auto mt-1 mb-2"></div>
                <p className="text-[11px] sm:text-xs font-serif uppercase tracking-widest text-amber-900/80 font-bold">
                  HỘI ĐỒNG KHẢO THÍ TOÁN HỌC TIỂU HỌC VIỆT NAM
                </p>
              </div>

              {/* Title GIẤY KHEN */}
              <div className="text-center my-3 sm:my-5 relative z-10">
                <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-wider text-red-700 drop-shadow-xs">
                  GIẤY KHEN
                </h1>
                <p className="text-xs sm:text-sm font-serif italic text-amber-800 mt-1">
                  Chứng nhận thành tích học tập xuất sắc môn Toán
                </p>
              </div>

              {/* Certificate Content */}
              <div className="text-center space-y-2 sm:space-y-3 relative z-10 font-serif">
                <p className="text-sm sm:text-base text-slate-700">Khen tặng em:</p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-900 tracking-wide font-['Baloo_2',sans-serif]">
                  {summary.studentName || 'Học Sinh Chăm Ngoan'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700">
                  Học sinh: <span className="font-bold text-slate-900">Lớp {summary.grade} Tiểu Học</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                  Đã hoàn thành xuất sắc bài kiểm tra chuyên đề:{' '}
                  <span className="font-bold text-amber-950 font-sans">"{summary.topicTitle}"</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-800 font-sans font-semibold">
                  👩‍🏫 Giáo viên phụ trách: <span className="text-blue-900 font-bold">Cô Chử Thị Ngọc Lan</span>
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-300 rounded-full text-xs font-sans text-amber-900 font-semibold my-1">
                  <span>Mức độ: {getDifficultyTitle(summary.difficulty)}</span>
                  <span>•</span>
                  <span>Kết quả: {summary.scoreOutOf10}/10 Điểm ({summary.percentage}%)</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-red-700 tracking-wide uppercase pt-1">
                  DANH HIỆU: {summary.rankTitle}
                </p>
              </div>

              {/* Footer Signature & Red Seal */}
              <div className="mt-6 sm:mt-8 pt-4 flex items-end justify-between px-2 sm:px-8 relative z-10 text-xs sm:text-sm font-serif text-slate-700">
                <div className="text-center space-y-1">
                  <p className="font-bold text-slate-800 uppercase text-[11px] sm:text-xs tracking-wider">
                    GIÁO VIÊN PHỤ TRÁCH
                  </p>
                  <div className="py-2">
                    <span className="font-serif text-blue-700 text-lg sm:text-xl font-bold italic block rotate-[-4deg]">
                      Chử Thị Ngọc Lan
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 text-xs">Cô Chử Thị Ngọc Lan</p>
                  <p className="font-mono text-[10px] text-slate-500 font-sans mt-1">Mã: {summary.certificateId}</p>
                </div>

                <div className="text-center relative">
                  <p className="italic text-xs text-slate-600 mb-1">
                    Hà Nội, ngày {currentDate.split('/')[0]} tháng {currentDate.split('/')[1]} năm {currentDate.split('/')[2]}
                  </p>
                  <p className="font-bold text-slate-800 uppercase text-xs tracking-wider">
                    TRƯỞNG BAN KHẢO THÍ GIÁO DỤC
                  </p>

                  {/* Red Traditional Stamp */}
                  <div className="relative my-1 flex items-center justify-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-red-600/90 flex flex-col items-center justify-center text-red-600/90 font-bold p-1 text-center rotate-[-12deg] select-none shadow-xs">
                      <span className="text-[8px] tracking-tighter uppercase font-sans">VIỆN GIÁO DỤC TIỂU HỌC</span>
                      <span className="text-xs my-0.5">★ ★ ★</span>
                      <span className="text-[10px] font-black tracking-wider uppercase font-sans">ĐÃ KIỂM ĐỊNH</span>
                      <span className="text-[8px] uppercase font-sans">XUẤT SẮC</span>
                    </div>
                    {/* Stylized Blue Signature */}
                    <div className="absolute font-serif text-blue-700 text-lg sm:text-xl font-bold italic rotate-[-6deg] translate-y-3">
                      Nguyễn Minh Trí
                    </div>
                  </div>

                  <p className="font-semibold text-slate-800 text-xs pt-2">PGS. TS. Nguyễn Minh Trí</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Bottom Encouragement (hidden on print) */}
        <div className="p-4 bg-amber-50/70 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Chúc mừng con đã đạt kết quả tuyệt vời! Hãy in giấy khen để dán vào góc học tập nhé!</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            Quay lại bảng điểm chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};
