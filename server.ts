import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK on server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Primary math AI tutor explanation endpoint
app.post('/api/tutor/explain', async (req, res) => {
  try {
    const { grade, topic, difficulty, question, studentAnswer, correctAnswer, explanationHint } = req.body;

    const prompt = `
Bạn là "Cô Giáo Chử Thị Ngọc Lan" - Giáo viên và chuyên gia sư phạm tiểu học hàng đầu Việt Nam, cực kỳ kiên nhẫn, ấm áp, khen ngợi động viên và biết cách giảng bài cho học sinh tiểu học (Lớp ${grade}).

Học sinh vừa làm bài toán sau và chọn đáp án chưa chính xác:
- Khối lớp: Lớp ${grade}
- Chủ đề: ${topic}
- Mức độ bài tập: ${difficulty}
- Câu hỏi / Đề bài: "${question}"
- Em đã chọn đáp án: "${studentAnswer}"
- Đáp án chính xác là: "${correctAnswer}"
${explanationHint ? `- Gợi ý bổ sung: ${explanationHint}` : ''}

Hãy xưng là "Cô Lan" (hoặc "Cô"), giải thích cho học sinh hiểu bản chất vấn đề bằng văn phong chuẩn mực sư phạm Việt Nam, phù hợp với lứa tuổi Lớp ${grade}:
Yêu cầu nội dung trả lời:
1. Lời an ủi, động viên ấm áp (VD: "Không sao đâu con yêu / em nhé, bài này chỉ nhầm một xíu thôi, cô Lan sẽ chỉ cho con nhé!").
2. "Bật mí nguyên nhân dễ nhầm": Chỉ ra tại sao bạn học sinh thường chọn phương án đó (lỗi nhầm lẫn thông thường).
3. "Quy tắc vàng / Công thức cần nhớ": Nhắc lại quy tắc toán học căn bản hoặc mẹo tính nhanh dễ nhớ (bằng ví dụ trực quan như que tính, chiếc bánh, hình vẽ minh họa qua văn bản emoji).
4. "Từng bước tìm ra kết quả đúng": Trình bày rõ ràng Bước 1, Bước 2, Bước 3 ngắn gọn, dễ hiểu nhất.
5. "Lời dặn dò & Thử thách nhỏ": 1 câu đố tương tự siêu ngắn để em tự nhẩm lại ngay.

Hãy trình bày định dạng rõ ràng, dùng emoji ngộ nghĩnh vui tươi, ấm áp, tuyệt đối không chê trách.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là Cô giáo Chử Thị Ngọc Lan - chuyên gia giáo dục tiểu học xuất sắc của Việt Nam, giàu tình thương, giải thích toán học trực quan sinh động theo chương trình GDPT mới.',
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      explanation: response.text || 'Thầy/Cô rất tự hào vì con đã cố gắng! Hãy xem lại cách tính từng bước nhé.',
    });
  } catch (error: any) {
    console.error('Error generating tutor explanation:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Có lỗi xảy ra khi kết nối với Gia sư AI.',
      fallbackExplanation: 'Đừng buồn nhé! Em hãy đọc kĩ lại đề bài, chú ý thứ tự thực hiện phép tính và kiểm tra lại phép tính của mình nhé.',
    });
  }
});

// Interactive Follow-up Chat with AI Tutor
app.post('/api/tutor/chat', async (req, res) => {
  try {
    const { grade, question, message, chatHistory } = req.body;

    const formattedHistory = Array.isArray(chatHistory)
      ? chatHistory.map((msg: any) => `${msg.role === 'user' ? 'Học sinh' : 'Gia sư'}: ${msg.content}`).join('\n')
      : '';

    const prompt = `
Em học sinh Lớp ${grade} đang hỏi Gia sư AI về bài toán:
Đề bài: "${question}"

Lịch sử trò chuyện:
${formattedHistory}

Câu hỏi mới của học sinh: "${message}"

Hãy trả lời học sinh bằng giọng điệu người thầy/cô tiểu học ân cần, dễ hiểu, dùng ngôn ngữ phù hợp với học sinh lớp ${grade}. Khuyến khích tư duy, gợi ý từng bước chứ không làm hộ.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Bạn là Gia sư Cú Vàng thông thái của các em học sinh tiểu học Việt Nam.',
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      reply: response.text || 'Cô/Thầy đã nghe câu hỏi của con rồi! Hãy cùng suy nghĩ thêm một chút nhé.',
    });
  } catch (error: any) {
    console.error('Error in tutor chat:', error);
    res.status(500).json({
      success: false,
      reply: 'Gia sư AI đang bận một chút, em hãy thử hỏi lại sau giây lát nhé!',
    });
  }
});

// Generate dynamic question sets via Gemini API (optional AI generator)
app.post('/api/questions/generate', async (req, res) => {
  try {
    const { grade, topic, difficulty, count } = req.body;

    const prompt = `
Bạn là chuyên gia khảo thí và biên soạn đề thi môn Toán tiểu học của Bộ Giáo dục và Đào tạo Việt Nam.
Hãy tạo đúng ${count || 5} câu hỏi trắc nghiệm môn Toán:
- Khối lớp: Lớp ${grade}
- Tên bài học / Chủ đề: "${topic}"
- Mức độ nhận thức: "${difficulty}" (Yếu: nhận biết, trực quan, đơn giản; Trung bình: thông hiểu, kiến thức cơ bản SGK; Khá: vận dụng 2 bước tính; Giỏi: vận dụng cao, tư duy logic; Nâng cao: toán tư duy bồi dưỡng học sinh giỏi)

Yêu cầu xuất ra JSON HỢP LỆ dạng danh sách câu hỏi:
Mỗi câu hỏi có:
- id: số thứ tự (ví dụ 1, 2, ...)
- question: nội dung đề bài rõ ràng, thuần Việt, đúng chuẩn chương trình 2018 (Cánh Diều, Kết Nối Tri Thức, Chân Trời Sáng Tạo)
- options: mảng 4 phương án lựa chọn [A, B, C, D] (dạng chuỗi văn bản hoặc số)
- correctIndex: chỉ số đáp án đúng (0, 1, 2, hoặc 3)
- explanation: giải thích ngắn gọn, dễ hiểu từng bước
- hint: mẹo gợi ý ngắn

Chỉ trả về JSON thuần túy, không có văn bản thừa.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({
      success: true,
      questions: parsed,
    });
  } catch (error: any) {
    console.error('Error generating questions:', error);
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
});

// Serve Vite dev server or static build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
