"use client"
import Link from "next/link";
import { CommentsGetManyOutput } from "../../types";
import { UserAvatar } from "@/components/user-avatar";
import { formatDistanceToNow } from "date-fns";

interface CommentItemProp {
    comment: CommentsGetManyOutput[number];
}

export const CommentItem = ( {
    comment,
}: CommentItemProp) => {
    return(
        <div>
            <div className="flex gap-4">
                <Link href={`/users/${comment.userId}`}>
                <UserAvatar
                    size="lg"
                    imageUrl={comment.user.imageUrl}
                    name={comment.user.name || "User"}
                />
                </Link>
                <div className="flex-1 min-w-0">
                    <Link href={`/users/${comment.userId}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-medium text-sm pb-0.5">
                                {comment.user.name}

                            </span>
                            <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(comment.createdAt, {
                                    addSuffix:true
                                })}
                            </span>

                        </div>
                    </Link>
                    <p className="text-sm">
                        {comment.value}
                    </p>

                </div>
            </div>
        </div>
    )
}