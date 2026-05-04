import { NextResponse } from "next/server";

import { getFeedbackCollection } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_FEEDBACK_LENGTH = 1000;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status });
}

export async function GET() {
  try {
    const { db, collectionName, tableCreated } = await getFeedbackCollection();
    await db.command({ ping: 1 });

    return jsonResponse({
      ok: true,
      message: "MongoDB connection successful.",
      table: collectionName,
      tableStatus: tableCreated
        ? "user_feedback table created successfully."
        : "user_feedback table already exists.",
    });
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        message: "MongoDB connection failed.",
        error:
          error instanceof Error
            ? error.message
            : "Unexpected database connection error.",
      },
      500,
    );
  }
}

export async function POST(request: Request) {
  let body: { feedback?: unknown; page?: unknown };

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        message: "Invalid request body. Send feedback as JSON.",
      },
      400,
    );
  }

  const feedback = typeof body.feedback === "string" ? body.feedback.trim() : "";
  const page = typeof body.page === "string" ? body.page.slice(0, 500) : "";

  if (!feedback) {
    return jsonResponse(
      {
        ok: false,
        message: "Feedback cannot be empty.",
      },
      400,
    );
  }

  if (feedback.length > MAX_FEEDBACK_LENGTH) {
    return jsonResponse(
      {
        ok: false,
        message: `Feedback must be ${MAX_FEEDBACK_LENGTH} characters or fewer.`,
      },
      400,
    );
  }

  try {
    const { collection, collectionName, tableCreated } =
      await getFeedbackCollection();

    const result = await collection.insertOne({
      feedback,
      page,
      userAgent: request.headers.get("user-agent") ?? "",
      createdAt: new Date(),
    });

    return jsonResponse(
      {
        ok: true,
        message: "Thank you. Your feedback was submitted successfully.",
        connectionStatus: "MongoDB connection successful.",
        table: collectionName,
        tableStatus: tableCreated
          ? "user_feedback table created successfully."
          : "user_feedback table confirmed.",
        id: result.insertedId.toString(),
      },
      201,
    );
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        message: "Feedback could not be submitted. Please try again.",
        error:
          error instanceof Error ? error.message : "Unexpected database error.",
      },
      500,
    );
  }
}
