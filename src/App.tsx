import { type CSSProperties, useEffect, useMemo, useState } from 'react'
import './App.css'

type Card = {
  label?: string
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
  visual?: {
    src: string
    alt: string
    caption: string
    size?: 'large' | 'xl' | 'wide'
  }
  cards?: Card[]
  roadmap?: RoadmapItem[]
  accent: string
  intro?: boolean
  finale?: boolean
}

type AnimatedStyle = CSSProperties & {
  '--delay': string
}

const assetPath = (path: string) =>
  path.startsWith('data:') ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const slides: Slide[] = [
  {
    eyebrow: 'Candidate profile',
    title: 'Привет, я Fullstack developer',
    subtitle:
      'Мне 26 лет, я middle fullstack разработчик в Fullstack-кластере SberAI RND. Хочу помогать кластеру быстрее договариваться, сильнее использовать AI и спокойнее доводить идеи до результата.',
    accent: '01',
    intro: true,
    cards: [
      {
        label: 'role',
        title: 'Middle Fullstack',
        text: 'Пишу и понимаю обе стороны продукта: UI, backend, интеграции, качество и delivery.',
      },
      {
        label: 'team',
        title: 'SberAI RND',
        text: 'Работаю внутри Fullstack-кластера и вижу, где нам уже хорошо, а где можно ускориться.',
      },
    ],
  },
  {
    eyebrow: 'Fullstack cluster leadership',
    title: 'Кластер, который ускоряет команды',
    visual: {
      src: '/programmer.png',
      alt: 'Программист в ретрофутуристичном стиле',
      caption: 'Фуллстек_разработчик.png',
    },
    accent: '02',
    cards: [
      {
        label: 'team',
        title: 'Одна большая команда',
        text: 'Объединились в общий Fullstack-контур и стали сильнее за счёт общего контекста.',
      },
      {
        label: 'ui-kit',
        title: 'Свой UI Kit',
        text: 'Разработали и внедрили UI Kit: унифицировали интерфейсы продуктов и ускорили разработку.',
      },
      {
        label: 'review',
        title: 'Review Engine',
        text: 'Разработан и внедряется инструмент, который помогает разработчикам проводить ревью кода.',
      },
      {
        label: 'ai-agents',
        title: 'ИИ-агенты в работе',
        text: 'За год команда плотно внедрила AI-агентов для роста производительности и скорости написания кода.',
      },
      {
        label: 'hiring',
        title: 'Новый найм',
        text: 'Разрешили кандидатам использовать AI-агентов на интервью, сделав отбор объективнее и ближе к реальности.',
      },
    ],
  },
  {
    eyebrow: 'Анализ текущей ситуации',
    title: 'Боли, которые замедляют кластер',
    visual: {
      src: '/pain.png',
      alt: 'Иллюстрация болей и раздражителей в работе',
      caption: 'Боль.png',
    },
    accent: '03',
    cards: [
      {
        label: 'context',
        title: 'Много проектов',
        text: 'Бывает частое переключение контекста, из-за чего сложнее держать фокус и скорость.',
      },
      {
        label: 'ui-process',
        title: 'Не везде единый подход',
        text: 'Не все продукты используют общие подходы к UI, процессам разработки и качеству.',
      },
      {
        label: 'metrics',
        title: 'Сложно измерять эффект',
        text: 'Пока трудно оценивать реальный вклад отдельных инженерных инициатив.',
      },
      {
        label: 'feedback',
        title: 'Мало обратной связи',
        text: 'Мы только начали делать инструменты для своего и соседних кластеров, поэтому фидбека ещё мало.',
      },
    ],
  },
  {
    eyebrow: 'Фокусы следующего года',
    title: 'Куда двигаться',
    subtitle: 'Меньше хаоса в процессах, больше скорости в поставке и качества в продуктовых интерфейсах.',
    visual: {
      src: '/where.png',
      alt: 'Иллюстрация направления развития Fullstack-кластера',
      caption: 'where_next.png',
      size: 'xl',
    },
    accent: '04',
    cards: [
      {
        label: 'platforms',
        title: 'Платформы, не только инструменты',
        text: 'Строить решения, которыми смогут пользоваться другие кластеры и сам SberAI.',
      },
      {
        label: 'ai-agents',
        title: 'AI-агенты в разработке',
        text: 'Дальше внедрять AI-агентов в работу кластера и повышать производительность разработчиков.',
      },
      {
        label: 'quality',
        title: 'Review Engine как платформа',
        text: 'Расширить ревью до контроля качества: архитектура, безопасность, производительность.',
      },
      {
        label: 'ui-kit',
        title: 'UI Kit для кластеров',
        text: 'Развивать UI Kit и внедрять его шире для единого узнаваемого интерфейса продуктов.',
      },
    ],
  },
  {
    eyebrow: 'Предложения',
    title: 'Предложения для роста кластера',
    subtitle:
      'Максимальный эффект будет не в одной задаче, а в покрытии всего жизненного цикла разработки.',
    visual: {
      src: '/stonks.png',
      alt: 'Иллюстрация роста инженерных инициатив',
      caption: 'growth_mode.png',
      size: 'large',
    },
    accent: '05',
    cards: [
      {
        label: 'quality-platform',
        title: 'Инженерная платформа качества',
        text: 'Развивать Review Engine как единую точку контроля качества: меньше дефектов, быстрее ревью, единые стандарты разработки.',
      },
      {
        label: 'idp',
        title: 'Internal Developer Platform',
        text: 'Создать единый портал инженерных инструментов: Review Engine, AI-агенты, документация и UI Platform.',
      },
      {
        label: 'ai-assistant',
        title: 'AI Coding Assistant следующего поколения',
        text: 'Агенты для анализа требований, генерации тестов, поиска техдолга, миграций и архитектурных изменений.',
      },
    ],
  },
  {
    eyebrow: 'Дорожная карта',
    title: 'Первые 12 месяцев',
    visual: {
      src: '/plans.png',
      alt: 'Иллюстрация дорожной карты и планирования',
      caption: 'roadmap_plan.png',
      size: 'wide',
    },
    accent: '06',
    roadmap: [
      {
        quarter: 'Q3',
        title: 'AI-агенты, Review Engine и портал',
        result: 'Внедрение новых AI-агентов, релиз новой версии Review Engine и запуск инженерного портала. Результат: заметное сокращение ручных операций.',
      },
      {
        quarter: 'Q4',
        title: 'Масштабирование и эффект',
        result: 'Масштабирование решений на другие команды, измерение бизнес-эффекта и подготовка стратегии на следующий год. Результат: кластер становится поставщиком платформенных решений.',
      },
      {
        quarter: 'Q1',
        title: 'Аудит и стратегия',
        result: 'Аудит платформенных решений, определение общей технической стратегии, сбор обратной связи от пользователей Review Engine и UI Platform.',
      },
      {
        quarter: 'Q2',
        title: 'Развитие платформ',
        result: 'Разработка Review Engine, унификация интеграций AI-моделей и развитие UI Platform. Результат: рост использования платформ внутри управления.',
      },
    ],
  },
  {
    eyebrow: 'Риски',
    title: 'Что может пойти не так',
    accent: '07',
    cards: [
      {
        label: 'team-growth',
        title: 'Быстрый рост команды',
        text: 'Риск: коммуникации усложняются. Что делать: зоны ответственности, техлиды по направлениям, регулярные синки.',
      },
      {
        label: 'focus',
        title: 'Слишком много инициатив',
        text: 'Риск: распыление ресурсов. Что делать: жёсткая приоритизация, квартальные цели, измеримые критерии успеха.',
      },
      {
        label: 'adoption',
        title: 'Низкая адаптация инструментов',
        text: 'Риск: команды не используют решения. Что делать: работа с пользователями, документация, метрики пользы.',
      },
      {
        label: 'ai-limits',
        title: 'Ограничения AI-технологий',
        text: 'Риск: нестабильное качество. Что делать: человек в контуре, оценка качества агентов, постепенное расширение.',
      },
    ],
  },
  {
    eyebrow: 'Коротко о себе',
    title: 'Почему я хочу быть лидером',
    subtitle:
      'Мне интересно соединять инженерию, продуктовую ясность и спокойную командную скорость.',
    accent: '08',
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
    accent: '09',
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
  {
    eyebrow: 'End of transmission',
    title: 'Спасибо за внимание',
    subtitle: 'Готов обсудить идеи, боли и то, каким мы хотим видеть Fullstack-кластер дальше.',
    accent: '10',
    finale: true,
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
      <div className="code-rain" aria-hidden="true">
        <span>const leader = cluster.elect(candidate)</span>
        <span>reviewEngine.scan(mr)</span>
        <span>uiKit.render(pattern)</span>
        <span>git push --force-with-lease</span>
      </div>
      <div className="scanlines" aria-hidden="true"></div>

      <header className="topbar">
        <span>Fullstack leader election</span>
        <span className="coin-counter" key={`counter-${activeSlide}`}>
          <span className="coin-burst" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="coin-icon" aria-hidden="true" />
          {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </header>

      <section
        className={`slide slide-${direction} slide-id-${currentSlide.accent}${currentSlide.intro ? ' intro-slide' : ''}${
          currentSlide.finale ? ' finale-slide' : ''
        }`}
        key={currentSlide.accent}
      >
        {currentSlide.finale && (
          <div className="finale-core" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}

        {currentSlide.intro && (
          <figure className="portrait-frame">
            <div className="portrait-burst" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <img src={assetPath('/image.png')} alt="Фото кандидата" />
          </figure>
        )}

        <div className="slide-copy">
          <p className="eyebrow">{currentSlide.eyebrow}</p>
          <h1>{currentSlide.title}</h1>
          {currentSlide.subtitle && <p className="subtitle">{currentSlide.subtitle}</p>}
          {currentSlide.visual && (
            <figure
              className={`slide-visual${
                currentSlide.visual.size ? ` slide-visual-${currentSlide.visual.size}` : ''
              }`}
            >
              <div className="visual-burst" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <img src={assetPath(currentSlide.visual.src)} alt={currentSlide.visual.alt} />
              <figcaption>{currentSlide.visual.caption}</figcaption>
            </figure>
          )}
        </div>

          {currentSlide.cards && (
          <div className="card-grid">
            {currentSlide.cards.map((card, index) => (
              <article
                className="neon-card"
                key={card.title}
                style={{ '--delay': `${index * 70}ms` } as AnimatedStyle}
              >
                <code className="card-prompt">~/fullstack/{card.label}</code>
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
                  <code className="card-prompt">roadmap.commit({item.quarter.toLowerCase()})</code>
                  <h2>{item.title}</h2>
                  <p>{item.result}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="orbital-number" aria-hidden="true">
          <span className="score-burst">
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
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
