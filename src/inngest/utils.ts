import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, TextMessage } from "@inngest/agent-kit";

export async function getSandbox(sandboxId: string) {
  const sandbox = await Sandbox.connect(sandboxId);
  return sandbox;
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const messaqe = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return messaqe?.content
    ? typeof messaqe.content === "string"
      ? messaqe.content
      : messaqe.content.map((c) => c.text).join("")
    : undefined;
}
