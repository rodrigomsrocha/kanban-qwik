import { component$, useContext } from "@builder.io/qwik";
import { ProjectContext } from "~/contexts/ProjectContext";
import { ProjectPopover } from "~/integrations/react/ProjectPopover";
import { timeAgo } from "~/utils/timeAgo";

interface ProjectItemProps {
  id: number;
  title: string;
  createdAt: string;
}

export const ProjectItem = component$(
  ({ title, id, createdAt }: ProjectItemProps) => {
    const { deleteProject } = useContext(ProjectContext);
    return (
      <div class="bg-[#333536] flex flex-col justify-between p-4 h-[150px] rounded-md">
        <a
          href={`/project/${id}`}
          class="font-bold text-gray-200 underline-offset-2 hover:underline"
        >
          {title}
        </a>
        <footer class="text-gray-300 flex justify-between items-center">
          <time class="flex items-center gap-2">
            <i class="ph ph-clock"></i>
            {timeAgo(createdAt)}
          </time>
          <ProjectPopover
            deleteProject={deleteProject}
            projectId={id}
            client:visible
          />
        </footer>
      </div>
    );
  }
);
