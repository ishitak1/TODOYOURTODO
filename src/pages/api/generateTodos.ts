import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { Todo } from "../../types/Todo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }

  try {
    const { todos } = body as {
      todos: Todo[];
    };

    if (!todos) {
      return res.status(400).json({ message: "Todos are required" });
    }

    const todoList = todos.map(({ text: todo }) => `- ${todo}`).join("\n");

    try {
      const configuration = new Configuration({
        organization: "org-hIrdnlfK5hBZGDdwNM90f0I0",
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give me a list of suggestions for the following todos in the form of bulletted points:\n${todoList}\n`,
        temperature: 0.3,
        max_tokens: 100,
      });
      return res.status(200).json({ data: completion.data.choices[0].text });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
