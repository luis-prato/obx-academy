export interface AcademyLesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  video_url: string | null;
  thumbnail: string | null;
  order_index: number;
}

export interface AcademyModule {
  id: string;
  title: string;
  order_index: number;
  lessons: AcademyLesson[];
}