import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const viruses = [
  {
    number: "01",
    title: "Троянские программы",
    category: "Маскируются под полезное ПО",
    description:
      "Троян выглядит как обычная программа — например, игра или «взломанный» фотошоп. Пользователь сам устанавливает его. После запуска троян может красть пароли, данные банковских карт или давать хакеру полный доступ к компьютеру. Название — от «Троянского коня» из древнегреческого мифа.",
    risk: "Высокий",
    icon: "Bug",
    spread: "Скачивается с ненадёжных сайтов, приходит во вложениях к письмам",
    direction: "left",
  },
  {
    number: "02",
    title: "Сетевые черви",
    category: "Размножаются сами по сети",
    description:
      "Червь не нуждается в участии человека — он сам копирует себя с компьютера на компьютер через локальную сеть или интернет. Знаменитый червь ILOVEYOU в 2000 году заразил 10 миллионов компьютеров за несколько часов и нанёс ущерб на 10 миллиардов долларов.",
    risk: "Критический",
    icon: "Network",
    spread: "Через уязвимости в ОС, заражённые флешки, электронную почту",
    direction: "right",
  },
  {
    number: "03",
    title: "Вирусы-шифровальщики",
    category: "Блокируют файлы и требуют выкуп",
    description:
      "Самая опасная угроза последних лет. Шифровальщик зашифровывает все файлы на компьютере — фото, документы, видео — и требует деньги за расшифровку. В 2017 году вирус WannaCry парализовал больницы, банки и заводы в 150 странах. Платить выкуп не рекомендуется — файлы часто не возвращают.",
    risk: "Критический",
    icon: "Lock",
    spread: "Фишинговые письма, уязвимости в Windows, заражённые сайты",
    direction: "left",
  },
  {
    number: "04",
    title: "Шпионское ПО",
    category: "Следит за пользователем незаметно",
    description:
      "Spyware работает в фоне и пользователь его не замечает. Программа записывает всё, что печатается на клавиатуре, делает снимки экрана, следит за посещёнными сайтами и отправляет эти данные злоумышленникам. Так воруют пароли от соцсетей, почты и онлайн-банков.",
    risk: "Высокий",
    icon: "Eye",
    spread: "Устанавливается вместе с бесплатным ПО, через заражённые сайты",
    direction: "right",
  },
  {
    number: "05",
    title: "Рекламное ПО (Adware)",
    category: "Показывает навязчивую рекламу",
    description:
      "Adware сам по себе не опасен, но очень раздражает: подменяет стартовую страницу браузера, добавляет рекламные баннеры на все сайты, перенаправляет на подозрительные страницы. Кроме этого, adware собирает данные о ваших интересах и продаёт их рекламодателям.",
    risk: "Средний",
    icon: "MonitorOff",
    spread: "Устанавливается вместе с бесплатными программами «по умолчанию»",
    direction: "left",
  },
  {
    number: "06",
    title: "Руткиты",
    category: "Скрываются глубоко в системе",
    description:
      "Руткит — это набор инструментов, который прячет себя и другие вирусы от антивирусов и самой операционной системы. Обнаружить его очень сложно. Злоумышленники используют руткиты, чтобы сохранить постоянный доступ к заражённому компьютеру на долгое время.",
    risk: "Высокий",
    icon: "ShieldOff",
    spread: "Через уязвимости ОС, заражённые физические носители",
    direction: "right",
  },
]

const riskColor: Record<string, string> = {
  Критический: "text-red-400",
  Высокий: "text-orange-400",
  Средний: "text-yellow-400",
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-start overflow-y-auto px-6 pt-24 md:px-12 lg:px-16"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mx-auto w-full max-w-7xl pb-16">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Виды вирусов
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Классификация угроз</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {viruses.map((virus, i) => {
            const isHidden = !isVisible
            const revealClass = isHidden
              ? virus.direction === "left"
                ? "-translate-x-12 opacity-0"
                : "translate-x-12 opacity-0"
              : "translate-x-0 opacity-100"

            return (
              <div
                key={i}
                className={`group rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 ${revealClass}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name={virus.icon as "Bug"} size={18} className="text-foreground/70" />
                    <span className="font-mono text-xs text-foreground/40">{virus.number}</span>
                  </div>
                  <span className={`font-mono text-xs font-medium ${riskColor[virus.risk]}`}>
                    {virus.risk}
                  </span>
                </div>

                <h3 className="mb-1 font-sans text-lg font-medium text-foreground">{virus.title}</h3>
                <p className="mb-3 font-mono text-xs text-foreground/50">{virus.category}</p>
                <p className="mb-4 text-sm leading-relaxed text-foreground/80">{virus.description}</p>

                <div className="border-t border-foreground/10 pt-3">
                  <p className="font-mono text-xs text-foreground/40">Как распространяется:</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/60">{virus.spread}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
