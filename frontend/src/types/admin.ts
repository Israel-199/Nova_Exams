export interface Exam {
  id: string;
  examType: "Duolingo" | "TOEFL" | "Pearson" | "IELTS Home" | "Others";
  mentorship: string;
  examRoomService: number;
  sum: number;
}

export interface Testimonial {
  id: string;          
  student: string;
  exam: string;
  rating: number;       // ⭐ replaces score, numeric 1–5
  testimonial: string;
  image?: string;
  created_at?: string;
}


export interface BlogPost {
  id: string;
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
  url: string; // for external links (YouTube, Vimeo, PDF URL)
  videoType?: "youtube" | "social" | "upload"; // upload = file
  videoFile?: File | null; // actual uploaded video file
  pdfFile?: File | null;   // actual uploaded PDF file
  pdfUploadMode?: "url" | "upload"; // url = external link, upload = file
}


