import { NextRequest, NextResponse } from 'next/server';

import { uploadImage } from '@/lib/helpers';

export async function POST(request: NextRequest) {
  const file = (await request.formData()).get('file') as File | null;

  if (!file) {
    return NextResponse.json(
      {
        success: false,
        error: 'No file provided',
      },
      { status: 400 },
    );
  }

  return await uploadImage(file).then((res) => {
    if (!res) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to upload image',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      result: res,
    });
  });
}
