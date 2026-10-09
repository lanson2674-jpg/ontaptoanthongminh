import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Pen, Trash2, X, RotateCcw } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#2563eb'); // blue pencil
  const [lineWidth, setLineWidth] = useState(3);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initial white grid background like Vietnamese student notebook (vở ô ly)
    drawGrid(ctx, rect.width, rect.height);
    saveState();
  }, [isOpen]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Subtle quad grid (vở ô ly học sinh)
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 0.5;
    const step = 20;

    for (let x = 0; x <= width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const newHistory = [...history];
    newHistory.pop(); // remove current
    const prevState = newHistory[newHistory.length - 1];
    ctx.putImageData(prevState, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawGrid(ctx, rect.width, rect.height);
    saveState();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = tool === 'eraser' ? 18 : lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] z-50 bg-white shadow-2xl flex flex-col border-l border-amber-200 animate-in slide-in-from-right duration-200">
      {/* Scratchpad Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">📝</span>
          <div>
            <h3 className="text-base font-bold leading-tight">Bảng Nháp Điện Tử (Vở Ô Ly)</h3>
            <p className="text-xs text-amber-900 font-normal">Tự do đặt tính, vẽ hình, nhẩm tính</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-950 transition-colors"
          title="Đóng bảng nháp"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-3 bg-amber-50/80 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-amber-200 shadow-xs">
          <button
            onClick={() => setTool('pen')}
            className={`px-2.5 py-1.5 rounded flex items-center gap-1 text-xs font-semibold transition-colors ${
              tool === 'pen' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Pen className="w-3.5 h-3.5" /> Bút mực
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`px-2.5 py-1.5 rounded flex items-center gap-1 text-xs font-semibold transition-colors ${
              tool === 'eraser' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" /> Tẩy xóa
          </button>
        </div>

        {/* Color Palette */}
        {tool === 'pen' && (
          <div className="flex items-center gap-1.5">
            {[
              { c: '#2563eb', label: 'Xanh dương' },
              { c: '#dc2626', label: 'Đỏ' },
              { c: '#16a34a', label: 'Xanh lá' },
              { c: '#1e293b', label: 'Đen' },
            ].map(({ c, label }) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                title={label}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  color === c ? 'scale-110 border-slate-800 ring-2 ring-amber-300' : 'border-white opacity-80'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-1.5 rounded text-slate-600 hover:bg-white disabled:opacity-30 border border-transparent hover:border-amber-200"
            title="Hoàn tác (Undo)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="px-2.5 py-1.5 rounded text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-1 border border-rose-200"
            title="Xóa toàn bộ trang nháp"
          >
            <Trash2 className="w-3.5 h-3.5" /> Xóa sạch
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative bg-white cursor-crosshair touch-none overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Footer hint */}
      <div className="p-2 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
        💡 Mẹo: Con có thể đặt tính hàng dọc hoặc vẽ que tính ở đây để không bị nhầm lẫn!
      </div>
    </div>
  );
};
