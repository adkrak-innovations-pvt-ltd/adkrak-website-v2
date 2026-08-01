/* ------------------------------------------------------------------
   Faux product-UI mockups, rendered entirely in CSS.
   Each export is a layered composition meant to sit inside a panel,
   echoing the "floating app windows" treatment.
   ------------------------------------------------------------------ */

function Chrome({ title, accent }: { title: string; accent: string }) {
  return (
    <div className="mock-bar">
      <span className="mock-dot" style={{ background: '#ff5f57' }} />
      <span className="mock-dot" style={{ background: '#febc2e' }} />
      <span className="mock-dot" style={{ background: '#28c840' }} />
      <span className="ml-2 text-[10px] font-semibold" style={{ color: accent }}>
        {title}
      </span>
    </div>
  );
}

function Bar({ w, h = 8, c }: { w: string; h?: number; c?: string }) {
  return (
    <div
      className="sk"
      style={{ width: w, height: h, background: c || undefined }}
    />
  );
}

/* ---------------- EduNova — school dashboard ---------------- */
export function EduNovaMock() {
  return (
    <div className="relative w-full h-full">
      {/* Back window: attendance grid */}
      <div
        className="mock absolute"
        style={{
          width: '62%', right: '2%', top: '10%',
          transform: 'perspective(1400px) rotateY(-9deg) rotateX(3deg)',
        }}
      >
        <Chrome title="Attendance · Class 8-B" accent="#0891b2" />
        <div className="p-3">
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="rounded aspect-square"
                style={{
                  background:
                    i % 9 === 4 ? '#fca5a5' : i % 5 === 0 ? '#a7f3d0' : '#e2f0f7',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Front window: student record */}
      <div
        className="mock absolute"
        style={{
          width: '58%', left: '2%', top: '20%',
          transform: 'perspective(1400px) rotateY(7deg) rotateX(2deg)',
        }}
      >
        <Chrome title="EduNova" accent="#0891b2" />
        <div className="flex" style={{ height: 168 }}>
          {/* sidebar */}
          <div className="w-[26%] bg-[#f0f6fb] p-2.5 space-y-2 border-r border-[#e4ebf3]">
            <div className="sk-accent rounded" style={{ height: 7, width: '78%' }} />
            {['', '', '', ''].map((_, i) => (
              <Bar key={i} w={`${86 - i * 9}%`} h={6} />
            ))}
          </div>
          {/* content */}
          <div className="flex-1 p-3 space-y-2.5">
            <div className="flex items-center gap-2">
              <div
                className="rounded-full"
                style={{ width: 26, height: 26, background: 'linear-gradient(135deg,#22d3ee,#3b82f6)' }}
              />
              <div className="space-y-1.5">
                <Bar w="88px" h={7} />
                <Bar w="54px" h={5} />
              </div>
            </div>
            {[92, 78, 84, 66].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="sk rounded-full" style={{ width: 6, height: 6 }} />
                <Bar w={`${w}%`} h={6} />
              </div>
            ))}
            <div className="flex gap-1.5 pt-1">
              <div className="rounded-full px-2 py-1" style={{ background: '#d1fae5' }}>
                <Bar w="30px" h={5} c="#34d399" />
              </div>
              <div className="rounded-full px-2 py-1" style={{ background: '#dbeafe' }}>
                <Bar w="24px" h={5} c="#60a5fa" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RestoPOS — tables + KDS ---------------- */
export function RestoPosMock() {
  return (
    <div className="relative w-full h-full">
      {/* Back: kitchen display tickets */}
      <div
        className="mock absolute"
        style={{
          width: '56%', right: '2%', top: '8%',
          transform: 'perspective(1400px) rotateY(-8deg) rotateX(3deg)',
        }}
      >
        <Chrome title="Kitchen Display" accent="#ea580c" />
        <div className="p-2.5 grid grid-cols-3 gap-2" style={{ background: '#1f2937' }}>
          {['#f97316', '#22c55e', '#f97316', '#eab308', '#22c55e', '#f97316'].map((c, i) => (
            <div key={i} className="rounded-lg p-2 space-y-1.5" style={{ background: '#374151' }}>
              <div className="rounded" style={{ height: 4, width: '60%', background: c }} />
              <div className="rounded" style={{ height: 4, width: '85%', background: '#6b7280' }} />
              <div className="rounded" style={{ height: 4, width: '70%', background: '#6b7280' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Front: table grid */}
      <div
        className="mock absolute"
        style={{
          width: '56%', left: '2%', top: '22%',
          transform: 'perspective(1400px) rotateY(7deg) rotateX(2deg)',
        }}
      >
        <Chrome title="RestoPOS · Floor" accent="#ea580c" />
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              '#fed7aa', '#bbf7d0', '#fed7aa', '#e5e7eb',
              '#bbf7d0', '#e5e7eb', '#fecaca', '#bbf7d0',
              '#e5e7eb', '#fed7aa', '#bbf7d0', '#e5e7eb',
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-lg flex flex-col items-center justify-center gap-1"
                style={{ background: c, aspectRatio: '1.15' }}
              >
                <div className="rounded" style={{ width: 14, height: 4, background: 'rgba(0,0,0,0.22)' }} />
                <div className="rounded" style={{ width: 9, height: 3, background: 'rgba(0,0,0,0.14)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Exam Portal — question + proctor ---------------- */
export function ExamMock() {
  return (
    <div className="relative w-full h-full">
      {/* Back: proctor tiles */}
      <div
        className="mock absolute"
        style={{
          width: '44%', right: '3%', top: '12%',
          transform: 'perspective(1400px) rotateY(-9deg) rotateX(3deg)',
        }}
      >
        <Chrome title="Proctoring" accent="#7c3aed" />
        <div className="p-2.5 grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md relative"
              style={{
                aspectRatio: '4/3',
                background: 'linear-gradient(135deg,#312e81,#4c1d95)',
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: '32%', height: '42%', left: '34%', top: '22%',
                  background: 'rgba(255,255,255,0.28)',
                }}
              />
              <div
                className="absolute rounded-full"
                style={{
                  width: 5, height: 5, right: 5, top: 5,
                  background: i === 3 ? '#f87171' : '#4ade80',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Front: question paper */}
      <div
        className="mock absolute"
        style={{
          width: '62%', left: '2%', top: '18%',
          transform: 'perspective(1400px) rotateY(7deg) rotateX(2deg)',
        }}
      >
        <Chrome title="Exam Portal" accent="#7c3aed" />
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Bar w="42%" h={8} />
            <div className="rounded-full px-2.5 py-1" style={{ background: '#ede9fe' }}>
              <Bar w="34px" h={6} c="#8b5cf6" />
            </div>
          </div>
          <Bar w="94%" h={6} />
          <Bar w="80%" h={6} />
          <div className="space-y-2 pt-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg p-2"
                style={{ background: i === 1 ? '#f5f3ff' : '#f8fafc' }}
              >
                <div
                  className="rounded-full shrink-0"
                  style={{
                    width: 12, height: 12,
                    border: `2px solid ${i === 1 ? '#8b5cf6' : '#cbd5e1'}`,
                    background: i === 1 ? '#8b5cf6' : 'transparent',
                  }}
                />
                <Bar w={`${74 - i * 8}%`} h={6} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Report Generation — charts ---------------- */
export function ReportMock() {
  const bars = [42, 68, 55, 88, 72, 95, 61];
  return (
    <div className="relative w-full h-full">
      {/* Back: exported PDF */}
      <div
        className="mock absolute"
        style={{
          width: '40%', right: '4%', top: '16%',
          transform: 'perspective(1400px) rotateY(-10deg) rotateX(3deg)',
        }}
      >
        <div className="p-3.5 space-y-2 bg-white" style={{ minHeight: 160 }}>
          <div className="sk-accent rounded" style={{ height: 6, width: '48%' }} />
          <Bar w="88%" h={5} />
          <Bar w="72%" h={5} />
          <div className="grid grid-cols-3 gap-1.5 pt-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="sk rounded" style={{ height: 12 }} />
            ))}
          </div>
          <Bar w="64%" h={5} />
        </div>
      </div>

      {/* Front: dashboard */}
      <div
        className="mock absolute"
        style={{
          width: '60%', left: '2%', top: '14%',
          transform: 'perspective(1400px) rotateY(7deg) rotateX(2deg)',
        }}
      >
        <Chrome title="Report Builder" accent="#059669" />
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            {['#d1fae5', '#dbeafe', '#fef3c7'].map((c, i) => (
              <div key={i} className="flex-1 rounded-lg p-2 space-y-1.5" style={{ background: c }}>
                <Bar w="60%" h={5} />
                <Bar w="80%" h={9} />
              </div>
            ))}
          </div>
          {/* bar chart */}
          <div className="flex items-end gap-2" style={{ height: 78 }}>
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: 'linear-gradient(180deg,#34d399,#06b6d4)',
                  opacity: 0.55 + (i % 3) * 0.15,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="sk rounded" style={{ width: 14, height: 4 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Roadgenie — map + SOS ---------------- */
export function RoadgenieMock() {
  return (
    <div className="relative w-full h-full">
      {/* Back: map */}
      <div
        className="mock absolute"
        style={{
          width: '58%', right: '2%', top: '10%',
          transform: 'perspective(1400px) rotateY(-8deg) rotateX(3deg)',
        }}
      >
        <Chrome title="Live tracking" accent="#db2777" />
        <div className="relative" style={{ height: 178, background: '#e8f0e8' }}>
          {/* roads */}
          <div className="absolute" style={{ left: 0, right: 0, top: '38%', height: 9, background: '#cfd9cf' }} />
          <div className="absolute" style={{ left: '30%', top: 0, bottom: 0, width: 9, background: '#cfd9cf' }} />
          <div
            className="absolute"
            style={{
              left: 0, right: 0, top: '70%', height: 6,
              background: '#d8e2d8', transform: 'rotate(-4deg)',
            }}
          />
          {/* route */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 20 150 Q 90 120 110 80 T 210 40"
              stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round"
            />
          </svg>
          {/* pins */}
          <div
            className="absolute rounded-full"
            style={{ width: 13, height: 13, left: 16, top: 143, background: '#ec4899', border: '2.5px solid #fff' }}
          />
          <div
            className="absolute rounded-full"
            style={{ width: 13, height: 13, right: 26, top: 33, background: '#22c55e', border: '2.5px solid #fff' }}
          />
        </div>
      </div>

      {/* Front: SOS phone */}
      <div
        className="mock absolute"
        style={{
          width: '25%', left: '9%', top: '17%', borderRadius: 22,
          transform: 'perspective(1400px) rotateY(9deg) rotateX(2deg)',
        }}
      >
        <div className="bg-white" style={{ minHeight: 200 }}>
          <div style={{ height: 22, background: '#fdf2f8' }} />
          <div className="p-3 space-y-2.5">
            <Bar w="70%" h={7} />
            <div
              className="rounded-xl flex items-center justify-center"
              style={{
                height: 62,
                background: 'linear-gradient(135deg,#ec4899,#d946ef)',
              }}
            >
              <span className="text-white font-bold text-[13px] tracking-widest">SOS</span>
            </div>
            {[86, 70, 78].map((w, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="sk rounded" style={{ width: 16, height: 16 }} />
                <Bar w={`${w}%`} h={6} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Custom Web Dev — editor + browser ---------------- */
export function CustomWebMock() {
  return (
    <div className="relative w-full h-full">
      {/* Back: rendered site */}
      <div
        className="mock absolute"
        style={{
          width: '56%', right: '2%', top: '9%',
          transform: 'perspective(1400px) rotateY(-8deg) rotateX(3deg)',
        }}
      >
        <Chrome title="Preview" accent="#475569" />
        <div className="bg-white" style={{ minHeight: 172 }}>
          <div style={{ height: 52, background: 'linear-gradient(135deg,#0ea5e9,#06b6d4)' }} />
          <div className="p-3 space-y-2">
            <Bar w="58%" h={9} />
            <Bar w="86%" h={5} />
            <div className="grid grid-cols-3 gap-2 pt-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="sk rounded" style={{ height: 26 }} />
                  <Bar w="80%" h={4} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Front: code editor */}
      <div
        className="mock absolute"
        style={{
          width: '54%', left: '2%', top: '20%',
          transform: 'perspective(1400px) rotateY(7deg) rotateX(2deg)',
        }}
      >
        <Chrome title="app.tsx" accent="#475569" />
        <div className="p-3 space-y-1.5" style={{ background: '#0f172a', minHeight: 158 }}>
          {[
            { i: 0, w: '54%', c: '#c084fc' },
            { i: 1, w: '72%', c: '#7dd3fc' },
            { i: 2, w: '46%', c: '#86efac' },
            { i: 1, w: '80%', c: '#7dd3fc' },
            { i: 2, w: '62%', c: '#fcd34d' },
            { i: 1, w: '68%', c: '#7dd3fc' },
            { i: 0, w: '40%', c: '#c084fc' },
            { i: 1, w: '74%', c: '#86efac' },
          ].map((l, k) => (
            <div key={k} className="flex items-center gap-2">
              <div className="rounded" style={{ width: 10, height: 4, background: '#334155' }} />
              <div style={{ width: l.i * 14 }} />
              <div className="rounded" style={{ width: l.w, height: 5, background: l.c, opacity: 0.75 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const mockFor: Record<string, () => React.JSX.Element> = {
  EN: EduNovaMock,
  RP: RestoPosMock,
  EP: ExamMock,
  RG: ReportMock,
  RD: RoadgenieMock,
  CW: CustomWebMock,
};
