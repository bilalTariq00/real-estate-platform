import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Property from "@/models/property";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get search query from request URL
    const { searchParams } = new URL(req.url);
    const searchTitle = searchParams.get("title") || "";

    let query = {};
    if (searchTitle) {
      query = { title: { $regex: searchTitle, $options: "i" } }; // Case-insensitive search
    }

    const properties = await Property.find(query);
    return NextResponse.json(properties, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/properties error:", error); // ✅ Log the error
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { title, latitude, longitude } = await req.json();

    if (!title || !latitude || !longitude) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProperty = new Property({ title, latitude, longitude });
    await newProperty.save();

    return NextResponse.json(
      { message: "Property added successfully", property: newProperty },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/properties error:", error); // ✅ Log the error
    return NextResponse.json(
      { error: "Failed to add property" },
      { status: 500 }
    );
  }
}
