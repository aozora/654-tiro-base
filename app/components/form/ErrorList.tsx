export type ListOfErrors = Array<string | null | undefined> | null | undefined;

export default function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;

  return (
    <ul id={id} className="flex flex-col">
      {errorsToRender.map((e) => (
        <li key={e} className="text-destructive text-xs">
          {e}
        </li>
      ))}
    </ul>
  );
}
