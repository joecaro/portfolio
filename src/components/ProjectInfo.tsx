export default function ProjectInfo({
    project,
}: {
    project: {
        title: string;
        description: string;
        stack: string[];
        slug: string;
    };
}) {
    return (
        <div>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <p>
                <b>STACK</b> | {project.stack.join(", ")}
            </p>
            <a
                target='_blank'
                rel='noreferrer'
                href={`/projects/${project.slug}`}
                className='hover:underline'
            >
                Read More...
            </a>
        </div>
    );
}
