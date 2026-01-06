export interface Exam {
  id: string;
  examType: "Duolingo" | "TOEFL" | "Pearson" | "IELTS Home" | "Others";
  mentorship: string;
  examRoomService: number;
  sum: number;
}

export interface Testimonial {
  id: number;
  name: string;
  exam: string;
  score: string;
  content: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
}

export interface Resource {
  id: string;
  type: "pdf" | "video";
  title: string;
  description: string;
  url: string;
  videoType?: "youtube" | "social" | "upload";
  videoFile?: File | null;
  pdfFile?: File | null;
  pdfUploadMode?: "url" | "upload";
}