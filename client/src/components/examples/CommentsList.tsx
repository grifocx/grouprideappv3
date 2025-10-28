import { CommentsList, type Comment } from '../CommentsList';

export default function CommentsListExample() {
  const mockComments: Comment[] = [
    {
      id: "1",
      author: { name: "Sarah Chen" },
      content: "Can't wait for this ride! The weather looks perfect.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "2",
      author: { name: "Mike Torres" },
      content: "Is there a water stop planned halfway? I'll bring extra bottles if needed.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ];

  return (
    <div className="p-4 max-w-2xl">
      <CommentsList
        comments={mockComments}
        onAddComment={(content) => console.log('New comment:', content)}
      />
    </div>
  );
}
