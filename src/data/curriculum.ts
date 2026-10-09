import { GradeId, DifficultyInfo, DifficultyLevel, Topic, Question } from '../types';

export const DIFFICULTY_LEVELS: DifficultyInfo[] = [
  {
    id: 'yeu',
    name: 'Mức 1: Củng cố nền tảng (Yếu)',
    tagline: 'Bài tập nhận biết, trực quan, có gợi ý dễ hiểu',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    bgColor: 'hover:bg-emerald-50/70 data-[selected=true]:bg-emerald-100/80 data-[selected=true]:border-emerald-500',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    icon: '🌱',
    stars: 1,
    description: 'Dành cho các em cần củng cố lại kiến thức gốc, bài toán số nhỏ, có hình minh họa sinh động giúp lấy lại tự tin.'
  },
  {
    id: 'trung_binh',
    name: 'Mức 2: Đạt chuẩn SGK (Trung bình)',
    tagline: 'Bài tập thông hiểu, chuẩn kiến thức sách giáo khoa',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    bgColor: 'hover:bg-blue-50/70 data-[selected=true]:bg-blue-100/80 data-[selected=true]:border-blue-500',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    icon: '📘',
    stars: 2,
    description: 'Dành cho học sinh mức độ trung bình muốn nắm vững các dạng bài cơ bản và phép tính chuẩn mực theo chương trình.'
  },
  {
    id: 'kha',
    name: 'Mức 3: Vận dụng linh hoạt (Khá)',
    tagline: 'Bài toán vận dụng, 2 bước giải hoặc toán đố có lời văn',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    bgColor: 'hover:bg-amber-50/70 data-[selected=true]:bg-amber-100/80 data-[selected=true]:border-amber-500',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    icon: '⭐',
    stars: 3,
    description: 'Dành cho học sinh khá, rèn luyện kỹ năng kết hợp nhiều bước tính, giải toán có lời văn và phân tích đề bài.'
  },
  {
    id: 'gioi',
    name: 'Mức 4: Vận dụng cao (Giỏi)',
    tagline: 'Bài toán tư duy logic, tính nhanh, bài toán suy luận',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    bgColor: 'hover:bg-purple-50/70 data-[selected=true]:bg-purple-100/80 data-[selected=true]:border-purple-500',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    icon: '🏆',
    stars: 4,
    description: 'Dành cho học sinh giỏi rèn luyện tư duy phản biện, phương pháp tính thuận tiện và các bài toán phân hóa điểm 9-10.'
  },
  {
    id: 'nang_cao',
    name: 'Mức 5: Thử thách tư duy (Nâng cao)',
    tagline: 'Toán Olympic, Bồi dưỡng học sinh giỏi, Thử thách tài năng',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    bgColor: 'hover:bg-rose-50/70 data-[selected=true]:bg-rose-100/80 data-[selected=true]:border-rose-500',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-700',
    icon: '👑',
    stars: 5,
    description: 'Dành cho các tài năng toán học nhí, đề thi Violympic, Kangaroo, ASMO, các bài toán tư duy chiến lược đỉnh cao.'
  }
];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

