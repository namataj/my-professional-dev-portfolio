import {
  ChartColumn,
  CalendarCheck,
  ClipboardCheck,
  Database,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Monitor,
  Network,
  RefreshCcw,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Wrench,
  Code,
  FlaskConical,
  AppWindow,
  Theater,
  Bot,
  Workflow,
} from 'lucide-react';

// Data files refer to icons by name so content stays plain JavaScript.
// Add an import here when you use a new icon name in a data file.
const icons = {
  ChartColumn,
  CalendarCheck,
  ClipboardCheck,
  Database,
  Globe,
  HeartPulse,
  LayoutDashboard,
  Monitor,
  Network,
  RefreshCcw,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Wrench,
  FlaskConical,
  AppWindow,
  Theater,
  Bot,
  Workflow,
};

export default function Icon({ name, ...props }) {
  const Component = icons[name] || Code;
  return <Component aria-hidden="true" {...props} />;
}
