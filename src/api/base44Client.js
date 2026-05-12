// Minimal browser-side Anthropic shim that preserves the `base44.integrations.Core.InvokeLLM`
// surface used by WorkflowWizard.jsx, so call sites stay unchanged.
//
// WARNING: VITE_ANTHROPIC_API_KEY is exposed in the bundle. Acceptable for private demos
// only — for production, move this to a server route (Vercel Function / Edge) and call
// from there.
import Anthropic from '@anthropic-ai/sdk';

const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.warn('VITE_ANTHROPIC_API_KEY is missing — InvokeLLM calls will fail until it is set.');
}

const client = new Anthropic({
  apiKey,
  dangerouslyAllowBrowser: true,
});

async function InvokeLLM({ prompt, response_json_schema }) {
  if (response_json_schema) {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      tools: [{
        name: 'return_result',
        description: 'Return the structured workflow result.',
        input_schema: response_json_schema,
      }],
      tool_choice: { type: 'tool', name: 'return_result' },
      messages: [{ role: 'user', content: prompt }],
    });
    const toolUse = message.content.find((block) => block.type === 'tool_use');
    if (!toolUse) throw new Error('Anthropic response did not contain a tool_use block.');
    return toolUse.input;
  }

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });
  return message.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');
}

export const base44 = {
  integrations: {
    Core: { InvokeLLM },
  },
};
