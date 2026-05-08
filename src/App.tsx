/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Mail, 
  MessageSquare, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X,
  Play,
  ArrowRight,
  Search,
  ArrowUpDown
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: string;
  videoId: string;
  image: string;
  date: string; // ISO format for easy sorting
  year?: string;
  type?: string;
  highlight?: boolean;
}

// --- Data ---
const PROJECTS: Project[] = [
  // SHOWS
  {
    id: 1,
    title: "RICK SANTANA - LOVES TRAIN - SHOWCASE - BDC",
    category: "SHOWS",
    videoId: "sTOTjHhJSJg",
    image: "https://img.youtube.com/vi/sTOTjHhJSJg/maxresdefault.jpg",
    date: "2024-03-15",
    year: "2024",
    type: "Show",
    highlight: true
  },
  {
    id: 213,
    title: "RICK SANTANA - SHOW 2025",
    category: "SHOWS",
    videoId: "2OKDo8LepJU",
    image: "https://img.youtube.com/vi/2OKDo8LepJU/maxresdefault.jpg",
    date: "2025-01-02",
    year: "2025",
    type: "Show"
  },

  // AULAS
  {
    id: 2,
    title: "RICK SANTANA - Fresh Tour  Rio de Janeiro 2016",
    category: "AULAS",
    videoId: "CNAo9JyHuyo",
    image: "https://img.youtube.com/vi/CNAo9JyHuyo/maxresdefault.jpg",
    date: "2016-12-01",
    year: "2016",
    type: "Aula"
  },
  {
    id: 3,
    title: "RICK SANTANA - MDA SUMMER CLASS 2020",
    category: "AULAS",
    videoId: "GSdAS-BRT4k",
    image: "https://img.youtube.com/vi/GSdAS-BRT4k/maxresdefault.jpg",
    date: "2020-07-20",
    year: "2020",
    type: "Aula",
    highlight: true
  },
  {
    id: 4,
    title: "RICK SANTANA - HIP HOP DISTRICT 2019",
    category: "AULAS",
    videoId: "dIfbnWZHqjQ",
    image: "https://img.youtube.com/vi/dIfbnWZHqjQ/maxresdefault.jpg",
    date: "2019-10-15",
    year: "2019",
    type: "Aula",
    highlight: true
  },
  {
    id: 5,
    title: "RICK SANTANA - Fresh Tour Rio de Janeiro 2019",
    category: "AULAS",
    videoId: "oJqpl0HAqwE",
    image: "https://img.youtube.com/vi/oJqpl0HAqwE/maxresdefault.jpg",
    date: "2019-11-20",
    year: "2019",
    type: "Aula",
    highlight: true
  },
  {
    id: 6,
    title: "Rick Santana - Know You - Workshop - Araxá",
    category: "AULAS",
    videoId: "rRYeS9W1jdc",
    image: "https://img.youtube.com/vi/rRYeS9W1jdc/maxresdefault.jpg",
    date: "2023-05-15",
    year: "2023",
    type: "Aula"
  },
  {
    id: 7,
    title: "Rick Santana - Lotus - Workshop - Araxá",
    category: "AULAS",
    videoId: "-naPVVYuSHE",
    image: "https://img.youtube.com/vi/-naPVVYuSHE/maxresdefault.jpg",
    date: "2023-06-10",
    year: "2023",
    type: "Aula",
    highlight: true
  },
  {
    id: 22,
    title: "RICK E GLADSON - WORKSHOP",
    category: "AULAS",
    videoId: "nuvq73nXOps",
    image: "https://img.youtube.com/vi/nuvq73nXOps/maxresdefault.jpg",
    date: "2023-11-25",
    year: "2023",
    type: "Aula"
  },
  {
    id: 23,
    title: "RICK SANTANA - LONG NIGHT - WORKSHOP - SOUL GUETTO",
    category: "AULAS",
    videoId: "OkUB2mkaQZw",
    image: "https://img.youtube.com/vi/OkUB2mkaQZw/maxresdefault.jpg",
    date: "2024-01-10",
    year: "2024",
    type: "Aula",
    highlight: true
  },
  {
    id: 24,
    title: "RICK SANTANA - TRY - PRIMEIRO ATO",
    category: "AULAS",
    videoId: "dfhvCMVh5LY",
    image: "https://img.youtube.com/vi/dfhvCMVh5LY/maxresdefault.jpg",
    date: "2024-03-12",
    year: "2024",
    type: "Aula",
    highlight: true
  },
  {
    id: 27,
    title: "RICK SANTANA - LONG NIGHT - WESTSIDE - WORKSHOP - SOLO",
    category: "AULAS",
    videoId: "1ENDS5zWHxU",
    image: "https://img.youtube.com/vi/1ENDS5zWHxU/maxresdefault.jpg",
    date: "2024-03-20",
    year: "2024",
    type: "Aula",
    highlight: true
  },
  {
    id: 28,
    title: "RICK SANTANA - LONG NIGHT - WESTSIDE - WORKSHOP",
    category: "AULAS",
    videoId: "2eFZgn9RfVk",
    image: "https://img.youtube.com/vi/2eFZgn9RfVk/maxresdefault.jpg",
    date: "2024-03-21",
    year: "2024",
    type: "Aula"
  },
  {
    id: 29,
    title: "RICK SANTANA - GETIN OLD - PRIMEIRO ATO",
    category: "AULAS",
    videoId: "jGQmw-qoZmc",
    image: "https://img.youtube.com/vi/jGQmw-qoZmc/maxresdefault.jpg",
    date: "2024-03-22",
    year: "2024",
    type: "Aula",
    highlight: true
  },
  {
    id: 31,
    title: "Rick Santana - Pretty Thoughts - Primeiro Ato",
    category: "AULAS",
    videoId: "NkDg4I3Ps1c",
    image: "https://img.youtube.com/vi/NkDg4I3Ps1c/maxresdefault.jpg",
    date: "2024-03-23",
    year: "2024",
    type: "Aula",
    highlight: true
  },
  {
    id: 36,
    title: "RICK SANTANA-  GIVE ME YOUR LOVE",
    category: "AULAS",
    videoId: "A_Qa5SNizsk",
    image: "https://img.youtube.com/vi/A_Qa5SNizsk/maxresdefault.jpg",
    date: "2024-03-24",
    year: "2024",
    type: "Aula"
  },
  {
    id: 41,
    title: "Workshop Paraguay - Aero Street Company",
    category: "AULAS",
    videoId: "Pj4USkp3kR8",
    image: "https://img.youtube.com/vi/Pj4USkp3kR8/maxresdefault.jpg",
    date: "2024-03-25",
    year: "2024",
    type: "Aula"
  },
  {
    id: 43,
    title: "Rick Santana | Leaves - Charlie Burg",
    category: "DANCE VIDEOS",
    videoId: "5j4Sy8_zZtM",
    image: "https://img.youtube.com/vi/5j4Sy8_zZtM/maxresdefault.jpg",
    date: "2024-03-26",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 56,
    title: "Rick Santana | Before you walk out of my life by M",
    category: "AULAS",
    videoId: "Zq2p5VHsaaA",
    image: "https://img.youtube.com/vi/Zq2p5VHsaaA/maxresdefault.jpg",
    date: "2024-03-27",
    year: "2024",
    type: "Aula"
  },
  {
    id: 201,
    title: "RICK SANTANA - TRY - PARAGUAY - WORKSHOP",
    category: "AULAS",
    videoId: "z-yi2Viy2uM",
    image: "https://img.youtube.com/vi/z-yi2Viy2uM/maxresdefault.jpg",
    date: "2018-06-01",
    year: "2018",
    type: "Aula"
  },
  {
    id: 208,
    title: "RICK SANTANA - VENCEDORES",
    category: "AULAS",
    videoId: "DimXmipYRK0",
    image: "https://img.youtube.com/vi/DimXmipYRK0/maxresdefault.jpg",
    date: "2021-01-01",
    year: "2021",
    type: "Aula"
  },
  {
    id: 221,
    title: "RICK SANTANA - LAMOUR - WORKSHOP",
    category: "AULAS",
    videoId: "5kQcd7ZR7Hg",
    image: "https://img.youtube.com/vi/5kQcd7ZR7Hg/maxresdefault.jpg",
    date: "2021-01-02",
    year: "2021",
    type: "Aula"
  },
  {
    id: 212,
    title: "SLEEP - PRIMEIRO ATO - RICK SANTANA",
    category: "AULAS",
    videoId: "Gm0edQebGac",
    image: "https://img.youtube.com/vi/Gm0edQebGac/maxresdefault.jpg",
    date: "2025-01-01",
    year: "2025",
    type: "Aula"
  },

  // DANCE VIDEOS
  {
    id: 8,
    title: "RICK SANTANA & GLADSON SANTOS - THE NIGHT SEA",
    category: "DANCE VIDEOS",
    videoId: "kTodxM2m7b4",
    image: "https://img.youtube.com/vi/kTodxM2m7b4/maxresdefault.jpg",
    date: "2024-02-15",
    year: "2024",
    type: "Video"
  },
  {
    id: 9,
    title: "RICK SANTANA - SAUDADE",
    category: "DANCE VIDEOS",
    videoId: "UulN1fbwkaw",
    image: "https://img.youtube.com/vi/UulN1fbwkaw/maxresdefault.jpg",
    date: "2023-11-10",
    year: "2023",
    type: "Video"
  },
  {
    id: 10,
    title: "RICK SANTANA - MORNING BJ",
    category: "DANCE VIDEOS",
    videoId: "29C9hzdVvc0",
    image: "https://img.youtube.com/vi/29C9hzdVvc0/maxresdefault.jpg",
    date: "2024-01-20",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 11,
    title: "RICK SANTANA - MARVEL",
    category: "DANCE VIDEOS",
    videoId: "c2EPQRk2e6U",
    image: "https://img.youtube.com/vi/c2EPQRk2e6U/maxresdefault.jpg",
    date: "2024-03-05",
    year: "2024",
    type: "Video"
  },
  {
    id: 12,
    title: "RICK SANTANA - LOVE AGAIN",
    category: "DANCE VIDEOS",
    videoId: "kgRg8W5mfVw",
    image: "https://img.youtube.com/vi/kgRg8W5mfVw/maxresdefault.jpg",
    date: "2023-12-15",
    year: "2023",
    type: "Video",
    highlight: true
  },
  {
    id: 13,
    title: "RICK SANTANA - KNOW YOU",
    category: "DANCE VIDEOS",
    videoId: "UuaHrPHWxRM",
    image: "https://img.youtube.com/vi/UuaHrPHWxRM/maxresdefault.jpg",
    date: "2023-10-30",
    year: "2023",
    type: "Video",
    highlight: true
  },
  {
    id: 14,
    title: "RICK SANTANA - KEEP COOL",
    category: "DANCE VIDEOS",
    videoId: "_7hVA5Ps1QY",
    image: "https://img.youtube.com/vi/_7hVA5Ps1QY/maxresdefault.jpg",
    date: "2024-03-25",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 15,
    title: "RICK SANTANA - HELP MYSELF",
    category: "DANCE VIDEOS",
    videoId: "w54kBBMlAuU",
    image: "https://img.youtube.com/vi/w54kBBMlAuU/maxresdefault.jpg",
    date: "2024-02-10",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 16,
    title: "RICK SANTANA FT. ALÊ MAYRINK - FAVORITE",
    category: "DANCE VIDEOS",
    videoId: "G0MDg4tByZo",
    image: "https://img.youtube.com/vi/G0MDg4tByZo/maxresdefault.jpg",
    date: "2024-04-01",
    year: "2024",
    type: "Video"
  },
  {
    id: 17,
    title: "RICK SANTANA & GLADSON SANTOS - DEIXA",
    category: "DANCE VIDEOS",
    videoId: "C27eXpeGkJ0",
    image: "https://img.youtube.com/vi/C27eXpeGkJ0/maxresdefault.jpg",
    date: "2023-09-15",
    year: "2023",
    type: "Video",
    highlight: true
  },
  {
    id: 18,
    title: "RICK SANTANA - BYE BYE",
    category: "DANCE VIDEOS",
    videoId: "kXKxfPC8yeQ",
    image: "https://img.youtube.com/vi/kXKxfPC8yeQ/maxresdefault.jpg",
    date: "2024-05-01",
    year: "2024",
    type: "Video"
  },
  {
    id: 19,
    title: "A Talent - Paraguay",
    category: "DANCE VIDEOS",
    videoId: "2B1LSy2og8g",
    image: "https://img.youtube.com/vi/2B1LSy2og8g/maxresdefault.jpg",
    date: "2023-08-20",
    year: "2023",
    type: "Video",
    highlight: true
  },
  {
    id: 20,
    title: "RICK SANTANA - 91 FLEX - FT. GLADSON SANTOS",
    category: "DANCE VIDEOS",
    videoId: "3O0zp_Oc8sI",
    image: "https://img.youtube.com/vi/3O0zp_Oc8sI/maxresdefault.jpg",
    date: "2024-04-15",
    year: "2024",
    type: "Video"
  },
  {
    id: 30,
    title: "AT\u00c9 QUE DUROU - RICK E GLADSON",
    category: "DANCE VIDEOS",
    videoId: "3Wf25IdsADI",
    image: "https://img.youtube.com/vi/3Wf25IdsADI/maxresdefault.jpg",
    date: "2024-04-16",
    year: "2024",
    type: "Video"
  },
  {
    id: 32,
    title: "RICK SANTANA - OVERTHINKER - MUVPRO 2025",
    category: "DANCE VIDEOS",
    videoId: "9mwmFa3fcjM",
    image: "https://img.youtube.com/vi/9mwmFa3fcjM/maxresdefault.jpg",
    date: "2024-04-10",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 33,
    title: "RICK SANTANA - I LIKE DAT - T-PAIN",
    category: "DANCE VIDEOS",
    videoId: "k2EYA2w0NY8",
    image: "https://img.youtube.com/vi/k2EYA2w0NY8/maxresdefault.jpg",
    date: "2024-04-17",
    year: "2024",
    type: "Video"
  },
  {
    id: 35,
    title: "RICK SANTANA - GIVE ME YOUR LOVE",
    category: "DANCE VIDEOS",
    videoId: "58GHJeQZEK0",
    image: "https://img.youtube.com/vi/58GHJeQZEK0/maxresdefault.jpg",
    date: "2024-04-18",
    year: "2024",
    type: "Video"
  },
  {
    id: 37,
    title: "RICK SANTANA - CHEAP SHOT - ELLA MAI",
    category: "DANCE VIDEOS",
    videoId: "hUwj4nH_UMo",
    image: "https://img.youtube.com/vi/hUwj4nH_UMo/maxresdefault.jpg",
    date: "2024-04-19",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 38,
    title: "Rick Santana - BYE BYE - Os Travessos",
    category: "DANCE VIDEOS",
    videoId: "F0Uydbd-ePU",
    image: "https://img.youtube.com/vi/F0Uydbd-ePU/maxresdefault.jpg",
    date: "2024-04-20",
    year: "2024",
    type: "Video"
  },
  {
    id: 39,
    title: "Rick Santana - Brazil Dance Camp 2022",
    category: "DANCE VIDEOS",
    videoId: "XjUFsWa1v7k",
    image: "https://img.youtube.com/vi/XjUFsWa1v7k/maxresdefault.jpg",
    date: "2022-07-15",
    year: "2022",
    type: "Video",
    highlight: true
  },
  {
    id: 44,
    title: "Rick Santana | Trip - Ella Mai",
    category: "DANCE VIDEOS",
    videoId: "LQfeBytMQpc",
    image: "https://img.youtube.com/vi/LQfeBytMQpc/maxresdefault.jpg",
    date: "2024-04-21",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 45,
    title: "Rick Santana | Lamour  - Sensi Sye",
    category: "DANCE VIDEOS",
    videoId: "w2dCq130TSM",
    image: "https://img.youtube.com/vi/w2dCq130TSM/maxresdefault.jpg",
    date: "2024-04-22",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 48,
    title: "Rick Santana - World",
    category: "DANCE VIDEOS",
    videoId: "X2DE-qYcec4",
    image: "https://img.youtube.com/vi/X2DE-qYcec4/maxresdefault.jpg",
    date: "2024-04-23",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 49,
    title: "Rick Santana - Cinematic Dance",
    category: "DANCE VIDEOS",
    videoId: "NzKkaxCbvDI",
    image: "https://img.youtube.com/vi/NzKkaxCbvDI/maxresdefault.jpg",
    date: "2024-04-24",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 50,
    title: "Rick Santana - Butterfly by Raury",
    category: "DANCE VIDEOS",
    videoId: "XExuUsUJyK0",
    image: "https://img.youtube.com/vi/XExuUsUJyK0/maxresdefault.jpg",
    date: "2024-04-25",
    year: "2024",
    type: "Video"
  },
  {
    id: 51,
    title: "Rick Santana | I love you pt.ll - Lido (Lazerdisk remix)",
    category: "DANCE VIDEOS",
    videoId: "bT2B3OMLGtU",
    image: "https://img.youtube.com/vi/bT2B3OMLGtU/maxresdefault.jpg",
    date: "2024-04-26",
    year: "2024",
    type: "Video"
  },
  {
    id: 52,
    title: "Rick Santana | Get You by Daniel Caesar",
    category: "DANCE VIDEOS",
    videoId: "kF7FDyeTA3s",
    image: "https://img.youtube.com/vi/kF7FDyeTA3s/maxresdefault.jpg",
    date: "2024-04-27",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 53,
    title: "Rick Santana - Fluvial by TIBE",
    category: "DANCE VIDEOS",
    videoId: "geCIeWEMx2s",
    image: "https://img.youtube.com/vi/geCIeWEMx2s/maxresdefault.jpg",
    date: "2024-04-28",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 54,
    title: "Rick Santana | Away by Oshea",
    category: "DANCE VIDEOS",
    videoId: "3fqQ_UVgTEc",
    image: "https://img.youtube.com/vi/3fqQ_UVgTEc/maxresdefault.jpg",
    date: "2024-04-29",
    year: "2024",
    type: "Video"
  },
  {
    id: 55,
    title: "Rick Santana | Animal",
    category: "DANCE VIDEOS",
    videoId: "YY-7phHu6tc",
    image: "https://img.youtube.com/vi/YY-7phHu6tc/maxresdefault.jpg",
    date: "2024-04-30",
    year: "2024",
    type: "Video",
    highlight: true
  },
  {
    id: 57,
    title: "Rick Santana | Cloud City",
    category: "DANCE VIDEOS",
    videoId: "zIsd_l_oGRk",
    image: "https://img.youtube.com/vi/zIsd_l_oGRk/maxresdefault.jpg",
    date: "2024-05-01",
    year: "2024",
    type: "Video"
  },
  {
    id: 58,
    title: "Rick Santana Choreography | Love Never Fails by Kem | @ricksant_ana @MusicByKEM",
    category: "DANCE VIDEOS",
    videoId: "Psa5tDMkzAk",
    image: "https://img.youtube.com/vi/Psa5tDMkzAk/maxresdefault.jpg",
    date: "2024-05-02",
    year: "2024",
    type: "Video"
  },
  {
    id: 206,
    title: "RICK SANTANA - WILD",
    category: "DANCE VIDEOS",
    videoId: "nZ5ZdDtrdbs",
    image: "https://img.youtube.com/vi/nZ5ZdDtrdbs/maxresdefault.jpg",
    date: "2020-06-02",
    year: "2020",
    type: "Video"
  },
  {
    id: 200,
    title: "RICK SANTANA - QUANDO ME ENCONTRAR",
    category: "DANCE VIDEOS",
    videoId: "wf4GuLg1YeM",
    image: "https://img.youtube.com/vi/wf4GuLg1YeM/maxresdefault.jpg",
    date: "2021-06-01",
    year: "2021",
    type: "Video"
  },
  {
    id: 203,
    title: "RICK SANTANA - EX",
    category: "DANCE VIDEOS",
    videoId: "an9Yhj5BkEc",
    image: "https://img.youtube.com/vi/an9Yhj5BkEc/maxresdefault.jpg",
    date: "2021-06-02",
    year: "2021",
    type: "Video"
  },
  {
    id: 205,
    title: "RICK SANTANA - AQUELE ALGUEM",
    category: "DANCE VIDEOS",
    videoId: "VSticrv8VeE",
    image: "https://img.youtube.com/vi/VSticrv8VeE/maxresdefault.jpg",
    date: "2021-06-03",
    year: "2021",
    type: "Video"
  },
  {
    id: 209,
    title: "RICK SANTANA - UM DIA PRA NÓS DOIS",
    category: "DANCE VIDEOS",
    videoId: "DKyfPQgzSSk",
    image: "https://img.youtube.com/vi/DKyfPQgzSSk/maxresdefault.jpg",
    date: "2021-06-04",
    year: "2021",
    type: "Video"
  },
  {
    id: 210,
    title: "TRY - RICK SANTANA",
    category: "DANCE VIDEOS",
    videoId: "eU2GcNzodKw",
    image: "https://img.youtube.com/vi/eU2GcNzodKw/maxresdefault.jpg",
    date: "2021-06-05",
    year: "2021",
    type: "Video"
  },
  {
    id: 215,
    title: "PONTOS DE EXCLAMAÇÃO - RICK SANTANA E MILLENA SEMIM",
    category: "DANCE VIDEOS",
    videoId: "1_n6079tpEU",
    image: "https://img.youtube.com/vi/1_n6079tpEU/maxresdefault.jpg",
    date: "2022-01-01",
    year: "2022",
    type: "Video"
  },
  {
    id: 220,
    title: "METAMORFOSE AMBULANTE - RICK SANTANA",
    category: "DANCE VIDEOS",
    videoId: "1koW-BmGuFk",
    image: "https://img.youtube.com/vi/1koW-BmGuFk/maxresdefault.jpg",
    date: "2022-01-02",
    year: "2022",
    type: "Video"
  },
  {
    id: 216,
    title: "PÉ NA AREIA - RICK SANTANA",
    category: "DANCE VIDEOS",
    videoId: "GwQLQbgJl0Q",
    image: "https://img.youtube.com/vi/GwQLQbgJl0Q/maxresdefault.jpg",
    date: "2023-01-02",
    year: "2023",
    type: "Video"
  },
  {
    id: 218,
    title: "NEM DE GRAÇA - RICK SANTANA",
    category: "DANCE VIDEOS",
    videoId: "crfLsqDYrB0",
    image: "https://img.youtube.com/vi/crfLsqDYrB0/maxresdefault.jpg",
    date: "2023-01-03",
    year: "2023",
    type: "Video"
  },
  {
    id: 219,
    title: "MINHA CURA - RICK SANTANA",
    category: "DANCE VIDEOS",
    videoId: "UQUU4h50gtM",
    image: "https://img.youtube.com/vi/UQUU4h50gtM/maxresdefault.jpg",
    date: "2023-01-04",
    year: "2023",
    type: "Video"
  },

  // FREESTYLES
  {
    id: 25,
    title: "RICK SANTANA - NUDGE THEORY - FREESTYLE",
    category: "FREESTYLES",
    videoId: "ngJ9-eWU83w",
    image: "https://img.youtube.com/vi/ngJ9-eWU83w/maxresdefault.jpg",
    date: "2024-01-12",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 26,
    title: "RICK SANTANA - ADDICTION - FREESTYLE",
    category: "FREESTYLES",
    videoId: "087sFYWMkGY",
    image: "https://img.youtube.com/vi/087sFYWMkGY/maxresdefault.jpg",
    date: "2024-03-30",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 34,
    title: "RICK SANTANA - HARRIS COLE - FRESSTYLE SESSION",
    category: "FREESTYLES",
    videoId: "JOwgziviXCs",
    image: "https://img.youtube.com/vi/JOwgziviXCs/maxresdefault.jpg",
    date: "2024-05-03",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 40,
    title: "HEADSPACE",
    category: "FREESTYLES",
    videoId: "gi16qcx130k",
    image: "https://img.youtube.com/vi/gi16qcx130k/maxresdefault.jpg",
    date: "2024-05-04",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 46,
    title: "Rick Santana | Down for This - Sam Gouthro",
    category: "FREESTYLES",
    videoId: "7O3-UQUTp60",
    image: "https://img.youtube.com/vi/7O3-UQUTp60/maxresdefault.jpg",
    date: "2024-05-05",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 47,
    title: "Rick Santana | Ice Cream Parlor - Sam Gouthro",
    category: "FREESTYLES",
    videoId: "lu8gmaQr3Kg",
    image: "https://img.youtube.com/vi/lu8gmaQr3Kg/maxresdefault.jpg",
    date: "2024-05-06",
    year: "2024",
    type: "Freestyle"
  },
  {
    id: 202,
    title: "RICK SANTANA - FREESTYLE - RAVEENA",
    category: "FREESTYLES",
    videoId: "3TKo54gQOos",
    image: "https://img.youtube.com/vi/3TKo54gQOos/maxresdefault.jpg",
    date: "2020-06-01",
    year: "2020",
    type: "Freestyle"
  },
  {
    id: 204,
    title: "Rick Santana - Booling - Freestyle",
    category: "FREESTYLES",
    videoId: "8W7iao7uKoo",
    image: "https://img.youtube.com/vi/8W7iao7uKoo/maxresdefault.jpg",
    date: "2021-06-01",
    year: "2021",
    type: "Freestyle"
  },
  {
    id: 207,
    title: "RICK SANTANA - WHO'S - FREESTYLE",
    category: "FREESTYLES",
    videoId: "BMS-3emMUEM",
    image: "https://img.youtube.com/vi/BMS-3emMUEM/maxresdefault.jpg",
    date: "2021-06-02",
    year: "2021",
    type: "Freestyle"
  },
  {
    id: 211,
    title: "SLOW DOWN - FREESTYLE - RICK SANTANA",
    category: "FREESTYLES",
    videoId: "SH18rAdrt1E",
    image: "https://img.youtube.com/vi/SH18rAdrt1E/maxresdefault.jpg",
    date: "2021-06-03",
    year: "2021",
    type: "Freestyle"
  },
  {
    id: 217,
    title: "OVERTHINKER - RICK SANTANA - FREESTYLE",
    category: "FREESTYLES",
    videoId: "X7KCv-Sik28",
    image: "https://img.youtube.com/vi/X7KCv-Sik28/maxresdefault.jpg",
    date: "2021-06-04",
    year: "2021",
    type: "Freestyle"
  },
  {
    id: 214,
    title: "POP THAT - RICK SANTANA - FREESTYLE",
    category: "FREESTYLES",
    videoId: "Q-DEm9oaYI8",
    image: "https://img.youtube.com/vi/Q-DEm9oaYI8/maxresdefault.jpg",
    date: "2023-01-01",
    year: "2023",
    type: "Freestyle"
  },

  // DICAS
  {
    id: 242,
    title: "TUTORIAL METAMORFOSE AMBULANTE - RICK SANTANA",
    category: "DICAS",
    videoId: "R0b0L0Y0Xc8",
    image: "https://img.youtube.com/vi/R0b0L0Y0Xc8/maxresdefault.jpg",
    date: "2023-07-05",
    year: "2023",
    type: "Tutorial"
  },
  {
    id: 42,
    title: "4 Super Dicas de Musicalidade na Dan\u00e7a @RiickSantana",
    category: "DICAS",
    videoId: "1xkEcWLkWtE",
    image: "https://img.youtube.com/vi/1xkEcWLkWtE/maxresdefault.jpg",
    date: "2023-08-10",
    year: "2023",
    type: "Tutorial"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Reel', href: '#reel' },
    { name: 'Sobre', href: '#about' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Aulas', href: '#teaching' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-header py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-display font-bold tracking-tighter uppercase"
        >
          ARTISTA DO <span className="text-white/40">MOVIMENTO</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs uppercase tracking-widest font-medium hover:text-white transition-colors text-white/70"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-display uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Image */}
      <img 
        src="https://i.imgur.com/i0HubJ8.jpeg" 
        alt="Rick Santana Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-60 grayscale-0 md:grayscale scale-105 z-0"
        id="hero-background-image"
        loading="eager"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      
      {/* Overlay - Ensuring it doesn't mask the image too much on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-black z-10" />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.5em] text-white/50 mb-4 block">Portfólio Artístico</span>
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-6 uppercase urban-shadow">
            Rick Santana
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-base tracking-widest font-light text-white/80 uppercase">
            <span>Dançarino</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Coreógrafo</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Professor</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Videomaker</span>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/10 to-white/60 animate-bounce" />
      </motion.div>
    </section>
  );
};

const DanceReel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="reel" className="py-24 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div 
            className="aspect-video bg-brand-gray border border-white/5 relative shadow-2xl overflow-hidden group cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {isPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/9mwmFa3fcjM?autoplay=1"
                title="Rick Santana Dance Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <img 
                  src="https://img.youtube.com/vi/9mwmFa3fcjM/maxresdefault.jpg" 
                  alt="Rick Santana Dance Reel Cover" 
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center shadow-2xl z-10"
                  >
                    <Play size={32} fill="currentColor" />
                  </motion.div>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40 max-w-xl mx-auto leading-relaxed">
              Trabalho de conclusão do projeto 'MUV PRO' 2025: uma narrativa audiovisual sobre o pensamento excessivo que funde a expressividade da dança à tecnologia avançada de edição.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-gray relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-8"
          >
            Sobre <span className="text-white/40">Mim</span>
          </motion.h2>
            <div className="space-y-6 text-white/70 font-light leading-relaxed">
              <p>
                Com mais de 22 anos de trajetória na dança, Rick Santana começou nas ruas e em projetos sociais nas escolas de sua comunidade. A dança foi o caminho que o salvou e lhe deu uma nova perspectiva de vida. Hoje, atua como dançarino, professor, coreógrafo e videomaker profissional.
              </p>
              <p>
                Viajou o Brasil ministrando workshops, marcando presença em grandes eventos como Hip Hop District e Brazil Dance Camp, entre outros. Sua carreira inclui colaborações com artistas como Baiana System, CJOTA e MC Rick, participando também de reality shows na TV nacional. Especialista em 'Video Dance' e idealizador do Projeto Muv, que une a força da dança ao poder do audiovisual.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center space-x-3 bg-white text-black px-8 py-4 text-xs uppercase font-bold tracking-widest hover:bg-white/90 transition-colors">
                <span>Baixar Currículo</span>
                <Download size={16} />
              </button>
              <div className="flex items-center space-x-4 px-6 py-4 border border-white/10 text-xs uppercase tracking-widest">
                <span className="text-white/40">Especialidades:</span>
                <span className="font-medium text-white uppercase">Danças Urbanas, Coreografia, Body Control, Consciência Corporal, Musicalidade</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            className="order-1 md:order-2 aspect-[4/5] relative bg-brand-gray"
          >
            <div className="absolute inset-0 border border-white/5 -translate-x-4 translate-y-4 z-0" />
            <img 
              src="https://i.postimg.cc/VNSLrfB3/20260428-211733-IMG-STYLE.jpg" 
              alt="Rick Santana Headshot" 
              className="relative z-10 w-full h-full object-cover grayscale-0 md:grayscale transition-all duration-700"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PortfolioGallery = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['ALL', 'DESTAQUES', 'SHOWS', 'AULAS', 'DANCE VIDEOS', 'FREESTYLES', 'DICAS'];

  // Reset pagination when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setVisibleCount(8);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [filter, searchQuery]);

  const filteredAndSortedProjects = PROJECTS
    .filter(p => {
      const matchesFilter = filter === 'ALL' 
        || (filter === 'DESTAQUES' && p.highlight) 
        || p.category === filter;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (p.type && p.type.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section id="portfolio" className="py-24 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-12 gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase">Port<span className="text-white/40">fólio</span></h2>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-2">Explora o meu movimento por categorias</p>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* SearchBar */}
              <div className="relative flex-grow md:flex-grow-0 md:min-w-[250px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input 
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-gray border border-white/10 rounded-none px-10 py-2 text-[10px] uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Sort Toggle */}
              <button 
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center space-x-2 bg-brand-gray border border-white/10 px-4 py-2 text-[10px] uppercase tracking-widest hover:border-white/30 transition-all"
                title={sortOrder === 'desc' ? 'Mais recentes primeiro' : 'Mais antigos primeiro'}
              >
                <ArrowUpDown size={14} />
                <span>{sortOrder === 'desc' ? 'Novos' : 'Antigos'}</span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="w-full text-[8px] uppercase tracking-[0.2em] text-white/30 mb-1">Filtrar por Categoria</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-all ${
                    filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          {isLoading ? (
            <div className="col-span-full py-24 flex flex-col items-center justify-center space-y-4">
              <div className="flex space-x-2">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Atualizando Galeria</span>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProjects.slice(0, visibleCount).map((project) => (
                <motion.div 
                  layout
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group cursor-pointer aspect-square relative overflow-hidden bg-brand-gray border border-white/5"
                  onClick={() => setActiveVideo(project.videoId)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-115 object-center ${activeVideo === project.videoId ? 'blur-md opacity-50' : ''}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Play size={16} fill="currentColor" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{project.category}</p>
                    <h4 className="text-sm font-display font-bold uppercase tracking-tight text-white">{project.title}</h4>
                  </div>

                  {project.year && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 text-[8px] uppercase tracking-widest text-white border border-white/10 z-10">
                      {project.year}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {filteredAndSortedProjects.length > visibleCount && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-10 py-4 border border-white/10 hover:border-white text-[10px] uppercase font-bold tracking-[0.25em] transition-all bg-brand-gray/50 hover:bg-white hover:text-black"
            >
              Carregar Mais
            </button>
          </div>
        )}

        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-24 text-white/20">
            Nenhum vídeo encontrado para sua busca.
          </div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video relative"
            >
              <iframe
                className="absolute inset-0 w-full h-full shadow-2xl"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="Portfolio Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Teaching = () => {
  const methods = [
    { title: "Metodologia", desc: "A dança como meio de autoconhecimento e controle corporal em alta performance." },
    { title: "Formatos", desc: "Workshops intensivos, aulas particulares personalizadas, cursos online e mentorias de carreira." },
    { title: "Projetos", desc: "Desenvolvimento técnico e artístico focado na linguagem do Video Dance e audiovisual." }
  ];

  return (
    <section id="teaching" className="py-24 bg-brand-black relative border-y border-white/5">
       <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tighter uppercase mb-6"
          >
            Aulas <span className="text-white/40">e</span> Ensino
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/60 font-light leading-relaxed mb-12 max-w-2xl"
          >
            Acredito na dança como ferramenta de autoconhecimento e controle. Minha prática docente busca equilibrar o rigor técnico com a liberdade criativa necessária para a cena audiovisual.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {methods.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className="text-white/10 text-4xl font-display font-bold mb-4 group-hover:text-white/20 transition-colors">0{idx + 1}</div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = 'O nome é obrigatório';
    if (!formState.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formState.message.trim()) newErrors.message = 'A mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <footer id="contact" className="py-24 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-12">Vamos<br/><span className="text-white/40">Criar?</span></h2>
            
            <div className="space-y-8">
              <a href="https://instagram.com/riicksantana" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Instagram size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">Instagram</span>
                  <span className="text-sm font-medium">@riicksantana</span>
                </div>
              </a>

              <a href="mailto:santanasrick@gmail.com" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">Email</span>
                  <span className="text-sm font-medium">santanasrick@gmail.com</span>
                </div>
              </a>

              <a href="https://wa.me/5531991689647" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40">WhatsApp</span>
                  <span className="text-sm font-medium">+55 (31) 99168-9647</span>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-brand-gray p-10 border border-white/5 relative">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-8">Enviar Mensagem</h3>
            
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-brand-gray z-10 flex flex-col items-center justify-center text-center p-10"
                >
                   <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-6">
                      <ArrowRight size={32} />
                   </div>
                   <h4 className="text-xl font-display font-bold uppercase tracking-tight mb-2">Mensagem Enviada</h4>
                   <p className="text-xs text-white/50 uppercase tracking-widest leading-relaxed">
                     Obrigado pelo contato! Responderei em breve.
                   </p>
                   <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-1 hover:border-white transition-colors"
                   >
                     Enviar outra mensagem
                   </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Nome</label>
                <input 
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500/50' : 'border-white/10'} py-3 focus:outline-none focus:border-white transition-colors text-sm`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <p className="text-[10px] text-red-500/70 uppercase tracking-widest mt-2">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500/50' : 'border-white/10'} py-3 focus:outline-none focus:border-white transition-colors text-sm`}
                  placeholder="email@exemplo.com"
                />
                {errors.email && <p className="text-[10px] text-red-500/70 uppercase tracking-widest mt-2">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/30 mb-2">Mensagem</label>
                <textarea 
                  rows={4}
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  className={`w-full bg-transparent border-b ${errors.message ? 'border-red-500/50' : 'border-white/10'} py-3 focus:outline-none focus:border-white transition-colors text-sm resize-none`}
                  placeholder="Descreva seu projeto ou proposta..."
                />
                {errors.message && <p className="text-[10px] text-red-500/70 uppercase tracking-widest mt-2">{errors.message}</p>}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-5 text-xs uppercase font-bold tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <span>Enviar Agora</span>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/30">
          <p>© 2024 Rick Santana Artista da Dança</p>
          <p className="mt-4 md:mt-0 italic">Urban Elegant Design</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <DanceReel />
      <About />
      <PortfolioGallery />
      <Teaching />
      <Contact />
    </div>
  );
}
