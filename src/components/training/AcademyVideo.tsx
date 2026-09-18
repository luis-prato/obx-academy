import { Play } from 'lucide-react';
import type { AcademyLesson } from '@/components/training/types';

type AcademyVideoProps = {
  lesson: AcademyLesson | null;
};

const getYouTubeEmbedUrl = (url: string | null) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    let videoId = '';

    if (host === 'youtu.be') videoId = parsed.pathname.split('/').filter(Boolean)[0] ?? '';
    if (host.endsWith('youtube.com')) {
      if (parsed.pathname === '/watch') videoId = parsed.searchParams.get('v') ?? '';
      if (parsed.pathname.startsWith('/embed/') || parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.split('/').filter(Boolean)[1] ?? '';
      }
    }

    return /^[A-Za-z0-9_-]{11}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
      : null;
  } catch {
    return null;
  }
};

const AcademyVideo = ({ lesson }: AcademyVideoProps) => {
  const embedUrl = getYouTubeEmbedUrl(lesson?.video_url ?? null);

  return (
    <article className="overflow-hidden rounded-md border border-border bg-card">
      <div className="relative aspect-video bg-muted">
        {embedUrl && lesson ? (
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
              <Play className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="font-sans text-sm">Video not available</p>
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        {lesson ? (
          <>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {lesson.duration}
            </div>
            <h2 className="font-serif text-3xl font-normal leading-tight md:text-4xl">{lesson.title}</h2>
            {lesson.description && (
              <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                {lesson.description}
              </p>
            )}
          </>
        ) : (
          <p className="font-sans text-sm text-muted-foreground">Select a lesson to begin.</p>
        )}
      </div>
    </article>
  );
};

export default AcademyVideo;