export const CURRICULUM_BY_GRADE: Record<GradeId, Topic[]> = {
  1: [
    {
      id: 'g1_t1',
      title: 'Các số và phép cộng, trừ trong phạm vi 10',
      grade: 1,
      icon: '🍎',
      description: 'Đếm số lượng, so sánh lớn hơn/bé hơn, tách gộp số, cộng trừ ngón tay và đồ vật trong phạm vi 10.',
      sampleKeywords: ['cộng trừ 10', 'tách gộp', 'so sánh số']
    },
    {
      id: 'g1_t2',
      title: 'Các số trong phạm vi 100 & Chục - Đơn vị',
      grade: 1,
      icon: '🔢',
      description: 'Số tròn chục, cấu tạo số có hai chữ số (chục và đơn vị), so sánh các số đến 100.',
      sampleKeywords: ['chục và đơn vị', 'số có hai chữ số', 'số tròn chục']
    },
    {
      id: 'g1_t3',
      title: 'Phép cộng, phép trừ không nhớ trong phạm vi 100',
      grade: 1,
      icon: '➕',
      description: 'Đặt tính rồi tính hàng dọc, tính nhẩm, cộng trừ số tròn chục và số có 2 chữ số.',
      sampleKeywords: ['đặt tính rồi tính', 'cộng trừ không nhớ']
    },
    {
      id: 'g1_t4',
      title: 'Hình học & Vị trí không gian',
      grade: 1,
      icon: '🔺',
      description: 'Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương; bên trái, bên phải.',
      sampleKeywords: ['hình vuông', 'hình tròn', 'tam giác', 'vị trí']
    },
    {
      id: 'g1_t5',
      title: 'Đo lường, Đồng hồ (Xem giờ đúng) & Lịch',
      grade: 1,
      icon: '⏰',
      description: 'Đo độ dài bằng gang tay, xăng-ti-mét (cm); xem đồng hồ chỉ đúng giờ; các ngày trong tuần.',
      sampleKeywords: ['xăng-ti-mét', 'cm', 'đồng hồ', 'thứ ngày']
    },
    {
      id: 'g1_t6',
      title: 'Bài toán có lời văn lớp 1 & Ôn tập cuối năm',
      grade: 1,
      icon: '📝',
      description: 'Đọc hiểu bài toán thêm vào hoặc bớt đi, viết phép tính và câu trả lời hoàn chỉnh.',
      sampleKeywords: ['toán có lời văn', 'tất cả có', 'còn lại']
    }
  ],

  2: [
    {
      id: 'g2_t1',
      title: 'Phép cộng, trừ có nhớ trong phạm vi 100',
      grade: 2,
      icon: '➕',
      description: 'Bảng cộng (qua 10), bảng trừ (qua 10), phép tính cộng trừ có nhớ trong phạm vi 100.',
      sampleKeywords: ['cộng có nhớ', 'trừ có nhớ', 'phạm vi 100']
    },
    {
      id: 'g2_t2',
      title: 'Phép nhân & Bảng nhân 2, 5 (và nhân 3, 4)',
      grade: 2,
      icon: '✖️',
      description: 'Khái niệm tích số, tổng các số hạng bằng nhau, bảng nhân 2 và bảng nhân 5.',
      sampleKeywords: ['bảng nhân 2', 'bảng nhân 5', 'thừa số', 'tích']
    },
    {
      id: 'g2_t3',
      title: 'Phép chia & Bảng chia 2, 5 - Tìm một phần mấy',
      grade: 2,
      icon: '➗',
      description: 'Khái niệm phép chia, số bị chia - số chia - thương, một phần hai (1/2), một phần năm (1/5).',
      sampleKeywords: ['bảng chia 2', 'bảng chia 5', 'một phần hai']
    },
    {
      id: 'g2_t4',
      title: 'Các số trong phạm vi 1000 & Phép tính 3 chữ số',
      grade: 2,
      icon: '💯',
      description: 'Trăm - Chục - Đơn vị, đọc viết so sánh các số có 3 chữ số, cộng trừ không nhớ trong phạm vi 1000.',
      sampleKeywords: ['phạm vi 1000', 'hàng trăm', 'so sánh số']
    },
    {
      id: 'g2_t5',
      title: 'Đại lượng: dm, m, km, kg, lít, Ngày - Giờ - Phút',
      grade: 2,
      icon: '📏',
      description: 'Đơn vị đo độ dài (dm, m, km), khối lượng (kg), dung tích (lít), đồng hồ xem giờ và phút.',
      sampleKeywords: ['đề-xi-mét', 'mét', 'ki-lô-gam', 'lít', 'giờ phút']
    },
    {
      id: 'g2_t6',
      title: 'Hình học & Đoạn thẳng, Đường gấp khúc, Hình tứ giác',
      grade: 2,
      icon: '📐',
      description: 'Điểm, đoạn thẳng, đường gấp khúc, tính độ dài đường gấp khúc, chu vi hình tam giác và tứ giác.',
      sampleKeywords: ['đường gấp khúc', 'đoạn thẳng', 'tứ giác']
    }
  ],

  3: [
    {
      id: 'g3_t1',
      title: 'Bảng nhân và Bảng chia từ 2 đến 9',
      grade: 3,
      icon: '🧠',
      description: 'Học thuộc và vận dụng thành thạo toàn bộ bảng cửu chương nhân và chia từ 2 đến 9, phép chia có dư.',
      sampleKeywords: ['bảng cửu chương', 'nhân chia từ 2 đến 9', 'phép chia có dư']
    },
    {
      id: 'g3_t2',
      title: 'Cộng, trừ, nhân, chia số trong phạm vi 100.000',
      grade: 3,
      icon: '🧮',
      description: 'Số có 4 và 5 chữ số, nhân/chia số có nhiều chữ số với số có 1 chữ số, làm tròn số.',
      sampleKeywords: ['phạm vi 100000', 'nhân với số có 1 chữ số', 'làm tròn số']
    },
    {
      id: 'g3_t3',
      title: 'Tính giá trị biểu thức số & Thứ tự thực hiện phép tính',
      grade: 3,
      icon: '🔣',
      description: 'Quy tắc nhân chia trước, cộng trừ sau; biểu thức có dấu ngoặc đơn ( ) và bài toán tính nhanh.',
      sampleKeywords: ['giá trị biểu thức', 'dấu ngoặc', 'thứ tự phép tính']
    },
    {
      id: 'g3_t4',
      title: 'Chu vi và Diện tích: Hình chữ nhật & Hình vuông',
      grade: 3,
      icon: '🟩',
      description: 'Khái niệm góc vuông, góc không vuông; công thức tính chu vi và diện tích hình chữ nhật, hình vuông.',
      sampleKeywords: ['chu vi', 'diện tích', 'hình chữ nhật', 'hình vuông', 'cm²']
    },
    {
      id: 'g3_t5',
      title: 'Đo lường: mm, gam, ml, Tiền Việt Nam & Lịch tháng',
      grade: 3,
      icon: '🪙',
      description: 'Đơn vị mi-li-mét, gam (g), mi-li-lít (ml), nhận biết mệnh giá tiền Việt Nam (đồng), xem lịch năm.',
      sampleKeywords: ['tiền Việt Nam', 'gam', 'ml', 'mm']
    },
    {
      id: 'g3_t6',
      title: 'Toán giải bằng 2 bước tính & Rút về đơn vị',
      grade: 3,
      icon: '💡',
      description: 'Dạng toán điển hình lớp 3: Gấp một số lên nhiều lần, giảm đi nhiều lần, bài toán rút về đơn vị.',
      sampleKeywords: ['rút về đơn vị', 'gấp lên nhiều lần', 'bài toán 2 phép tính']
    }
  ],

  4: [
    {
      id: 'g4_t1',
      title: 'Số có nhiều chữ số, Lớp triệu & Bốn phép tính tự nhiên',
      grade: 4,
      icon: '🏛️',
      description: 'Lớp đơn vị, lớp nghìn, lớp triệu; nhân với số có hai ba chữ số, chia cho số có hai chữ số.',
      sampleKeywords: ['lớp triệu', 'hàng triệu', 'nhân chia số lớn']
    },
    {
      id: 'g4_t2',
      title: 'Dấu hiệu chia hết cho 2, 3, 5, 9 & Tính chất phép tính',
      grade: 4,
      icon: '⚡',
      description: 'Nhận biết dấu hiệu chia hết cho 2, 5 (chữ số tận cùng) và cho 3, 9 (tổng các chữ số); giao hoán kết hợp.',
      sampleKeywords: ['chia hết cho 2 3 5 9', 'tính chất phân phối']
    },
    {
      id: 'g4_t3',
      title: 'Phân số: Khái niệm, Rút gọn, Quy đồng & 4 phép tính',
      grade: 4,
      icon: '🍰',
      description: 'Tử số, mẫu số, phân số bằng nhau, rút gọn, quy đồng mẫu số; cộng, trừ, nhân, chia phân số.',
      sampleKeywords: ['phân số', 'rút gọn phân số', 'quy đồng mẫu số', 'cộng trừ phân số']
    },
    {
      id: 'g4_t4',
      title: 'Các dạng toán điển hình: Tổng - Hiệu, Tổng - Tỉ, Hiệu - Tỉ',
      grade: 4,
      icon: '⚖️',
      description: 'Tìm hai số khi biết Tổng và Hiệu, Tổng và Tỉ số, Hiệu và Tỉ số; Tìm số trung bình cộng.',
      sampleKeywords: ['tổng và hiệu', 'tổng và tỉ', 'hiệu và tỉ', 'trung bình cộng']
    },
    {
      id: 'g4_t5',
      title: 'Hình học: Góc nhọn/tù/bẹt, Hình bình hành & Hình thoi',
      grade: 4,
      icon: '🔷',
      description: 'Hai đường thẳng vuông góc, song song; tính chu vi và diện tích hình bình hành, hình thoi.',
      sampleKeywords: ['hình bình hành', 'hình thoi', 'góc nhọn góc tù', 'diện tích hình thoi']
    },
    {
      id: 'g4_t6',
      title: 'Đại lượng đo: Yến, Tạ, Tấn, Giây, Thế kỉ, dm², m², mm²',
      grade: 4,
      icon: '⚖️',
      description: 'Bảng đơn vị đo khối lượng lớn, thời gian thế kỉ (thế kỉ XX, XXI), đơn vị diện tích m², dm², mm².',
      sampleKeywords: ['yến tạ tấn', 'thế kỉ', 'mét vuông']
    }
  ],

  5: [
    {
      id: 'g5_t1',
      title: 'Ôn tập Phân số, Hỗn số & Phân số thập phân',
      grade: 5,
      icon: '🥧',
      description: 'Các phép tính nâng cao với phân số, chuyển đổi hỗn số sang phân số, phân số thập phân.',
      sampleKeywords: ['hỗn số', 'phân số thập phân', 'tính nhanh phân số']
    },
    {
      id: 'g5_t2',
      title: 'Số thập phân & Bốn phép tính với số thập phân',
      grade: 5,
      icon: '🔟',
      description: 'Cấu tạo số thập phân (phần nguyên, phần thập phân), cộng, trừ, nhân, chia số thập phân.',
      sampleKeywords: ['số thập phân', 'cộng trừ số thập phân', 'nhân chia số thập phân']
    },
    {
      id: 'g5_t3',
      title: 'Tỉ số phần trăm & 3 bài toán cơ bản về %',
      grade: 5,
      icon: '📊',
      description: 'Tìm tỉ số phần trăm của 2 số, tìm giá trị % của một số, tìm một số khi biết giá trị % của nó; lãi suất, giảm giá.',
      sampleKeywords: ['tỉ số phần trăm', 'lãi suất', 'giảm giá', 'toán phần trăm']
    },
    {
      id: 'g5_t4',
      title: 'Hình học phẳng: Tam giác, Hình thang, Hình tròn',
      grade: 5,
      icon: '⭕',
      description: 'Diện tích hình tam giác, diện tích hình thang, chu vi và diện tích hình tròn (bán kính, đường kính, số Pi = 3,14).',
      sampleKeywords: ['diện tích hình thang', 'hình tam giác', 'chu vi hình tròn', 'diện tích hình tròn']
    },
    {
      id: 'g5_t5',
      title: 'Hình không gian: Hình hộp chữ nhật & Hình lập phương',
      grade: 5,
      icon: '📦',
      description: 'Diện tích xung quanh, diện tích toàn phần và thể tích hình hộp chữ nhật, hình lập phương (m³, dm³, cm³).',
      sampleKeywords: ['diện tích xung quanh', 'thể tích', 'hình hộp chữ nhật', 'hình lập phương']
    },
    {
      id: 'g5_t6',
      title: 'Toán chuyển động đều: Vận tốc, Quãng đường, Thời gian',
      grade: 5,
      icon: '🚗',
      description: 'Công thức s = v × t, v = s : t, t = s : v; bài toán hai xe chuyển động ngược chiều (gặp nhau), cùng chiều (đuổi kịp).',
      sampleKeywords: ['vận tốc', 'quãng đường', 'thời gian', 'ngược chiều', 'cùng chiều']
    }
  ]
};

