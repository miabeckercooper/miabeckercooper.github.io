import { lazy, Suspense } from "react";
import { useOpenProject, viewerStore } from "../lib/viewerStore";

const Viewer = lazy(() => import("./Viewer"));

/** Mounts the project viewer when a timeline moment or project card opens it. */
export function ViewerHost() {
  const i = useOpenProject();
  if (i === null || i < 0) return null;
  return (
    <Suspense fallback={null}>
      <Viewer key={i} index={i} onClose={() => viewerStore.close()} />
    </Suspense>
  );
}
