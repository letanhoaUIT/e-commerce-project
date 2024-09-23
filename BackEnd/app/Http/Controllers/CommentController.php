<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Get all comments for a specific product
    public function index($productId)
    {
        // Lấy tất cả các bình luận cho sản phẩm cụ thể và kèm theo thông tin người dùng
        $comments = Comment::where('product_id', $productId)
                            ->with('user:id,name') // Chỉ lấy tên và id của người dùng
                            ->get();

        return response()->json($comments);
    }

    // Get a single comment
    public function show($id)
    {
        // Lấy bình luận và thông tin người dùng
        $comment = Comment::with('user:id,name')->find($id);
        
        if ($comment) {
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }

    // Create a new comment
    public function store(Request $request, $productId)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'comment' => 'required|string',
        ]);

        $validatedData['product_id'] = $productId;

        // Tạo bình luận mới
        $comment = Comment::create($validatedData);

        // Trả về bình luận với thông tin người dùng
        return response()->json($comment->load('user:id,name'), 201);
    }

    // Update an existing comment
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $validatedData = $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
                'comment' => 'sometimes|required|string',
            ]);

            $comment->update($validatedData);
            return response()->json($comment->load('user:id,name'));
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully']);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }
}