// Procedural question generator helper
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate rich Vietnamese math questions across all Grades, Topics, and 5 Difficulties
export function generateQuestionsForSession(
  grade: GradeId,
  topic: Topic,
  difficulty: DifficultyLevel,
  count: number
): Question[] {
  const questions: Question[] = [];

  // Generator engine based on grade and difficulty
  for (let i = 1; i <= count; i++) {
    const q = generateSingleQuestion(grade, topic.id, difficulty, i);
    questions.push(q);
  }

  return questions;
}

function generateSingleQuestion(
  grade: GradeId,
  topicId: string,
  diff: DifficultyLevel,
  index: number
): Question {
  // Dispatcher by grade
  switch (grade) {
    case 1:
      return genGrade1Question(topicId, diff, index);
    case 2:
      return genGrade2Question(topicId, diff, index);
    case 3:
      return genGrade3Question(topicId, diff, index);
    case 4:
      return genGrade4Question(topicId, diff, index);
    case 5:
    default:
      return genGrade5Question(topicId, diff, index);
  }
}

// ================= GRADE 1 GENERATOR =================
function genGrade1Question(topicId: string, diff: DifficultyLevel, idx: number): Question {
  if (topicId === 'g1_t1') {
    // Phép cộng trừ trong phạm vi 10
    if (diff === 'yeu') {
      const a = randInt(1, 5);
      const b = randInt(1, 4);
      const sum = a + b;
      const opts = makeChoices(sum, [sum - 1, sum + 1, sum + 2]);
      return {
        id: `g1_${idx}`,
        grade: 1,
        topicId,
        difficulty: diff,
        visualEmoji: '🍎',
        question: `Bé đếm nhé: Em có ${a} quả táo, mẹ cho thêm ${b} quả táo nữa. Hỏi tất cả em có mấy quả táo? (${a} + ${b} = ?)`,
        options: opts.choices.map(c => `${c} quả táo`),
        correctIndex: opts.correctIndex,
        explanation: `Đếm thêm: ${a} quả táo thêm ${b} quả nữa là: ${a} + ${b} = ${sum} quả táo.`,
        hint: `Con hãy giơ ${a} ngón tay, sau đó giơ thêm ${b} ngón tay nữa rồi đếm tất cả nhé!`
      };
    } else if (diff === 'trung_binh') {
      const a = randInt(5, 10);
      const b = randInt(1, a - 1);
      const diffVal = a - b;
      const opts = makeChoices(diffVal, [diffVal - 1, diffVal + 1, diffVal + 2]);
      return {
        id: `g1_${idx}`,
        grade: 1,
        topicId,
        difficulty: diff,
        visualEmoji: '🎈',
        question: `Phép tính: ${a} - ${b} = ?`,
        options: opts.choices.map(c => `${c}`),
        correctIndex: opts.correctIndex,
        explanation: `Ta lấy ${a} bớt đi ${b} còn lại: ${a} - ${b} = ${diffVal}.`,
        hint: `Bắt đầu từ số ${a}, con đếm lùi lại ${b} bước nhé!`
      };
    } else if (diff === 'kha') {
      const a = randInt(2, 4);
      const b = randInt(1, 3);
      const c = randInt(1, 2);
      const ans = a + b - c;
      const opts = makeChoices(ans, [ans - 1, ans + 1, ans + 2]);
      return {
        id: `g1_${idx}`,
        grade: 1,
        topicId,
        difficulty: diff,
        visualEmoji: '⭐',
        question: `Tính giá trị của dãy tính: ${a} + ${b} - ${c} = ?`,
        options: opts.choices.map(cVal => `${cVal}`),
        correctIndex: opts.correctIndex,
        explanation: `Tính từ trái sang phải: ${a} + ${b} = ${a + b}, sau đó lấy ${a + b} - ${c} = ${ans}.`,
        hint: `Con hãy tính phép cộng ${a} + ${b} trước, được bao nhiêu rồi trừ đi ${c} nha!`
      };
    } else if (diff === 'gioi') {
      const a = randInt(4, 9);
      const b = randInt(2, a - 1);
      const missing = a - b;
      const opts = makeChoices(missing, [missing - 1, missing + 1, missing + 2]);
      return {
        id: `g1_${idx}`,
        grade: 1,
        topicId,
        difficulty: diff,
        visualEmoji: '🔍',
        question: `Tìm số thích hợp điền vào ô trống: ${b} + [ ? ] = ${a}`,
        options: opts.choices.map(cVal => `Số ${cVal}`),
        correctIndex: opts.correctIndex,
        explanation: `Muốn tìm số trong ô trống, ta lấy kết quả trừ đi số đã biết: ${a} - ${b} = ${missing}.`,
        hint: `Lấy ${a} trừ đi ${b} là ra số cần điền ngay thôi!`
      };
    } else {
      // nang_cao
      const sum = 9;
      const opts = makeChoices(4, [3, 5, 2]);
      return {
        id: `g1_${idx}`,
        grade: 1,
        topicId,
        difficulty: diff,
        visualEmoji: '👑',
        question: `Có 3 bạn: An, Bình và Chi có tất cả ${sum} cái kẹo. Biết An có 2 cái, Bình có 3 cái. Hỏi bạn Chi có mấy cái kẹo?`,
        options: opts.choices.map(c => `${c} cái kẹo`),
        correctIndex: opts.correctIndex,
        explanation: `Tổng kẹo của An và Bình là: 2 + 3 = 5 cái. Vậy số kẹo của bạn Chi là: 9 - 5 = 4 cái kẹo.`,
        hint: `Tính số kẹo của cả hai bạn An và Bình trước, sau đó lấy tổng trừ đi nhé!`
      };
    }
  }

  // Generic fallback for Grade 1 other topics
  const numA = randInt(10, 40);
  const numB = randInt(1, 9);
  const total = numA + numB;
  const opts = makeChoices(total, [total - 1, total + 1, total + 10]);
  return {
    id: `g1_gen_${idx}`,
    grade: 1,
    topicId,
    difficulty: diff,
    visualEmoji: '🌸',
    question: `Số gồm ${Math.floor(total / 10)} chục và ${total % 10} đơn vị là số nào?`,
    options: opts.choices.map(c => `Số ${c}`),
    correctIndex: opts.correctIndex,
    explanation: `${Math.floor(total / 10)} chục và ${total % 10} đơn vị ghép lại chính là số ${total}.`,
    hint: `Số hàng chục viết trước, số hàng đơn vị viết sau con nhé!`
  };
}

