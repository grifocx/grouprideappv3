import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "./UserAvatar";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export interface Comment {
  id: string;
  author: { name: string; image?: string };
  content: string;
  timestamp: Date;
}

interface CommentsListProps {
  comments: Comment[];
  onAddComment?: (content: string) => void;
}

export function CommentsList({ comments, onAddComment }: CommentsListProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      onAddComment?.(newComment);
      setNewComment("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <CardTitle className="text-lg">Comments ({comments.length})</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            data-testid="textarea-new-comment"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="default"
              disabled={!newComment.trim()}
              data-testid="button-post-comment"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 p-4 rounded-lg bg-card border"
                data-testid={`comment-${comment.id}`}
              >
                <UserAvatar name={comment.author.name} image={comment.author.image} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
