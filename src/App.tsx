import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import './App.css'

type Card = {
  label: string
  title: string
  text: string
}

type RoadmapItem = {
  quarter: string
  title: string
  result: string
}

type Slide = {
  eyebrow: string
  title: string
  subtitle?: string
  cards?: Card[]
  roadmap?: RoadmapItem[]
  accent: string
}

type AnimatedStyle = CSSProperties & {
  '--delay': string
}

const slides: Slide[] = [
  {
    eyebrow: 'Fullstack cluster leadership',
    title: 'Кластер, который ускоряет команды',
    subtitle:
      'Кандидат в лидеры Fullstack-кластера. SberAI RND, 26 лет, middle fullstack developer.',
    accent: '01',
    cards: [
      {
        label: 'контекст',
        title: 'Мы уже на орбите',
        text: 'UI Kit унифицировал интерфейсы и дал командам общий язык сборки продуктов.',
      },
      {
        label: 'ускорение',
        title: 'Review Engine',
        text: 'Автоматическое ревью merge request уже снижает ручную рутину и подсвечивает риски раньше.',
      },
      {
        label: 'режим',
        title: 'AI as default',
        text: 'ИИ помогает быстрее писать, проверять и документировать решения без потери инженерной дисциплины.',
      },
    ],
  },
  {
    eyebrow: 'Анализ текущей ситуации',
    title: 'Что работает, а что трёт по нервам',
    accent: '02',
    cards: [
      {
        label: 'работает',
        title: 'Единые паттерны',
        text: 'UI Kit, общие компоненты и повторяемые практики делают интерфейсы предсказуемее.',
      },
      {
        label: 'тормозит',
        title: 'Разный темп команд',
        text: 'Где-то уже есть зрелые процессы, где-то всё ещё много ручных договорённостей.',
      },
      {
        label: 'раздражает',
        title: 'Скрытые знания',
        text: 'Часть решений живёт в чатах, личной памяти и старых MR, поэтому вход в контекст дорогой.',
      },
      {
        label: 'боль',
        title: 'Ревью как узкое место',
        text: 'Даже с автоматизацией нужна понятная культура качества: что проверяем, зачем и как быстро.',
      },
    ],
  },
  {
    eyebrow: 'Фокусы следующего года',
    title: 'Куда двигаться',
    subtitle: 'Меньше хаоса в процессах, больше скорости в поставке и качества в продуктовых интерфейсах.',
    accent: '03',
    cards: [
      {
        label: 'управление',
        title: 'Стыковка кластеров',
        text: 'Сделать интерфейсы, интеграции и ожидания между командами прозрачнее.',
      },
      {
        label: 'кластер',
        title: 'Платформа качества',
        text: 'Развивать UI Kit и Review Engine как инструменты, а не разовые инициативы.',
      },
      {
        label: 'лично',
        title: 'Скорость через ясность',
        text: 'Я хочу убирать неопределённость: фиксировать договорённости, владельцев и критерии результата.',
      },
    ],
  },
  {
    eyebrow: 'Предложения',
    title: 'Как превращать боли в систему',
    accent: '04',
    cards: [
      {
        label: '1',
        title: 'Cluster Radar',
        text: 'Лёгкая карта инициатив, статусов и блокеров: видно, где нужна помощь лидера.',
      },
      {
        label: '2',
        title: 'AI review playbook',
        text: 'Единые правила для Review Engine: критичность, false positive, чек-листы и обратная связь.',
      },
      {
        label: '3',
        title: 'UI Kit adoption loop',
        text: 'Регулярно собирать боли потребителей, чинить шероховатости и показывать быстрые wins.',
      },
      {
        label: '4',
        title: 'Demo Fridays',
        text: 'Короткие демо вместо длинных отчётов: что сделали, чему научились, что мешает.',
      },
    ],
  },
  {
    eyebrow: 'Дорожная карта',
    title: 'Первые 12 месяцев',
    accent: '05',
    roadmap: [
      {
        quarter: 'Q1',
        title: 'Диагностика и договорённости',
        result: 'Карта болей, владельцы инициатив, базовые метрики скорости и качества.',
      },
      {
        quarter: 'Q2',
        title: 'Review Engine 2.0',
        result: 'Понятные правила ревью, трекинг false positive, быстрая обратная связь.',
      },
      {
        quarter: 'Q3',
        title: 'UI Kit как продукт',
        result: 'Роадмап компонентов, витрина паттернов, регулярная обратная связь от команд.',
      },
      {
        quarter: 'Q4',
        title: 'Масштабирование практик',
        result: 'Повторяемый лидерский контур: метрики, демо, знания и наставничество.',
      },
    ],
  },
  {
    eyebrow: 'Риски',
    title: 'Что может пойти не так',
    accent: '06',
    cards: [
      {
        label: 'риск',
        title: 'Автоматизация без доверия',
        text: 'Решение: прозрачные правила, измерение ошибок и возможность быстро поправить модель процесса.',
      },
      {
        label: 'риск',
        title: 'Перегруз инициативами',
        text: 'Решение: маленькие циклы, явные приоритеты и отказ от задач без владельца.',
      },
      {
        label: 'риск',
        title: 'UI Kit оторвётся от реальности',
        text: 'Решение: регулярные интервью с командами и метрика переиспользования компонентов.',
      },
    ],
  },
  {
    eyebrow: 'Коротко о себе',
    title: 'Почему я хочу быть лидером',
    subtitle:
      'Мне интересно соединять инженерию, продуктовую ясность и спокойную командную скорость.',
    accent: '07',
    cards: [
      {
        label: 'опыт',
        title: 'Middle fullstack',
        text: 'Понимаю обе стороны поставки: интерфейс, backend, интеграции и качество изменений.',
      },
      {
        label: 'мотивация',
        title: 'Хочу усиливать систему',
        text: 'Лидерство для меня — это делать так, чтобы хорошим решениям было проще происходить.',
      },
      {
        label: 'цель',
        title: 'Больше автономии',
        text: 'Хочу, чтобы кластер быстрее принимал решения, делился знаниями и увереннее работал с AI.',
      },
    ],
  },
  {
    eyebrow: 'Место для личных идей',
    title: 'Зона для смелых ставок',
    subtitle: 'Черновик специально оставлен гибким: сюда добавим твои сильные личные идеи после первой примерки.',
    accent: '08',
    cards: [
      {
        label: 'идея',
        title: 'Fullstack AI cockpit',
        text: 'Единая панель для статуса MR, качества, документации и подсказок по следующему шагу.',
      },
      {
        label: 'идея',
        title: 'Клуб инженерных решений',
        text: 'Разборы архитектурных выборов: не лекции, а короткие практичные сессии по реальным кейсам.',
      },
      {
        label: 'идея',
        title: 'Менторский контур',
        text: 'Помогать джунам и новым участникам быстрее входить в код, процессы и культуру ревью.',
      },
    ],
  },
]

