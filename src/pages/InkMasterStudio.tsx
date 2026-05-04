import LabsProjectPage from '@/components/LabsProjectPage';
import { projectStatuses } from '@/content/projects';

interface InkMasterStudioProps {
  onNavigate: (page: string) => void;
}

export default function InkMasterStudio({ onNavigate }: InkMasterStudioProps) {
  return <LabsProjectPage project={projectStatuses['inkmaster-studio']} onNavigate={onNavigate} />;
}
