import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const questions = [
  {
    question: "Вы получили письмо от «банка» с просьбой срочно подтвердить пароль по ссылке. Что это?",
    options: [
      "Обычное уведомление от банка",
      "Фишинговая атака — попытка украсть данные",
      "Спам-реклама",
      "Вирус-червь",
    ],
    correct: 1,
    explanation:
      "Это фишинг — один из самых частых способов кражи паролей. Настоящие банки никогда не просят вводить пароль по ссылке из письма.",
  },
  {
    question: "Что делает вирус-шифровальщик с файлами на компьютере?",
    options: [
      "Удаляет их навсегда",
      "Отправляет хакеру копии",
      "Шифрует и требует деньги за расшифровку",
      "Замедляет их открытие",
    ],
    correct: 2,
    explanation:
      "Шифровальщик блокирует доступ к файлам и требует выкуп. Именно поэтому так важно делать резервные копии — это единственная надёжная защита.",
  },
  {
    question: "Какой самый простой способ защититься от большинства вирусов?",
    options: [
      "Никогда не пользоваться интернетом",
      "Регулярно обновлять операционную систему",
      "Использовать только платные программы",
      "Отключить Wi-Fi",
    ],
    correct: 1,
    explanation:
      "Большинство вирусов эксплуатируют известные уязвимости в устаревших системах. Обновления закрывают эти дыры — это бесплатно и очень эффективно.",
  },
  {
    question: "Троянская программа — это...",
    options: [
      "Вирус, который сам копируется по сети",
      "Вредоносная программа, замаскированная под полезную",
      "Программа, показывающая рекламу",
      "Вирус, атакующий только телефоны",
    ],
    correct: 1,
    explanation:
      "Троян притворяется полезной программой — игрой, утилитой, «кряком». Пользователь сам его устанавливает, не подозревая об угрозе.",
  },
  {
    question: "Вы скачали бесплатную игру с незнакомого сайта. Антивирус молчит. Вы в безопасности?",
    options: [
      "Да, антивирус бы предупредил об угрозе",
      "Не обязательно — новые вирусы могут не определяться",
      "Да, бесплатные игры безопасны",
      "Да, если файл небольшой",
    ],
    correct: 1,
    explanation:
      "Антивирус не всегда успевает среагировать на новые угрозы. Скачивать программы стоит только с официальных сайтов разработчиков.",
  },
]

const getResult = (score: number) => {
  if (score === 5) return { emoji: "🏆", title: "Отлично!", text: "Ты настоящий эксперт по кибербезопасности. Так держать!" }
  if (score >= 3) return { emoji: "👍", title: "Хороший результат!", text: "Ты знаешь основы. Ещё раз просмотри разделы, где ошибся." }
  return { emoji: "📚", title: "Есть куда расти!", text: "Рекомендую ещё раз изучить разделы «Виды вирусов» и «Методы защиты»." }
}

export function QuizSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
  }

  const handleNext = () => {
    if (selected === null) return
    const isCorrect = selected === questions[current].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  const score = answers.filter(Boolean).length
  const result = getResult(score)
  const q = questions[current]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-2xl">
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl">
            Проверь себя
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ Тест по кибербезопасности · 5 вопросов</p>
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {!finished ? (
            <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm md:p-8">
              {/* Progress */}
              <div className="mb-6 flex items-center gap-3">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i < current
                        ? "bg-foreground/60"
                        : i === current
                        ? "bg-foreground"
                        : "bg-foreground/15"
                    }`}
                  />
                ))}
              </div>

              <p className="mb-1 font-mono text-xs text-foreground/40">Вопрос {current + 1} из {questions.length}</p>
              <h3 className="mb-6 text-lg font-medium leading-snug text-foreground md:text-xl">{q.question}</h3>

              <div className="space-y-3">
                {q.options.map((option, i) => {
                  let style = "border-foreground/10 bg-foreground/5 hover:border-foreground/30 hover:bg-foreground/10"
                  if (selected !== null) {
                    if (i === q.correct) style = "border-emerald-400/60 bg-emerald-400/10"
                    else if (i === selected && selected !== q.correct) style = "border-red-400/60 bg-red-400/10"
                    else style = "border-foreground/5 bg-foreground/3 opacity-50"
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm leading-relaxed text-foreground transition-all duration-200 ${style}`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>

              {selected !== null && (
                <div className="mt-4 rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3">
                  <p className="text-xs leading-relaxed text-foreground/70">{q.explanation}</p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <MagneticButton
                  variant="primary"
                  onClick={handleNext}
                  className={selected === null ? "opacity-30 pointer-events-none" : ""}
                >
                  {current + 1 < questions.length ? "Следующий вопрос" : "Завершить тест"}
                </MagneticButton>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center backdrop-blur-sm">
              <div className="mb-4 text-6xl">{result.emoji}</div>
              <h3 className="mb-2 font-sans text-3xl font-light text-foreground">{result.title}</h3>
              <p className="mb-2 font-mono text-sm text-foreground/60">
                {score} из {questions.length} правильных ответов
              </p>
              <p className="mb-8 text-sm leading-relaxed text-foreground/70">{result.text}</p>

              <div className="mb-8 flex justify-center gap-2">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${
                      correct ? "bg-emerald-400/20 text-emerald-400" : "bg-red-400/20 text-red-400"
                    }`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <MagneticButton variant="primary" onClick={handleRestart}>
                  Пройти ещё раз
                </MagneticButton>
                <MagneticButton variant="secondary" onClick={() => scrollToSection?.(1)}>
                  Повторить материал
                </MagneticButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