function App() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const currentSlide = slides[activeSlide]
  const progress = useMemo(
    () => `${(((activeSlide + 1) / slides.length) * 100).toFixed(2)}%`,
    [activeSlide],
  )

  const goToSlide = (index: number) => {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index))

    if (nextIndex === activeSlide) {
      return
    }

    setDirection(nextIndex > activeSlide ? 'next' : 'prev')
    setActiveSlide(nextIndex)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        goToSlide(activeSlide + 1)
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        goToSlide(activeSlide - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSlide])

  return (
    <main className="deck">
      <div className="sun" aria-hidden="true"></div>
      <div className="grid-floor" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>

      <header className="topbar">
        <span>Fullstack leader election</span>
        <span>
          {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </header>

      <section className={`slide slide-${direction}`} key={currentSlide.accent}>
        <div className="slide-copy">
          <p className="eyebrow">{currentSlide.eyebrow}</p>
          <h1>{currentSlide.title}</h1>
          {currentSlide.subtitle && <p className="subtitle">{currentSlide.subtitle}</p>}
        </div>

        {currentSlide.cards && (
          <div className="card-grid">
            {currentSlide.cards.map((card, index) => (
              <article
                className="neon-card"
                key={card.title}
                style={{ '--delay': `${index * 70}ms` } as AnimatedStyle}
              >
                <span>{card.label}</span>
                <h2>{card.title}</h2>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        )}

        {currentSlide.roadmap && (
          <div className="roadmap">
            {currentSlide.roadmap.map((item, index) => (
              <article
                className="roadmap-item"
                key={item.quarter}
                style={{ '--delay': `${index * 80}ms` } as AnimatedStyle}
              >
                <strong>{item.quarter}</strong>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.result}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="orbital-number" aria-hidden="true">
          {currentSlide.accent}
        </div>
      </section>

      <nav className="controls" aria-label="Навигация по презентации">
        <button
          type="button"
          className="arrow-button"
          onClick={() => goToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          aria-label="Предыдущий слайд"
        >
          ‹
        </button>
        <div className="dots">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.accent}
              className={index === activeSlide ? 'dot active' : 'dot'}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          className="arrow-button"
          onClick={() => goToSlide(activeSlide + 1)}
          disabled={activeSlide === slides.length - 1}
          aria-label="Следующий слайд"
        >
          ›
        </button>
      </nav>

      <div className="progress" aria-hidden="true">
        <span style={{ width: progress }} />
      </div>
    </main>
  )
}

export default App
