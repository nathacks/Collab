import { UIMessage } from 'ai';
import { toolComponents, Tools } from '@/components/ai/tools/toolsComponents';
import { HTMLProps } from 'react';


interface MessagesProps {
    message: UIMessage;
    onClose: () => void;
    mode: Tools
}

export function AiMessages(props: MessagesProps & HTMLProps<HTMLSpanElement>) {
    const { onClose, message, mode } = props;

    return message.parts?.map((part, index) => {
        const { type } = part;

        if (type === 'tool-invocation') {
            const { toolName, toolCallId } = part.toolInvocation;
            const ToolComponent = toolComponents[toolName][mode];

            return <ToolComponent key={toolCallId} toolInvocation={part.toolInvocation} onClose={onClose}/>;
        }

        return (
            <span {...props} key={index}>
                {typeof message.content === 'object' ? JSON.stringify(message.content, null, 2) : message.content}
            </span>
        );
    });
}
