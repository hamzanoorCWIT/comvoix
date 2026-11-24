import type { Metadata } from 'next';
import { SolutionPage } from '../../components/solution-page';
import { solutions } from '../../solutions-content';
const solution = solutions[2];
export const metadata: Metadata = { title: `${solution.name} — Comvoix`, description: solution.description };
export default function Page() { return <SolutionPage solution={solution}/>; }