export interface JsonplaceholderResp {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function loadData(): Promise<JsonplaceholderResp> {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json(),
  );
  console.log("Finish");
  return data;
}
