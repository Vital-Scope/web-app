export default function About() {
  return (
    <main className="w-3/4 m-auto min-h-screen bg-gray-700/40 rounded-xl p-10 text-gray-300">
      <h1 className="mb-16 text-center text-4xl font-extrabold text-gray-300">
        О продукте Vital Scope
      </h1>

      <section className="mb-16 flex items-start gap-6">
        <svg
          className="h-12 w-12 flex-shrink-0 text-[#2F70AF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h2 className="mb-4 text-3xl font-bold text-[#2F70AF]">
            Раннее выявление проблем
          </h2>
          <p className="leading-relaxe">
            Vital Scope использует современные алгоритмы анализа данных с
            фетального монитора, чтобы обнаруживать отклонения в состоянии плода
            на самых ранних стадиях. Это помогает врачам своевременно
            реагировать и принимать решения, предотвращая возможные осложнения.
          </p>
        </div>
      </section>

      <section className="mb-16 flex items-start gap-6">
        <svg
          className="h-12 w-12 flex-shrink-0 text-[#2F70AF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 17a4 4 0 01-4-4v-1a4 4 0 018 0v1a4 4 0 01-4 4z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 11a4 4 0 018 0v1a4 4 0 01-8 0v-1z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12v1a9 9 0 11-18 0v-1"
          ></path>
        </svg>
        <div>
          <h2 className="mb-4 text-3xl font-bold text-[#2F70AF]">
            Наглядная визуализация и мониторинг
          </h2>
          <p className="leading-relaxed">
            Наш сервис предоставляет удобные графики и динамические дашборды,
            которые позволяют врачам легко отслеживать состояние плода в
            реальном времени. Все критические изменения выделяются цветом для
            быстрого выявления проблем.
          </p>
        </div>
      </section>

      <section className="flex items-start gap-6">
        <svg
          className="h-12 w-12 flex-shrink-0 text-[#2F70AF]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z"
          ></path>
        </svg>
        <div>
          <h2 className="mb-4 text-3xl font-bold text-[#2F70AF]">
            Прогнозирование и аналитика
          </h2>
          <p className="leading-relaxed">
            Vital Scope не просто фиксирует текущие показатели, но и строит
            краткосрочные прогнозы риска на основе исторических данных и
            трендов. Это помогает врачам планировать вмешательства и улучшать
            качество ухода за пациентом.
          </p>
        </div>
      </section>
    </main>
  );
}