// ================= GRADE 2 GENERATOR =================
function genGrade2Question(topicId: string, diff: DifficultyLevel, idx: number): Question {
  if (topicId === 'g2_t2' || topicId === 'g2_t3') {
    // Phép nhân và chia 2, 5
    if (diff === 'yeu') {
      const mult = randInt(2, 9);
      const res = 2 * mult;
      const opts = makeChoices(res, [res - 2, res + 2, res + 4]);
      return {
        id: `g2_${idx}`,
        grade: 2,
        topicId,
        difficulty: diff,
        visualEmoji: '🐥',
        question: `Bảng nhân 2: Kết quả của phép tính 2 × ${mult} là bao nhiêu?`,
        options: opts.choices.map(c => `${c}`),
        correctIndex: opts.correctIndex,
        explanation: `Theo bảng nhân 2: 2 nhân ${mult} bằng ${res} (tương đương ${mult} cộng ${mult} = ${res}).`,
        hint: `Con nhẩm lại bảng nhân 2 nhé: 2 × ${mult} = ?`
      };
    } else if (diff === 'trung_binh') {
      const mult = randInt(3, 9);
      const res = 5 * mult;
      const opts = makeChoices(res, [res - 5, res + 5, res - 10]);
      return {
        id: `g2_${idx}`,
        grade: 2,
        topicId,
        difficulty: diff,
        visualEmoji: '🖐️',
        question: `Mỗi bàn tay có 5 ngón tay. Hỏi ${mult} bàn tay như thế có tất cả bao nhiêu ngón tay?`,
        options: opts.choices.map(c => `${c} ngón tay`),
        correctIndex: opts.correctIndex,
        explanation: `Phép tính: 5 × ${mult} = ${res} (ngón tay).`,
        hint: `Áp dụng bảng nhân 5: lấy 5 ngón nhân với ${mult} bàn tay!`
      };
    } else if (diff === 'kha') {
      const div = randInt(3, 8);
      const total = 5 * div;
      const opts = makeChoices(div, [div - 1, div + 1, div + 2]);
      return {
        id: `g2_${idx}`,
        grade: 2,
        topicId,
        difficulty: diff,
        visualEmoji: '🍬',
        question: `Có ${total} cái kẹo chia đều cho 5 bạn nhỏ. Hỏi mỗi bạn nhận được bao nhiêu cái kẹo?`,
        options: opts.choices.map(c => `${c} cái kẹo`),
        correctIndex: opts.correctIndex,
        explanation: `Mỗi bạn có số kẹo là: ${total} : 5 = ${div} (cái kẹo).`,
        hint: `Chia đều cho 5 bạn nghĩa là thực hiện phép chia cho 5 nhé!`
      };
    } else if (diff === 'gioi') {
      const x = 5;
      const y = randInt(4, 7);
      const add = randInt(12, 25);
      const ans = x * y + add;
      const opts = makeChoices(ans, [ans - 5, ans + 5, ans + 2]);
      return {
        id: `g2_${idx}`,
        grade: 2,
        topicId,
        difficulty: diff,
        visualEmoji: '🚀',
        question: `Tính giá trị của biểu thức: 5 × ${y} + ${add} = ?`,
        options: opts.choices.map(c => `${c}`),
        correctIndex: opts.correctIndex,
        explanation: `Thực hiện nhân trước: 5 × ${y} = ${x * y}. Sau đó cộng tiếp: ${x * y} + ${add} = ${ans}.`,
        hint: `Quy tắc vàng: Thực hiện phép nhân trước, phép cộng sau nhé!`
      };
    } else {
      // nang cao
      const rabbits = randInt(3, 6);
      const chickens = randInt(2, 5);
      const legs = rabbits * 4 + chickens * 2;
      const opts = makeChoices(legs, [legs - 2, legs + 2, legs + 4]);
      return {
        id: `g2_${idx}`,
        grade: 2,
        topicId,
        difficulty: diff,
        visualEmoji: '🐰',
        question: `Trong sân có ${rabbits} con thỏ và ${chickens} con gà. Hỏi tất cả các con vật trong sân có bao nhiêu cái chân?`,
        options: opts.choices.map(c => `${c} cái chân`),
        correctIndex: opts.correctIndex,
        explanation: `Mỗi con thỏ có 4 chân: ${rabbits} × 4 = ${rabbits * 4} chân. Mỗi con gà có 2 chân: ${chickens} × 2 = ${chickens * 2} chân. Tổng số chân: ${rabbits * 4} + ${chickens * 2} = ${legs} cái chân.`,
        hint: `Nhớ rằng: Con thỏ có 4 chân, còn con gà có 2 chân nha!`
      };
    }
  }

  // Cộng trừ có nhớ trong phạm vi 100
  const a = randInt(25, 48);
  const b = randInt(17, 39);
  const sum = a + b;
  const opts = makeChoices(sum, [sum - 10, sum + 10, sum - 1]);
  return {
    id: `g2_add_${idx}`,
    grade: 2,
    topicId,
    difficulty: diff,
    visualEmoji: '⭐',
    question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
    options: opts.choices.map(c => `${c}`),
    correctIndex: opts.correctIndex,
    explanation: `Cộng hàng đơn vị: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, nhớ 1 sang hàng chục. Kết quả là ${sum}.`,
    hint: `Chú ý nhớ 1 sang hàng chục sau khi cộng hàng đơn vị nhé!`
  };
}

