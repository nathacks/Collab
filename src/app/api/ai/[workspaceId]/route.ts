import { authRouteServer } from '@/lib/api/nextRoute';
import { WorkspaceApiParamsSchema } from '@/schemas/workspace.schema';
import { TOOLS_AI } from '@/services/chatAI/tools.service';
import { streamText } from 'ai';
import { PostMessageChatBodySchema } from '@/schemas/ai/chatAI.schema';
import { groq } from '@ai-sdk/groq';


export const maxDuration = 30;

export const POST = authRouteServer
    .params(WorkspaceApiParamsSchema)
    .body(PostMessageChatBodySchema)
    .handler(async (_req, { body: { messages, parentId }, params: { workspaceId } }) => {
        const response = streamText({
            model: groq('deepseek-r1-distill-llama-70b'),
            toolChoice: 'required',
            tools: TOOLS_AI(workspaceId, parentId),
            messages,
        });

        return response.toDataStreamResponse({ getErrorMessage: errorHandler })
    });

function errorHandler(error: unknown) {
    if (error == null) {
        return 'unknown error';
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'An error has occurred';
}

