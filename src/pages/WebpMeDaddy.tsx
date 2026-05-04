import LabsProjectPage from '@/components/LabsProjectPage';
import { projectStatuses } from '@/content/projects';

interface WebpMeDaddyProps {
  onNavigate: (page: string) => void;
}

export default function WebpMeDaddy({ onNavigate }: WebpMeDaddyProps) {
  return <LabsProjectPage project={projectStatuses['webp-me-daddy']} onNavigate={onNavigate} />;
}
