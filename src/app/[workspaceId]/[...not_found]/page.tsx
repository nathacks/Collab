import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Params = Promise<{ workspaceId: string }>;

export default async function NotFoundCatchAll({ params }: { params: Params }) {
    const { workspaceId } = await params;

    return (
        <div className="flex flex-1 flex-col gap-6 justify-center items-center mb-20 px-4">
            <div className="flex flex-col gap-2">
                <h1 className="font-bold self-center tracking-tighter text-5xl transition-transform hover:scale-110 cursor-help">404</h1>
                <span>Oops! Wrong turn. Head back to your dashboard below.</span>
            </div>
            <Button asChild>
                <Link
                    href={`/${workspaceId}/dashboard`}
                    prefetch={false}
                >
                    Back to Dashboard
                </Link>
            </Button>
        </div>
    )
}
