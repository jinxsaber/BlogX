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

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body: Blog = await req.json();

    if (!body.title || !body.content || !body.author) {
      return NextResponse.json(
        { error: "Required" },
        { status: 400 }
      );
    }

    let slug = slugify(body.title, { lower: true, strict: true });

    let uniqueSlug = slug;
    let counter = 1;
    let existingPost = await Post.findOne({ slug: uniqueSlug });
    while (existingPost) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
      existingPost = await Post.findOne({ slug: uniqueSlug });
    }

    const newPost = new Post({
      title: body.title,
      content: body.content,
      author: body.author,
      slug: uniqueSlug,
    });

    const savedPost = await newPost.save();

    return NextResponse.json(
      {
        message: "Created Successfully",
        newPost: savedPost,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating blog post: ", error);
    return NextResponse.json(
      {
        error: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}