// ================= GRADE 3 GENERATOR =================
function genGrade3Question(topicId: string, diff: DifficultyLevel, idx: number): Question {
  if (topicId === 'g3_t4') {
    // Chu vi diện tích hình chữ nhật & vuông
    const dai = randInt(6, 12);
    const rong = randInt(3, dai - 1);
    const chuVi = (dai + rong) * 2;
    const dienTich = dai * rong;

    if (diff === 'yeu' || diff === 'trung_binh') {
      const opts = makeChoices(chuVi, [chuVi - 4, chuVi + 4, dai + rong]);
      return {
        id: `g3_${idx}`,
        grade: 3,
        topicId,
        difficulty: diff,
        visualEmoji: '🟩',
        question: `Một mảnh vườn hình chữ nhật có chiều dài ${dai}m và chiều rộng ${rong}m. Chu vi của mảnh vườn đó là bao nhiêu?`,
        options: opts.choices.map(c => `${c} m`),
        correctIndex: opts.correctIndex,
        explanation: `Công thức chu vi hình chữ nhật: (Chiều dài + Chiều rộng) × 2 = (${dai} + ${rong}) × 2 = ${dai + rong} × 2 = ${chuVi} m.`,
        hint: `Chu vi hình chữ nhật = (Dài + Rộng) × 2 cùng đơn vị đo.`
      };
    } else if (diff === 'kha') {
      const opts = makeChoices(dienTich, [dienTich - 6, dienTich + 6, chuVi]);
      return {
        id: `g3_${idx}`,
        grade: 3,
        topicId,
        difficulty: diff,
        visualEmoji: '📐',
        question: `Tính diện tích của một hình chữ nhật có chiều dài ${dai} cm và chiều rộng ${rong} cm:`,
        options: opts.choices.map(c => `${c} cm²`),
        correctIndex: opts.correctIndex,
        explanation: `Diện tích hình chữ nhật = Chiều dài × Chiều rộng = ${dai} × ${rong} = ${dienTich} cm².`,
        hint: `Diện tích = Dài nhân Rộng (đơn vị là cm² nhé)!`
      };
    } else {
      // gioi / nang cao
      const canhVuong = randInt(5, 9);
      const cvV = canhVuong * 4;
      const dtV = canhVuong * canhVuong;
      const opts = makeChoices(dtV, [cvV, dtV - 5, dtV + 10]);
      return {
        id: `g3_${idx}`,
        grade: 3,
        topicId,
        difficulty: diff,
        visualEmoji: '👑',
        question: `Một hình vuông có chu vi bằng ${cvV} cm. Hỏi diện tích của hình vuông đó là bao nhiêu xăng-ti-mét vuông?`,
        options: opts.choices.map(c => `${c} cm²`),
        correctIndex: opts.correctIndex,
        explanation: `Bước 1: Tìm cạnh hình vuông: ${cvV} : 4 = ${canhVuong} cm. Bước 2: Tính diện tích: Cạnh × Cạnh = ${canhVuong} × ${canhVuong} = ${dtV} cm².`,
        hint: `Trước hết hãy lấy chu vi chia cho 4 để tìm độ dài một cạnh hình vuông!`
      };
    }
  }

  // Biểu thức số & Phép tính nhân chia
  const a = randInt(120, 450);
  const b = randInt(2, 4);
  const mult = a * b;
  const opts = makeChoices(mult, [mult - 10, mult + 20, mult - 2]);
  return {
    id: `g3_calc_${idx}`,
    grade: 3,
    topicId,
    difficulty: diff,
    visualEmoji: '🧮',
    question: `Tính nhẩm kết quả phép nhân: ${a} × ${b} = ?`,
    options: opts.choices.map(c => `${c}`),
    correctIndex: opts.correctIndex,
    explanation: `Thực hiện nhân từ phải sang trái: ${a} × ${b} = ${mult}.`,
    hint: `Nhân lần lượt từng hàng: đơn vị, chục rồi tới trăm.`
  };
}

