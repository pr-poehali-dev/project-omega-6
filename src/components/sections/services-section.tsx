import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const methods = [
  {
    number: "01",
    title: "Антивирусные программы",
    icon: "ShieldCheck",
    description:
      "Антивирус — это основа защиты. Он сканирует файлы в реальном времени и блокирует угрозы до того, как они успеют навредить. Лучшие бесплатные варианты: Windows Defender (встроен в Windows 10/11), Kaspersky Free, Avast Free. Платные дают больше функций, но для домашнего компьютера бесплатных вполне хватает.",
    tips: ["Включите защиту в реальном времени", "Раз в неделю запускайте полное сканирование", "Не устанавливайте сразу несколько антивирусов — они конфликтуют"],
    direction: "top",
  },
  {
    number: "02",
    title: "Обновления системы",
    icon: "RefreshCw",
    description:
      "Большинство вирусов используют «дыры» в устаревших программах. Когда Microsoft или Apple выпускают обновление — они закрывают эти дыры. Именно поэтому так важно не откладывать обновления. Вирус WannaCry в 2017 году заразил только те компьютеры, на которых не было установлено обновление, вышедшее за 2 месяца до атаки.",
    tips: ["Включите автоматические обновления Windows", "Обновляйте браузер и офисные программы", "Не используйте пиратские версии ОС — они не получают обновления"],
    direction: "right",
  },
  {
    number: "03",
    title: "Резервные копии (бэкапы)",
    icon: "HardDrive",
    description:
      "Если вирус-шифровальщик всё же попадёт на компьютер, единственный способ спасти файлы — это бэкап. Правило 3-2-1: храните 3 копии данных, на 2 разных носителях, и 1 копию — вне дома (например, в облаке). Подойдут: Яндекс Диск, Google Drive, внешний жёсткий диск.",
    tips: ["Делайте копии важных файлов хотя бы раз в месяц", "Храните бэкап на отдельном диске или в облаке", "Проверяйте, что файлы из бэкапа реально открываются"],
    direction: "left",
  },
  {
    number: "04",
    title: "Цифровая гигиена",
    icon: "UserCheck",
    description:
      "Самая частая причина заражения — сам пользователь. Кликнул на подозрительную ссылку, скачал «кряк» для игры, открыл вложение в письме от незнакомца. Это называется социальная инженерия — когда вирус проникает не через уязвимость в программе, а через доверчивость человека.",
    tips: ["Не скачивайте программы со случайных сайтов", "Не открывайте письма от незнакомых отправителей", "Используйте разные пароли для разных сайтов"],
    direction: "bottom",
  },
]

export function ServicesSection() {
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
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Методы защиты
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Как защитить себя</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {methods.map((method, i) => {
            const getRevealClass = () => {
              if (!isVisible) {
                switch (method.direction) {
                  case "left": return "-translate-x-12 opacity-0"
                  case "right": return "translate-x-12 opacity-0"
                  case "top": return "-translate-y-12 opacity-0"
                  default: return "translate-y-12 opacity-0"
                }
              }
              return "translate-x-0 translate-y-0 opacity-100"
            }

            return (
              <div
                key={i}
                className={`rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 ${getRevealClass()}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10">
                    <Icon name={method.icon as "ShieldCheck"} size={16} className="text-foreground/70" />
                  </div>
                  <span className="font-mono text-xs text-foreground/40">{method.number}</span>
                </div>

                <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{method.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-foreground/80">{method.description}</p>

                <div className="space-y-1.5 border-t border-foreground/10 pt-3">
                  <p className="mb-2 font-mono text-xs text-foreground/40">Что делать:</p>
                  {method.tips.map((tip, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="mt-0.5 text-foreground/40">—</span>
                      <p className="text-xs leading-relaxed text-foreground/70">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
