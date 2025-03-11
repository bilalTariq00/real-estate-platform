import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Property from "@/models/property";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const searchTitle = searchParams.get("title") || "";

    let query = {};
    if (searchTitle) {
      query = { title: { $regex: searchTitle, $options: "i" } }; // Case-insensitive search
    }

    const properties = await Property.find(query);
    return NextResponse.json(properties, { status: 200 });
  } catch (error: unknown) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { places } = await req.json();

    if (!Array.isArray(places) || places.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty places array" },
        { status: 400 }
      );
    }

    const validPlaces = places.filter(
      (p) => p.title && p.latitude && p.longitude
    );

    if (validPlaces.length === 0) {
      return NextResponse.json(
        { error: "No valid properties to add" },
        { status: 400 }
      );
    }

    const addedProperties = await Property.insertMany(validPlaces);

    return NextResponse.json(
      {
        message: `${addedProperties.length} properties added successfully`,
        properties: addedProperties,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { error: "Failed to add properties" },
      { status: 500 }
    );
  }
}
