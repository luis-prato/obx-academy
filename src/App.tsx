import { useEffect, useMemo, useState } from 'react';
import ObxAppLayout from '@/components/obx/ObxAppLayout';
import AcademyNavigation from '@/components/training/AcademyNavigation';
import AcademyVideo from '@/components/training/AcademyVideo';
import { ACADEMY_MODULES } from '@/data/academyContent';

const App = () => {
  const modules = ACADEMY_MODULES;
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeLessonId && modules.length > 0 && modules[0].lessons.length > 0) {
      setActiveLessonId(modules[0].lessons[0].id);
    }
  }, [modules, activeLessonId]);

  const activeLesson = useMemo(() => {
    for (const m of modules) {
      const l = m.lessons.find((x) => x.id === activeLessonId);
      if (l) return { lesson: l, module: m };
    }
    return null;
  }, [modules, activeLessonId]);

  return (
    <ObxAppLayout
      appName="Academy"
      title="Learn the outcome era."
      intro="Open-access learning materials on machine economy principles, autonomous systems, and industrial AI."
      seoTitle="OBX — Academy"
      seoDescription="Training programs on Equipment-as-a-Service, performance contracting, and outcome-based business models."
      path="/"
      kind="academy"
      steps={[
        { title: 'Choose a learning module', detail: 'Browse the available modules and select the lesson that matches your current question.' },
        { title: 'Open the lesson', detail: 'Watch the material and follow the explanation at your own pace.' },
        { title: 'Apply the principle', detail: 'Use the lesson to frame an Equipment-as-a-Service, performance contracting, or industrial AI decision.' },
      ]}
      faqs={[
        { question: 'Do I need an account?', answer: 'No. The Academy learning materials are open access.' },
        { question: 'Where should I begin?', answer: 'Start with the first lesson in the first available module, then continue in sequence unless a specific topic is more relevant.' },
        { question: 'Can I learn at my own pace?', answer: 'Yes. You can open any available lesson and return whenever you want.' },
        { question: 'Will more lessons be added?', answer: 'Yes. New material can be added as the Academy curriculum expands.' },
      ]}
    >
      <section className="px-6 pb-24 md:px-12 md:pb-32 lg:px-16">
        <div className="space-y-12">
          <AcademyVideo lesson={activeLesson?.lesson ?? null} />
          <AcademyNavigation
            modules={modules}
            activeLessonId={activeLessonId}
            onSelectLesson={setActiveLessonId}
          />
        </div>
      </section>
    </ObxAppLayout>
  );
};

export default App;
