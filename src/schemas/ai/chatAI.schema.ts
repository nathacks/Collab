import { z } from 'zod';


export const PostMessageChatBodySchema = z.object({
    messages: z.array(
        z.object({
            role: z.enum(['system', 'user', 'assistant']),
            content: z.string(),
        })
    ),
    parentId: z.string().cuid2().nullable(),
});
