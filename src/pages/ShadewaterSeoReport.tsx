import LabsProjectPage from '@/components/LabsProjectPage';
import { projectStatuses } from '@/content/projects';

interface ShadewaterSeoReportProps {
  onNavigate: (page: string) => void;
}

export default function ShadewaterSeoReport({ onNavigate }: ShadewaterSeoReportProps) {
  return <LabsProjectPage project={projectStatuses['shadewater-seo-report']} onNavigate={onNavigate} />;
}
