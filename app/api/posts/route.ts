import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/blog";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const posts = await Post.find({}).select('title content slug createdAt author');

    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found" },
        { status: 404 }
      );
    }

    const responseData = posts.map((post: { title: any; content: any; slug: any; createdAt: any; author: any; }) => ({
      title: post.title,
      content: post.content,
      slug: post.slug,
      createdAt: post.createdAt,
      author: post.author
    }));

    return NextResponse.json(
      responseData,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching all blog posts: ", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}