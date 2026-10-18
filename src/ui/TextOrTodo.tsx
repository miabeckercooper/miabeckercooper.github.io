import { isTodo, type Text } from "../content/types";

/** Renders copy, or a visible TODO marker when the fact is missing from FACTS.md. */
export function TextOrTodo({ value }: { value: Text }) {
  if (isTodo(value)) return <span className="todo">TODO: {value.todo}</span>;
  return <>{value}</>;
}
