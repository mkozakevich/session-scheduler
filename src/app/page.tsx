import { Project } from '@/components/project/component';
import { data } from './data.';

export default function Home() {
    return (
        <>
            {data.map((project) => (
                <Project key={project.id} project={project} />
            ))}
        </>
    );
}
