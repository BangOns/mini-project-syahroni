import {
  FeedbackUpload,
  retrieveDataFeedback,
} from "@/app/libs/firebase/services";

export async function POST(req) {
  const request = await req.json();
  try {
    const response = await FeedbackUpload(request, (value) => {
      return value;
    });
    return Response.json({
      status: response.status,
      message: response.message,
    });
  } catch (error) {
    return Response.json({
      status: response.status,
      message: response.message,
    });
  }
}

export async function GET() {
  try {
    const response = await retrieveDataFeedback((value) => {
      return value;
    });
    return Response.json({ response });
  } catch (error) {
    return Response.json({ status: 400, message: "data tidak ditemukan" });
  }
}