// ================= GRADE 4 GENERATOR =================
function genGrade4Question(topicId: string, diff: DifficultyLevel, idx: number): Question {
  if (topicId === 'g4_t4') {
    // Toán tìm 2 số khi biết Tổng và Hiệu / Tỉ
    const soBe = randInt(15, 45);
    const hieu = randInt(10, 30);
    const soLon = soBe + hieu;
    const tong = soLon + soBe;

    if (diff === 'yeu' || diff === 'trung_binh') {
      const opts = makeChoices(soLon, [soBe, soLon - 2, soLon + 5]);
      return {
        id: `g4_${idx}`,
        grade: 4,
        topicId,
        difficulty: diff,
        visualEmoji: '⚖️',
        question: `Hai số có tổng bằng ${tong} và hiệu bằng ${hieu}. Tìm số lớn:`,
        options: opts.choices.map(c => `Số lớn là ${c}`),
        correctIndex: opts.correctIndex,
        explanation: `Công thức tìm số lớn khi biết Tổng và Hiệu: Số lớn = (Tổng + Hiệu) : 2 = (${tong} + ${hieu}) : 2 = ${tong + hieu} : 2 = ${soLon}.`,
        hint: `Công thức kinh điển: Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng - Hiệu) : 2.`
      };
    } else if (diff === 'kha') {
      // Trung bình cộng
      const x1 = randInt(20, 50);
      const x2 = randInt(30, 60);
      const x3 = randInt(25, 55);
      const tbc = Math.round((x1 + x2 + x3) / 3);
      const sumExact = tbc * 3;
      const x3Exact = sumExact - x1 - x2;
      const opts = makeChoices(tbc, [tbc - 2, tbc + 3, tbc + 10]);
      return {
        id: `g4_${idx}`,
        grade: 4,
        topicId,
        difficulty: diff,
        visualEmoji: '📊',
        question: `Tìm số trung bình cộng của ba số: ${x1}, ${x2} và ${x3Exact}:`,
        options: opts.choices.map(c => `${c}`),
        correctIndex: opts.correctIndex,
        explanation: `Số trung bình cộng = (${x1} + ${x2} + ${x3Exact}) : 3 = ${sumExact} : 3 = ${tbc}.`,
        hint: `Muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó rồi chia cho số các số hạng.`
      };
    } else {
      // Tổng - Tỉ hoặc Olympic
      const ti = randInt(2, 4);
      const be = randInt(12, 28);
      const lon = be * ti;
      const tongTi = be + lon;
      const opts = makeChoices(lon, [be, lon - 4, lon + ti]);
      return {
        id: `g4_${idx}`,
        grade: 4,
        topicId,
        difficulty: diff,
        visualEmoji: '👑',
        question: `Một mảnh đất hình chữ nhật có chu vi ${tongTi * 2} m. Biết chiều dài gấp ${ti} lần chiều rộng. Tìm chiều dài mảnh đất:`,
        options: opts.choices.map(c => `${c} m`),
        correctIndex: opts.correctIndex,
        explanation: `Nửa chu vi (Tổng chiều dài và chiều rộng) là: ${tongTi * 2} : 2 = ${tongTi} m. Tổng số phần bằng nhau: 1 + ${ti} = ${ti + 1} phần. Chiều rộng là: ${tongTi} : ${ti + 1} = ${be} m. Chiều dài là: ${be} × ${ti} = ${lon} m.`,
        hint: `Bước 1 tính nửa chu vi, sau đó vẽ sơ đồ đoạn thẳng tìm tổng số phần bằng nhau nhé!`
      };
    }
  }

  if (topicId === 'g4_t3') {
    // Phân số
    const tu1 = 1;
    const mau1 = randInt(2, 4);
    const tu2 = 1;
    const mau2 = randInt(3, 5);
    const mauChung = mau1 * mau2;
    const tuChung = tu1 * mau2 + tu2 * mau1;
    return {
      id: `g4_frac_${idx}`,
      grade: 4,
      topicId,
      difficulty: diff,
      visualEmoji: '🍰',
      question: `Thực hiện phép tính cộng phân số: ${tu1}/${mau1} + ${tu2}/${mau2} = ?`,
      options: [
        `${tuChung}/${mauChung}`,
        `${tu1 + tu2}/${mau1 + mau2}`,
        `${tuChung + 1}/${mauChung}`,
        `${tuChung}/${mauChung + 1}`
      ],
      correctIndex: 0,
      explanation: `Quy đồng mẫu số: ${tu1}/${mau1} = ${tu1 * mau2}/${mauChung}; ${tu2}/${mau2} = ${tu2 * mau1}/${mauChung}. Sau đó cộng hai tử số: (${tu1 * mau2} + ${tu2 * mau1})/${mauChung} = ${tuChung}/${mauChung}.`,
      hint: `Tuyệt đối không cộng tử với tử, mẫu với mẫu! Phải quy đồng mẫu số chung trước nhé!`
    };
  }

  // Dấu hiệu chia hết
  return {
    id: `g4_div_${idx}`,
    grade: 4,
    topicId,
    difficulty: diff,
    visualEmoji: '⚡',
    question: `Trong các số sau: 2024, 3015, 4120, 5211 số nào vừa chia hết cho 2 vừa chia hết cho 5?`,
    options: ['4120', '3015', '2024', '5211'],
    correctIndex: 0,
    explanation: `Số vừa chia hết cho 2 vừa chia hết cho 5 phải có chữ số tận cùng là 0. Do đó chỉ có số 4120 thỏa mãn.`,
    hint: `Số có tận cùng là chữ số 0 thì cùng chia hết cho cả 2 và 5.`
  };
}

