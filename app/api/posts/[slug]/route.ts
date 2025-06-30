import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/blog";
import slugify from "slugify";


interface Blog {
  title: string;
  content: string;
  author: string;
  slug: string;
}

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    const responseData = {
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    };

    return NextResponse.json(
      responseData,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectToDatabase();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const body: Partial<Blog> = await req.json();

    if (!body.title && !body.content) {
      return NextResponse.json(
        { error: "At least one field (title or content) is required for update" },
        { status: 400 }
      );
    }

    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      { 
        title: body.title,
        content: body.content,
        slug: body.title ? slugify(body.title, { lower: true, strict: true }) : slug
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      updatedPost,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post: ", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectToDatabase();

    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const result = await Post.findOneAndDelete({ slug });

    if (!result) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post: ", error);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}