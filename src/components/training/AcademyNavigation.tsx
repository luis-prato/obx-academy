import { Play } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { AcademyModule } from '@/components/training/types';

type AcademyNavigationProps = {
  modules: AcademyModule[];
  activeLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
};

const AcademyNavigation = ({ modules, activeLessonId, onSelectLesson }: AcademyNavigationProps) => (
  <section aria-labelledby="course-content-heading">
    <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
      <h2 id="course-content-heading" className="font-sans text-2xl font-semibold md:text-3xl">Course content</h2>
      <p className="font-sans text-sm text-muted-foreground">Select a lesson to continue learning.</p>
    </div>

    <Accordion type="multiple" defaultValue={modules.slice(0, 1).map((module) => module.id)} className="space-y-3">
      {modules.map((module) => (
        <AccordionItem key={module.id} value={module.id} className="rounded-md border border-border bg-card px-5 md:px-7">
          <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
            <span className="flex min-w-0 flex-1 items-center justify-between gap-4 pr-2">
              <span className="font-sans text-base font-semibold md:text-lg">{module.title}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <div className="divide-y divide-border border-t border-border">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                return (
                  <Button
                    key={lesson.id}
                    type="button"
                    variant="ghost"
                    onClick={() => onSelectLesson(lesson.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'h-auto w-full justify-start rounded-none px-0 py-4 text-left hover:bg-transparent',
                      isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                    )}
                  >
                    <span className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted">
                      {lesson.thumbnail ? (
                        <img src={lesson.thumbnail} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Play className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1 whitespace-normal">
                      <span className="block font-sans text-sm font-medium leading-snug">{lesson.title}</span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {lesson.duration}
                      </span>
                    </span>
                  </Button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
);

export default AcademyNavigation;