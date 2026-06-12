export type PartOfSpeech = "Noun" | "Verb" | "Adjective" | "Adverb"

export interface WordSense {
  pos: PartOfSpeech
  definitionEn: string
  definitionVi: string
}

export interface Collocation {
  phrase: string
  meaningVi: string
}

export interface BilingualExample {
  en: string
  vi: string
}

export interface WordFormation {
  label: string
  value: string
}

export interface DictionaryEntry {
  word: string
  ipa: string
  senses: WordSense[]
  formation: WordFormation[]
  collocations: Collocation[]
  examples: BilingualExample[]
}

export interface HistoryItem {
  word: string
  timestamp: string
  bookmarked: boolean
  tags: string[]
}

export const dictionary: Record<string, DictionaryEntry> = {
  meticulous: {
    word: "meticulous",
    ipa: "/məˈtɪk.jə.ləs/",
    senses: [
      {
        pos: "Adjective",
        definitionEn: "Showing great attention to detail; very careful and precise.",
        definitionVi: "Tỉ mỉ, cẩn thận đến từng chi tiết.",
      },
      {
        pos: "Adverb",
        definitionEn: "Used as the adverb form 'meticulously' — in a precise, careful manner.",
        definitionVi: "Một cách tỉ mỉ, kỹ lưỡng.",
      },
    ],
    formation: [
      { label: "Root", value: "metus (Latin: fear)" },
      { label: "Suffix", value: "-ous (full of)" },
      { label: "Noun form", value: "meticulousness" },
      { label: "Adverb", value: "meticulously" },
    ],
    collocations: [
      { phrase: "meticulous attention to detail", meaningVi: "sự chú ý tỉ mỉ đến chi tiết" },
      { phrase: "meticulous planning", meaningVi: "lên kế hoạch kỹ lưỡng" },
      { phrase: "meticulous records", meaningVi: "hồ sơ ghi chép cẩn thận" },
    ],
    examples: [
      {
        en: "The researcher kept meticulous records of every experiment.",
        vi: "Nhà nghiên cứu giữ hồ sơ tỉ mỉ về mọi thí nghiệm.",
      },
      {
        en: "Her meticulous approach impressed the examiners.",
        vi: "Cách tiếp cận tỉ mỉ của cô ấy gây ấn tượng với giám khảo.",
      },
    ],
  },
  ubiquitous: {
    word: "ubiquitous",
    ipa: "/juːˈbɪk.wɪ.təs/",
    senses: [
      {
        pos: "Adjective",
        definitionEn: "Present, appearing, or found everywhere.",
        definitionVi: "Có mặt ở khắp mọi nơi; phổ biến rộng rãi.",
      },
    ],
    formation: [
      { label: "Root", value: "ubique (Latin: everywhere)" },
      { label: "Suffix", value: "-ous (full of)" },
      { label: "Noun form", value: "ubiquity" },
      { label: "Adverb", value: "ubiquitously" },
    ],
    collocations: [
      { phrase: "ubiquitous presence", meaningVi: "sự hiện diện khắp nơi" },
      { phrase: "ubiquitous technology", meaningVi: "công nghệ phổ biến" },
      { phrase: "become ubiquitous", meaningVi: "trở nên phổ biến" },
    ],
    examples: [
      {
        en: "Smartphones have become ubiquitous in modern life.",
        vi: "Điện thoại thông minh đã trở nên phổ biến trong cuộc sống hiện đại.",
      },
      {
        en: "Coffee shops are ubiquitous throughout the city.",
        vi: "Các quán cà phê có mặt ở khắp nơi trong thành phố.",
      },
    ],
  },
  resilience: {
    word: "resilience",
    ipa: "/rɪˈzɪl.i.əns/",
    senses: [
      {
        pos: "Noun",
        definitionEn: "The capacity to recover quickly from difficulties; toughness.",
        definitionVi: "Khả năng phục hồi nhanh sau khó khăn; sự kiên cường.",
      },
    ],
    formation: [
      { label: "Root", value: "resilire (Latin: to leap back)" },
      { label: "Suffix", value: "-ence (state of)" },
      { label: "Adjective", value: "resilient" },
      { label: "Adverb", value: "resiliently" },
    ],
    collocations: [
      { phrase: "build resilience", meaningVi: "xây dựng sự kiên cường" },
      { phrase: "emotional resilience", meaningVi: "sự kiên cường về cảm xúc" },
      { phrase: "economic resilience", meaningVi: "khả năng phục hồi kinh tế" },
    ],
    examples: [
      {
        en: "The community showed remarkable resilience after the flood.",
        vi: "Cộng đồng đã thể hiện sự kiên cường đáng kể sau trận lũ.",
      },
      {
        en: "Mental resilience is key to long-term success.",
        vi: "Sự kiên cường tinh thần là chìa khóa cho thành công lâu dài.",
      },
    ],
  },
}

export const fallbackEntry: DictionaryEntry = dictionary.meticulous

export const initialHistory: HistoryItem[] = [
  { word: "meticulous", timestamp: "2 min ago", bookmarked: true, tags: ["IELTS", "Academic"] },
  { word: "ubiquitous", timestamp: "18 min ago", bookmarked: false, tags: ["Academic"] },
  { word: "resilience", timestamp: "1 hr ago", bookmarked: true, tags: ["IELTS"] },
  { word: "pragmatic", timestamp: "3 hr ago", bookmarked: false, tags: ["Business"] },
  { word: "ephemeral", timestamp: "Yesterday", bookmarked: true, tags: ["Literary"] },
  { word: "candid", timestamp: "Yesterday", bookmarked: false, tags: ["TOEIC"] },
]

export interface QuizQuestion {
  prompt: string
  options: string[]
  correctIndex: number
}

export const quizQuestion: QuizQuestion = {
  prompt: "Which word means 'present or found everywhere'?",
  options: ["Resilient", "Ubiquitous", "Meticulous", "Candid"],
  correctIndex: 1,
}

export interface Flashcard {
  front: string
  ipa: string
  back: string
  backVi: string
}

export const flashcards: Flashcard[] = [
  {
    front: "meticulous",
    ipa: "/məˈtɪk.jə.ləs/",
    back: "Showing great attention to detail; very careful.",
    backVi: "Tỉ mỉ, cẩn thận đến từng chi tiết.",
  },
  {
    front: "resilience",
    ipa: "/rɪˈzɪl.i.əns/",
    back: "The capacity to recover quickly from difficulties.",
    backVi: "Khả năng phục hồi nhanh sau khó khăn.",
  },
  {
    front: "candid",
    ipa: "/ˈkæn.dɪd/",
    back: "Truthful and straightforward; frank.",
    backVi: "Thẳng thắn, chân thật.",
  },
]

export interface ResourcePoint {
  t: string
  ms: number
  ram: number
  tokens: number
}

export const resourceSeries: ResourcePoint[] = [
  { t: "10s", ms: 240, ram: 612, tokens: 128 },
  { t: "8s", ms: 198, ram: 640, tokens: 96 },
  { t: "6s", ms: 312, ram: 705, tokens: 176 },
  { t: "4s", ms: 176, ram: 668, tokens: 88 },
  { t: "2s", ms: 268, ram: 720, tokens: 152 },
  { t: "now", ms: 142, ram: 690, tokens: 112 },
]
