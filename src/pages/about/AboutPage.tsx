export default function About() {
  return (
    <main
      className="w-full max-w-3xl m-auto min-h-screen flex flex-col gap-10 items-center justify-center px-4 py-16"
      style={{
        background: '#F6F8FB',
        boxShadow: '0 4px 24px 0 #E3E8F0',
        borderRadius: '2rem',
        border: '1.5px solid #E3E8F0',
      }}
    >
      <h1 className="mb-10 text-center text-4xl md:text-5xl font-extrabold text-[#2F70AF] tracking-tight">
        О Vital Scope
      </h1>

      <section className="mb-8 flex items-start gap-6 w-full bg-white rounded-2xl p-6 shadow-[0_2px_16px_0_#E3E8F0] border border-[#E3E8F0] transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#3A86FF] to-[#E94560] shadow mr-2">
          <svg className="h-10 w-10 text-white drop-shadow-[0_0_8px_#3A86FF80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
            <h2 className="mb-4 text-2xl font-bold text-[#3A86FF]">Технологии для здоровья</h2>
            <p className="leading-relaxed">
              Vital Scope — это IT-продукт для мониторинга состояния беременных. Мы собираем данные о сердцебиении плода и тонусе матки с помощью портативного устройства. Вся информация доступна врачу и пациенту в цифровом виде.
            </p>
        </div>
      </section>

      <section className="mb-8 flex items-start gap-6 w-full bg-white rounded-2xl p-6 shadow-[0_2px_16px_0_#E3E8F0] border border-[#E3E8F0] transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#B8C1EC] to-[#3A86FF] shadow mr-2">
          <svg className="h-10 w-10 text-white drop-shadow-[0_0_8px_#3A86FF80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17a4 4 0 01-4-4v-1a4 4 0 018 0v1a4 4 0 01-4 4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 11a4 4 0 018 0v1a4 4 0 01-8 0v-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v1a9 9 0 11-18 0v-1" />
          </svg>
        </div>
        <div>
            <h2 className="mb-4 text-2xl font-bold text-[#3A86FF]">Визуализация данных</h2>
            <p className="leading-relaxed">
              Все показатели отображаются на графиках. Можно просмотреть динамику за любой период и проанализировать изменения в состоянии здоровья.
            </p>
        </div>
      </section>

      <section className="mb-8 flex items-start gap-6 w-full bg-white rounded-2xl p-6 shadow-[0_2px_16px_0_#E3E8F0] border border-[#E3E8F0] transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#E94560] to-[#B8C1EC] shadow mr-2">
          <svg className="h-10 w-10 text-white drop-shadow-[0_0_8px_#E9456080]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
            <h2 className="mb-4 text-2xl font-bold text-[#E94560]">Аналитика и прогнозы</h2>
            <p className="leading-relaxed">
              Система автоматически анализирует собранные данные и помогает выявлять отклонения. Это позволяет врачу быстрее реагировать на изменения и принимать решения для сохранения здоровья.
            </p>
        </div>
      </section>

      <section className="flex items-start gap-6 w-full bg-white rounded-2xl p-6 shadow-[0_2px_16px_0_#E3E8F0] border border-[#E3E8F0] transition-shadow">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-[#B8C1EC] to-[#3A86FF] shadow mr-2">
          <svg className="h-10 w-10 text-white drop-shadow-[0_0_8px_#B8C1EC80]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
            <h2 className="mb-4 text-2xl font-bold text-[#3A86FF]">Для врачей и пациентов</h2>
            <p className="leading-relaxed">
              Vital Scope — это инструмент для совместной работы врача и пациента. Мы делаем медицинские данные доступными и понятными, чтобы повысить качество наблюдения за здоровьем во время беременности.
            </p>
        </div>
      </section>
    </main>
  );
}
