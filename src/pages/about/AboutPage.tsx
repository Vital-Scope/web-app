import {
  HeartIcon,
  ChartIcon,
  ShieldIcon,
  CloudIcon,
  BrainIcon,
} from "./ui/Icons";

export default function About() {
  const features = [
    {
      icon: HeartIcon,
      title: "Мониторинг в реальном времени",
      description:
        "Непрерывное отслеживание сердцебиения плода и тонуса матки с помощью современного портативного устройства.",
      gradient: "from-[#F472B6] to-[#8B5CF6]",
      iconColor: "text-[#F472B6]",
    },
    {
      icon: ChartIcon,
      title: "Интеллектуальная аналитика",
      description:
        "Автоматический анализ данных с использованием машинного обучения для выявления отклонений и рисков.",
      gradient: "from-[#3B82F6] to-[#8B5CF6]",
      iconColor: "text-[#3B82F6]",
    },
    {
      icon: ShieldIcon,
      title: "Безопасность данных",
      description:
        "Надежная защита медицинских данных с использованием современного шифрования и соблюдением всех стандартов конфиденциальности.",
      gradient: "from-[#10B981] to-[#3B82F6]",
      iconColor: "text-[#10B981]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#F472B6] to-[#8B5CF6] shadow-lg">
            <HeartIcon />
          </div>
          <h1 className="mb-6 text-4xl font-bold text-[#1F2937] md:text-6xl">
            <span className="text-[#F472B6]">Vital</span>
            <span className="ml-2 text-[#3B82F6]">Scope</span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-[#6B7280]">
            Инновационная система мониторинга состояния беременных, объединяющая
            передовые технологии и заботу о здоровье матери и ребенка
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 text-3xl font-bold text-[#3B82F6]">95%</div>
            <div className="text-[#6B7280]">Текущая точность диагностики</div>
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 text-3xl font-bold text-[#10B981]">99%</div>
            <div className="text-[#6B7280]">Наша цель</div>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start space-x-6">
                <div
                  className={`h-16 w-16 flex-shrink-0 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon />
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-semibold ${feature.iconColor} mb-3`}
                  >
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16 rounded-3xl border border-[#E5E7EB] bg-white p-12 shadow-sm">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-6 text-3xl font-bold text-[#1F2937] md:text-4xl">
                Наши планы и ценности
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-[#6B7280]">
                Мы стремимся приблизиться к точности диагностики 99% и создать
                отказоустойчивую систему. Важна не только идея, но и люди,
                которые ее реализуют.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white">
                    <CloudIcon />
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                  Платформа синхронизации
                </h3>
                <p className="text-[#6B7280]">
                  Современное шифрование для безопасной передачи данных между
                  устройством и облаком
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#10B981] to-[#3B82F6] text-white">
                    <ShieldIcon />
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                  Отказоустойчивость
                </h3>
                <p className="text-[#6B7280]">
                  Надежная архитектура системы, обеспечивающая непрерывную
                  работу и сохранность данных
                </p>
              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#F472B6] to-[#8B5CF6] text-white">
                    <BrainIcon />
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#1F2937]">
                  Машинное обучение
                </h3>
                <p className="text-[#6B7280]">
                  Наша модель обучена на обширном датасете медицинских данных,
                  включающем тысячи случаев КТГ-мониторинга с различными
                  исходами беременности
                </p>
              </div>
            </div>

            <div className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#F472B6] via-[#8B5CF6] to-[#3B82F6] p-12 text-white shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4 opacity-20">
                <BrainIcon />
              </div>
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  🚀 Инновационная технология
                </div>
                <h3 className="mb-6 text-3xl font-bold md:text-4xl">
                  Глубокий анализ с помощью
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Искусственного Интеллекта
                  </span>
                </h3>
                <p className="mb-8 text-xl leading-relaxed opacity-95">
                  Наша цель — создать систему, которая анализирует не только
                  текущие показатели КТГ, но и учитывает полную медицинскую
                  картину: историю беременности, результаты анализов,
                  индивидуальные особенности пациентки и динамику изменений.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-2xl font-bold text-yellow-300">
                      360°
                    </div>
                    <div className="text-sm opacity-90">Комплексный анализ</div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-2xl font-bold text-yellow-300">
                      AI
                    </div>
                    <div className="text-sm opacity-90">
                      Искусственный интеллект
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-2xl font-bold text-yellow-300">
                      ML
                    </div>
                    <div className="text-sm opacity-90">Машинное обучение</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E5E7EB] bg-white p-12 shadow-sm">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-[#1F2937] md:text-4xl">
              Наша миссия
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-[#6B7280]">
              Сделать медицинский мониторинг во время беременности доступным,
              точным и понятным для каждой семьи. Мы верим, что технологии
              должны служить здоровью и приносить спокойствие будущим родителям.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-opacity-10 rounded-full bg-[#F472B6] px-6 py-3 font-medium text-[#F472B6]">
                Инновации
              </span>
              <span className="bg-opacity-10 rounded-full bg-[#3B82F6] px-6 py-3 font-medium text-[#3B82F6]">
                Безопасность
              </span>
              <span className="bg-opacity-10 rounded-full bg-[#10B981] px-6 py-3 font-medium text-[#10B981]">
                Качество
              </span>
              <span className="bg-opacity-10 rounded-full bg-[#8B5CF6] px-6 py-3 font-medium text-[#8B5CF6]">
                Забота
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