// ================= GRADE 5 GENERATOR =================
function genGrade5Question(topicId: string, diff: DifficultyLevel, idx: number): Question {
  if (topicId === 'g5_t6') {
    // Vận tốc, quãng đường, thời gian
    const v = randInt(35, 60);
    const t = randInt(2, 4);
    const s = v * t;

    if (diff === 'yeu' || diff === 'trung_binh') {
      const opts = makeChoices(s, [s - 20, s + 15, s + 30]);
      return {
        id: `g5_${idx}`,
        grade: 5,
        topicId,
        difficulty: diff,
        visualEmoji: '🚗',
        question: `Một ô tô đi với vận tốc ${v} km/giờ trong thời gian ${t} giờ. Quãng đường ô tô đã đi được là:`,
        options: opts.choices.map(c => `${c} km`),
        correctIndex: opts.correctIndex,
        explanation: `Công thức tính quãng đường: s = v × t = ${v} × ${t} = ${s} km.`,
        hint: `Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian: s = v × t.`
      };
    } else if (diff === 'kha') {
      const opts = makeChoices(v, [v - 5, v + 5, v - 10]);
      return {
        id: `g5_${idx}`,
        grade: 5,
        topicId,
        difficulty: diff,
        visualEmoji: '🏍️',
        question: `Một người đi xe máy đi được quãng đường ${s} km trong ${t} giờ. Vận tốc của người đi xe máy đó là:`,
        options: opts.choices.map(c => `${c} km/giờ`),
        correctIndex: opts.correctIndex,
        explanation: `Công thức tính vận tốc: v = s : t = ${s} : ${t} = ${v} km/giờ.`,
        hint: `Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian: v = s : t.`
      };
    } else {
      // Chuyển động ngược chiều hai xe
      const v1 = 40;
      const v2 = 50;
      const tongV = v1 + v2;
      const tGap = 2;
      const sTotal = tongV * tGap;
      const opts = makeChoices(tGap, [tGap + 1, tGap + 2, 1]);
      return {
        id: `g5_${idx}`,
        grade: 5,
        topicId,
        difficulty: diff,
        visualEmoji: '🤝',
        question: `Quãng đường AB dài ${sTotal} km. Một ô tô đi từ A với vận tốc ${v1} km/giờ và một xe máy đi từ B với vận tốc ${v2} km/giờ khởi hành cùng một lúc và đi ngược chiều nhau. Sau bao lâu hai xe gặp nhau?`,
        options: opts.choices.map(c => `${c} giờ`),
        correctIndex: opts.correctIndex,
        explanation: `Tổng vận tốc hai xe trong 1 giờ là: ${v1} + ${v2} = ${tongV} km/giờ. Thời gian để hai xe gặp nhau là: ${sTotal} : ${tongV} = ${tGap} giờ.`,
        hint: `Hai xe chuyển động ngược chiều: Thời gian gặp nhau = Quãng đường : Tổng hai vận tốc.`
      };
    }
  }

  if (topicId === 'g5_t3') {
    // Tỉ số phần trăm
    const tongSo = 200;
    const phanTram = randInt(15, 35);
    const soHocSinh = (tongSo * phanTram) / 100;
    const opts = makeChoices(soHocSinh, [soHocSinh - 5, soHocSinh + 5, soHocSinh + 10]);
    return {
      id: `g5_pct_${idx}`,
      grade: 5,
      topicId,
      difficulty: diff,
      visualEmoji: '📊',
      question: `Một trường tiểu học có ${tongSo} học sinh. Số học sinh tham gia câu lạc bộ Toán học chiếm ${phanTram}%. Hỏi có bao nhiêu học sinh tham gia câu lạc bộ?`,
      options: opts.choices.map(c => `${c} học sinh`),
      correctIndex: opts.correctIndex,
      explanation: `Số học sinh tham gia là: (${tongSo} × ${phanTram}) : 100 = ${soHocSinh} học sinh.`,
      hint: `Muốn tìm ${phanTram}% của một số, ta lấy số đó nhân với ${phanTram} rồi chia cho 100.`
    };
  }

  // Số thập phân
  const d1 = (randInt(20, 50) / 10).toFixed(1);
  const d2 = (randInt(10, 30) / 10).toFixed(1);
  const sumD = (parseFloat(d1) + parseFloat(d2)).toFixed(1);
  const opts = makeChoices(sumD, [
    (parseFloat(sumD) + 0.1).toFixed(1),
    (parseFloat(sumD) - 0.2).toFixed(1),
    (parseFloat(sumD) + 1.0).toFixed(1)
  ]);
  return {
    id: `g5_dec_${idx}`,
    grade: 5,
    topicId,
    difficulty: diff,
    visualEmoji: '🔟',
    question: `Đặt tính rồi tính: ${d1} + ${d2} = ?`,
    options: opts.choices.map(c => `${c}`),
    correctIndex: opts.correctIndex,
    explanation: `Đặt các chữ số cùng hàng thẳng cột với nhau, dấu phẩy thẳng dấu phẩy. Ta được: ${d1} + ${d2} = ${sumD}.`,
    hint: `Chú ý đặt dấu phẩy ở các số hạng thẳng cột với nhau!`
  };
}

// Utility to create 4 unique choices with 1 correct
function makeChoices<T>(correctVal: T, wrongVals: T[]): { choices: T[]; correctIndex: number } {
  const uniqueWrongs = Array.from(new Set(wrongVals.filter(v => v !== correctVal))).slice(0, 3);
  while (uniqueWrongs.length < 3) {
    if (typeof correctVal === 'number') {
      const offset = (uniqueWrongs.length + 1) * 3;
      uniqueWrongs.push((correctVal + offset) as unknown as T);
    } else {
      uniqueWrongs.push(`Phương án ${uniqueWrongs.length + 1}` as unknown as T);
    }
  }

  const all = [correctVal, ...uniqueWrongs];
  const shuffled = shuffleArray(all);
  const correctIndex = shuffled.indexOf(correctVal);

  return { choices: shuffled, correctIndex };
}
