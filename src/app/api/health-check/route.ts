import { NextResponse } from 'next/server';

type ErrorResponse = {
  message: string;
};

export const GET = async (): Promise<NextResponse<string | ErrorResponse>> => {
  try {
    // TODO

    return NextResponse.json('Health check success', { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: `Data fetching failed: ${e}` }, { status: 500 });
  }
};
