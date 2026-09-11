import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projects-data';
import ProjectDetails from '@/components/ProjectDetails';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Case Study`,
    description: project.brief,
    openGraph: {
      title: `${project.title} — Case Study | Fuad Talukder`,
      description: project.brief,
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | Fuad Talukder`,
      description: project.brief,
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
