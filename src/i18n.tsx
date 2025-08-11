import React, { createContext, useContext, useMemo, useState } from "react";

export type Lang = "ru" | "en";

type Dict = Record<string, string>;

const translations: Record<Lang, Dict> = {
  ru: {
    brand: "AquaAeris",
    tagline: "Чистая вода из воздуха. Где угодно.",
    cleanWater: "Чистая вода",
    fromAir: "из воздуха",
    anywhere: "Где угодно",
    heroDescription: "Революционная технология извлечения питьевой воды из атмосферного воздуха. Автономно, экологично, эффективно.",
    learnMore: "Узнать больше",
    contact: "Связаться",
    problem: "О проблеме",
    problemSubtitle: "Мировой дефицит воды — реальность для миллионов",
    stat1: "25% людей страдают от нехватки воды",
    stat2: "2 млн смертей в год",
    stat3: "Казахстан: 57,9% сельских домов без централизованной воды",
    solution: "Решение — AquaAeris",
    solutionDesc: "Автономное устройство для генерации питьевой воды из воздуха с использованием эффекта Пельтье и умным IoT-управлением.",
    feature1: "Экологично — без фреонов",
    feature2: "Энергоэффективно — 1 л на 0,15 кВт⋅ч",
    feature3: "Работает при −15°C…40°C и влажности от 20%",
    feature4: "Соответствует стандартам качества питьевой воды",
    products: "Линейка продуктов",
    specs: "Технические характеристики",
    perf: "Производительность",
    tempRange: "Температурный диапазон",
    energy: "Потребление энергии",
    quality: "Стандарты качества",
    useCases: "Применение и сценарии",
    homeOffice: "Для дома и офиса",
    rural: "Для сельских регионов",
    mobile: "Мобильные решения (военные, кемпинг, катастрофы)",
    iot: "IoT и приложение",
    iotDesc: "Датчики температуры, влажности, качества воды и управление солнечными панелями 360° в приложении.",
    testimonials: "Отзывы и кейсы",
    contacts: "Контакты",
    phone: "Телефоны",
    instagram: "Instagram",
    send: "Отправить",
    name: "Имя",
    email: "Email",
    message: "Сообщение",
    footer: "© AquaAeris. Все права защищены.",
    backToTop: "Наверх",
    modelsComingSoon: "ON Board (скоро)",
    heroSubtext: "1 л воды за 0,15 кВт⋅ч. Работает при −15°C…40°C и влажности от 20%. Экологично и соответствует международным стандартам качества.",
    telegramBot: "Телеграм-бот",
    waterLevel: "Уровень воды",
    humidity: "Влажность",
    waterQualityAnalysis: "Анализ качества воды",
    productionRate: "Производительность",
    airTemperature: "Температура воздуха",
    aiMonitoring: "ИИ‑мониторинг",
    aiStepCapture: "Получение изображения",
    aiStepPreprocess: "Предобработка изображения",
    aiStepClassify: "Классификация",
    aiStepNotify: "Система уведомления",
    aiStepCycle: "Начало нового цикла",
    mobileApp: "Мобильное приложение",
    mobileSync: "Синхронизация данных с устройства",
    mobileAiModes: "AI‑переключение режимов работы",
    mobileFilterAlerts: "Предупреждения о состоянии фильтра",
    mobileStatsTips: "Статистика производства воды и советы",
    schematic: "Схема",
    schematicIoT: "IoT: передача данных датчиков в Telegram‑бот",
    schematicTracker: "Солнечный трекер 360° для панели",
    schematicCooler: "Кулер: подача воды при срабатывании датчика",
    productHomeDesc: "Домашнее устройство для чистой воды из воздуха.",
    productTourismDesc: "Портативное решение для пикников и походов.",
    productSocietyDesc: "Для общественных пространств и туризма.",
    useCasesDesc: "AquaAeris обеспечивает устойчивое водоснабжение в любых условиях.",
    useHomeDesc: "Для кухни, офиса и детских комнат: тихая работа и свежая вода каждый день.",
    useRuralDesc: "Автономность для удалённых регионов: чистая вода без водопровода.",
    useMobileDesc: "Кемпинг и экспедиции: лёгкое устройство и вода там, где это нужно."
  },
  en: {
    brand: "AquaAeris",
    tagline: "Pure water from air. Anywhere.",
    cleanWater: "Pure water",
    fromAir: "from air",
    anywhere: "Anywhere",
    heroDescription: "Revolutionary technology for extracting drinking water from atmospheric air. Autonomous, eco-friendly, efficient.",
    learnMore: "Learn more",
    contact: "Contact",
    problem: "The Problem",
    problemSubtitle: "Global water scarcity impacts millions",
    stat1: "25% of people face water shortage",
    stat2: "2M deaths per year",
    stat3: "Kazakhstan: only 57.9% rural homes have centralized water",
    solution: "Solution — AquaAeris",
    solutionDesc: "Autonomous device generating drinking water from air using Peltier effect with smart IoT control.",
    feature1: "Eco-friendly — no freons",
    feature2: "Energy efficient — 1 L per 0.15 kWh",
    feature3: "Works at −15°C…40°C and humidity from 20%",
    feature4: "Meets international drinking water standards",
    products: "Product Line",
    specs: "Technical Specifications",
    perf: "Performance",
    tempRange: "Temperature range",
    energy: "Energy consumption",
    quality: "Quality standards",
    useCases: "Applications",
    homeOffice: "Home & Office",
    rural: "Rural regions",
    mobile: "Mobile (military, camping, disasters)",
    iot: "IoT & App",
    iotDesc: "Sensors for temperature, humidity, water quality and 360° solar control in the app.",
    testimonials: "Testimonials",
    contacts: "Contacts",
    phone: "Phone",
    instagram: "Instagram",
    send: "Send",
    name: "Name",
    email: "Email",
    message: "Message",
    footer: "© AquaAeris. All rights reserved.",
    backToTop: "Back to top",
    modelsComingSoon: "ON Board (soon)",
    heroSubtext: "1 L of water per 0.15 kWh. Operates from −15°C to 40°C and humidity from 20%. Eco‑friendly and compliant with international drinking water standards.",
    telegramBot: "Telegram Bot",
    waterLevel: "Water Level",
    humidity: "Humidity",
    waterQualityAnalysis: "Water Quality Analysis",
    productionRate: "Production",
    airTemperature: "Air Temperature",
    aiMonitoring: "AI Monitoring",
    aiStepCapture: "Image capture",
    aiStepPreprocess: "Image preprocessing",
    aiStepClassify: "Classification",
    aiStepNotify: "Notification system",
    aiStepCycle: "Start new cycle",
    mobileApp: "Mobile App",
    mobileSync: "Data sync from device",
    mobileAiModes: "AI‑based mode switching",
    mobileFilterAlerts: "Filter state alerts",
    mobileStatsTips: "Water production stats and tips",
    schematic: "Schematic",
    schematicIoT: "IoT: sensor data to Telegram bot",
    schematicTracker: "Solar tracker 360°",
    schematicCooler: "Cooler: dispense on ultrasonic trigger",
    productHomeDesc: "Home device for pure water from air.",
    productTourismDesc: "Portable solution for picnics and hiking.",
    productSocietyDesc: "For public spaces and tourism.",
    useCasesDesc: "AquaAeris ensures sustainable water supply in any conditions.",
    useHomeDesc: "For kitchens, offices and kids rooms: quiet operation and fresh water daily.",
    useRuralDesc: "Autonomy for remote regions: clean water without centralized supply.",
    useMobileDesc: "Camping and expeditions: lightweight device and water where you need it."
  }
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations["ru"]) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider: React.FC<{ defaultLang?: Lang; children: React.ReactNode }> = ({
  defaultLang = "ru",
  children,
}) => {
  const [lang, setLang] = useState<Lang>(defaultLang);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (k) => translations[lang][k] || String(k),
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
